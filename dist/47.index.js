(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{1059:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"log-timeline-entry border-top"},[r("v-layout",{attrs:{"align-center":""}},[r("v-flex",[t.author?[t._v(t._s(t.author.title)+" -")]:t._e(),t._v(" "+t._s(t.item.message)+" "),r("em",{staticClass:"muted"},[t._v("- "+t._s(t._f("formatDate")(t.item.date,"h:mma"))+" ("+t._s(t._f("timeago")(t.item.date))+")")])],2),t._v(" "),t.author?r("v-flex",{attrs:{shrink:""}},[r("v-container",{attrs:{"pa-0":"","pl-2":""}},[r("fluro-avatar",{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{content:t.author.title,id:t.author._id,type:t.author.type}})],1)],1):t._e()],1)],1)};n._withStripped=!0;r(11),r(49),r(105),r(21),r(22),r(12),r(36),r(16);var o=r(9);function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var s={props:{item:{type:Object,required:!0}},components:{FluroRealmBar:function(){return Promise.resolve().then(r.bind(null,102))}},computed:{author:function(){var t=this.item;return t.user&&t.user._id?i({title:t.user.name,type:"user"},t.user):t.managedUser&&t.managedUser._id?i({type:"persona"},t.managedUser):void 0}}},c=(r(913),r(0)),u=Object(c.a)(s,n,[],!1,null,null,null);u.options.__file="src/components/content/contact/timeline/cards/LogCard.vue";e.default=u.exports},820:function(t,e,r){var n=r(914);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,r(5).default)("ab7db8b4",n,!1,{})},913:function(t,e,r){"use strict";var n=r(820);r.n(n).a},914:function(t,e,r){(t.exports=r(4)(!1)).push([t.i,".log-timeline-entry{padding:10px;font-style:italic;font-size:0.8em;color:rgba(0,0,0,0.5)}\n",""])}}]);