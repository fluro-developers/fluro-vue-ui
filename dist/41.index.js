(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1016:function(t,i,e){"use strict";var n=e(877);e.n(n).a},1017:function(t,i,e){(t.exports=e(4)(!1)).push([t.i,".search-box[data-v-47bd2277]{padding:10px}\n",""])},775:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("flex-column",[t.loadingAnything?[e("fluro-page-preloader",{attrs:{contain:""}})]:[e("tabset",{attrs:{justified:!0}},[e("tab",{attrs:{heading:"Basic Permissions"}},[e("tabset",{attrs:{justified:!0,vertical:!0,persist:!0},scopedSlots:t._u([{key:"menuprefix",fn:function(){return[e("div",{staticClass:"search-box"},[e("search-input",{attrs:{placeholder:"Search permissions"},model:{value:t.search,callback:function(i){t.search=i},expression:"search"}})],1)]},proxy:!0}])},[t._v(" "),t._l(t.filteredBasic,(function(i){return e("tab",{attrs:{heading:i.title+" "+t.of(i),muted:!t.enabled(i).length}},[e("v-container",[e("h4",{attrs:{margin:""}},[t._v(t._s(i.title))]),t._v(" "),e("list-group",t._l(i.permissions,(function(i){return e("fluro-toggle-item",{attrs:{inactive:!t.permissionSelected(i)},nativeOn:{click:function(e){return t.togglePermission(i)}}},[e("strong",[t._v(t._s(i.title))]),t._v(" "),e("div",{staticClass:"sm muted"},[t._v(t._s(i.description))])])})),1)],1)],1)}))],2)],1),t._v(" "),e("tab",{attrs:{heading:"Defined Permissions"}},[e("tabset",{attrs:{justified:!0,vertical:!0,persist:!0},scopedSlots:t._u([{key:"menuprefix",fn:function(){return[e("div",{staticClass:"search-box"},[e("search-input",{attrs:{placeholder:"Search permissions"},model:{value:t.search,callback:function(i){t.search=i},expression:"search"}})],1)]},proxy:!0}])},[t._v(" "),t._l(t.filteredDefined,(function(i){return e("tab",{attrs:{heading:i.title+" "+t.of(i),muted:!t.enabled(i).length}},[e("v-container",[e("h4",{attrs:{margin:""}},[t._v(t._s(i.title))]),t._v(" "),e("list-group",t._l(i.permissions,(function(i){return e("fluro-toggle-item",{attrs:{inactive:!t.permissionSelected(i)},nativeOn:{click:function(e){return t.togglePermission(i)}}},[e("strong",[t._v(t._s(i.title))]),t._v(" "),e("div",{staticClass:"sm muted"},[t._v(t._s(i.description))])])})),1)],1)],1)}))],2)],1),t._v(" "),e("tab",{attrs:{heading:t.informationPanelTitle}},[e("flex-column-body",{staticStyle:{background:"#fafafa"}},[e("v-container",{attrs:{fluid:""}},[e("constrain",{attrs:{sm:""}},[e("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.title},on:{input:t.update},model:{value:t.model,callback:function(i){t.model=i},expression:"model"}}),t._v(" "),e("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.firstLine},on:{input:t.update},model:{value:t.model,callback:function(i){t.model=i},expression:"model"}}),t._v(" "),t.definition&&t.definition.fields&&t.definition.fields.length?[e("h4",{attrs:{margin:""}},[t._v(t._s(t.definition.title)+" Information")]),t._v(" "),e("fluro-content-form",{attrs:{options:t.options,fields:t.definition.fields},model:{value:t.model.data,callback:function(i){t.$set(t.model,"data",i)},expression:"model.data"}})]:t._e()],2)],1)],1)],1)],1)]],2)};n._withStripped=!0;e(22),e(107),e(77),e(78),e(27),e(14);var s=e(793),o=e(153),r=e(329),a=(e(25),{components:{FluroToggleItem:r.a,SearchInput:o.a},created:function(){},data:function(){return{search:"",loadingPermissions:!0}},mixins:[s.a],methods:{of:function(t){var i=t.permissions.length,e=this.enabled(t);return e.length?"".concat(e.length," / ").concat(i):""},enabled:function(t){var i=_.map(t.permissions,"value");return _.intersection(this.model.permissions,i)},togglePermission:function(t){if(this.model.permissions||this.$set(this.model,"permissions",[]),this.permissionSelected(t)){var i=this.model.permissions.indexOf(t.value);-1!=i&&this.model.permissions.splice(i,1)}else this.model.permissions.push(t.value)},permissionSelected:function(t){return _.includes(this.model.permissions,t.value)}},asyncComputed:{tree:{default:[],get:function(){var t=this;return t.loadingPermissions=!0,new Promise((function(i,e){return t.$fluro.access.retrievePermissions().then((function(e){_.each(e,(function(t){t.searchString="".concat(t.title," ").concat(t.plural).toLowerCase(),t.permissionsString=_.map(t.permissions,(function(t){return t.searchString="".concat(t.title).toLowerCase(),t.searchString})).join(" ")})),i(e),console.log("GOT EM!",e),t.loadingPermissions=!1})).catch((function(i){e(i),t.loadingPermissions=!1}))}))}}},computed:{informationPanelTitle:function(){return this.definition?"".concat(this.definition.title," Information"):"Role Information"},filtered:function(){if(!this.search||!this.search.length)return console.log("No search words"),this.tree;var t=this.search.toLowerCase();return console.log("Filter by",t),_.chain(this.tree).map((function(i){if(i.searchString.includes(t))return i;if(i.permissionsString.includes(t)){var e=JSON.parse(JSON.stringify(i));if(e.permissions=_.filter(e.permissions,(function(i){return i.searchString.includes(t)})),e.permissions.length)return e}})).compact().value()},filteredBasic:function(){return _.filter(this.filtered,(function(t){return!t.parentType}))},filteredDefined:function(){return _.filter(this.filtered,(function(t){return t.parentType}))},loadingAnything:function(){return this.loading||this.loadingPermissions},fieldsOutput:function(){var t=[];function i(i,e){e.key=i,t.push(e)}return(i("title",{title:"Title",minimum:1,maximum:1,type:"string"}),i("firstLine",{title:"Description",description:"Enter a one line description summarizing what this role is for and the permissions it grants",minimum:0,maximum:1,type:"string"}),t)}}}),l=(e(1016),e(0)),c=Object(l.a)(a,n,[],!1,null,"47bd2277",null);c.options.__file="src/components/content/edit/panels/role.vue";i.default=c.exports},793:function(t,i,e){"use strict";var n=e(40);i.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:n.default,components:{FluroContentForm:n.default,FluroContentFormField:function(){return Promise.resolve().then(e.bind(null,59))},FluroPrivacySelect:function(){return e.e(53).then(e.bind(null,794))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},877:function(t,i,e){var n=e(1017);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e(5).default)("151a2c0f",n,!1,{})}}]);