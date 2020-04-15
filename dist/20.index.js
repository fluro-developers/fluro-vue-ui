(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{768:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("flex-column",[t.loading?[n("fluro-page-preloader",{attrs:{contain:""}})]:[n("tabset",{attrs:{justified:!0,vertical:!0}},[n("tab",{attrs:{heading:"Details"}},[n("flex-column-body",{staticStyle:{background:"#fafafa"}},[n("v-container",{attrs:{fluid:""}},[n("constrain",{attrs:{sm:""}},[n("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.title},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),t._v(" "),n("grade-manager",{model:{value:t.model.grades,callback:function(e){t.$set(t.model,"grades",e)},expression:"model.grades"}}),t._v(" "),n("fluro-panel",[n("fluro-panel-title",[n("div",{staticClass:"no-border-no-background",on:{click:function(e){return t.toggleAutoGraduate()}}},[n("fluro-toggle-item",{attrs:{inactive:!t.model.autoGraduate}},[t._v("Auto-Graduate Students")])],1)]),t._v(" "),t.model.autoGraduate?n("fluro-panel-body",[n("v-layout",{attrs:{column:""}},[n("v-flex",[n("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.graduationDate},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1),t._v(" "),n("v-flex",[n("fluro-content-form-field",{attrs:{"form-fields":t.formFields,outline:t.showOutline,options:t.options,field:t.fieldHash.graduateTo},on:{input:t.update},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}})],1)],1)],1):t._e()],1)],1)],1)],1)],1),t._v(" "),t.definition&&t.definition.fields&&t.definition.fields.length?n("tab",{attrs:{heading:t.definition.title+" Information"}},[n("fluro-content-form",{attrs:{options:t.options,fields:t.definition.fields},model:{value:t.model.data,callback:function(e){t.$set(t.model,"data",e)},expression:"model.data"}})],1):t._e()],1)]],2)};i._withStripped=!0;var o=n(149),a=n(806),r=n(910),l=(n(25),{components:{FluroEditor:o.default,GradeManager:r.a},created:function(){},mixins:[a.a],computed:{fieldsOutput:function(){var t=[];function e(e,n){n.key=e,t.push(n)}return(e("title",{title:"Title",minimum:1,maximum:1,type:"string"}),e("graduationDate",{title:"Graduation Date",minimum:0,maximum:1,type:"date",directive:"datetimepicker",defaultValues:[new Date]}),e("graduateTo",{title:"Graduate To",description:"Which academic calendar does a contact graduate to if they reach the end of the grades in this calendar",minimum:0,maximum:1,type:"reference",params:{restrictType:"academic"}}),t)}},methods:{toggleAutoGraduate:function(){this.model.autoGraduate?this.model.autoGraduate=!1:this.model.autoGraduate=!0}},data:function(){return{}}}),d=(n(938),n(0)),s=Object(d.a)(l,i,[],!1,null,null,null);s.options.__file="src/components/content/edit/panels/academic.vue";e.default=s.exports},806:function(t,e,n){"use strict";var i=n(40);e.a={props:{config:{type:Object,required:!0},context:{type:String,default:"new"}},data:function(){return{loading:!1}},mounted:function(){this.$set(this.model,"_type",this.config.type.definitionName)},extends:i.default,components:{FluroContentForm:i.default,FluroContentFormField:function(){return Promise.resolve().then(n.bind(null,60))},FluroPrivacySelect:function(){return n.e(55).then(n.bind(null,807))}},computed:{type:function(){return this.config.type},typeName:function(){return this.type?this.type.definitionName:""},itemID:function(){return this.model._id},definition:function(){return this.config.definition},definedFields:function(){return this.definition&&this.definition.fields&&this.definition.fields.length?this.definition.fields:[]},readableContentType:function(){return this.$fluro.types.readable(this.config.definition?this.config.definition.definitionName:this.config.type.definitionName)},fullBody:function(){return this.definition&&this.definition.data&&this.definition.data.fullBody},hideBody:function(){return this.definition&&this.definition.data&&this.definition.data.hideBody},titleLabel:function(){return"Title"},bodyLabel:function(){return"Body"}},methods:{}}},812:function(t,e,n){var i=n(835);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(5).default)("091db644",i,!1,{})},834:function(t,e,n){"use strict";var i=n(812);n.n(i).a},835:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".ghost-dragging-class{opacity:0.5;background:#c8ebfb}\n",""])},836:function(t,e,n){var i=n(939);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(5).default)("6864f8c7",i,!1,{})},910:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("list-group",[n("draggable",t._b({attrs:{list:t.model,"ghost-class":"ghost-dragging-class"},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1}}},"draggable",t.dragOptions,!1),t._l(t.model,(function(e,i){return n("list-group-item",{key:JSON.stringify(t.area)},[n("v-layout",{attrs:{"align-center":""}},[n("v-flex",[n("strong",[t._v(t._s(e.title))])]),t._v(" "),n("v-flex",{attrs:{shrink:""}},[n("fluro-confirm-button",{attrs:{content:"Remove"},on:{click:function(e){return t.remove(i)}},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.confirming;return[n("v-btn",{staticStyle:{transition:"all 0.1s",width:"100%"},attrs:{flat:"",block:"",color:i?"red":""}},[t._v(t._s(i?"Confirm?":"Remove"))])]}}],null,!0)})],1)],1)],1)})),1)],1),t._v(" "),n("fluro-panel",[n("fluro-panel-title",[t._v("Add a grade")]),t._v(" "),n("fluro-panel-body",[n("form",{on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.add()}}},[n("v-layout",[n("v-flex",[n("fluro-content-form",{ref:"form",attrs:{fields:t.fields},model:{value:t.proposed,callback:function(e){t.proposed=e},expression:"proposed"}})],1),t._v(" "),n("v-flex",{attrs:{shrink:""}},[n("v-btn",{attrs:{type:"submit"},on:{click:function(e){return t.add()}}},[t._v("Add")])],1)],1)],1)])],1)],1)};i._withStripped=!0;var o=n(341),a=n(40),r={props:{value:{type:Array}},components:{FluroContentForm:a.default,FluroConfirmButton:o.default,draggable:function(){return Promise.resolve().then(n.t.bind(null,805,7))}},data:function(){return{model:this.value,proposed:{},dragOptions:{},drag:!1}},methods:{add:function(){var t=JSON.parse(JSON.stringify(this.proposed));t.title&&t.title.length&&(t.key=_.camelCase(t.title),delete t.row,this.model.push(t),this.proposed={})},remove:function(t){this.model.splice(t,1)}},computed:{fields:function(){var t,e=[];return(t={type:"group",sameLine:!0,fields:[{title:"Grade Title",minimum:1,maximum:1,type:"string",key:"title"},{title:"Grade Description",minimum:0,maximum:1,type:"string",key:"description"}]}).key="row",e.push(t),e}}},l=(n(834),n(0)),d=Object(l.a)(r,i,[],!1,null,null,null);d.options.__file="src/components/content/edit/components/GradeManager.vue";e.a=d.exports},938:function(t,e,n){"use strict";var i=n(836);n.n(i).a},939:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,".no-border-no-background .toggle-item{border:none !important;background:none !important;font-size:14px;padding:0px}\n",""])}}]);