
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aJ as FluroCodeEditor, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-021bc097.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-6e2fc398.js';
import { F as FluroAssetEditMixin } from './FluroAssetEditMixin-f71526ce.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor,
    FluroCodeEditor
  },

  created() {
    var self = this;

    if (!self.model) {
      self.$set(self, 'model', {
        external: {
          'youtube': undefined,
          'vimeo': undefined,
          'embed': undefined
        }
      });
    } else {
      if (!self.model.external) {
        self.$set(self.model, 'external', {
          'youtube': undefined,
          'vimeo': undefined,
          'embed': undefined
        });
      }
    }
  },

  mixins: [FluroContentEditMixin, FluroAssetEditMixin],
  computed: {
    showVideo() {
      var self = this;

      switch (self.assetType) {
        case 'vimeo':
        case 'youtube':
        case 'embed':
          return !!self.model.external[self.assetType];

        case 'upload':
          return !!self.model._id;
      }
    },

    externalFields() {
      var self = this;
      var array = [];
      array.push({
        title: 'Youtube URL',
        key: 'youtube',
        type: 'string',
        minimum: 1,
        maximum: 1,
        expressions: {
          hide() {
            return self.assetType != 'youtube';
          }

        }
      });
      array.push({
        title: 'Vimeo URL',
        key: 'vimeo',
        type: 'string',
        minimum: 1,
        maximum: 1,
        expressions: {
          hide() {
            return self.assetType != 'vimeo';
          }

        }
      });
      array.push({
        title: 'Embed Code',
        key: 'embed',
        type: 'string',
        directive: 'code',
        params: {
          syntax: 'html'
        },
        minimum: 0,
        maximum: 1,
        expressions: {
          hide() {
            return self.assetType != 'embed';
          }

        }
      });
      return array;
    },

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
      addField('poster', {
        title: 'Poster / Thumbnail Image',
        description: 'Customise the poster image for this video',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'image',
          allDefinitions: true
        }
      });
      addField('assetType', {
        title: 'Asset Type',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'YouTube',
          value: 'youtube'
        }, {
          name: 'Vimeo',
          value: 'vimeo'
        }, {
          name: 'Amazon S3',
          value: 's3'
        }, {
          name: 'Embed',
          value: 'embed'
        }, {
          name: 'Upload / Hosted',
          value: 'upload'
        }] // params: {
        //     restrictType: 'ticket',
        // },

      });
      addField('youtube', {
        title: 'YouTube URL',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('vimeo', {
        title: 'Vimeo URL',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('embed', {
        title: 'Video Embed Code',
        description: 'Paste your video embed code above',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'code'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    assetType() {
      var self = this;

      var assetType = _.get(self.model, 'assetType');

      return assetType;
    },

    soundCloudURL() {
      var self = this;
      return _.get(self.model, 'external.soundcloud');
    },

    youtubeURL() {
      var self = this;

      var url = _.get(self.model, 'external.youtube');

      if (!url) {
        return 'hey';
      }

      url = url.split('?');
      var query = url[url.length - 1];
      console.log(url, query);
      return 'hello';
    }

  },
  methods: {
    assetReplaced(model) {
      this.cacheKey = Math.random();
      this.replace = false;
    }

  },
  methods: {
    assetReplaced(model) {
      this.videoCacheKey = Math.random();
      this.replace = false;
    }

  },

  data() {
    return {
      videoCacheKey: 0,
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
                                !_vm.model._id || _vm.assetType != "upload"
                                  ? [
                                      _c("fluro-content-form-field", {
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
                                    ]
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.assetType == "upload"
                                  ? [
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
                                                      callback: function($$v) {
                                                        _vm.model = $$v;
                                                      },
                                                      expression: "model"
                                                    }
                                                  })
                                                ]
                                              : [
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
                                                                "\n                                                    Replace with a new file\n                                                    "
                                                              ),
                                                              _c("fluro-icon", {
                                                                attrs: {
                                                                  right: "",
                                                                  library:
                                                                    "fas",
                                                                  icon:
                                                                    "cloud-upload"
                                                                }
                                                              })
                                                            ],
                                                            1
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ]
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
                                    ]
                                  : [
                                      _c("fluro-content-form", {
                                        attrs: { fields: _vm.externalFields },
                                        model: {
                                          value: _vm.model.external,
                                          callback: function($$v) {
                                            _vm.$set(_vm.model, "external", $$v);
                                          },
                                          expression: "model.external"
                                        }
                                      })
                                    ],
                                _vm._v(" "),
                                _vm.showVideo
                                  ? _c(
                                      "v-container",
                                      { attrs: { "px-0": "", "pt-0": "" } },
                                      [
                                        _c("fluro-video", {
                                          attrs: {
                                            cacheKey: _vm.videoCacheKey,
                                            item: _vm.model
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.poster
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
                )
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
    inject("data-v-4122a2c2_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.media-preview {\n  background: #eee;\n  display: block;\n  min-height: 350px;\n  margin-bottom: 15px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.media-preview .media-preview-wrap {\n  max-width: 750px;\n  margin: auto;\n}\n\n/*# sourceMappingURL=video.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/video.vue","video.vue"],"names":[],"mappings":"AAwWA,GAAA;AAYA;EACA,yCAAA;AClXA;ADqXA;EACA,2CAAA;AClXA;ADqXA;EACA,4CAAA;AClXA;ADqXA;EACA,0CAAA;AClXA;;AD0XA,GAAA;AACA;EACA,gBAAA;EACA,cAAA;EACA,iBAAA;EACA,mBAAA;EACA,oCAAA;EACA,kBAAA;EACA,gBAAA;ACvXA;ADyXA;EACA,gBAAA;EACA,YAAA;ACvXA;;AAEA,oCAAoC","file":"video.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <tab heading=\"Details\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <template v-if=\"!model._id || assetType != 'upload'\">\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assetType\" v-model=\"model\"></fluro-content-form-field>\n                                </template>\n                                <template v-if=\"assetType == 'upload'\">\n                                    <!-- If we already exist -->\n                                    <template v-if=\"model._id\">\n                                        <template v-if=\"replace\">\n                                            <asset-replace-upload v-model=\"model\" @input=\"assetReplaced\" />\n                                        </template>\n                                        <template v-else>\n                                            <v-input :label=\"model.filename\" class=\"no-flex\">\n                                                <div>\n                                                    <v-btn class=\"ma-0\" @click=\"replace = true\">\n                                                        Replace with a new file\n                                                        <fluro-icon right library=\"fas\" icon=\"cloud-upload\" />\n                                                    </v-btn>\n                                                </div>\n                                            </v-input>\n                                        </template>\n                                    </template>\n                                    <template v-else>\n                                        <asset-replace-upload v-model=\"model\" @file=\"fileSelected\" />\n                                    </template>\n                                </template>\n                                <template v-else>\n                                    <fluro-content-form v-model=\"model.external\" :fields=\"externalFields\">\n                                        <!-- <template v-slot:form=\"{formFields, fieldHash, model, update, options}\"> -->\n                                        <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.youtube\" v-model=\"model\"/> -->\n                                        <!-- </template> -->\n                                    </fluro-content-form>\n                                </template>\n                                <v-container px-0 pt-0 v-if=\"showVideo\">\n                                    <fluro-video :cacheKey=\"videoCacheKey\" :item=\"model\" />\n                                </v-container>\n\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.poster\" v-model=\"model\"></fluro-content-form-field>\n                                <template v-if=\"!hideBody && !fullBody\">\n                                    <v-input label=\"Body / Caption\" class=\"no-flex\">\n                                        <fluro-editor v-model=\"model.body\" :options=\"editorOptions\" placeholder=\"Type your text in here\"></fluro-editor>\n                                    </v-input>\n                                </template>\n\n\n                                <template v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </template>\n                                <fluro-privacy-select v-model=\"model.privacy\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <!-- <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n                <!-- <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                               \n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                               \n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroCodeEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n        FluroCodeEditor,\n    },\n    created() {\n        var self = this;\n        if (!self.model) {\n            self.$set(self, 'model', {\n                external: {\n                    'youtube': undefined,\n                    'vimeo': undefined,\n                    'embed': undefined,\n                }\n            });\n        } else {\n            if (!self.model.external) {\n                self.$set(self.model, 'external', {\n                    'youtube': undefined,\n                    'vimeo': undefined,\n                    'embed': undefined,\n                });\n            }\n        }\n    },\n    mixins: [FluroContentEditMixin, FluroAssetEditMixin],\n    computed: {\n        showVideo() {\n            var self = this;\n            switch (self.assetType) {\n                case 'vimeo':\n                case 'youtube':\n                case 'embed':\n                    return !!self.model.external[self.assetType];\n                    break;\n                case 'upload':\n                    return !!self.model._id;\n                    break;\n\n            }\n        },\n        externalFields() {\n            var self = this;\n            var array = [];\n\n            array.push({\n                title: 'Youtube URL',\n                key: 'youtube',\n                type: 'string',\n                minimum: 1,\n                maximum: 1,\n                expressions: {\n                    hide() {\n                        return self.assetType != 'youtube';\n                    }\n                }\n            })\n\n\n            array.push({\n                title: 'Vimeo URL',\n                key: 'vimeo',\n                type: 'string',\n                minimum: 1,\n                maximum: 1,\n                expressions: {\n                    hide() {\n                        return self.assetType != 'vimeo';\n                    }\n                }\n            })\n\n            array.push({\n                title: 'Embed Code',\n                key: 'embed',\n                type: 'string',\n                directive: 'code',\n                params: {\n                    syntax: 'html',\n                },\n                minimum: 0,\n                maximum: 1,\n                expressions: {\n                    hide() {\n                        return self.assetType != 'embed';\n                    }\n                }\n            })\n\n            return array;\n\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('firstLine', {\n                title: 'Short Description',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Optional short description describing the collection',\n            });\n\n\n            addField('poster', {\n                title: 'Poster / Thumbnail Image',\n                description:'Customise the poster image for this video',\n                minimum: 0,\n                maximum: 1,\n                type: 'reference',\n                params:{\n                    restrictType:'image',\n                    allDefinitions:true,\n                }\n            });\n\n            addField('assetType', {\n                title: 'Asset Type',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                options: [{\n                        name: 'YouTube',\n                        value: 'youtube',\n                    },\n                    {\n                        name: 'Vimeo',\n                        value: 'vimeo',\n                    },\n                    {\n                        name: 'Amazon S3',\n                        value: 's3',\n                    },\n                    {\n                        name: 'Embed',\n                        value: 'embed',\n                    },\n                    {\n                        name: 'Upload / Hosted',\n                        value: 'upload',\n                    },\n                ]\n                // params: {\n                //     restrictType: 'ticket',\n                // },\n            })\n\n\n            addField('youtube', {\n                title: 'YouTube URL',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('vimeo', {\n                title: 'Vimeo URL',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('embed', {\n                title: 'Video Embed Code',\n                description: 'Paste your video embed code above',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'code',\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        assetType() {\n            var self = this;\n            var assetType = _.get(self.model, 'assetType');\n            return assetType;\n        },\n        soundCloudURL() {\n            var self = this;\n            return _.get(self.model, 'external.soundcloud');\n        },\n        youtubeURL() {\n            var self = this;\n            var url = _.get(self.model, 'external.youtube');\n            if (!url) {\n                return 'hey';\n            }\n            url = url.split('?');\n            var query = url[url.length - 1];\n            console.log(url, query);\n            return 'hello';\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.cacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.videoCacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    data() {\n        return {\n            videoCacheKey: 0,\n            replace: false,\n            editorOptions: {},\n        }\n    },\n\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.media-preview {\n    background: #eee;\n    display: block;\n    min-height: 350px;\n    margin-bottom: 15px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 5px;\n    overflow: hidden;\n\n    .media-preview-wrap {\n        max-width: 750px;\n        margin: auto;\n    }\n}\n</style>\n<style lang=\"scss\" scoped>\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.color-swatch {\n    width: 36px;\n    height: 36px;\n    border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.media-preview {\n  background: #eee;\n  display: block;\n  min-height: 350px;\n  margin-bottom: 15px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.media-preview .media-preview-wrap {\n  max-width: 750px;\n  margin: auto;\n}\n\n/*# sourceMappingURL=video.vue.map */"]}, media: undefined })
,inject("data-v-4122a2c2_1", { source: "/**/\n.border-top[data-v-4122a2c2] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-4122a2c2] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-4122a2c2] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-4122a2c2] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.color-swatch[data-v-4122a2c2] {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=video.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/video.vue","video.vue"],"names":[],"mappings":"AA2ZA,GAAA;AAYA;EACA,yCAAA;ACraA;ADwaA;EACA,2CAAA;ACraA;ADwaA;EACA,4CAAA;ACraA;ADwaA;EACA,0CAAA;ACraA;;AD6aA,GAAA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;AC1aA;;AAEA,oCAAoC","file":"video.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <tab heading=\"Details\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <template v-if=\"!model._id || assetType != 'upload'\">\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assetType\" v-model=\"model\"></fluro-content-form-field>\n                                </template>\n                                <template v-if=\"assetType == 'upload'\">\n                                    <!-- If we already exist -->\n                                    <template v-if=\"model._id\">\n                                        <template v-if=\"replace\">\n                                            <asset-replace-upload v-model=\"model\" @input=\"assetReplaced\" />\n                                        </template>\n                                        <template v-else>\n                                            <v-input :label=\"model.filename\" class=\"no-flex\">\n                                                <div>\n                                                    <v-btn class=\"ma-0\" @click=\"replace = true\">\n                                                        Replace with a new file\n                                                        <fluro-icon right library=\"fas\" icon=\"cloud-upload\" />\n                                                    </v-btn>\n                                                </div>\n                                            </v-input>\n                                        </template>\n                                    </template>\n                                    <template v-else>\n                                        <asset-replace-upload v-model=\"model\" @file=\"fileSelected\" />\n                                    </template>\n                                </template>\n                                <template v-else>\n                                    <fluro-content-form v-model=\"model.external\" :fields=\"externalFields\">\n                                        <!-- <template v-slot:form=\"{formFields, fieldHash, model, update, options}\"> -->\n                                        <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.youtube\" v-model=\"model\"/> -->\n                                        <!-- </template> -->\n                                    </fluro-content-form>\n                                </template>\n                                <v-container px-0 pt-0 v-if=\"showVideo\">\n                                    <fluro-video :cacheKey=\"videoCacheKey\" :item=\"model\" />\n                                </v-container>\n\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.poster\" v-model=\"model\"></fluro-content-form-field>\n                                <template v-if=\"!hideBody && !fullBody\">\n                                    <v-input label=\"Body / Caption\" class=\"no-flex\">\n                                        <fluro-editor v-model=\"model.body\" :options=\"editorOptions\" placeholder=\"Type your text in here\"></fluro-editor>\n                                    </v-input>\n                                </template>\n\n\n                                <template v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </template>\n                                <fluro-privacy-select v-model=\"model.privacy\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <!-- <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n                <!-- <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                               \n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                               \n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroCodeEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n        FluroCodeEditor,\n    },\n    created() {\n        var self = this;\n        if (!self.model) {\n            self.$set(self, 'model', {\n                external: {\n                    'youtube': undefined,\n                    'vimeo': undefined,\n                    'embed': undefined,\n                }\n            });\n        } else {\n            if (!self.model.external) {\n                self.$set(self.model, 'external', {\n                    'youtube': undefined,\n                    'vimeo': undefined,\n                    'embed': undefined,\n                });\n            }\n        }\n    },\n    mixins: [FluroContentEditMixin, FluroAssetEditMixin],\n    computed: {\n        showVideo() {\n            var self = this;\n            switch (self.assetType) {\n                case 'vimeo':\n                case 'youtube':\n                case 'embed':\n                    return !!self.model.external[self.assetType];\n                    break;\n                case 'upload':\n                    return !!self.model._id;\n                    break;\n\n            }\n        },\n        externalFields() {\n            var self = this;\n            var array = [];\n\n            array.push({\n                title: 'Youtube URL',\n                key: 'youtube',\n                type: 'string',\n                minimum: 1,\n                maximum: 1,\n                expressions: {\n                    hide() {\n                        return self.assetType != 'youtube';\n                    }\n                }\n            })\n\n\n            array.push({\n                title: 'Vimeo URL',\n                key: 'vimeo',\n                type: 'string',\n                minimum: 1,\n                maximum: 1,\n                expressions: {\n                    hide() {\n                        return self.assetType != 'vimeo';\n                    }\n                }\n            })\n\n            array.push({\n                title: 'Embed Code',\n                key: 'embed',\n                type: 'string',\n                directive: 'code',\n                params: {\n                    syntax: 'html',\n                },\n                minimum: 0,\n                maximum: 1,\n                expressions: {\n                    hide() {\n                        return self.assetType != 'embed';\n                    }\n                }\n            })\n\n            return array;\n\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('firstLine', {\n                title: 'Short Description',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Optional short description describing the collection',\n            });\n\n\n            addField('poster', {\n                title: 'Poster / Thumbnail Image',\n                description:'Customise the poster image for this video',\n                minimum: 0,\n                maximum: 1,\n                type: 'reference',\n                params:{\n                    restrictType:'image',\n                    allDefinitions:true,\n                }\n            });\n\n            addField('assetType', {\n                title: 'Asset Type',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                options: [{\n                        name: 'YouTube',\n                        value: 'youtube',\n                    },\n                    {\n                        name: 'Vimeo',\n                        value: 'vimeo',\n                    },\n                    {\n                        name: 'Amazon S3',\n                        value: 's3',\n                    },\n                    {\n                        name: 'Embed',\n                        value: 'embed',\n                    },\n                    {\n                        name: 'Upload / Hosted',\n                        value: 'upload',\n                    },\n                ]\n                // params: {\n                //     restrictType: 'ticket',\n                // },\n            })\n\n\n            addField('youtube', {\n                title: 'YouTube URL',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('vimeo', {\n                title: 'Vimeo URL',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('embed', {\n                title: 'Video Embed Code',\n                description: 'Paste your video embed code above',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'code',\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        assetType() {\n            var self = this;\n            var assetType = _.get(self.model, 'assetType');\n            return assetType;\n        },\n        soundCloudURL() {\n            var self = this;\n            return _.get(self.model, 'external.soundcloud');\n        },\n        youtubeURL() {\n            var self = this;\n            var url = _.get(self.model, 'external.youtube');\n            if (!url) {\n                return 'hey';\n            }\n            url = url.split('?');\n            var query = url[url.length - 1];\n            console.log(url, query);\n            return 'hello';\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.cacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.videoCacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    data() {\n        return {\n            videoCacheKey: 0,\n            replace: false,\n            editorOptions: {},\n        }\n    },\n\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.media-preview {\n    background: #eee;\n    display: block;\n    min-height: 350px;\n    margin-bottom: 15px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 5px;\n    overflow: hidden;\n\n    .media-preview-wrap {\n        max-width: 750px;\n        margin: auto;\n    }\n}\n</style>\n<style lang=\"scss\" scoped>\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.color-swatch {\n    width: 36px;\n    height: 36px;\n    border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.color-swatch {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=video.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-4122a2c2";
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
//# sourceMappingURL=video-e6147592.js.map
