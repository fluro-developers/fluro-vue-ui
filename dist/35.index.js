(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{775:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("flex-column",[t.loading?[i("fluro-page-preloader",{attrs:{contain:""}})]:[i("tabset",{attrs:{justified:!0,vertical:!0}},[i("tab",{attrs:{heading:"Code"}},[i("v-layout",{staticClass:"top-bar",attrs:{row:"","px-4":"","py-2":""}},[i("v-flex",{attrs:{xs8:"",sm4:"",md3:"","px-2":""}},[i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.title},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1),t._v(" "),i("v-flex",{attrs:{xs4:"",sm2:"",md2:"","px-2":""}},[i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.syntax},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)],1),t._v(" "),i("fluro-code-editor",{staticStyle:{flex:"1 1 100%"},attrs:{lang:t.model.syntax},model:{value:t.model.body,callback:function(e){t.$set(t.model,"body",e)},expression:"model.body"}})],1),t._v(" "),t.definition?i("tab",{attrs:{heading:t.definition.title+" Details"}},[t._t("default",[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",{attrs:{fluid:""}},[i("constrain",{attrs:{sm:""}},[i("h3",{attrs:{margin:""}},[t._v(t._s(t.definition.title)+" Details")]),t._v(" "),i("fluro-content-form",{attrs:{options:t.options,fields:t.definition.fields},model:{value:t.model.data,callback:function(e){t.$set(t.model,"data",e)},expression:"model.data"}})],1)],1)],1)])],2):t._e(),t._v(" "),i("tab",{attrs:{heading:"Privacy"}},[t._t("default",[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",{attrs:{fluid:""}},[i("constrain",{attrs:{sm:""}},[i("fluro-privacy-select",{model:{value:t.model.privacy,callback:function(e){t.$set(t.model,"privacy",e)},expression:"model.privacy"}})],1)],1)],1)])],2)],1)]],2)};n._withStripped=!0;var o=i(116),l=i(806),d=(i(25),{components:{FluroCodeEditor:o.default},mixins:[l.a],computed:{fieldsOutput:function(){var t=[];function e(e,i){i.key=e,t.push(i)}return(e("title",{title:"Title",minimum:1,maximum:1,type:"string"}),e("syntax",{title:"Syntax",minimum:1,maximum:1,type:"string",directive:"select",options:[{name:"HTML",value:"html"},{name:"SCSS",value:"scss"},{name:"CSS",value:"css"},{name:"Javascript",value:"js"}]}),t)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},data:function(){return{editorOptions:{}}}}),r=(i(960),i(0)),a=Object(r.a)(d,n,[],!1,null,null,null);a.options.__file="src/components/content/edit/panels/code.vue";e.default=a.exports},806:function(t,e,i){"use strict";var n=i(40);e.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:n.default,components:{FluroContentForm:n.default,FluroContentFormField:function(){return Promise.resolve().then(i.bind(null,60))},FluroPrivacySelect:function(){return i.e(55).then(i.bind(null,807))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},847:function(t,e,i){var n=i(961);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(5).default)("d25511da",n,!1,{})},960:function(t,e,i){"use strict";var n=i(847);i.n(n).a},961:function(t,e,i){(t.exports=i(4)(!1)).push([t.i,".fluro-editor.full-bleed{margin:0;flex:1;display:flex;flex-direction:column;overflow:hidden}.fluro-editor.full-bleed .fluro-editor-textarea{flex:1}.fluro-editor.full-bleed .fluro-editor-textarea>div{border:none !important;border-radius:0;overflow:auto;padding:3%}.fluro-editor.full-bleed .editor-code-wrapper{flex:1;display:flex;flex-direction:column}.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor{display:block;flex:1;position:relative}.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor .ace_editor{width:100% !important;height:100% !important;position:absolute;left:0;bottom:0;right:0;top:0;border-radius:0}\n",""])}}]);