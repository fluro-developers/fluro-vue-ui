(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{770:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("flex-column",[e.loading?[n("fluro-page-preloader",{attrs:{contain:""}})]:[n("tabset",{attrs:{justified:!0,vertical:!0}},["sent"!=e.model.state?[n("tab",{attrs:{heading:"Basic Details"}},[n("flex-column-body",{staticStyle:{background:"#fafafa"}},[n("v-container",[n("constrain",{attrs:{sm:""}},[n("h3",{attrs:{margin:""}},[e._v("Mailout Basics")]),e._v(" "),n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.title},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.subject},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),n("fluro-panel",[n("fluro-panel-title",[n("strong",[e._v("Sender Details")])]),e._v(" "),n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.fromEmail},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),n("v-layout",[n("v-flex",{attrs:{xs12:"",sm6:""}},[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.fromFirstName},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1),e._v(" "),n("v-flex",{attrs:{xs12:"",sm6:""}},[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.fromLastName},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1)],1)],1)],1),e._v(" "),n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.mailoutType},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),"promotional"==e.mailoutType?n("fluro-card",[n("fluro-card-body",[n("h6",[e._v("\n                                            Promotional Mode\n                                        ")]),e._v("\n                                        Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.\n                                    ")])],1):e._e(),e._v(" "),"transactional"==e.mailoutType?n("fluro-card",[n("fluro-card-body",[n("h6",[e._v("\n                                            Transactional Mode\n                                        ")]),e._v("\n                                        It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.\n                                        Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.\n                                    ")])],1):e._e()],1)],1)],1)],1),e._v(" "),e.definition?n("tab",{attrs:{heading:e.definition.title+" Fields"}},[n("flex-column-body",{staticStyle:{background:"#fafafa"}},[n("v-container",[n("constrain",{attrs:{sm:""}},[n("h3",{attrs:{margin:""}},[e._v(e._s(e.definition.title)+" Fields")]),e._v(" "),n("fluro-content-form",{attrs:{options:e.editorOptions,fields:e.definition.fields},model:{value:e.model.data,callback:function(t){e.$set(e.model,"data",t)},expression:"model.data"}})],1)],1)],1)],1):e._e(),e._v(" "),n("tab",{attrs:{heading:"Recipients"}},[n("flex-column-body",{staticStyle:{background:"#fafafa"}},[n("v-container",{staticClass:"mailout-recipients"},[n("constrain",{attrs:{sm:""}},[n("h3",{attrs:{margin:""}},[e._v("Recipients")]),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.contacts},nativeOn:{click:function(t){return e.toggleExpand("contacts")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.contacts.length)+" Contacts")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.contacts?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.contacts},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.teams},nativeOn:{click:function(t){return e.toggleExpand("teams")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.teams.length)+" Groups and Teams")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.teams?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.teams},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.tickets},nativeOn:{click:function(t){return e.toggleExpand("tickets")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.tickets.length)+" Tickets")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.tickets?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.tickets},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.events},nativeOn:{click:function(t){return e.toggleExpand("events")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.events.length)+" Events")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.events?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.data},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.events},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.interactions},nativeOn:{click:function(t){return e.toggleExpand("interactions")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.interactions.length)+" Interactions")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.interactions?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.interactions},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.checkins},nativeOn:{click:function(t){return e.toggleExpand("checkins")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.checkins.length)+" Checkins")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.checkins?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.checkins},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.details},nativeOn:{click:function(t){return e.toggleExpand("details")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.details.length)+" Detail Sheets")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.details?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.details},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.families},nativeOn:{click:function(t){return e.toggleExpand("families")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.families.length)+" Households")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.families?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.families},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.personas},nativeOn:{click:function(t){return e.toggleExpand("personas")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.personas.length)+" User Personas")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.personas?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.personas},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.collections},nativeOn:{click:function(t){return e.toggleExpand("collections")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.collections.length)+" Collections")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.collections?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.collections},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.tags},nativeOn:{click:function(t){return e.toggleExpand("tags")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.tags.length)+" Tags")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.tags?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.tags},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.realms},nativeOn:{click:function(t){return e.toggleExpand("realms")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.realms.length)+" Realms")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.realms?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.realms},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.cards},nativeOn:{click:function(t){return e.toggleExpand("cards")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v(e._s(e.model.cards.length)+" Process Cards")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.cards?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.cards},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1),e._v(" "),n("fluro-panel",[n("fluro-panel-title",{class:{collapsed:!e.expanded.query},nativeOn:{click:function(t){return e.toggleExpand("query")}}},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("h6",[e._v("Contacts matching query")])]),e._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-icon",{staticClass:"chevron",attrs:{icon:"angle-down"}})],1)],1)],1),e._v(" "),e.expanded.query?n("fluro-panel-body",[n("fluro-content-form-field",{attrs:{"form-fields":e.formFields,outline:e.showOutline,options:e.options,field:e.fieldHash.query},on:{input:e.update},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()],1)],1)],1)],1)],1)]:e._e(),e._v(" "),e.model._id?[n("tab",{attrs:{heading:"Preview"}},[n("mailout-render-preview",{attrs:{mailout:e.model._id,definition:e.definition.definitionName}})],1),e._v(" "),"sent"!=e.model.state?n("tab",{attrs:{heading:"Testing"}},[n("mailout-test-panel",{model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e(),e._v(" "),"sent"!=e.model.state?n("tab",{attrs:{heading:"Send and Publish"}},[n("mailout-preflight-panel",{model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e(),e._v(" "),e.resultsEnabled?n("tab",{attrs:{heading:"Results"}},[n("mailout-results-panel",{model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1):e._e()]:e._e()],2)]],2)};i._withStripped=!0;n(25);var o=n(295),l=n(340),s=n(344),a=n(296),r=n(793),d={components:{MailoutRenderPreview:o.a,MailoutTestPanel:a.a,MailoutPreflightPanel:s.a,MailoutResultsPanel:l.a},mixins:[r.a],methods:{toggleExpand:function(e){this.$set(this.expandedSettings,"_".concat(e),!this.expandedSettings["_".concat(e)]),console.log("TOGGLE",e,this.expandedSettings)}},computed:{resultsEnabled:function(){return"sent"==this.model.state||(!(!this.model.stats||!this.model.stats.mailoutSent)||void 0)},expanded:function(){return{contacts:this.expandedSettings._contacts||this.model.contacts&&this.model.contacts.length,teams:this.expandedSettings._teams||this.model.teams&&this.model.teams.length,tickets:this.expandedSettings._tickets||this.model.tickets&&this.model.tickets.length,events:this.expandedSettings._events||this.model.events&&this.model.events.length,interactions:this.expandedSettings._interactions||this.model.interactions&&this.model.interactions.length,cards:this.expandedSettings._cards||this.model.cards&&this.model.cards.length,checkins:this.expandedSettings._checkins||this.model.checkins&&this.model.checkins.length,details:this.expandedSettings._details||this.model.details&&this.model.details.length,families:this.expandedSettings._families||this.model.families&&this.model.families.length,personas:this.expandedSettings._personas||this.model.personas&&this.model.personas.length,collections:this.expandedSettings._collections||this.model.collections&&this.model.collections.length,tags:this.expandedSettings._tags||this.model.tags&&this.model.tags.length,realms:this.expandedSettings._realms||this.model.realms&&this.model.realms.length,definitions:this.expandedSettings._definitions||this.model.definitions&&this.model.definitions.length,query:this.expandedSettings._query||this.model.query}},mailoutType:function(){return this.model.mailoutType},user:function(){return this.$fluro.auth.getCurrentUser()},fieldsOutput:function(){var e=this,t=[];function n(e,n){n.key=e,t.push(n)}return(n("title",{title:"Title",minimum:1,maximum:1,type:"string",placeholder:"Eg. My awesome new email"}),n("subject",{title:"Subject",description:"Text to be shown in the subject of the email",minimum:1,maximum:1,type:"string",placeholder:"Eg. My awesome new email",expressions:{defaultValue:function(){return e.model.title}}}),n("fromEmail",{title:"From / Sender Email Address",description:"Email address this mailout will be sent from, and replies will be sent to",minimum:1,maximum:1,type:"string",placeholder:"Eg. ".concat(this.user.email),defaultValues:["".concat(this.user.email)]}),n("fromFirstName",{title:"Sender First Name",minimum:1,maximum:1,type:"string",placeholder:"Eg. ".concat(this.user.firstName),defaultValues:["".concat(this.user.firstName)]}),n("fromLastName",{title:"Sender Last Name",minimum:1,maximum:1,type:"string",placeholder:"Eg. ".concat(this.user.lastName),defaultValues:["".concat(this.user.lastName)]}),n("mailoutType",{title:"Mailout Type",minimum:1,maximum:1,type:"string",directive:"select",defaultValues:["promotional"],options:[{name:"Promotional",value:"promotional"},{name:"Transactional",value:"transactional"}]}),n("contacts",{title:"Select contacts",minimum:0,maximum:0,type:"reference",params:{restrictType:"contact"}}),n("teams",{title:"Select Groups/Teams",minimum:0,maximum:0,type:"reference",params:{restrictType:"team"}}),n("tickets",{title:"Select tickets",minimum:0,maximum:0,type:"reference",params:{restrictType:"ticket"}}),n("events",{title:"Select events",minimum:0,maximum:0,type:"reference",params:{restrictType:"event"}}),n("data",{type:"group",minimum:1,maximum:1,asObject:!0,fields:[{key:"eventCheckins",title:"Send to people who have checked in",description:"Send mailout to any contacts checked in to these events",minimum:0,maximum:1,type:"boolean"},{key:"eventTickets",title:"Send to people who have a ticket",description:"Send mailout to any contacts that have a registered ticket for these events",minimum:0,maximum:1,type:"boolean"},{key:"eventAssignments",title:"Send to people who are rostered on to this event",description:"Send mailout to any contacts that have been rostered/assigned to these events",minimum:0,maximum:1,type:"boolean"}]}),n("interactions",{title:"Select interactions",minimum:0,maximum:0,type:"reference",params:{restrictType:"interaction"}}),n("cards",{title:"Select Process Cards",minimum:0,maximum:0,type:"reference",params:{restrictType:"process"}}),n("checkins",{title:"Select Checkins",minimum:0,maximum:0,type:"reference",params:{restrictType:"checkin"}}),n("families",{title:"Select Households",minimum:0,maximum:0,type:"reference",params:{restrictType:"family"}}),n("collections",{title:"Select Collections",minimum:0,maximum:0,type:"reference",params:{restrictType:"collection"}}),n("tags",{title:"Select Tags",minimum:0,maximum:0,type:"reference",params:{restrictType:"tag"}}),n("realms",{title:"Select Realms",minimum:0,maximum:0,type:"reference",directive:"realm-select",params:{restrictType:"realm"}}),n("details",{title:"Select Detail Sheet",minimum:0,maximum:0,type:"reference",params:{restrictType:"contactdetail"}}),n("personas",{title:"Select User Personas",minimum:0,maximum:0,type:"reference",params:{restrictType:"persona"}}),n("query",{title:"Select Query",minimum:0,maximum:1,type:"reference",params:{restrictType:"query",allDefinitions:!0}}),t)}},data:function(){return{expandedSettings:{_contacts:!1,_teams:!1,_events:!1,_tickets:!1},editorOptions:{editor:{tokens:[{title:"Recipient Preferred First Name",key:"firstName"},{title:"Recipient Last Name",key:"lastName"},{title:"Sender/From First Name",key:"mailout.fromFirstName"},{title:"Sender/From Last Name",key:"mailout.fromLastName"},{title:"Sender/From Email Address",key:"mailout.fromEmail"},{title:"Account Title",key:"mailout.account.title"},{title:"Account Timezone",key:"mailout.account.timezone"},{title:"Subject",key:"mailout.subject"},{title:"Send Date",key:"date"}]}}}}},c=(n(992),n(0)),m=Object(c.a)(d,i,[],!1,null,null,null);m.options.__file="src/components/content/edit/panels/mailout.vue";t.default=m.exports},793:function(e,t,n){"use strict";var i=n(40);t.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:i.default,components:{FluroContentForm:i.default,FluroContentFormField:function(){return Promise.resolve().then(n.bind(null,59))},FluroPrivacySelect:function(){return n.e(53).then(n.bind(null,794))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},865:function(e,t,n){var i=n(993);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(5).default)("4c414e6d",i,!1,{})},992:function(e,t,n){"use strict";var i=n(865);n.n(i).a},993:function(e,t,n){(e.exports=n(4)(!1)).push([e.i,".mailout-recipients .collapsed{color:rgba(0,0,0,0.4)}.mailout-recipients .collapsed .chevron{transition:all 0.3s;transform:rotate(-90deg)}\n",""])}}]);