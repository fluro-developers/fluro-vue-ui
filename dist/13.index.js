(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1050:function(e,t,i){"use strict";var o=i(898);i.n(o).a},1051:function(e,t,i){(e.exports=i(4)(!1)).push([e.i,".media-preview{background:#eee;display:block;min-height:350px;margin-bottom:15px;border:1px solid rgba(0,0,0,0.1);border-radius:5px;overflow:hidden}.media-preview .media-preview-wrap{max-width:750px;margin:auto}\n",""])},1052:function(e,t,i){"use strict";var o=i(899);i.n(o).a},1053:function(e,t,i){(e.exports=i(4)(!1)).push([e.i,".color-swatch[data-v-2419776c]{width:36px;height:36px;border-radius:3px;margin:0 1px 1px 0;display:inline-block}\n",""])},792:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("flex-column",[e.loading?[i("fluro-page-preloader",{attrs:{contain:""}})]:[i("tabset",{attrs:{justified:!0,vertical:!0}},[i("tab",{attrs:{heading:"Details"}},[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",{attrs:{fluid:""}},[i("constrain",{attrs:{sm:""}},[i("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.title},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),e.model._id&&"upload"==e.assetType?e._e():[i("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.assetType},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],e._v(" "),"upload"==e.assetType?[e.model._id?[e.replace?[i("asset-replace-upload",{on:{input:e.assetReplaced},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})]:[i("v-input",{staticClass:"no-flex",attrs:{label:e.model.filename}},[i("div",[i("v-btn",{staticClass:"ma-0",on:{click:function(t){e.replace=!0}}},[e._v("\n                                                    Replace with a new file\n                                                    "),i("fluro-icon",{attrs:{right:"",library:"fas",icon:"cloud-upload"}})],1)],1)])]]:[i("asset-replace-upload",{on:{file:e.fileSelected},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})]]:[i("fluro-content-form",{attrs:{fields:e.externalFields},model:{value:e.model.external,callback:function(t){e.$set(e.model,"external",t)},expression:"model.external"}})],e._v(" "),e.showVideo?i("v-container",{attrs:{"px-0":"","pt-0":""}},[i("fluro-video",{attrs:{cacheKey:e.videoCacheKey,item:e.model}})],1):e._e(),e._v(" "),e.hideBody||e.fullBody?e._e():[i("v-input",{staticClass:"no-flex",attrs:{label:"Body / Caption"}},[i("fluro-editor",{attrs:{options:e.editorOptions,placeholder:"Type your text in here"},model:{value:e.model.body,callback:function(t){e.$set(e.model,"body",t)},expression:"model.body"}})],1)],e._v(" "),e.definition&&e.definition.fields&&e.definition.fields.length?[i("fluro-content-form",{attrs:{options:e.options,fields:e.definition.fields},model:{value:e.model.data,callback:function(t){e.$set(e.model,"data",t)},expression:"model.data"}})]:e._e(),e._v(" "),i("fluro-privacy-select",{model:{value:e.model.privacy,callback:function(t){e.$set(e.model,"privacy",t)},expression:"model.privacy"}})],2)],1)],1)],1)],1)]],2)};o._withStripped=!0;var n,l=i(9),a=(i(16),i(149)),s=i(806),r=i(818),d=(i(25),n={components:{FluroEditor:a.default,FluroCodeEditor:a.default},created:function(){this.model?this.model.external||this.$set(this.model,"external",{youtube:void 0,vimeo:void 0,embed:void 0}):this.$set(this,"model",{external:{youtube:void 0,vimeo:void 0,embed:void 0}})},mixins:[s.a,r.a],computed:{showVideo:function(){switch(this.assetType){case"vimeo":case"youtube":case"embed":return!!this.model.external[this.assetType];case"upload":return!!this.model._id}},externalFields:function(){var e=this,t=[];return t.push({title:"Youtube URL",key:"youtube",type:"string",minimum:1,maximum:1,expressions:{hide:function(){return"youtube"!=e.assetType}}}),t.push({title:"Vimeo URL",key:"vimeo",type:"string",minimum:1,maximum:1,expressions:{hide:function(){return"vimeo"!=e.assetType}}}),t.push({title:"Embed Code",key:"embed",type:"string",directive:"code",params:{syntax:"html"},minimum:0,maximum:1,expressions:{hide:function(){return"embed"!=e.assetType}}}),t},fieldsOutput:function(){var e=[];function t(t,i){i.key=t,e.push(i)}return(t("title",{title:"Title",minimum:1,maximum:1,type:"string"}),t("firstLine",{title:"Short Description",minimum:0,maximum:1,type:"string",placeholder:"Optional short description describing the collection"}),t("assetType",{title:"Asset Type",minimum:1,maximum:1,type:"string",directive:"select",options:[{name:"YouTube",value:"youtube"},{name:"Vimeo",value:"vimeo"},{name:"Amazon S3",value:"s3"},{name:"Embed",value:"embed"},{name:"Upload / Hosted",value:"upload"}]}),t("youtube",{title:"YouTube URL",minimum:0,maximum:1,type:"string"}),t("vimeo",{title:"Vimeo URL",minimum:0,maximum:1,type:"string"}),t("embed",{title:"Video Embed Code",description:"Paste your video embed code above",minimum:0,maximum:1,type:"string",directive:"code"}),e)},assetType:function(){var e=_.get(this.model,"assetType");return e},soundCloudURL:function(){return _.get(this.model,"external.soundcloud")},youtubeURL:function(){var e=_.get(this.model,"external.youtube");if(!e)return"hey";var t=(e=e.split("?"))[e.length-1];return console.log(e,t),"hello"}},methods:{assetReplaced:function(e){this.cacheKey=Math.random(),this.replace=!1}}},Object(l.a)(n,"methods",{assetReplaced:function(e){this.videoCacheKey=Math.random(),this.replace=!1}}),Object(l.a)(n,"data",(function(){return{videoCacheKey:0,replace:!1,editorOptions:{}}})),n),u=(i(1050),i(1052),i(0)),c=Object(u.a)(d,o,[],!1,null,"2419776c",null);c.options.__file="src/components/content/edit/panels/video.vue";t.default=c.exports},806:function(e,t,i){"use strict";var o=i(40);t.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:o.default,components:{FluroContentForm:o.default,FluroContentFormField:function(){return Promise.resolve().then(i.bind(null,60))},FluroPrivacySelect:function(){return i.e(55).then(i.bind(null,807))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},809:function(e,t,i){var o=i(814);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,i(5).default)("3d095c3c",o,!1,{})},813:function(e,t,i){"use strict";var o=i(809);i.n(o).a},814:function(e,t,i){(e.exports=i(4)(!1)).push([e.i,".file-drop{display:block;position:relative;border:1px dashed rgba(0,0,0,0.2);background:rgba(0,0,0,0.05);padding:10px;border-radius:10px;text-align:center;min-height:60px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.8;font-style:italic;color:rgba(0,0,0,0.5);margin-bottom:5px}.file-drop:hover,.file-drop:focus,.file-drop:active{background:#fff}.file-drop input{display:block;left:0;right:0;bottom:0;top:0;opacity:0;width:100%;height:100%;position:absolute;cursor:pointer}.file-items{margin-bottom:15px}.file-items .file-item{position:relative;padding:5px 5px 5px 15px;border:1px solid rgba(0,0,0,0.2);border-bottom:none;background:#fff;font-size:0.9em}.file-items .file-item:first-child{border-radius:5px 5px 0 0}.file-items .file-item:last-child{border-bottom:1px solid rgba(0,0,0,0.2);border-radius:0 0 5px 5px}\n",""])},818:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-input",{staticClass:"no-flex",attrs:{label:e.label}},[e.files.length?i("div",{staticClass:"file-items"},e._l(e.files,(function(t){return i("div",{staticClass:"file-item"},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{grow:""}},[i("strong",[e._v(e._s(t.name))]),e._v(" "),i("div",{staticClass:"small"},["progress"==t.state?i("span",[e._v("Uploaded "+e._s(t.progress)+"% of ")]):e._e(),i("span",{staticClass:"muted"},[e._v(e._s(e._f("filesize")(t.size)))])])]),e._v(" "),i("v-flex",{attrs:{shrink:""}},["error"==t.state?[i("v-btn",{attrs:{icon:""}},[i("fluro-icon",{attrs:{icon:"exclamation"}})],1)]:"complete"==t.state?[i("v-hover",{scopedSlots:e._u([{key:"default",fn:function(o){var n=o.hover;return i("v-btn",{attrs:{icon:""},on:{click:function(i){return e.removeFile(t)}}},[i("fluro-icon",n?{attrs:{icon:"times"}}:{attrs:{icon:"check"}})],1)}}],null,!0)})]:"uploading"==t.state?[i("v-hover",{scopedSlots:e._u([{key:"default",fn:function(o){var n=o.hover;return i("v-btn",{attrs:{icon:""},on:{click:function(i){return e.removeFile(t)}}},[n?e._e():i("v-progress-circular",{attrs:{value:t.progress}}),e._v(" "),n?i("fluro-icon",{attrs:{icon:"times"}}):e._e()],1)}}],null,!0)})]:[i("v-btn",{attrs:{icon:""},on:{click:function(i){return e.removeFile(t)}}},[i("fluro-icon",{attrs:{icon:"times"}})],1)]],2)],1)],1)})),0):e._e(),e._v(" "),e.files.length?e._e():i("label",{staticClass:"file-drop"},[i("input",{ref:"file",attrs:{type:"file",accept:e.acceptedFileTypes},on:{change:function(t){return e.fileSelected(t.target)}}}),e._v("\n        "+e._s(e.description)+"\n    ")])])};o._withStripped=!0;i(31),i(15),i(13),i(27);var n={props:{value:{type:Object,required:!0}},data:function(){return{files:[]}},computed:{acceptedFileTypes:function(){switch(this.value._type){case"image":return" image/*";case"video":return" video/*";case"audio":return" audio/*"}},description:function(){return this.value._id?"Click to select or drop a new ".concat(this.type," file"):"Click or drop to upload a new ".concat(this.type," file")},label:function(){return this.value._id?"Replace with file":"Select ".concat(this.value._type||""," File")},type:function(){return this.value._type||""}},methods:{removeFile:function(e){e.cancelToken&&e.cancelToken.cancel("Operation canceled by the user."),this.files.splice(this.files.indexOf(e),1),this.$emit("file",null)},fileSelected:function(e){console.log("FILE SELECTED",e);var t=e.files;if(t.length){var i=_.map(t,(function(e){return{file:e,data:{},name:e.name,size:e.size}}));this.files=_.chain(this.files.concat(i)).compact().uniqBy((function(e){return e.name})).value(),this.files=this.files.slice(0,1),this.$emit("file",this.files[0]),this.$refs.file.value=null,this.value._id&&this.upload()}},upload:function(){var e=this,t=this.files[0];switch(t.state){case"complete":case"uploading":return}t.state="uploading";var i=new FormData,o={};e.value&&e.value._id&&(o._id=e.value._id),i.append("json",JSON.stringify(o)),i.append("file",t.file,t.name),e.$forceUpdate();var n=i,l={headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(i){var o=Math.floor(100*i.loaded/i.total);t.progress=o,t.bytesLoaded=i.loaded,t.bytesTotal=i.total,e.bytesLoaded=_.reduce(e.files,(function(e,t){return"complete"==t.state?e+=t.size||t.bytesTotal||0:e+=t.bytesLoaded||0,e}),0),e.$forceUpdate()}},a=e.$fluro.api.CancelToken.source();return l.cancelToken=a.token,t.cancelToken=a,l.headers={"Content-Type":void 0},this.$fluro.api.post("/file/upload",n,l).then((function(i){t.state="complete",t.result=i.data,t.cancelToken=null,e.$emit("input",i.data)})).catch((function(i){t.state="error",t.cancelToken=null,e.$fluro.error(i)}))}}},l=(i(813),i(0)),a=Object(l.a)(n,o,[],!1,null,null,null);a.options.__file="src/components/content/edit/components/AssetReplaceUpload.vue";var s=a.exports;t.a={data:function(){return{file:null}},methods:{fileSelected:function(e){console.log("file selected inside asset form!"),this.file=e,this.$emit("file",e)}},components:{AssetReplaceUpload:s},computed:{uploadSave:function(){return!this.itemID&&"upload"==this.item.assetType}}}},898:function(e,t,i){var o=i(1051);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,i(5).default)("529161a6",o,!1,{})},899:function(e,t,i){var o=i(1053);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,i(5).default)("f146fe54",o,!1,{})}}]);