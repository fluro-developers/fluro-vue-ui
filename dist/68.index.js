(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1077:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ticketing-manager"},[e("v-btn",{staticClass:"mx-0",attrs:{large:"",block:""},on:{click:this.showModal}},[e("span",[this._v(this._s(this.selectionSummary))])])],1)};i._withStripped=!0;n(13);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("flex-column",{staticClass:"modal-size",staticStyle:{"max-width":"400px"}},[n("flex-column-header",{staticClass:"border-bottom"},[n("page-header",{attrs:{type:"ticket"},scopedSlots:t._u([{key:"left",fn:function(){return[n("div",[n("h3",[t._v(t._s(t.field.title)+" "),n("span",{staticClass:"small text-muted"},[t._v("Tickets")])]),t._v(" "),n("div",{staticClass:"sm muted"},[t._v("Create tickets for specific events for each "+t._s(t.field.title)+" entry")])])]},proxy:!0},{key:"right",fn:function(){return[n("v-btn",{staticClass:"ma-0",on:{click:function(e){return t.close()}}},[t._v("\n            \t\tClose\n            \t")])]},proxy:!0}])})],1),t._v(" "),n("flex-column-body",t._l(t.model,(function(e,i){return n("v-container",{staticClass:"border-bottom",attrs:{fluid:"","py-2":""}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",{attrs:{xs3:""}},[n("fluro-icon",{attrs:{left:"",library:"fas",type:"ticket"}}),t._v(" "),n("strong",[t._v(t._s(e.title))])],1),t._v(" "),n("v-flex",[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",{attrs:{shrink:""}},[n("fluro-realm-dots",{attrs:{realms:e.event.realms}})],1),t._v(" "),e.event?n("v-flex",[n("strong",[t._v(t._s(e.event.title))]),t._v(" "),n("div",{staticClass:"sm muted"},[t._v(t._s(e.event.firstLine)+" "+t._s(t._f("readableEventDate")(e.event)))])]):t._e()],1)],1),t._v(" "),n("v-flex",{attrs:{shrink:""}},[n("v-btn",{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mr-1",attrs:{small:"",content:"More",icon:""},on:{click:function(e){return t.toggleExpanded(i)}}},[n("fluro-icon",{attrs:{icon:e.expanded?"angle-down":"angle-up"}})],1),t._v(" "),n("v-btn",{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0",attrs:{small:"",content:"Remove",icon:""},on:{click:function(e){return t.removeEntry(i)}}},[n("fluro-icon",{attrs:{icon:"trash-alt"}})],1)],1)],1)],1)})),1),t._v(" "),n("flex-column-footer",{staticClass:"border-top"},[n("v-container",{staticStyle:{background:"#fafafa"},attrs:{fluid:"","grid-list-sm":""}},[n("fluro-content-form",{attrs:{fields:t.fields},scopedSlots:t._u([{key:"form",fn:function(e){e.formFields;var i=e.fieldHash,o=e.model;e.update,e.options;return[n("v-layout",[n("v-flex",{attrs:{xs5:""}},[n("fluro-content-form-field",{attrs:{field:i.title},model:{value:o,callback:function(t){o=t},expression:"model"}})],1),t._v(" "),n("v-flex",{attrs:{xs5:""}},[n("fluro-content-form-field",{attrs:{field:i.event},model:{value:o,callback:function(t){o=t},expression:"model"}})],1),t._v(" "),n("v-flex",{attrs:{xs2:""}},[n("v-btn",{attrs:{block:"",small:"",color:"primary"},on:{click:t.add}},[t._v("\n                                Add\n                                "),n("fluro-icon",{attrs:{icon:"plus"}})],1)],1)],1)]}}]),model:{value:t.proposed,callback:function(e){t.proposed=e},expression:"proposed"}})],1)],1)],1)};o._withStripped=!0;var s=n(28),l=n(40),r=n(58),a=n(144),c={props:{options:{type:Object,default:function(){return{}}}},data:function(){return{proposed:{title:"Standard",event:null}}},methods:{toggleExpanded:function(t){this.$set(this.model[t],"expanded",!this.model[t].expanded)},removeEntry:function(t){this.model.splice(t,1)},add:function(){var t=JSON.parse(JSON.stringify(this.proposed));this.model.push(t),this.$set(this,"proposed",{title:"Standard",event:null})}},computed:{model:function(){return this.options.model},field:function(){return this.options.field},fields:function(){var t=[];function e(e,n){n.key||(n.key=e),t.push(n)}return e("title",{title:"Ticket Title",description:"What kind of ticket? Eg. Adult, VIP, Kids",minimum:1,maximum:1,type:"string",expressions:{defaultValue:function(){return"Standard"}}}),e("event",{title:"Events",description:"What events should tickets be created for?",minimum:1,maximum:1,type:"reference",directive:"",params:{restrictType:"event"}}),t}},components:{FluroRealmDots:a.a,FluroContentFormField:r.default,FluroContentForm:l.default},mixins:[s.a]},d=n(0),u=Object(d.a)(c,o,[],!1,null,null,null);u.options.__file="src/components/fields/AdvancedTicketingOptionsModal.vue";var f=u.exports,m={props:{field:{type:Object},value:{type:Array,default:function(){return[]}}},data:function(){return{model:this.value}},methods:{showModal:function(){this.$fluro.modal({component:f,options:{field:this.field,model:this.model}})}},computed:{selectionSummary:function(){return this.model&&this.model.length?_.map(this.model,(function(t){return"".concat(t.title," - ").concat(t.event.title)})).join(", "):"Advanced Ticket Options"}},watch:{}},p=Object(d.a)(m,i,[],!1,null,null,null);p.options.__file="src/components/fields/TicketingManager.vue";e.default=p.exports}}]);