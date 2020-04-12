(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{754:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("flex-column",[t.loading?[s("fluro-page-preloader",{attrs:{contain:""}})]:s("tabset",{attrs:{justified:!0,vertical:!0},scopedSlots:t._u([{key:"menuprefix",fn:function(){return["edit"==t.context&&t.$vuetify.breakpoint.smAndUp?[s("flex-column-header",{staticStyle:{"text-align":"center"}},[s("div",{staticStyle:{padding:"10px","max-width":"200px",margin:"auto"}},[s("fluro-avatar-update",{attrs:{id:t.model._id,type:"persona"}})],1)])]:t._e()]},proxy:!0}])},[t._v(" "),s("tab",{attrs:{heading:"Login Details"}},[t._t("default",[s("flex-column-body",{staticStyle:{background:"#fafafa"}},[s("v-container",{staticClass:"grid-list-xl"},[s("constrain",{attrs:{sm:""}},[t.$vuetify.breakpoint.xsOnly?["edit"==t.context?[s("div",{staticStyle:{"max-width":"200px",margin:"auto"}},[s("fluro-avatar-update",{attrs:{id:t.model._id,type:"persona"}})],1)]:t._e()]:t._e(),t._v(" "),t.model.user?[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-input",{staticClass:"no-flex"},[s("v-label",[t._v("First Name")]),t._v(" "),s("Div",{staticClass:"lead"},[t._v(t._s(t.model.user.firstName))])],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-input",{staticClass:"no-flex"},[s("v-label",[t._v("Last Name")]),t._v(" "),s("Div",{staticClass:"lead"},[t._v(t._s(t.model.user.lastName))])],1)],1)],1),t._v(" "),s("v-input",{staticClass:"no-flex"},[s("v-label",[t._v("Email Address")]),t._v(" "),s("Div",{staticClass:"lead"},[t._v(t._s(t.model.user.email))])],1),t._v(" "),s("p"),t._v(" "),s("p"),t._v(" "),s("v-input",{staticClass:"no-flex"},[s("v-label",[t._v("Change User Details")]),t._v(" "),s("p",{staticClass:"help-block"},[t._v("\n                                        To change "+t._s(t.contextName)+" password\n                                        or email details click the button\n                                        below, this will send an invitation\n                                        to the user to create a new password\n                                        and then login to the system\n                                    ")]),t._v(" "),s("v-btn",{staticClass:"mx-0",attrs:{color:"primary",loading:t.resetting},on:{click:t.resetPassword}},[t._v("\n                                        Send Reset Request\n                                        "),s("fluro-icon",{attrs:{right:"",icon:"paper-plane"}})],1)],1)]:[s("h3",{attrs:{margin:""}},[t._v("Basic Details")]),t._v(" "),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm6:""}},[s("fluro-content-form-field",{attrs:{autofocus:!0,"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.firstName},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.lastName},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)],1),t._v(" "),s("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.collectionEmail},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})]],2)],1)],1)])],2),t._v(" "),s("tab",{attrs:{heading:"Access Passes"}},[t._t("default",[s("flex-column-body",{staticStyle:{background:"#fafafa"}},[s("v-container",{attrs:{"grid-list-xl":""}},[s("constrain",{attrs:{sm:""}},[s("h3",{attrs:{margin:""}},[t._v(t._s(t.contextName)+" Access Passes")]),t._v(" "),s("fluro-access-pass-select",{attrs:{host:t.model},on:{input:t.modelUpdated},model:{value:t.model.policies,callback:function(e){t.$set(t.model,"policies",e)},expression:"model.policies"}})],1)],1)],1)])],2),t._v(" "),s("tab",{attrs:{heading:"Individual Permissions"}},[t._t("default",[s("flex-column-body",{staticStyle:{background:"#fafafa"}},[s("v-container",{attrs:{"grid-list-xl":""}},[s("constrain",{attrs:{sm:""}},[s("h3",{attrs:{margin:""}},[t._v("\n                                "+t._s(t.contextName)+" Individual Permissions\n                            ")]),t._v(" "),s("fluro-permission-select",{on:{input:t.modelUpdated},model:{value:t.model.permissionSets,callback:function(e){t.$set(t.model,"permissionSets",e)},expression:"model.permissionSets"}})],1)],1)],1)])],2)],1)],2)};i._withStripped=!0;s(294);var n=s(85),o=s(793),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"access-pass-select"},[t.selected.length?s("v-input",{staticClass:"no-flex"},[s("h5",{attrs:{margin:""}},[t._v(t._s(t.selected.length)+" selected")]),t._v(" "),s("list-group",[s("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.selected,(function(e){return s("list-group-item",{key:e._id,scopedSlots:t._u([{key:"left",fn:function(){return[s("fluro-realm-bar",{attrs:{realm:e.realms}})]},proxy:!0},{key:"default",fn:function(){return[s("strong",[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"muted sm"},[t._v(t._s(e.description))])]},proxy:!0},{key:"right",fn:function(){return[s("v-btn",{staticClass:"ma-0",attrs:{small:"",icon:""},on:{click:function(s){return t.deselect(e)}}},[s("fluro-icon",{attrs:{icon:"times"}})],1)]},proxy:!0}],null,!0)})})),1)],1)],1):t._e(),t._v(" "),s("p"),t._v(" "),s("v-input",{staticClass:"no-flex"},[s("h5",[t._v("Available passes")]),t._v(" "),s("p",{staticClass:"help-block"},[t._v("Add passes to "+t._s(t.contextName)+" by selecting from available passes below")]),t._v(" "),s("list-group",[s("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.notSelected,(function(e){return s("list-group-item",{key:e._id,staticClass:"inactive",scopedSlots:t._u([{key:"left",fn:function(){return[s("fluro-realm-bar",{attrs:{realm:e.realms}})]},proxy:!0},{key:"default",fn:function(){return[s("strong",[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"muted sm"},[t._v(t._s(e.description))])]},proxy:!0},{key:"right",fn:function(){return[s("v-btn",{staticClass:"ma-0",attrs:{color:"primary",small:""},on:{click:function(s){return t.select(e)}}},[t._v("\n                        Add\n                        "),s("fluro-icon",{attrs:{right:"",icon:"plus"}})],1)]},proxy:!0}],null,!0)})})),1)],1)],1)],1)};a._withStripped=!0;s(22),s(25);var l=s(175),r=s(76),c=s(73),d={computed:{contextName:function(){return this.host?this.host.firstName?this.host.firstName:this.host.title||"":""},selected:function(){return _.chain(this.selection).orderBy((function(t){return t.title})).value()},notSelected:function(){var t=this;return _.chain(t.policies).filter((function(e){return!t.isSelected(e)})).orderBy((function(t){return t.title})).value()}},components:{FluroRealmDots:l.a,FluroContentSelectButton:c.default},mixins:[r.a],props:{host:{type:Object},value:{type:Array,default:function(){return[]}}},data:function(){return{loading:!0}},asyncComputed:{policies:{default:[],get:function(){var t=this;return new Promise((function(e,s){t.$fluro.api.get("/content/policy").then((function(s){e(s.data),t.loading=!1})).catch((function(e){s(e),t.loading=!1}))}))}}},created:function(){this.setSelection(this.value)},watch:{value:function(){this.setSelection(this.value)},selection:function(){this.$emit("input",this.selection)}},methods:{}},u=(s(994),s(0)),f=Object(u.a)(d,a,[],!1,null,"396459e2",null);f.options.__file="src/components/form/FluroAccessPassSelect.vue";var p=f.exports,m=s(813),v=s(342),h={props:{fields:{type:Array,default:function(){var t=[];function e(e,s){s.key=e,t.push(s)}return(e("firstName",{title:"First Name",minimum:1,maximum:1,type:"string",placeholder:"Eg. Jessica"}),e("lastName",{title:"Last Name",minimum:1,maximum:1,type:"string",placeholder:"Eg. Michaels"}),e("collectionEmail",{title:"Email Address",minimum:1,maximum:1,type:"string",description:"An invitation will be sent to this email address allowing the user to confirm and accept this persona",placeholder:"Eg. name@email.com"}),t)}}},mixins:[o.a],components:{FluroAccessPassSelect:p,FluroPermissionSelect:m.a,FluroAvatarUpdate:v.a,FluroRealmSelect:n.default},methods:{modelUpdated:function(){this.update(this.model)},resetPassword:function(){var t=this;return t.resetting=!0,t.$fluro.api.post("/user/reinvite/".concat(t.itemID)).then((function(e){t.resetting=!1;var s=t.model.collectionEmail;t.model.user&&(s=t.model.user.email),t.$fluro.notify("Instructions on how to reset password have been sent to ".concat(s))})).catch((function(e){t.$fluro.error(e),t.resetting=!1}))}},watch:{title:function(t){this.$set(this.model,"title",this.title),this.update(this.model)}},created:function(){this.model.policies||(this.model.policies=[])},asyncComputed:{},computed:{title:function(){return this.model&&this.model.firstName?"".concat(this.model.firstName," ").concat(this.model.lastName||""):""},contextName:function(){var t=this.model.firstName;return t&&t.length?(this.model.user&&(t="".concat(this.model.user.firstName)),_.endsWith(t,"s")?"".concat(t,"'"):"".concat(t,"'s")):""},showOutline:function(){return!1}},data:function(){return{resetting:!1}}},b=(s(996),Object(u.a)(h,i,[],!1,null,"25ae2d3b",null));b.options.__file="src/components/content/edit/panels/persona.vue";e.default=b.exports},793:function(t,e,s){"use strict";var i=s(40);e.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:i.default,components:{FluroContentForm:i.default,FluroContentFormField:function(){return Promise.resolve().then(s.bind(null,59))},FluroPrivacySelect:function(){return s.e(53).then(s.bind(null,794))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},798:function(t,e,s){var i=s(809);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,s(5).default)("cf897b64",i,!1,{})},808:function(t,e,s){"use strict";var i=s(798);s.n(i).a},809:function(t,e,s){(t.exports=s(4)(!1)).push([t.i,".table[data-v-20ec38c8]{background:#fff;width:100%;border-collapse:collapse;padding:0;margin:0;border:1px solid rgba(0,0,0,0.1);box-shadow:0 1px 1px rgba(0,0,0,0.1);margin-bottom:25px}.table thead[data-v-20ec38c8]{text-transform:uppercase;letter-spacing:0.03em;font-weight:500;font-size:12px}.table th[data-v-20ec38c8],.table td[data-v-20ec38c8]{padding:10px;text-align:left;border-bottom:1px solid rgba(0,0,0,0.1);vertical-align:middle}.table th.column[data-v-20ec38c8],.table td.column[data-v-20ec38c8]{width:50%}.table th[data-v-20ec38c8]{background:rgba(0,0,0,0.05)}\n",""])},813:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"permission-select"},[t.model.length?[s("table",{staticClass:"table"},[t._m(0),t._v(" "),s("tbody",t._l(t.model,(function(e){return s("tr",[s("td",t._l(e.roles,(function(e){return s("div",[s("fluro-icon",{attrs:{type:"role",left:""}}),t._v(" "),s("strong",[t._v(t._s(e.title))])],1)})),0),t._v(" "),s("td",t._l(e.realms,(function(e){return s("div",[s("fluro-icon",{style:{color:e.bgColor},attrs:{icon:"circle",library:"fas"}}),t._v(" "+t._s(e.title)+"\n                        ")],1)})),0),t._v(" "),s("td",{staticClass:"text-xs-right"},[s("v-btn",{staticClass:"ma-0",attrs:{small:"",icon:""},on:{click:function(s){return t.remove(e)}}},[s("fluro-icon",{attrs:{icon:"times"}})],1)],1)])})),0)])]:t._e(),t._v(" "),s("fluro-card",[s("fluro-card-title",{staticClass:"border-bottom"},[s("h5",[t._v("Add permissions")]),t._v(" "),s("p",{staticClass:"help-block"},[t._v("\n                Select a combination of roles and realms then click add to grant permissions.\n            ")])]),t._v(" "),s("fluro-card-body",[s("v-container",{staticClass:"grid-list-md",attrs:{"pa-0":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",md4:""}},[s("v-input",{staticClass:"no-flex"},[s("v-label",[t._v("Select a Role")]),t._v(" "),s("p",{staticClass:"help-block"},[t._v("Select a role")]),t._v(" "),s("fluro-content-select-button",{attrs:{block:"",type:"role",allDefinitions:!0,searchInheritable:!0},model:{value:t.proposed.roles,callback:function(e){t.$set(t.proposed,"roles",e)},expression:"proposed.roles"}})],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",md5:""}},[s("v-input",{staticClass:"no-flex"},[s("v-label",[t._v("Select a Realm")]),t._v(" "),s("p",{staticClass:"help-block"},[t._v("Select where this role can be used")]),t._v(" "),s("fluro-realm-select",{attrs:{block:""},model:{value:t.proposed.realms,callback:function(e){t.$set(t.proposed,"realms",e)},expression:"proposed.realms"}})],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",md3:""}},[s("v-input",{staticClass:"no-flex"},[t.$vuetify.breakpoint.mdAndUp?[s("v-label",[t._v(" ")]),t._v(" "),s("p",{staticClass:"help-block"},[t._v(" ")])]:t._e(),t._v(" "),s("v-btn",{staticClass:"ma-0",attrs:{disabled:!t.valid,block:"",color:"primary"},on:{click:t.add}},[t._v("\n                            Add\n                            "),s("fluro-icon",{attrs:{right:"",icon:"plus"}})],1)],2)],1)],1)],1)],1)],1)],2)};i._withStripped=!0;s(27),s(25);var n=s(85),o=s(73),a={components:{FluroRealmSelect:n.default,FluroContentSelectButton:o.default},mixins:[],props:{value:{type:Array,default:function(){return[]}}},data:function(){return{model:JSON.parse(JSON.stringify(this.value)),loading:!0,proposed:{roles:[],realms:[]}}},computed:{valid:function(){if(this.proposed.roles&&this.proposed.roles.length&&this.proposed.realms&&this.proposed.realms.length)return!0}},asyncComputed:{},watch:{value:function(t){this.model=t},model:function(){this.$emit("input",this.model)}},methods:{add:function(){console.log("ADD");var t=JSON.parse(JSON.stringify(this.proposed));this.model.push(t),this.proposed={realms:[],roles:[]}},remove:function(t){var e=this.model.indexOf(t);this.model.splice(e,1)}}},l=(s(808),s(0)),r=Object(l.a)(a,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"column"},[this._v("Role")]),this._v(" "),e("th",{staticClass:"column"},[this._v("Realms")]),this._v(" "),e("th",[this._v(" ")])])])}],!1,null,"20ec38c8",null);r.options.__file="src/components/form/FluroPermissionSelect.vue";e.a=r.exports},866:function(t,e,s){var i=s(995);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,s(5).default)("76de0dfb",i,!1,{})},867:function(t,e,s){var i=s(997);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,s(5).default)("2ccf9fe6",i,!1,{})},994:function(t,e,s){"use strict";var i=s(866);s.n(i).a},995:function(t,e,s){(t.exports=s(4)(!1)).push([t.i,".access-pass-select[data-v-396459e2] .list-group-item-content{padding-left:10px}.access-pass-select .flip-list-move[data-v-396459e2]{transition:transform 0.5s}\n",""])},996:function(t,e,s){"use strict";var i=s(867);s.n(i).a},997:function(t,e,s){(t.exports=s(4)(!1)).push([t.i,".hint[data-v-25ae2d3b]{font-size:10px;opacity:0.5;color:inherit;display:block}.bordered[data-v-25ae2d3b]{border:1px solid rgba(0,0,0,0.1);box-shadow:0 2px 4px rgba(0,0,0,0.1)}.bordered[data-v-25ae2d3b] .tabset-menu{background:#eee}\n",""])}}]);