(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{761:function(t,i,n){"use strict";n.r(i);var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("flex-column",[t.loading?[n("fluro-page-preloader",{attrs:{contain:""}})]:n("tabset",{attrs:{justified:!0,vertical:!0}},[n("tab",[n("flex-column-body",{staticStyle:{background:"#fafafa"}},[n("v-container",[n("constrain",{attrs:{sm:""}},[n("div",{staticClass:"grid-list-xl"},[n("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.title},on:{input:t.update},model:{value:t.model,callback:function(i){t.model=i},expression:"model"}}),t._v(" "),t.definition&&t.definition.fields&&t.definition.fields.length?n("div",[n("fluro-content-form",{attrs:{options:t.options,fields:t.definition.fields},model:{value:t.model.data,callback:function(i){t.$set(t.model,"data",i)},expression:"model.data"}})],1):t._e()],1)])],1)],1)],1)],1)],2)};e._withStripped=!0;var o=n(793),d=(n(25),{mixins:[o.a],components:{},methods:{modelUpdated:function(){this.update(this.model)}},created:function(){},asyncComputed:{},computed:{showOutline:function(){return!1},fieldsOutput:function(){var t,i=[];return(t={title:"Title",minimum:1,maximum:1,type:"string"}).key="title",i.push(t),i}},data:function(){return{}}}),s=(n(936),n(0)),l=Object(s.a)(d,e,[],!1,null,"f485194e",null);l.options.__file="src/components/content/edit/panels/capability.vue";i.default=l.exports},793:function(t,i,n){"use strict";var e=n(40);i.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:e.default,components:{FluroContentForm:e.default,FluroContentFormField:function(){return Promise.resolve().then(n.bind(null,59))},FluroPrivacySelect:function(){return n.e(53).then(n.bind(null,794))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},831:function(t,i,n){var e=n(937);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,n(5).default)("1067c818",e,!1,{})},936:function(t,i,n){"use strict";var e=n(831);n.n(e).a},937:function(t,i,n){(t.exports=n(4)(!1)).push([t.i,".hint[data-v-f485194e]{font-size:10px;opacity:0.5;color:inherit;display:block}\n",""])}}]);