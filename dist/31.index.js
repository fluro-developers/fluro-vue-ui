(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{804:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("flex-column",[n("flex-column-body",[n("constrain",{attrs:{sm:""}},[n("v-container",{attrs:{"py-0":""}},[n("fluro-video",{attrs:{item:t.item}})],1),t._v(" "),"upload"==t.item.assetType?n("v-layout",[n("v-flex",[n("v-btn",{attrs:{large:"",block:"",color:"#eee",href:t.linkURL,target:"_blank"}},[t._v("\n                        Link\n                        "),n("fluro-icon",{attrs:{right:"",icon:"link"}})],1)],1),t._v(" "),n("v-flex",[n("v-btn",{attrs:{large:"",block:"",color:"#eee",href:t.downloadURL,target:"_blank"}},[t._v("\n                        Download\n                        "),n("fluro-icon",{attrs:{right:"",icon:"cloud-download"}})],1)],1)],1):t._e(),t._v(" "),t.item.body&&t.item.body.length?[n("div",{domProps:{innerHTML:t._s(t.item.body)}})]:t._e(),t._v(" "),t.fields&&t.fields.length?[n("fluro-content-render",{attrs:{fields:t.fields},model:{value:t.item.data,callback:function(e){t.$set(t.item,"data",e)},expression:"item.data"}})]:t._e()],2)],1)],1)};i._withStripped=!0;n(25);var o=n(808),r=n(297),l=n(824),s={props:{config:{type:Object,required:!0},item:{type:Object,required:!0}},components:{FluroContentRender:r.default,FluroDefinedList:l.a},mixins:[o.a],methods:{quickOpen:function(t){console.log("Open",t),this.$actions.open([t])}},computed:{linkURL:function(){return this.$fluro.asset.getUrl(this.item,{format:this.item.extension,filename:this.item.filename})},downloadURL:function(){return this.$fluro.asset.downloadUrl(this.item)}},data:function(){return{}},created:function(){console.log("THIS RENDERER",this)}},a=n(0),u=Object(a.a)(s,i,[],!1,null,"6150e10f",null);u.options.__file="src/components/content/view/panels/video.vue";e.default=u.exports},808:function(t,e,n){"use strict";var i=n(297),o=n(121),r=n(61);e.a={props:{config:{type:Object,required:!0}},data:function(){return{loading:!1}},mixins:[r.a],components:{FluroContentRender:i.default,FluroContentRenderField:o.default},computed:{itemID:function(){return this.$fluro.utils.getStringID(this.item)},definition:function(){return this.config&&this.config.definition?this.config.definition:null},data:function(){return this.item.data||{}},fields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]}},methods:{}}},811:function(t,e,n){var i=n(822);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(5).default)("29235161",i,!1,{})},821:function(t,e,n){"use strict";var i=n(811);n.n(i).a},822:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".fluro-content-render[data-v-4685aa6b]{flex:1}\n",""])},824:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.grouped&&t.grouped.length?n("div",{staticClass:"fluro-defined-list"},t._l(t.grouped,(function(e){return n("v-input",{staticClass:"no-flex"},[n("v-label",[t._v(t._s(e.plural))]),t._v(" "),n("div",{staticClass:"inline-tags"},t._l(e.entries,(function(e){return n("a",{staticClass:"inline-tag",style:{backgroundColor:e.bgColor,color:e.color},on:{click:function(n){return t.clicked(e)}}},[t.type?n("fluro-icon",{attrs:{type:t.type}}):t._e(),t._v(" "+t._s(e.title)+"\n            ")],1)})),0)],1)})),1):t._e()};i._withStripped=!0;var o={props:{label:{type:String},type:{type:String,default:function(){return"item"}},items:{type:Array}},methods:{clicked:function(t){this.$emit("click",t)}},computed:{grouped:function(){return this.$fluro.types.mapDefinitionItems(_.orderBy(this.items,"title"),this.type)}}},r=(n(821),n(0)),l=Object(r.a)(o,i,[],!1,null,"4685aa6b",null);l.options.__file="src/components/FluroDefinedList.vue";e.a=l.exports}}]);