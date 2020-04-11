(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{809:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("flex-column",[t.loading?[i("fluro-page-preloader",{attrs:{contain:""}})]:i("tabset",{attrs:{justified:!0,vertical:!0}},[i("tab",{attrs:{heading:"Basic Info"}},[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",[i("constrain",{attrs:{sm:""}},[i("div",{staticClass:"grid-list-xl"},[i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.title},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.domain},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.forwards},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)])],1)],1)],1),t._v(" "),i("tab",{attrs:{heading:"Authentication"}},[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",[i("constrain",{attrs:{sm:""}},[i("div",{staticClass:"grid-list-xl"},[i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.forceSSL},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.authenticationStyle},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)])],1)],1)],1),t._v(" "),"application"==t.model.authenticationStyle?[i("tab",{attrs:{heading:"Application Permissions"}},[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",[i("constrain",{attrs:{sm:""}},[i("h5",{attrs:{margin:""}},[t._v("Application Permissions")]),t._v(" "),i("p",[t._v("Add permissions here that will be attributed to this application's API Key whether a user is signed in or not.")]),t._v(" "),i("fluro-permission-select",{on:{input:t.modelUpdated},model:{value:t.model.permissionSets,callback:function(e){t.$set(t.model,"permissionSets",e)},expression:"model.permissionSets"}})],1)],1)],1)],1),t._v(" "),i("tab",{attrs:{heading:"User Permissions"}},[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",[i("constrain",{attrs:{sm:""}},[i("h5",{attrs:{margin:""}},[t._v("User Permissions")]),t._v(" "),i("p",[t._v("Add permissions here that will be attributed to a logged in user when signed in to this application. These will be merged with any existing permissions retrieved from a user's managed persona in the '"+t._s(t.application.title)+"' account")]),t._v(" "),i("fluro-permission-select",{on:{input:t.modelUpdated},model:{value:t.model.userPermissionSets,callback:function(e){t.$set(t.model,"userPermissionSets",e)},expression:"model.userPermissionSets"}})],1)],1)],1)],1),t._v(" "),i("tab",{attrs:{heading:"Advanced"}},[i("flex-column-body",{staticStyle:{background:"#fafafa"}},[i("v-container",[i("constrain",{attrs:{sm:""}},[i("h5",{attrs:{margin:""}},[t._v("Advanced")]),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.apipath},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.timezone},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.gaTrackingCode},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.supportEmail},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.favicon},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.headerInject},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),i("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.footerInject},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)],1)],1)],1)]:t._e()],2)],2)};o._withStripped=!0;var n=i(844),l=i(864),s=(i(27),{mixins:[n.a],components:{FluroPermissionSelect:l.a},asyncComputed:{},computed:{showOutline:function(){return!1},fieldsOutput:function(){var t=[];function e(e,i){i.key=e,t.push(i)}return(e("title",{title:"Title",minimum:1,maximum:1,type:"string"}),e("domain",{title:"Domain Name",minimum:1,maximum:1,type:"string",description:"Add a domain name for this application (without https://)",placeholder:"Eg. website.com"}),e("forwards",{title:"Forwarding Domains",minimum:0,maximum:0,type:"string",description:"Add domain names that should redirect to the primary domain name",placeholder:"Eg. www.website.com"}),e("forceSSL",{title:"Force SSL",minimum:0,maximum:1,type:"boolean",description:"Check this box to redirect all requests to https://"}),e("authenticationStyle",{title:"Authentication Style",minimum:0,maximum:1,type:"string",directive:"select",options:[{title:"Application",value:"application"},{title:"Fluro Browser Cookie",value:"global"}]}),e("apipath",{title:"API URL",minimum:0,maximum:1,type:"string",description:"Specify which API URL this application should use. If left blank, the default fluro api url will be used.",placeholder:"https://api.fluro.io"}),e("timezone",{title:"Timezone",minimum:0,maximum:1,type:"string",directive:"timezone-select",description:"Which timezone should be used for this application"}),e("gaTrackingCode",{title:"Google Analytics ID",minimum:0,maximum:1,type:"string",placeholder:"UA-XXXXXX",description:"Paste your GA tracking code to enable google analytics to track this site"}),e("supportEmail",{title:"Support Email Address",minimum:0,maximum:1,type:"email",placeholder:"support@yourdomain.com",description:"The default support/contact email for notifications and enquiries regarding this application"}),e("favicon",{title:"Favicon",minimum:0,maximum:1,type:"reference",params:{restrictType:"image"},description:"Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)"}),e("headerInject",{title:"Header Injection Code",minimum:0,maximum:1,type:"string",directive:"code",params:{syntax:"html"},description:"Include HTML that can be injected above the closing </head> tag"}),e("footerInject",{title:"Footer Injection Code",minimum:0,maximum:1,type:"string",directive:"code",params:{syntax:"html"},description:"Include HTML that can be injected above the closing </body> tag"}),t)}},methods:{modelUpdated:function(){this.update(this.model)}},data:function(){return{}}}),a=(i(947),i(0)),r=Object(a.a)(s,o,[],!1,null,"2b8f9d5f",null);r.options.__file="src/components/content/edit/panels/application.vue";e.default=r.exports},844:function(t,e,i){"use strict";var o=i(41);e.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:o.default,components:{FluroContentForm:o.default,FluroContentFormField:function(){return Promise.resolve().then(i.bind(null,60))},FluroPrivacySelect:function(){return i.e(44).then(i.bind(null,845))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},849:function(t,e,i){var o=i(860);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,i(6).default)("cf897b64",o,!1,{})},859:function(t,e,i){"use strict";var o=i(849);i.n(o).a},860:function(t,e,i){(t.exports=i(5)(!1)).push([t.i,".table[data-v-20ec38c8]{background:#fff;width:100%;border-collapse:collapse;padding:0;margin:0;border:1px solid rgba(0,0,0,0.1);box-shadow:0 1px 1px rgba(0,0,0,0.1);margin-bottom:25px}.table thead[data-v-20ec38c8]{text-transform:uppercase;letter-spacing:0.03em;font-weight:500;font-size:12px}.table th[data-v-20ec38c8],.table td[data-v-20ec38c8]{padding:10px;text-align:left;border-bottom:1px solid rgba(0,0,0,0.1);vertical-align:middle}.table th.column[data-v-20ec38c8],.table td.column[data-v-20ec38c8]{width:50%}.table th[data-v-20ec38c8]{background:rgba(0,0,0,0.05)}\n",""])},864:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"permission-select"},[t.model.length?[i("table",{staticClass:"table"},[t._m(0),t._v(" "),i("tbody",t._l(t.model,(function(e){return i("tr",[i("td",t._l(e.roles,(function(e){return i("div",[i("fluro-icon",{attrs:{type:"role",left:""}}),t._v(" "),i("strong",[t._v(t._s(e.title))])],1)})),0),t._v(" "),i("td",t._l(e.realms,(function(e){return i("div",[i("fluro-icon",{style:{color:e.bgColor},attrs:{icon:"circle",library:"fas"}}),t._v(" "+t._s(e.title)+"\n                        ")],1)})),0),t._v(" "),i("td",{staticClass:"text-xs-right"},[i("v-btn",{staticClass:"ma-0",attrs:{small:"",icon:""},on:{click:function(i){return t.remove(e)}}},[i("fluro-icon",{attrs:{icon:"times"}})],1)],1)])})),0)])]:t._e(),t._v(" "),i("fluro-card",[i("fluro-card-title",{staticClass:"border-bottom"},[i("h5",[t._v("Add permissions")]),t._v(" "),i("p",{staticClass:"help-block"},[t._v("\n                Select a combination of roles and realms then click add to grant permissions.\n            ")])]),t._v(" "),i("fluro-card-body",[i("v-container",{staticClass:"grid-list-md",attrs:{"pa-0":""}},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:"",md4:""}},[i("v-input",{staticClass:"no-flex"},[i("v-label",[t._v("Select a Role")]),t._v(" "),i("p",{staticClass:"help-block"},[t._v("Select a role")]),t._v(" "),i("fluro-content-select-button",{attrs:{block:"",type:"role",allDefinitions:!0,searchInheritable:!0},model:{value:t.proposed.roles,callback:function(e){t.$set(t.proposed,"roles",e)},expression:"proposed.roles"}})],1)],1),t._v(" "),i("v-flex",{attrs:{xs12:"",md5:""}},[i("v-input",{staticClass:"no-flex"},[i("v-label",[t._v("Select a Realm")]),t._v(" "),i("p",{staticClass:"help-block"},[t._v("Select where this role can be used")]),t._v(" "),i("fluro-realm-select",{attrs:{block:""},model:{value:t.proposed.realms,callback:function(e){t.$set(t.proposed,"realms",e)},expression:"proposed.realms"}})],1)],1),t._v(" "),i("v-flex",{attrs:{xs12:"",md3:""}},[i("v-input",{staticClass:"no-flex"},[t.$vuetify.breakpoint.mdAndUp?[i("v-label",[t._v(" ")]),t._v(" "),i("p",{staticClass:"help-block"},[t._v(" ")])]:t._e(),t._v(" "),i("v-btn",{staticClass:"ma-0",attrs:{disabled:!t.valid,block:"",color:"primary"},on:{click:t.add}},[t._v("\n                            Add\n                            "),i("fluro-icon",{attrs:{right:"",icon:"plus"}})],1)],2)],1)],1)],1)],1)],1)],2)};o._withStripped=!0;i(20),i(27);var n=i(84),l=i(75),s={components:{FluroRealmSelect:n.a,FluroContentSelectButton:l.a},mixins:[],props:{value:{type:Array,default:function(){return[]}}},data:function(){return{model:JSON.parse(JSON.stringify(this.value)),loading:!0,proposed:{roles:[],realms:[]}}},computed:{valid:function(){if(this.proposed.roles&&this.proposed.roles.length&&this.proposed.realms&&this.proposed.realms.length)return!0}},asyncComputed:{},watch:{value:function(t){this.model=t},model:function(){this.$emit("input",this.model)}},methods:{add:function(){console.log("ADD");var t=JSON.parse(JSON.stringify(this.proposed));this.model.push(t),this.proposed={realms:[],roles:[]}},remove:function(t){var e=this.model.indexOf(t);this.model.splice(e,1)}}},a=(i(859),i(0)),r=Object(a.a)(s,o,[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticClass:"column"},[this._v("Role")]),this._v(" "),e("th",{staticClass:"column"},[this._v("Realms")]),this._v(" "),e("th",[this._v(" ")])])])}],!1,null,"20ec38c8",null);r.options.__file="src/components/form/FluroPermissionSelect.vue";e.a=r.exports},867:function(t,e,i){var o=i(948);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,i(6).default)("e1e3bb90",o,!1,{})},947:function(t,e,i){"use strict";var o=i(867);i.n(o).a},948:function(t,e,i){(t.exports=i(5)(!1)).push([t.i,".hint[data-v-2b8f9d5f]{font-size:10px;opacity:0.5;color:inherit;display:block}\n",""])}}]);