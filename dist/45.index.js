(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{1058:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"checkin-timeline-entry border-top",on:{click:function(e){return t.$fluro.global.edit(t.item,!0)}}},[n("fluro-realm-bar",{attrs:{realm:t.item.realms}}),t._v(" "),n("span",{staticClass:"muted"},[t._v(" Checked in to "),n("strong",{on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.$fluro.global.view(t.item.event,!0)}}},[t._v(t._s(t.eventTitle))]),t._v(" - "+t._s(t.checkinTime)+" ")])],1)};i._withStripped=!0;var r={props:{item:{type:Object,required:!0}},components:{FluroRealmBar:function(){return Promise.resolve().then(n.bind(null,92))}},computed:{checkinTime:function(){return this.$filters.formatDate(this.item.event.startDate,"h:mma")},eventTitle:function(){return this.item.event.title},title:function(){return"Checked in to ".concat(this.eventTitle)}}},o=(n(911),n(0)),c=Object(o.a)(r,i,[],!1,null,null,null);c.options.__file="src/components/content/contact/timeline/cards/CheckinCard.vue";e.default=c.exports},819:function(t,e,n){var i=n(912);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(5).default)("ef249690",i,!1,{})},911:function(t,e,n){"use strict";var i=n(819);n.n(i).a},912:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".checkin-timeline-entry{padding:10px;font-style:italic;font-size:0.8em}\n",""])}}]);