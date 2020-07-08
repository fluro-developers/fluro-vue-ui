
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-82a4d905.js';

//
var script = {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      files: []
    };
  },

  computed: {
    acceptedFileTypes() {
      switch (this.value._type) {
        case 'image':
          return ' image/*';

        case 'video':
          return ' video/*';

        case 'audio':
          return ' audio/*';
      }
    },

    description() {
      if (this.value._id) {
        return `Click to select or drop a new ${this.type} file`;
      } else {
        return `Click or drop to upload a new ${this.type} file`;
      }
    },

    label() {
      if (this.value._id) {
        return `Replace with file`;
      } else {
        return `Select ${this.value._type || ''} File`;
      }
    },

    type() {
      return this.value._type || '';
    }

  },
  methods: {
    removeFile(file) {
      var self = this; //If the file is halfway through uploading

      if (file.cancelToken) {
        //Cancel the file
        file.cancelToken.cancel('Operation canceled by the user.');
      } //////////////////////////////////
      //Remove it from the list


      self.files.splice(self.files.indexOf(file), 1);
      self.$emit('file', null); // self.mapFilesToValues();
    },

    fileSelected(field) {
      console.log('FILE SELECTED', field);
      var self = this;
      var list = field.files;
      if (!list.length) return; /////////////////////////////////////////
      //Update our files list

      var newFiles = _.map(list, function (file) {
        return {
          file,
          data: {},
          name: file.name,
          size: file.size
        };
      }); //Update the files


      self.files = _.chain(self.files.concat(newFiles)).compact().uniqBy(function (file) {
        return file.name;
      }).value(); //Only allow a single file

      self.files = self.files.slice(0, 1);
      self.$emit('file', self.files[0]); //Clear out the files

      self.$refs.file.value = null;

      if (self.value._id) {
        self.upload();
      }
    },

    upload() {
      var self = this;
      var file = this.files[0];

      switch (file.state) {
        case 'complete':
        case 'uploading':
          //Stop here if it's already in uploading or complete
          return;
      } /////////////////////////////////////////////
      //Change the state to uploading


      file.state = 'uploading'; //Create a new form object

      var formData = new FormData();
      var jsonData = {};

      if (self.value && self.value._id) {
        jsonData._id = self.value._id;
      }

      formData.append('json', JSON.stringify(jsonData));
      formData.append('file', file.file, file.name); /////////////////////////////////////////////

      self.$forceUpdate();
      var body = formData;
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total); // do whatever you like with the percentage complete
          // maybe dispatch an action that will update a progress bar or something

          file.progress = percentCompleted;
          file.bytesLoaded = progressEvent.loaded;
          file.bytesTotal = progressEvent.total; ///////////////////////////////////////////////////
          //Update the bytes loaded from all the files in the array

          self.bytesLoaded = _.reduce(self.files, function (set, file) {
            if (file.state == 'complete') {
              set += file.size || file.bytesTotal || 0;
            } else {
              set += file.bytesLoaded || 0;
            }

            return set;
          }, 0); ///////////////////////////////////////////////////

          self.$forceUpdate();
        }
      }; ///////////////////////////////////////////////////

      const CancelToken = self.$fluro.api.CancelToken;
      const source = CancelToken.source();
      config.cancelToken = source.token;
      file.cancelToken = source; //Set headers to undefined content type

      config.headers = {
        'Content-Type': undefined
      }; ///////////////////////////////////////////////////
      // console.log('Uploading to ', self.field.params)

      return this.$fluro.api.post(`/file/upload`, body, config).then(function (res) {
        //console.log('UPLOAD RESPONSE', res);
        file.state = 'complete';
        file.result = res.data;
        file.cancelToken = null;
        self.$emit('input', res.data);
      }).catch(function (err) {
        //console.log('UPLOAD Error', err);
        file.state = 'error';
        file.cancelToken = null;
        self.$fluro.error(err);
      });
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
    "v-input",
    { staticClass: "no-flex", attrs: { label: _vm.label } },
    [
      _vm.files.length
        ? _c(
            "div",
            { staticClass: "file-items" },
            _vm._l(_vm.files, function(file) {
              return _c(
                "div",
                { staticClass: "file-item" },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    [
                      _c("v-flex", { attrs: { grow: "" } }, [
                        _c("strong", [_vm._v(_vm._s(file.name))]),
                        _vm._v(" "),
                        _c("div", { staticClass: "small" }, [
                          file.state == "progress"
                            ? _c("span", [
                                _vm._v(
                                  "Uploaded " + _vm._s(file.progress) + "% of "
                                )
                              ])
                            : _vm._e(),
                          _c("span", { staticClass: "muted" }, [
                            _vm._v(_vm._s(_vm._f("filesize")(file.size)))
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { shrink: "" } },
                        [
                          file.state == "error"
                            ? [
                                _c(
                                  "v-btn",
                                  { attrs: { icon: "" } },
                                  [
                                    _c("fluro-icon", {
                                      attrs: { icon: "exclamation" }
                                    })
                                  ],
                                  1
                                )
                              ]
                            : file.state == "complete"
                            ? [
                                _c("v-hover", {
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function(ref) {
                                          var hover = ref.hover;
                                          return _c(
                                            "v-btn",
                                            {
                                              attrs: { icon: "" },
                                              on: {
                                                click: function($event) {
                                                  return _vm.removeFile(file)
                                                }
                                              }
                                            },
                                            [
                                              hover
                                                ? _c("fluro-icon", {
                                                    attrs: { icon: "times" }
                                                  })
                                                : _c("fluro-icon", {
                                                    attrs: { icon: "check" }
                                                  })
                                            ],
                                            1
                                          )
                                        }
                                      }
                                    ],
                                    null,
                                    true
                                  )
                                })
                              ]
                            : file.state == "uploading"
                            ? [
                                _c("v-hover", {
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function(ref) {
                                          var hover = ref.hover;
                                          return _c(
                                            "v-btn",
                                            {
                                              attrs: { icon: "" },
                                              on: {
                                                click: function($event) {
                                                  return _vm.removeFile(file)
                                                }
                                              }
                                            },
                                            [
                                              !hover
                                                ? _c("v-progress-circular", {
                                                    attrs: {
                                                      value: file.progress
                                                    }
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              hover
                                                ? _c("fluro-icon", {
                                                    attrs: { icon: "times" }
                                                  })
                                                : _vm._e()
                                            ],
                                            1
                                          )
                                        }
                                      }
                                    ],
                                    null,
                                    true
                                  )
                                })
                              ]
                            : [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { icon: "" },
                                    on: {
                                      click: function($event) {
                                        return _vm.removeFile(file)
                                      }
                                    }
                                  },
                                  [
                                    _c("fluro-icon", {
                                      attrs: { icon: "times" }
                                    })
                                  ],
                                  1
                                )
                              ]
                        ],
                        2
                      )
                    ],
                    1
                  )
                ],
                1
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.files.length
        ? _c("label", { staticClass: "file-drop" }, [
            _c("input", {
              ref: "file",
              attrs: { type: "file", accept: _vm.acceptedFileTypes },
              on: {
                change: function($event) {
                  return _vm.fileSelected($event.target)
                }
              }
            }),
            _vm._v("\n        " + _vm._s(_vm.description) + "\n    ")
          ])
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-37ab3c9a_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.file-drop {\n  display: block;\n  position: relative;\n  border: 1px dashed rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.05);\n  padding: 10px;\n  border-radius: 10px;\n  text-align: center;\n  min-height: 60px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.5);\n  margin-bottom: 5px;\n}\n.file-drop:hover, .file-drop:focus, .file-drop:active {\n  background: #fff;\n}\n.file-drop input {\n  display: block;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  opacity: 0;\n  /* invisible but it's there! */\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  cursor: pointer;\n}\n.file-items {\n  margin-bottom: 15px;\n}\n.file-items .file-item {\n  position: relative;\n  padding: 5px 5px 5px 15px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-bottom: none;\n  background: #fff;\n  font-size: 0.9em;\n}\n.file-items .file-item:first-child {\n  border-radius: 5px 5px 0 0;\n}\n.file-items .file-item:last-child {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0 0 5px 5px;\n}\n\n/*# sourceMappingURL=AssetReplaceUpload.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/AssetReplaceUpload.vue","AssetReplaceUpload.vue"],"names":[],"mappings":"AAsQA,GAAA;AAYA;EACA,yCAAA;AChRA;ADmRA;EACA,2CAAA;AChRA;ADmRA;EACA,4CAAA;AChRA;ADmRA;EACA,0CAAA;AChRA;;ADwRA,GAAA;AACA;EACA,cAAA;EACA,kBAAA;EACA,qCAAA;EACA,+BAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,cAAA;EACA,kBAAA;EACA,yBAAA;EACA,kBAAA;ACrRA;ADuRA;EAGA,gBAAA;ACvRA;AD2RA;EACA,cAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,MAAA;EACA,UAAA;EAEA,8BAAA;EACA,WAAA;EACA,YAAA;EAEA,kBAAA;EACA,eAAA;AC3RA;ADgSA;EAEA,mBAAA;AC9RA;ADgSA;EACA,kBAAA;EACA,yBAAA;EACA,oCAAA;EACA,mBAAA;EACA,gBAAA;EACA,gBAAA;AC9RA;ADgSA;EACA,0BAAA;AC9RA;ADiSA;EACA,2CAAA;EACA,0BAAA;AC/RA;;AAEA,iDAAiD","file":"AssetReplaceUpload.vue","sourcesContent":["<template>\n    <v-input class=\"no-flex\" :label=\"label\">\n        <div class=\"file-items\" v-if=\"files.length\">\n            <div class=\"file-item\" v-for=\"file in files\">\n                <v-layout row wrap>\n                    <v-flex grow>\n                        <strong>{{file.name}}</strong>\n                        <div class=\"small\"><span v-if=\"file.state == 'progress'\">Uploaded {{file.progress}}% of </span><span class=\"muted\">{{file.size | filesize}}</span></div>\n                    </v-flex>\n                    <v-flex shrink>\n                        <template v-if=\"file.state == 'error'\">\n                            <v-btn icon>\n                                <fluro-icon icon=\"exclamation\" />\n                            </v-btn>\n                        </template>\n                        <template v-else-if=\"file.state == 'complete'\">\n                            <v-hover>\n                                <v-btn icon @click=\"removeFile(file)\" slot-scope=\"{ hover }\">\n                                    <fluro-icon v-if=\"hover\" icon=\"times\" />\n                                    <fluro-icon v-else icon=\"check\" />\n                                </v-btn>\n                            </v-hover>\n                        </template>\n                        <template v-else-if=\"file.state == 'uploading'\">\n                            <v-hover>\n                                <v-btn icon @click=\"removeFile(file)\" slot-scope=\"{ hover }\">\n                                    <v-progress-circular v-if=\"!hover\" :value=\"file.progress\"></v-progress-circular>\n                                    <fluro-icon v-if=\"hover\" icon=\"times\" />\n                                </v-btn>\n                            </v-hover>\n                        </template>\n                        <template v-else>\n                            <v-btn icon @click=\"removeFile(file)\">\n                                <fluro-icon icon=\"times\" />\n                            </v-btn>\n                        </template>\n                    </v-flex>\n                </v-layout>\n            </div>\n        </div>\n        <!-- <pre>{{files}}</pre> -->\n        <!-- <v-progress-linear class=\"total-progress\" color=\"primary\" v-model=\"progress\"></v-progress-linear> -->\n        <!-- <div class=\"dropbox\" v-show=\"!files.length\"> -->\n        <!-- accept=\"image/*\" -->\n        <label class=\"file-drop\" v-if=\"!files.length\">\n            <input ref=\"file\" type=\"file\" :accept=\"acceptedFileTypes\" @change=\"fileSelected($event.target)\">\n            {{description}}\n        </label>\n    </v-input>\n</template>\n<script>\n\nimport _ from 'lodash';\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n            required: true,\n        }\n    },\n    data() {\n        return {\n            files: [],\n        }\n    },\n    computed: {\n        acceptedFileTypes() {\n            switch(this.value._type) {\n                case 'image':\n                    return ' image/*';\n                break;\n                case 'video':\n                    return ' video/*';\n                break;\n                case 'audio':\n                    return ' audio/*';\n                break;\n                default:\n                break;\n            }\n           \n        },\n        description() {\n            if (this.value._id) {\n                return `Click to select or drop a new ${this.type} file`;\n            } else {\n                return `Click or drop to upload a new ${this.type} file`;\n            }\n        },\n        label() {\n            if (this.value._id) {\n                return `Replace with file`;\n            } else {\n                return `Select ${this.value._type || ''} File`;\n            }\n        },\n        type() {\n            return this.value._type || '';\n        }\n    },\n    methods: {\n        removeFile(file) {\n\n            var self = this;\n\n            //If the file is halfway through uploading\n            if (file.cancelToken) {\n                //Cancel the file\n                file.cancelToken.cancel('Operation canceled by the user.');\n            }\n\n            //////////////////////////////////\n\n            //Remove it from the list\n            self.files.splice(self.files.indexOf(file), 1);\n\n            self.$emit('file', null);\n            // self.mapFilesToValues();\n        },\n        fileSelected(field) {\n            console.log('FILE SELECTED', field);\n            var self = this;\n\n            var list = field.files;\n            if (!list.length) return;\n\n            /////////////////////////////////////////\n\n            //Update our files list\n            var newFiles = _.map(list, function(file) {\n                return {\n                    file,\n                    data: {},\n                    name: file.name,\n                    size: file.size,\n                }\n            })\n\n\n            //Update the files\n            self.files = _.chain(self.files.concat(newFiles))\n                .compact()\n                .uniqBy(function(file) {\n                    return file.name;\n                })\n                .value();\n\n            //Only allow a single file\n            self.files = self.files.slice(0, 1);\n            self.$emit('file', self.files[0]);\n\n            //Clear out the files\n            self.$refs.file.value = null\n\n            if (self.value._id) {\n                self.upload();\n            }\n        },\n        upload() {\n\n            var self = this;\n            var file = this.files[0];\n\n            switch (file.state) {\n                case 'complete':\n                case 'uploading':\n                    //Stop here if it's already in uploading or complete\n                    return;\n                    break;\n                default:\n                    break;\n            }\n\n            /////////////////////////////////////////////\n\n            //Change the state to uploading\n            file.state = 'uploading';\n\n            //Create a new form object\n            var formData = new FormData();\n            var jsonData = {}\n\n            if (self.value && self.value._id) {\n                jsonData._id = self.value._id;\n            }\n\n            formData.append('json', JSON.stringify(jsonData));\n            formData.append('file', file.file, file.name)\n\n            /////////////////////////////////////////////\n\n            self.$forceUpdate();\n\n            var body = formData;\n            var config = {\n                headers: {\n                    'Content-Type': 'multipart/form-data'\n                },\n                onUploadProgress: progressEvent => {\n\n                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);\n                    // do whatever you like with the percentage complete\n                    // maybe dispatch an action that will update a progress bar or something\n                    file.progress = percentCompleted;\n                    file.bytesLoaded = progressEvent.loaded;\n                    file.bytesTotal = progressEvent.total;\n\n                    ///////////////////////////////////////////////////\n\n                    //Update the bytes loaded from all the files in the array\n                    self.bytesLoaded = _.reduce(self.files, function(set, file) {\n                        if (file.state == 'complete') {\n                            set += file.size || file.bytesTotal || 0;\n                        } else {\n                            set += file.bytesLoaded || 0;\n                        }\n                        return set;\n                    }, 0)\n\n                    ///////////////////////////////////////////////////\n\n                    self.$forceUpdate();\n                }\n            };\n\n            ///////////////////////////////////////////////////\n\n            const CancelToken = self.$fluro.api.CancelToken;\n            const source = CancelToken.source();\n            config.cancelToken = source.token;\n            file.cancelToken = source;\n\n            //Set headers to undefined content type\n            config.headers = {\n                'Content-Type': undefined\n            }\n\n            ///////////////////////////////////////////////////\n\n            // console.log('Uploading to ', self.field.params)\n            return this.$fluro.api.post(`/file/upload`, body, config)\n                .then(function(res) {\n                    //console.log('UPLOAD RESPONSE', res);\n                    file.state = 'complete';\n                    file.result = res.data;\n                    file.cancelToken = null;\n                    self.$emit('input', res.data);\n                })\n                .catch(function(err) {\n                    //console.log('UPLOAD Error', err);\n                    file.state = 'error';\n                    file.cancelToken = null;\n                    self.$fluro.error(err);\n                });\n\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.file-drop {\n    display: block;\n    position: relative;\n    border: 1px dashed rgba(#000, 0.2);\n    background: rgba(#000, 0.05);\n    padding: 10px;\n    border-radius: 10px;\n    text-align: center;\n    min-height: 60px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.8;\n    font-style: italic;\n    color: rgba(#000, 0.5);\n    margin-bottom: 5px;\n\n    &:hover,\n    &:focus,\n    &:active {\n        background: #fff;\n    }\n\n\n    input {\n        display: block;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        top: 0;\n        opacity: 0; //.8; //.5;\n        // background: #000;\n        /* invisible but it's there! */\n        width: 100%;\n        height: 100%;\n        // height: 200px;\n        position: absolute;\n        cursor: pointer;\n    }\n\n}\n\n.file-items {\n\n    margin-bottom: 15px;\n\n    .file-item {\n        position: relative;\n        padding: 5px 5px 5px 15px;\n        border: 1px solid rgba(#000, 0.2);\n        border-bottom: none;\n        background: #fff;\n        font-size: 0.9em;\n\n        &:first-child {\n            border-radius: 5px 5px 0 0;\n        }\n\n        &:last-child {\n            border-bottom: 1px solid rgba(#000, 0.2);\n            border-radius: 0 0 5px 5px;\n        }\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.file-drop {\n  display: block;\n  position: relative;\n  border: 1px dashed rgba(0, 0, 0, 0.2);\n  background: rgba(0, 0, 0, 0.05);\n  padding: 10px;\n  border-radius: 10px;\n  text-align: center;\n  min-height: 60px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.5);\n  margin-bottom: 5px;\n}\n.file-drop:hover, .file-drop:focus, .file-drop:active {\n  background: #fff;\n}\n.file-drop input {\n  display: block;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  opacity: 0;\n  /* invisible but it's there! */\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  cursor: pointer;\n}\n\n.file-items {\n  margin-bottom: 15px;\n}\n.file-items .file-item {\n  position: relative;\n  padding: 5px 5px 5px 15px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-bottom: none;\n  background: #fff;\n  font-size: 0.9em;\n}\n.file-items .file-item:first-child {\n  border-radius: 5px 5px 0 0;\n}\n.file-items .file-item:last-child {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0 0 5px 5px;\n}\n\n/*# sourceMappingURL=AssetReplaceUpload.vue.map */"]}, media: undefined });

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

var FluroAssetEditMixin = {
  data() {
    return {
      file: null
    };
  },

  methods: {
    fileSelected(file) {
      var self = this;
      console.log('file selected inside asset form!');
      self.file = file;
      self.$emit('file', file);
    }

  },
  components: {
    AssetReplaceUpload: __vue_component__
  },
  computed: {
    uploadSave() {
      return !this.itemID && this.item.assetType == 'upload';
    }

  }
};

export { FluroAssetEditMixin as F };
//# sourceMappingURL=FluroAssetEditMixin-a6c71df6.js.map
