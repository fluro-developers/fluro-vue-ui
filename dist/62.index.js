(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{801:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("flex-column",[n("flex-column-body",[n("v-container",[n("fluro-content-render",{attrs:{fields:t.fields},model:{value:t.item.data,callback:function(e){t.$set(t.item,"data",e)},expression:"item.data"}})],1)],1)],1)};i._withStripped=!0;n(25);var o=n(808),r=n(297),s={props:{config:{type:Object,required:!0},item:{type:Object,required:!0}},components:{FluroContentRender:r.default},mixins:[o.a],methods:{},computed:{data:function(){return this.item.data||{}},fields:function(){return this.config.definition.fields}},data:function(){return{}},created:function(){console.log("THIS RENDERER",this)}},d=n(0),u=Object(d.a)(s,i,[],!1,null,"6aed6788",null);u.options.__file="src/components/content/view/panels/post.vue";e.default=u.exports},808:function(t,e,n){"use strict";var i=n(297),o=n(121),r=n(61);e.a={props:{config:{type:Object,required:!0}},data:function(){return{loading:!1}},mixins:[r.a],components:{FluroContentRender:i.default,FluroContentRenderField:o.default},computed:{itemID:function(){return this.$fluro.utils.getStringID(this.item)},definition:function(){return this.config&&this.config.definition?this.config.definition:null},data:function(){return this.item.data||{}},fields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]}},methods:{}}}}]);