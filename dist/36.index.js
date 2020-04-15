(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{777:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("flex-column",[e.loading?[n("fluro-page-preloader",{attrs:{contain:""}})]:n("tabset",{attrs:{justified:!0}},[n("tab",{attrs:{heading:"Code"}},[n("flex-row",{staticClass:"code-panels"},[n("flex-column",{staticClass:"code-panel",class:{"panel-collapsed":e.collapsed.js}},[n("div",{staticClass:"code-heading",on:{click:function(t){return e.togglePanel("js")}}},[n("label",[n("fluro-icon",{attrs:{icon:"caret-right",library:"fas",left:""}}),n("strong",[e._v("Javascript")])],1)]),e._v(" "),n("flex-column",{staticClass:"code-panel-column"},[n("fluro-code-editor",{staticStyle:{flex:"1 1 100%"},attrs:{lang:"javascript"},model:{value:e.model.js,callback:function(t){e.$set(e.model,"js",t)},expression:"model.js"}})],1)],1),e._v(" "),n("flex-column",{staticClass:"code-panel",class:{"panel-collapsed":e.collapsed.html}},[n("div",{staticClass:"code-heading",on:{click:function(t){return e.togglePanel("html")}}},[n("label",[n("fluro-icon",{attrs:{icon:"caret-right",library:"fas",left:""}}),n("strong",[e._v("HTML")])],1)]),e._v(" "),n("flex-column",{staticClass:"code-panel-column"},[n("fluro-code-editor",{staticStyle:{flex:"1 1 100%"},attrs:{lang:"html"},model:{value:e.model.html,callback:function(t){e.$set(e.model,"html",t)},expression:"model.html"}})],1)],1),e._v(" "),n("flex-column",{staticClass:"code-panel",class:{"panel-collapsed":e.collapsed.css}},[n("div",{staticClass:"code-heading",on:{click:function(t){return e.togglePanel("css")}}},[n("label",[n("fluro-icon",{attrs:{icon:"caret-right",library:"fas",left:""}}),n("strong",[e._v("SCSS")])],1)]),e._v(" "),n("flex-column",{staticClass:"code-panel-column"},[n("fluro-code-editor",{staticStyle:{flex:"1 1 100%"},attrs:{autoformat:!1,lang:"scss"},model:{value:e.model.css,callback:function(t){e.$set(e.model,"css",t)},expression:"model.css"}})],1)],1)],1)],1),e._v(" "),n("tab",{attrs:{heading:"Component Fields"}},[n("fluro-field-editor",{attrs:{item:e.model},model:{value:e.model.fields,callback:function(t){e.$set(e.model,"fields",t)},expression:"model.fields"}})],1),e._v(" "),n("tab",{attrs:{heading:e.readableContentType+" Details"}},[n("flex-column-body",{staticStyle:{background:"#fafafa"}},[n("v-container",{attrs:{fluid:""}},[n("constrain",{attrs:{sm:""}},[n("h3",{attrs:{margin:""}},[e._v(e._s(e.readableContentType)+" Details")]),e._v(" "),e.definedFields.length?[n("fluro-content-form",{attrs:{options:e.options,fields:e.definedFields},model:{value:e.model.data,callback:function(t){e.$set(e.model,"data",t)},expression:"model.data"}})]:e._e()],2)],1)],1)],1)],1)],2)};o._withStripped=!0;n(25);var i=n(806),l=n(345),a=n(116),s={mixins:[i.a],components:{FluroFieldEditor:l.a,FluroCodeEditor:a.default},methods:{togglePanel:function(e){console.log("TOGGLE",e),this.collapsed[e]=!this.collapsed[e]}},created:function(){this.model.fields||this.$set(this.model,"fields",[])},computed:{fieldsOutput:function(){var e,t=[];return(e={title:"Title",minimum:1,maximum:1,type:"string",placeholder:"Eg. My Awesome List"}).key="title",t.push(e),t}},data:function(){return{collapsed:{js:!1,html:!1,css:!1}}}},d=(n(962),n(0)),c=Object(d.a)(s,o,[],!1,null,"1e60084c",null);c.options.__file="src/components/content/edit/panels/component.vue";t.default=c.exports},806:function(e,t,n){"use strict";var o=n(40);t.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:o.default,components:{FluroContentForm:o.default,FluroContentFormField:function(){return Promise.resolve().then(n.bind(null,60))},FluroPrivacySelect:function(){return n.e(55).then(n.bind(null,807))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},848:function(e,t,n){var o=n(963);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,n(5).default)("c35fc9ba",o,!1,{})},962:function(e,t,n){"use strict";var o=n(848);n.n(o).a},963:function(e,t,n){(e.exports=n(4)(!1)).push([e.i,".code-heading[data-v-1e60084c]{line-height:30px;height:30px;padding:0 15px;background:#555;color:rgba(255,255,255,0.8);white-space:nowrap;border:1px solid rgba(0,0,0,0.1);cursor:pointer !important}.code-heading[data-v-1e60084c]:hover{background:#444;color:#fff}.code-heading label[data-v-1e60084c]{display:block;text-transform:uppercase;margin:0;padding:0;letter-spacing:0.05em;font-size:12px;pointer-events:none}.code-panels[data-v-1e60084c]{background:#262626}.code-panel .code-panel-column[data-v-1e60084c]{border-left:1px solid rgba(0,0,0,0.1);border-right:1px solid rgba(0,0,0,0.1)}.panel-collapsed[data-v-1e60084c]{width:30px !important;flex:none;background:#fafafa}.panel-collapsed .code-heading[data-v-1e60084c]{flex:1;height:auto}.panel-collapsed .code-heading label[data-v-1e60084c]{transform:rotate(90deg)}.panel-collapsed .code-panel-column[data-v-1e60084c]{display:none}\n",""])}}]);