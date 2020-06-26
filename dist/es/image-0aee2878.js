
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aI as FluroCodeEditor, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-b00ea499.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-a4eeab83.js';
import { F as FluroAssetEditMixin } from './FluroAssetEditMixin-bae1645b.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor
  },

  created() {
    this.$set(this.model, 'assetType', 'upload');
  },

  mixins: [FluroContentEditMixin, FluroAssetEditMixin],
  computed: {
    hasMeta() {
      if (!this.model.data) {
        return;
      }

      return this.model.data.iptc || this.model.data.exif;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Defaults to filename if left empty'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    fullBody() {
      return this.definition && this.definition.data && this.definition.data.fullBody;
    },

    hideBody() {
      return this.definition && this.definition.data && this.definition.data.hideBody;
    },

    titleLabel() {
      return 'Title';
    },

    bodyLabel() {
      return 'Body';
    }

  },
  methods: {
    assetReplaced(model) {
      this.imageCacheKey = Math.random();
      this.replace = false;
    }

  },

  data() {
    return {
      imageCacheKey: 0,
      replace: false,
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
                                _vm.model._id
                                  ? [
                                      _c(
                                        "div",
                                        { staticClass: "media-preview" },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass: "media-preview-wrap"
                                            },
                                            [
                                              _c("fluro-image", {
                                                attrs: {
                                                  longpress: true,
                                                  height: 450,
                                                  "image-height": 450,
                                                  contain: "",
                                                  item: _vm.model,
                                                  cacheKey: _vm.imageCacheKey,
                                                  spinner: true
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm.replace
                                        ? [
                                            _c("asset-replace-upload", {
                                              on: { input: _vm.assetReplaced },
                                              model: {
                                                value: _vm.model,
                                                callback: function($$v) {
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
                                                        staticClass: "no-flex",
                                                        attrs: {
                                                          label:
                                                            _vm.model.filename
                                                        }
                                                      },
                                                      [
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
                                                                  "\n                                                        Replace with a new file\n                                                        "
                                                                ),
                                                                _c(
                                                                  "fluro-icon",
                                                                  {
                                                                    attrs: {
                                                                      right: "",
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
                                                      ]
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "v-flex",
                                                  [
                                                    _vm.model.colors &&
                                                    _vm.model.colors.length
                                                      ? _c(
                                                          "v-input",
                                                          {
                                                            staticClass:
                                                              "no-flex",
                                                            attrs: {
                                                              label:
                                                                "Main Colors"
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "div",
                                                              _vm._l(
                                                                _vm.model
                                                                  .colors,
                                                                function(
                                                                  color
                                                                ) {
                                                                  return _c(
                                                                    "div",
                                                                    {
                                                                      directives: [
                                                                        {
                                                                          name:
                                                                            "tippy",
                                                                          rawName:
                                                                            "v-tippy"
                                                                        }
                                                                      ],
                                                                      staticClass:
                                                                        "color-swatch",
                                                                      style: {
                                                                        backgroundColor: color
                                                                      },
                                                                      attrs: {
                                                                        content: color
                                                                      }
                                                                    }
                                                                  )
                                                                }
                                                              ),
                                                              0
                                                            )
                                                          ]
                                                        )
                                                      : _vm._e()
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
                                    ],
                                _vm._v(" "),
                                _vm.definition &&
                                _vm.definition.fields &&
                                _vm.definition.fields.length
                                  ? [
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
                                    ]
                                  : _vm._e(),
                                _vm._v(" "),
                                !_vm.hideBody && !_vm.fullBody
                                  ? [
                                      _c(
                                        "v-input",
                                        {
                                          staticClass: "no-flex",
                                          attrs: { label: "Body / Caption" }
                                        },
                                        [
                                          _c("fluro-editor", {
                                            attrs: {
                                              options: _vm.editorOptions,
                                              placeholder:
                                                "Type your text in here"
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
                                      )
                                    ]
                                  : _vm._e(),
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
                ),
                _vm._v(" "),
                _vm.hasMeta
                  ? _c(
                      "tab",
                      { attrs: { heading: "Advanced / Metadata" } },
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
                                    _vm.model.data.iptc
                                      ? _c(
                                          "fluro-panel",
                                          [
                                            _c("fluro-panel-title", [
                                              _c("h5", [_vm._v("IPTC Data")])
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "fluro-panel-body",
                                              [
                                                _c("json-view", {
                                                  attrs: {
                                                    deep: 3,
                                                    data: _vm.model.data.iptc
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.model.data.exif
                                      ? _c(
                                          "fluro-panel",
                                          [
                                            _c("fluro-panel-title", [
                                              _c("h5", [_vm._v("EXIF Data")])
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "fluro-panel-body",
                                              [
                                                _c("json-view", {
                                                  attrs: {
                                                    deep: 3,
                                                    data: _vm.model.data.exif
                                                  }
                                                })
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
    inject("data-v-7e71bc50_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.media-preview {\n  background: #eee;\n  display: block;\n  min-height: 350px;\n  margin-bottom: 15px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.media-preview .media-preview-wrap {\n  max-width: 750px;\n  margin: auto;\n}\n\n/*# sourceMappingURL=image.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\image.vue","image.vue"],"names":[],"mappings":"AAiOA,GAAA;AAYA;EACA,yCAAA;AC3OA;AD8OA;EACA,2CAAA;AC3OA;AD8OA;EACA,4CAAA;AC3OA;AD8OA;EACA,0CAAA;AC3OA;;ADmPA,GAAA;AACA;EACA,gBAAA;EACA,cAAA;EACA,iBAAA;EACA,mBAAA;EACA,oCAAA;EACA,kBAAA;EACA,gBAAA;AChPA;ADkPA;EACA,gBAAA;EACA,YAAA;AChPA;;AAEA,oCAAoC","file":"image.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n               <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n\n\n\n                <tab heading=\"Details\">\n                    <!-- <slot> -->\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <template v-if=\"model._id\">\n                                    <!-- @load=\"onLoad\" @error=\"onError\" -->\n                                    <div class=\"media-preview\">\n                                        <div class=\"media-preview-wrap\">\n                                            <fluro-image :longpress=\"true\" :height=\"450\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                                        </div>\n                                    </div>\n                                    <template v-if=\"replace\">\n                                        <asset-replace-upload v-model=\"model\" @input=\"assetReplaced\" />\n                                    </template>\n                                    <template v-else>\n                                        <v-layout>\n                                            <v-flex>\n                                                <v-input :label=\"model.filename\" class=\"no-flex\">\n                                                    <div>\n                                                        <v-btn class=\"ma-0\" @click=\"replace = true\">\n                                                            Replace with a new file\n                                                            <fluro-icon right library=\"fas\" icon=\"cloud-upload\" />\n                                                        </v-btn>\n                                                    </div>\n                                                </v-input>\n                                            </v-flex>\n                                            <v-flex>\n                                                <v-input label=\"Main Colors\" v-if=\"model.colors && model.colors.length\" class=\"no-flex\">\n                                                    <div>\n                                                        <div class=\"color-swatch\" :style=\"{backgroundColor:color}\" v-tippy :content=\"color\" v-for=\"color in model.colors\" />\n                                                    </div>\n                                                </v-input>\n                                            </v-flex>\n                                        </v-layout>\n                                    </template>\n                                </template>\n                                <template v-else>\n                                    <asset-replace-upload v-model=\"model\" @file=\"fileSelected\" />\n                                    <!-- <pre>{{file}}</pre> -->\n                                </template>\n                                <!-- <div class=\"form-group\" v-if=\"definition.data.titleGeneration != 'force'\"> -->\n                                <!-- <label>{{titleLabel}}</label> -->\n                                <!-- <input class=\"form-control\" placeholder=\"{{titleLabel}}\" ng-model=\"item.title\"> -->\n                                <!-- </div> -->\n                                <template v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <!-- <fluro-panel> -->\n                                        <!-- <fluro-panel-title> -->\n                                            <!-- <h5>{{definition.title}} Information</h5> -->\n                                        <!-- </fluro-panel-title> -->\n                                        <!-- <fluro-panel-body> -->\n                                            <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                        <!-- </fluro-panel-body> -->\n                                    <!-- </fluro-panel> -->\n                                </template>\n\n                                <template v-if=\"!hideBody && !fullBody\">\n                                    <v-input label=\"Body / Caption\" class=\"no-flex\">\n                                        <fluro-editor v-model=\"model.body\" :options=\"editorOptions\" placeholder=\"Type your text in here\"></fluro-editor>\n                                    </v-input>\n                                </template>\n\n\n                                <fluro-privacy-select v-model=\"model.privacy\"/>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                    <!-- </slot> -->\n                </tab>\n                <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <!-- <div > -->\n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <!-- </div> -->\n                                <!-- <div v-if=\"model.data.exif\"> -->\n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <!-- </div> -->\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </template>\n        <!-- <flex-column-body> -->\n        <!-- // <pre>{{model}}</pre> -->\n        <!-- </flex-column-body> -->\n        <!-- <flex-column-body> -->\n        <!-- WOOOT -->\n        <!-- <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Basic Details\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset> -->\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n    },\n    created() {\n        this.$set(this.model, 'assetType', 'upload');\n    },\n    mixins: [FluroContentEditMixin, FluroAssetEditMixin],\n    computed: {\n        hasMeta() {\n            if (!this.model.data) {\n                return;\n            }\n\n            return this.model.data.iptc || this.model.data.exif;\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Defaults to filename if left empty',\n            })\n\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        fullBody() {\n            return this.definition && this.definition.data && this.definition.data.fullBody;\n        },\n        hideBody() {\n            return this.definition && this.definition.data && this.definition.data.hideBody;\n        },\n        titleLabel() {\n            return 'Title';\n        },\n        bodyLabel() {\n            return 'Body';\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.imageCacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    data() {\n        return {\n            imageCacheKey: 0,\n            replace: false,\n            editorOptions: {},\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.media-preview {\n    background: #eee;\n    display: block;\n    min-height: 350px;\n    margin-bottom: 15px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 5px;\n    overflow: hidden;\n\n    .media-preview-wrap {\n        max-width: 750px;\n        margin: auto;\n    }\n}\n</style>\n<style lang=\"scss\" scoped>\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.color-swatch {\n    width:36px;\n    height:36px;\n        border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.media-preview {\n  background: #eee;\n  display: block;\n  min-height: 350px;\n  margin-bottom: 15px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.media-preview .media-preview-wrap {\n  max-width: 750px;\n  margin: auto;\n}\n\n/*# sourceMappingURL=image.vue.map */"]}, media: undefined })
,inject("data-v-7e71bc50_1", { source: "/**/\n.border-top[data-v-7e71bc50] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-7e71bc50] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-7e71bc50] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-7e71bc50] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.color-swatch[data-v-7e71bc50] {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=image.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\image.vue","image.vue"],"names":[],"mappings":"AAoRA,GAAA;AAYA;EACA,yCAAA;AC9RA;ADiSA;EACA,2CAAA;AC9RA;ADiSA;EACA,4CAAA;AC9RA;ADiSA;EACA,0CAAA;AC9RA;;ADsSA,GAAA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;ACnSA;;AAEA,oCAAoC","file":"image.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n               <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n\n\n\n                <tab heading=\"Details\">\n                    <!-- <slot> -->\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <template v-if=\"model._id\">\n                                    <!-- @load=\"onLoad\" @error=\"onError\" -->\n                                    <div class=\"media-preview\">\n                                        <div class=\"media-preview-wrap\">\n                                            <fluro-image :longpress=\"true\" :height=\"450\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                                        </div>\n                                    </div>\n                                    <template v-if=\"replace\">\n                                        <asset-replace-upload v-model=\"model\" @input=\"assetReplaced\" />\n                                    </template>\n                                    <template v-else>\n                                        <v-layout>\n                                            <v-flex>\n                                                <v-input :label=\"model.filename\" class=\"no-flex\">\n                                                    <div>\n                                                        <v-btn class=\"ma-0\" @click=\"replace = true\">\n                                                            Replace with a new file\n                                                            <fluro-icon right library=\"fas\" icon=\"cloud-upload\" />\n                                                        </v-btn>\n                                                    </div>\n                                                </v-input>\n                                            </v-flex>\n                                            <v-flex>\n                                                <v-input label=\"Main Colors\" v-if=\"model.colors && model.colors.length\" class=\"no-flex\">\n                                                    <div>\n                                                        <div class=\"color-swatch\" :style=\"{backgroundColor:color}\" v-tippy :content=\"color\" v-for=\"color in model.colors\" />\n                                                    </div>\n                                                </v-input>\n                                            </v-flex>\n                                        </v-layout>\n                                    </template>\n                                </template>\n                                <template v-else>\n                                    <asset-replace-upload v-model=\"model\" @file=\"fileSelected\" />\n                                    <!-- <pre>{{file}}</pre> -->\n                                </template>\n                                <!-- <div class=\"form-group\" v-if=\"definition.data.titleGeneration != 'force'\"> -->\n                                <!-- <label>{{titleLabel}}</label> -->\n                                <!-- <input class=\"form-control\" placeholder=\"{{titleLabel}}\" ng-model=\"item.title\"> -->\n                                <!-- </div> -->\n                                <template v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <!-- <fluro-panel> -->\n                                        <!-- <fluro-panel-title> -->\n                                            <!-- <h5>{{definition.title}} Information</h5> -->\n                                        <!-- </fluro-panel-title> -->\n                                        <!-- <fluro-panel-body> -->\n                                            <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                        <!-- </fluro-panel-body> -->\n                                    <!-- </fluro-panel> -->\n                                </template>\n\n                                <template v-if=\"!hideBody && !fullBody\">\n                                    <v-input label=\"Body / Caption\" class=\"no-flex\">\n                                        <fluro-editor v-model=\"model.body\" :options=\"editorOptions\" placeholder=\"Type your text in here\"></fluro-editor>\n                                    </v-input>\n                                </template>\n\n\n                                <fluro-privacy-select v-model=\"model.privacy\"/>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                    <!-- </slot> -->\n                </tab>\n                <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <!-- <div > -->\n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <!-- </div> -->\n                                <!-- <div v-if=\"model.data.exif\"> -->\n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <!-- </div> -->\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </template>\n        <!-- <flex-column-body> -->\n        <!-- // <pre>{{model}}</pre> -->\n        <!-- </flex-column-body> -->\n        <!-- <flex-column-body> -->\n        <!-- WOOOT -->\n        <!-- <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Basic Details\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset> -->\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n    },\n    created() {\n        this.$set(this.model, 'assetType', 'upload');\n    },\n    mixins: [FluroContentEditMixin, FluroAssetEditMixin],\n    computed: {\n        hasMeta() {\n            if (!this.model.data) {\n                return;\n            }\n\n            return this.model.data.iptc || this.model.data.exif;\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Defaults to filename if left empty',\n            })\n\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        fullBody() {\n            return this.definition && this.definition.data && this.definition.data.fullBody;\n        },\n        hideBody() {\n            return this.definition && this.definition.data && this.definition.data.hideBody;\n        },\n        titleLabel() {\n            return 'Title';\n        },\n        bodyLabel() {\n            return 'Body';\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.imageCacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    data() {\n        return {\n            imageCacheKey: 0,\n            replace: false,\n            editorOptions: {},\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.media-preview {\n    background: #eee;\n    display: block;\n    min-height: 350px;\n    margin-bottom: 15px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 5px;\n    overflow: hidden;\n\n    .media-preview-wrap {\n        max-width: 750px;\n        margin: auto;\n    }\n}\n</style>\n<style lang=\"scss\" scoped>\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.color-swatch {\n    width:36px;\n    height:36px;\n        border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.color-swatch {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=image.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-7e71bc50";
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
//# sourceMappingURL=image-0aee2878.js.map
