(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{1077:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"timeline-entry",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.$fluro.global.view(t.item,!0)}}},[i("fluro-realm-bar",{attrs:{realm:t.item.realms}}),t._v(" "),i("v-layout",[i("v-flex",{attrs:{shrink:""}},[i("v-container",{attrs:{"pa-2":""}},[i("div",{staticClass:"timeline-icon"},[i("fluro-icon",{attrs:{type:"interaction"}})],1)])],1),t._v(" "),i("v-flex",[i("v-container",{attrs:{"pa-2":""}},[i("v-layout",[i("v-flex",[i("strong",[t._v(t._s(t.title))]),t._v(" "),i("div",{staticClass:"datestring"},[t._v(t._s(t.datestring))])]),t._v(" "),i("v-flex",{attrs:{shrink:""}},[i("v-btn",{staticClass:"ma-0",attrs:{icon:"",small:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.$actions.open([t.item])}}},[i("fluro-icon",{attrs:{icon:"ellipsis-h"}})],1),t._v(" "),i("v-btn",{staticClass:"ma-0",attrs:{icon:"",small:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.$fluro.global.edit(t.item,!0)}}},[i("fluro-icon",{attrs:{icon:"pencil"}})],1)],1)],1)],1)],1)],1)],1)};n._withStripped=!0;i(15);var r={props:{item:{type:Object,required:!0}},components:{FluroContentRender:function(){return Promise.resolve().then(i.bind(null,297))},FluroAvatar:function(){return Promise.resolve().then(i.bind(null,140))},FluroRealmBar:function(){return Promise.resolve().then(i.bind(null,102))}},computed:{definedFields:function(){return this.item.fullDefinition.fields},author:function(){return this.item.author&&this.item.author.name?this.item.author.name:this.item.managedAuthor&&this.item.managedAuthor.title?this.item.managedAuthor.title:"Someone"},definitionTitle:function(){return this.$fluro.types.readable(this.item.definition,!1,"post")},title:function(){return"Submitted a ".concat(this.definitionTitle," form")},datestring:function(){return"".concat(this.$filters.formatDate(this.item.created,"h:mma")," - ").concat(this.$filters.formatDate(this.item.created,"dddd D MMM YYYY")," - ").concat(this.$filters.timeago(this.item.created)," ")}}},o=(i(927),i(0)),a=Object(o.a)(r,n,[],!1,null,null,null);a.options.__file="src/components/content/contact/timeline/cards/InteractionCard.vue";e.default=a.exports},829:function(t,e,i){var n=i(928);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(5).default)("312bc87c",n,!1,{})},927:function(t,e,i){"use strict";var n=i(829);i.n(n).a},928:function(t,e,i){(t.exports=i(4)(!1)).push([t.i,".datestring{font-size:0.8em;opacity:0.5}\n",""])}}]);