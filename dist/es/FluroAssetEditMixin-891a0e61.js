import { bh as _, bf as styleInject, bg as __vue_normalize__ } from './index-7b32a04b.js';

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

var css_248z = ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.file-drop{display:block;position:relative;border:1px dashed rgba(0,0,0,.2);background:rgba(0,0,0,.05);padding:10px;border-radius:10px;text-align:center;min-height:60px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:.8;font-style:italic;color:rgba(0,0,0,.5);margin-bottom:5px}.file-drop:active,.file-drop:focus,.file-drop:hover{background:#fff}.file-drop input{display:block;left:0;right:0;bottom:0;top:0;opacity:0;width:100%;height:100%;position:absolute;cursor:pointer}.file-items{margin-bottom:15px}.file-items .file-item{position:relative;padding:5px 5px 5px 15px;border:1px solid rgba(0,0,0,.2);border-bottom:none;background:#fff;font-size:.9em}.file-items .file-item:first-child{border-radius:5px 5px 0 0}.file-items .file-item:last-child{border-bottom:1px solid rgba(0,0,0,.2);border-radius:0 0 5px 5px}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-input',{staticClass:"no-flex",attrs:{"label":_vm.label}},[(_vm.files.length)?_c('div',{staticClass:"file-items"},_vm._l((_vm.files),function(file){return _c('div',{staticClass:"file-item"},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"grow":""}},[_c('strong',[_vm._v(_vm._s(file.name))]),_vm._v(" "),_c('div',{staticClass:"small"},[(file.state == 'progress')?_c('span',[_vm._v("Uploaded "+_vm._s(file.progress)+"% of ")]):_vm._e(),_c('span',{staticClass:"muted"},[_vm._v(_vm._s(_vm._f("filesize")(file.size)))])])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[(file.state == 'error')?[_c('v-btn',{attrs:{"icon":""}},[_c('fluro-icon',{attrs:{"icon":"exclamation"}})],1)]:(file.state == 'complete')?[_c('v-hover',{scopedSlots:_vm._u([{key:"default",fn:function(ref){
var hover = ref.hover;
return _c('v-btn',{attrs:{"icon":""},on:{"click":function($event){return _vm.removeFile(file)}}},[(hover)?_c('fluro-icon',{attrs:{"icon":"times"}}):_c('fluro-icon',{attrs:{"icon":"check"}})],1)}}],null,true)})]:(file.state == 'uploading')?[_c('v-hover',{scopedSlots:_vm._u([{key:"default",fn:function(ref){
var hover = ref.hover;
return _c('v-btn',{attrs:{"icon":""},on:{"click":function($event){return _vm.removeFile(file)}}},[(!hover)?_c('v-progress-circular',{attrs:{"value":file.progress}}):_vm._e(),_vm._v(" "),(hover)?_c('fluro-icon',{attrs:{"icon":"times"}}):_vm._e()],1)}}],null,true)})]:[_c('v-btn',{attrs:{"icon":""},on:{"click":function($event){return _vm.removeFile(file)}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)]],2)],1)],1)}),0):_vm._e(),_vm._v(" "),(!_vm.files.length)?_c('label',{staticClass:"file-drop"},[_c('input',{ref:"file",attrs:{"type":"file","accept":_vm.acceptedFileTypes},on:{"change":function($event){return _vm.fileSelected($event.target)}}}),_vm._v("\n        "+_vm._s(_vm.description)+"\n    ")]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
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
//# sourceMappingURL=FluroAssetEditMixin-891a0e61.js.map
