(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1015:function(t,n,e){"use strict";var i=e(868);e.n(i).a},1016:function(t,n,e){(t.exports=e(2)(!1)).push([t.i,".hint[data-v-c9b37068]{font-size:10px;opacity:0.5;color:inherit;display:block}\n",""])},764:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("flex-column",[t.loading?[e("fluro-page-preloader",{attrs:{contain:""}})]:e("tabset",{attrs:{justified:!0,vertical:!0}},[e("tab",{attrs:{heading:"Roster"}},[e("flex-column-body",{staticStyle:{background:"#fafafa"}})],1),t._v(" "),t.definition&&t.definition.fields&&t.definition.fields.length?e("tab",{attrs:{heading:t.definition.title+" Information"}},[e("flex-column-body",{staticStyle:{background:"#fafafa"}},[e("v-container",[e("constrain",{attrs:{sm:""}},[e("fluro-content-form",{attrs:{options:t.options,fields:t.definition.fields},model:{value:t.model.data,callback:function(n){t.$set(t.model,"data",n)},expression:"model.data"}})],1)],1)],1)],1):t._e()],1)],2)};i._withStripped=!0;e(57),e(37),e(56);var o=e(892),s=e(782),a=(e(19),{mixins:[s.a],components:{ReminderEventManager:o.a,RosterMain:RosterMain},methods:{modelUpdated:function(){this.update(this.model)},injectAssignment:function(t,n){var e=this,i=(e.model._id,String(n.title).toLowerCase()),o=_.find(t.slots,(function(t){return t.title.toLowerCase()==i}));if(o)return e.$set(n,"sending",!0),o.assignments.push(n),new Promise((function(i,s){return e.createAssignment(t,o.assignments,n,!0).then((function(t){_.assign(n,t),e.$set(n,"sending",!1),e.$set(t,"sending",!1),console.log("CREATED AND UPDATED ASSIGNMENT",t),i(t)})).catch((function(t){var e=o.assignments.indexOf(n);o.assignments.splice(e,1),i(null)}))}))},createAssignment:function(t,n,e,i){var o=this;return t=o.model._id,new Promise((function(s,a){var r=e.contact;function c(t){var e=t.data;(e.contactName=e.contact.title||e.contact.firstName+" "+e.contact.lastName,i)||(_.some(n,{_id:e._id})||n.push(e));s(e)}o.$fluro.api.post("/assignments/roster/".concat(t),e).then(c).catch((function n(i){var s=(i=i.response.data).error,f=i.message;403==i.status&&(f="You do not have permission to make this action.");if("AssignmentConflictError"==s){var d=[{title:"Add ".concat(r.firstName," as '").concat(e.title,"' anyway"),description:(r.firstName||"this person")+" can still fulfill this assignment",force:!0}];return o.$fluro.options(d,"Conflict!",f).then((function(i){e.force=i.force,o.$fluro.api.post("/assignments/roster/".concat(t),e).then(c).catch(n)})).catch((function(t){a(t)}))}o.$fluro.error(i),a(i)}))}))}},created:function(){},asyncComputed:{},computed:{showOutline:function(){return!1},fieldsOutput:function(){var t,n=[];return(t={title:"Event",minimum:1,maximum:1,type:"reference",params:{restrictType:"event"}}).key="event",n.push(t),n}},data:function(){return{}}}),r=(e(1015),e(0)),c=Object(r.a)(a,i,[],!1,null,"c9b37068",null);c.options.__file="src/components/content/edit/panels/roster.vue";n.default=c.exports},782:function(t,n,e){"use strict";var i=e(26);n.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:i.default,components:{FluroContentForm:i.default,FluroContentFormField:function(){return Promise.resolve().then(e.bind(null,36))},FluroPrivacySelect:function(){return e.e(54).then(e.bind(null,783))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},868:function(t,n,e){var i=e(1016);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,e(3).default)("16fdfa1c",i,!1,{})}}]);