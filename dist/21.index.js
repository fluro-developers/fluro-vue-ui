(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{1061:function(t,e,i){"use strict";var n=i(930);i.n(n).a},1062:function(t,e,i){(t.exports=i(5)(!1)).push([t.i,".image-holder[data-v-60437504]{background:#111;max-height:50vh;overflow:hidden;display:flex}.color-swatch[data-v-60437504]{width:36px;height:36px;border-radius:3px;margin:0 1px 1px 0;display:inline-block}\n",""])},834:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("flex-column-body",[i("v-container",{attrs:{"grid-list-xl":""}},[i("v-layout",[i("v-flex",[i("v-btn",{attrs:{large:"",block:"",color:"#eee",href:t.downloadURL,target:"_blank"}},[t._v("\n                    Download\n                    "),i("fluro-icon",{attrs:{right:"",icon:"cloud-download"}})],1)],1)],1),t._v(" "),i("v-input",{staticClass:"no-flex"},[i("v-label",[t._v("Filename")]),t._v(" "),i("div",[t._v(t._s(t.item.filename))])],1),t._v(" "),i("v-layout",[i("v-flex",{attrs:{xs12:"",sm4:""}},[i("fluro-defined-list",{attrs:{items:t.item.realms,type:"realm"},on:{click:t.quickOpen}})],1),t._v(" "),i("v-flex",{attrs:{xs12:"",sm4:""}},[i("fluro-defined-list",{attrs:{items:t.item.tags,type:"tag"},on:{click:t.quickOpen}})],1),t._v(" "),i("v-flex",{attrs:{xs12:"",sm4:""}},[i("v-input",{staticClass:"no-flex"},[i("v-label",[t._v("File Size")]),t._v(" "),i("div",[t._v(t._s(t._f("filesize")(t.item.filesize)))])],1),t._v(" "),t.item.colors&&t.item.colors.length?i("v-input",{staticClass:"no-flex",attrs:{label:"Main Colors"}},[i("div",t._l(t.item.colors,(function(t){return i("div",{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"color-swatch",style:{backgroundColor:t},attrs:{content:t}})})),0)]):t._e()],1)],1),t._v(" "),t.fields&&t.fields.length?[i("h5",[t._v(t._s(t.definition.title)+" information")]),t._v(" "),i("fluro-content-render",{attrs:{fields:t.fields},model:{value:t.item.data,callback:function(e){t.$set(t.item,"data",e)},expression:"item.data"}})]:t._e()],2)],1)};n._withStripped=!0;i(27);var o=i(846),s=i(106),l=i(865),r={props:{config:{type:Object,required:!0},item:{type:Object,required:!0}},components:{FluroContentRender:s.default,FluroDefinedList:l.a},mixins:[o.a],methods:{quickOpen:function(t){console.log("Open",t),this.$actions.open([t])}},computed:{linkURL:function(){return this.$fluro.asset.getUrl(this.item,{format:this.item.extension,filename:this.item.filename})},downloadURL:function(){return this.$fluro.asset.downloadUrl(this.item)},data:function(){return this.item.data||{}},definition:function(){return this.config.definition},fields:function(){if(this.definition)return this.config.definition.fields}},data:function(){return{}},created:function(){console.log("THIS RENDERER",this)}},a=(i(1061),i(0)),c=Object(a.a)(r,n,[],!1,null,"60437504",null);c.options.__file="src/components/content/view/panels/asset.vue";e.default=c.exports},846:function(t,e,i){"use strict";var n=i(106),o=i(134),s=i(69);e.a={props:{config:{type:Object,required:!0}},data:function(){return{loading:!1}},mixins:[s.a],components:{FluroContentRender:n.default,FluroContentRenderField:o.default},computed:{itemID:function(){return this.$fluro.utils.getStringID(this.item)},definition:function(){return this.config&&this.config.definition?this.config.definition:null},data:function(){return this.item.data||{}},fields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]}},methods:{}}},850:function(t,e,i){var n=i(862);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(6).default)("29235161",n,!1,{})},861:function(t,e,i){"use strict";var n=i(850);i.n(n).a},862:function(t,e,i){(t.exports=i(5)(!1)).push([t.i,".fluro-content-render[data-v-4685aa6b]{flex:1}\n",""])},865:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.grouped&&t.grouped.length?i("div",{staticClass:"fluro-defined-list"},t._l(t.grouped,(function(e){return i("v-input",{staticClass:"no-flex"},[i("v-label",[t._v(t._s(e.plural))]),t._v(" "),i("div",{staticClass:"inline-tags"},t._l(e.entries,(function(e){return i("a",{staticClass:"inline-tag",style:{backgroundColor:e.bgColor,color:e.color},on:{click:function(i){return t.clicked(e)}}},[t.type?i("fluro-icon",{attrs:{type:t.type}}):t._e(),t._v(" "+t._s(e.title)+"\n            ")],1)})),0)],1)})),1):t._e()};n._withStripped=!0;var o={props:{label:{type:String},type:{type:String,default:function(){return"item"}},items:{type:Array}},methods:{clicked:function(t){this.$emit("click",t)}},computed:{grouped:function(){return this.$fluro.types.mapDefinitionItems(_.orderBy(this.items,"title"),this.type)}}},s=(i(861),i(0)),l=Object(s.a)(o,n,[],!1,null,"4685aa6b",null);l.options.__file="src/components/FluroDefinedList.vue";e.a=l.exports},930:function(t,e,i){var n=i(1062);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(6).default)("44e8839e",n,!1,{})}}]);