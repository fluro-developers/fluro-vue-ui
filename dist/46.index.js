(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{1063:function(t,e,i){"use strict";var n=i(906);i.n(n).a},1064:function(t,e,i){(t.exports=i(4)(!1)).push([t.i,".row-item[data-v-b09d4c6a]{display:block;padding:10px;color:inherit;text-decoration:none}.row-item[data-v-b09d4c6a]:hover{background:#fafafa}.stat-box[data-v-b09d4c6a]{padding:10px;border:1px solid rgba(0,0,0,0.1);border-radius:3px;text-align:center;margin:2px;background:linear-gradient(#fff, #fafafa)}.stat-box label[data-v-b09d4c6a]{text-transform:uppercase;font-weight:500;font-size:10px;opacity:0.5;letter-spacing:0.05em}.stat-box h3[data-v-b09d4c6a]{font-size:40px;display:block;line-height:50px}\n",""])},803:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("flex-column",[t.loading?[i("fluro-page-preloader",{attrs:{contain:""}})]:[i("tabset",{attrs:{justified:!0},model:{value:t.activeTabIndex,callback:function(e){t.activeTabIndex=e},expression:"activeTabIndex"}},["sent"==t.item.state?i("tab",{attrs:{heading:"Results"}},[i("mailout-results-panel",{model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})],1):t._e(),t._v(" "),i("tab",{attrs:{heading:"Rendered Preview"}},[i("mailout-render-preview",{attrs:{mailout:t.item._id,definition:t.item.definition}})],1),t._v(" "),"sent"!=t.item.state?i("tab",{attrs:{heading:"Test"}},[i("mailout-test-panel",{model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})],1):t._e(),t._v(" "),"sent"!=t.item.state?i("tab",{attrs:{heading:t.sendHeading}},[i("mailout-preflight-panel",{model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})],1):t._e(),t._v(" "),"sent"!=t.item.state&&t.resultsEnabled?i("tab",{attrs:{heading:"Results"}},[i("mailout-results-panel",{model:{value:t.item,callback:function(e){t.item=e},expression:"item"}})],1):t._e()],1)]],2)};n._withStripped=!0;var a=i(25),o=i.n(a),s=i(811),r=i(302),l=i(303),d=i(347),u=i(351),c=(o.a.extend({props:{row:{type:Object},column:{type:Object},data:{}},methods:{info:function(){this.$fluro.modal({component:CorrespondenceInfoModal,options:{item:this.row}})}},template:'<v-btn class="ma-0" small @click="info">\n   Info\n    </v-btn>'}),{props:{config:{type:Object,required:!0},item:{type:Object,required:!0}},mounted:function(){console.log("RECREATED")},components:{MailoutRenderPreview:r.a,MailoutTestPanel:l.a,MailoutResultsPanel:d.a,MailoutPreflightPanel:u.a},mixins:[s.a],methods:{},computed:{definitionName:function(){return this.item.definition},resultsEnabled:function(){return"sent"==this.item.state||(!(!this.item.stats||!this.item.stats.mailoutSent)||void 0)},sendHeading:function(){switch(this.item.state){case"scheduled":return this.duration,"Scheduled";default:return"Publish"}},data:function(){return this.item.data||{}},definedFields:function(){return this.config.definition.fields}},data:function(){return{activeTabIndex:0,search:""}}}),f=(i(1063),i(0)),m=Object(f.a)(c,n,[],!1,null,"b09d4c6a",null);m.options.__file="src/components/content/view/panels/mailout.vue";e.default=m.exports},811:function(t,e,i){"use strict";var n=i(300),a=i(124),o=i(59);e.a={props:{config:{type:Object,required:!0}},data:function(){return{loading:!1}},mixins:[o.a],components:{FluroContentRender:n.default,FluroContentRenderField:a.default},computed:{itemID:function(){return this.$fluro.utils.getStringID(this.item)},definition:function(){return this.config&&this.config.definition?this.config.definition:null},data:function(){return this.item.data||{}},fields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]}},methods:{}}},906:function(t,e,i){var n=i(1064);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(5).default)("46233216",n,!1,{})}}]);