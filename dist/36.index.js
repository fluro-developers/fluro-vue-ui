(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1009:function(t,i,e){"use strict";var n=e(904);e.n(n).a},1010:function(t,i,e){(t.exports=e(5)(!1)).push([t.i,".hint[data-v-3d37a83a]{font-size:10px;opacity:0.5;color:inherit;display:block}\n",""])},821:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("flex-column",[t.loading?[e("fluro-page-preloader",{attrs:{contain:""}})]:e("tabset",{attrs:{justified:!0,vertical:!0}},[e("tab",[e("flex-column-body",{staticStyle:{background:"#fafafa"}},[e("v-container",[e("constrain",{attrs:{sm:""}},[e("div",{staticClass:"grid-list-xl"},[e("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.title},on:{input:t.update},model:{value:t.model,callback:function(i){t.model=i},expression:"model"}}),t._v(" "),e("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.module},on:{input:t.update},model:{value:t.model,callback:function(i){t.model=i},expression:"model"}}),t._v(" "),t.definition&&t.definition.fields&&t.definition.fields.length?e("div",[e("fluro-content-form",{attrs:{options:t.options,fields:t.definition.fields},model:{value:t.model.data,callback:function(i){t.$set(t.model,"data",i)},expression:"model.data"}})],1):t._e(),t._v(" "),t.model._id?[e("v-btn",{staticClass:"ma-0",attrs:{large:"",color:"primary"},on:{click:function(i){return t.authenticate()}}},[t._v("\n                                    Authenticate with Youtube "),e("fluro-icon",{attrs:{icon:"youtube",library:"fab",right:""}})],1)]:void 0],2)])],1)],1)],1)],1)],2)};n._withStripped=!0;var o=e(844),l=(e(27),{mixins:[o.a],components:{},methods:{authenticate:function(){var t=this.model.module;if(!this.model._id)return this.$fluro.error({message:"Please save before authenticating"});switch(t){case"youtube":window.location.href="".concat(this.$fluro.apiURL,"/integrate/").concat(t,"/").concat(this.model._id,"/oauth")}},modelUpdated:function(){this.update(this.model)}},created:function(){},asyncComputed:{},computed:{showOutline:function(){return!1},moduleOptions:function(){var t=[];return t.push({title:"Stripe",value:"stripe"},{title:"Youtube API",value:"youtube"},{title:"Facebook API",value:"facebook"}),t},fieldsOutput:function(){var t=[];function i(i,e){e.key=i,t.push(e)}return(i("title",{title:"Title",minimum:1,maximum:1,type:"string"}),i("module",{title:"Module",minimum:1,maximum:1,type:"string",directive:"select",options:this.moduleOptions}),t)}},data:function(){return{}}}),a=(e(1009),e(0)),d=Object(a.a)(l,n,[],!1,null,"3d37a83a",null);d.options.__file="src/components/content/edit/panels/integration.vue";i.default=d.exports},844:function(t,i,e){"use strict";var n=e(41);i.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:n.default,components:{FluroContentForm:n.default,FluroContentFormField:function(){return Promise.resolve().then(e.bind(null,60))},FluroPrivacySelect:function(){return e.e(44).then(e.bind(null,845))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},904:function(t,i,e){var n=e(1010);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e(6).default)("32808690",n,!1,{})}}]);