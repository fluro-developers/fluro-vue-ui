import { bf as _, bd as __vue_normalize__, be as __vue_create_injector__ } from './index-bbff8ae0.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-068ca7a0.js';

//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var script = {
  props: {
    'value': {
      type: Object
    },
    'index': {
      type: Number
    },
    'plan': {
      type: Object
    } // 'teams': {
    //     type:Array,
    // }

  },

  data() {
    return {
      actionsOpen: false,
      row: this.value
    };
  },

  created() {
    if (!this.row.notes) {
      this.row.notes = {};
    }
  },

  computed: {
    type() {
      return this.row.type;
    },

    teams() {
      return this.plan.teams;
    },

    columns() {
      var self = this;
      return _.map(self.teams, function (team) {
        return {
          title: team,
          key: team
        };
      });
    }

  },
  filters: {
    mins(sec_num) {
      if (!sec_num) {
        return '';
      } /////////////////////////////////////


      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60; /////////////////////////////////////
      //Clear string if 0

      hours = hours ? hours : '';
      minutes = minutes ? minutes : '';
      seconds = seconds ? seconds : ''; /////////////////////////////////////

      function pad(str) {
        return ("0" + str).slice(-2);
      } /////////////////////////////////////
      /////////////////////////////////////


      if (hours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      } // if (minutes && seconds) {
      //     return `${pad(minutes)}:${pad(seconds)}`;
      // }


      if (minutes && seconds) {
        return `${minutes}m ${seconds}s `;
      }

      if (minutes) {
        return `${minutes} mins`;
      }

      return `${seconds}s`;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',{class:_vm.type},[_c('th',{staticClass:"duration-cell"},[_c('div',{staticClass:"cell"},[_c('div',[_vm._v(_vm._s(_vm.row.time))]),_vm._v(" "),_c('div',{staticClass:"sm muted"},[_c('em',[_vm._v(_vm._s(_vm._f("mins")(_vm.row.duration)))])])])]),_vm._v(" "),_c('td',[_c('v-layout',[_c('v-flex',[_c('div',{staticClass:"row-title"},[_c('div',{staticClass:"cell"},[_c('strong',{staticClass:"row-title-text"},[_vm._v(_vm._s(_vm.row.title))])])])]),_vm._v(" "),(_vm.type == 'song')?_c('div',[_c('div',{staticClass:"row-song-key cell"},[_vm._v("\n                    "+_vm._s(_vm.row.key)+"\n                ")])]):_vm._e()],1),_vm._v(" "),((_vm.type != 'breaker') && (_vm.type != 'start'))?_c('div',{staticClass:"row-detail"},[(_vm.row.detail)?_c('div',{staticClass:"cell"}):_vm._e()]):_vm._e()],1),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('td',{key:column.key},[_c('div',{staticClass:"cell",domProps:{"innerHTML":_vm._s(_vm.row.notes[column.key])}})])})],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-56cc078b_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.duration-cell{font-weight:400}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
/////////////////////////////////

var script$1 = {
  props: {
    config: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    PlanRow: __vue_component__
  },
  mixins: [FluroContentViewMixin],

  created() {
    var self = this;

    _.each(self.item.schedules, function (row) {
      self.$set(row, 'guid', self.$fluro.utils.guid());
    });

    self.calculateDurations();
  },

  methods: {
    calculateDurations() {
      var self = this;
      var startIndex = self.startRowIndex;

      if (startIndex == -1) {
        startIndex = 0;
      } //////////////////////////////////////////////////


      var eventStartDate = _.get(self.item, 'event.startDate');

      var planStartDate = _.get(self.item, 'startDate'); // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); 


      var startDate = (eventStartDate ? new Date(eventStartDate) : false) || (planStartDate ? new Date(planStartDate) : false) || new Date(); //////////////////////////////////////////////////

      function newTime(elapsed) {
        var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));

        if (elapsed < 0) {
          clonedDate.setTime(startDate.getTime() - -1 * elapsed);
        } else {
          clonedDate.setTime(startDate.getTime() + elapsed);
        }

        return self.$fluro.date.formatDate(clonedDate, 'h:mma');
      }

      var rows = self.item.schedules;
      var before = rows.slice(0, startIndex).reverse();
      var after = rows.slice(startIndex); ///////////////////////////////////////

      _.reduce(before, function (elapsed, row, index) {
        if (row.duration) {
          elapsed += parseInt(row.duration) * 1000;
        }

        self.$set(row, 'time', newTime(-elapsed));
        self.$set(row, 'elapsedTime', -elapsed);
        return elapsed;
      }, 0);

      _.reduce(after, function (elapsed, row, index) {
        self.$set(row, 'time', newTime(elapsed));

        if (row.duration) {
          elapsed += parseInt(row.duration) * 1000;
        }

        self.$set(row, 'elapsedTime', elapsed);
        return elapsed;
      }, 0);
    }

  },
  computed: {
    times() {
      return _.map(this.model.schedules, 'duration').join('-');
    },

    startRow() {
      return this.model.schedules[this.startRowIndex];
    },

    startRowIndex() {
      var self = this;

      var index = _.findIndex(self.item.schedules, {
        type: 'start'
      });

      return index;
    },

    teams() {
      var self = this;
      return self.item.teams;
    },

    columns() {
      var self = this;
      return _.chain(self.teams).compact().map(function (team) {
        return {
          title: team,
          key: team
        };
      }).value();
    }

  },

  data() {
    // var array = [];
    // _.times(200, function() {
    //     array.push({
    //         id: array.length
    //     });
    // });
    return {
      actionsOpen: false,
      drag: false,
      dragOptions: {} // array

    };
  }

};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Plan"}},[_c('div',{staticClass:"plan-table-wrapper"},[_c('div',{ref:"container",staticClass:"plan-table"},[_c('table',{staticClass:"main-table",attrs:{"id":"main-table"}},[_c('thead',[_c('tr',[_c('th',{staticClass:"shrink center"},[_c('fluro-icon',{attrs:{"icon":"clock"}})],1),_vm._v(" "),_c('th',{staticClass:"detail"},[_vm._v("Detail")]),_vm._v(" "),_vm._l((_vm.columns),function(column,key){return _c('th',{key:key},[_vm._v("\n                                    "+_vm._s(column.title)+"\n                                ")])})],2)]),_vm._v(" "),_c('tbody',_vm._l((_vm.item.schedules),function(row,index){return _c('plan-row',{key:row.guid,attrs:{"index":index,"plan":_vm.item},model:{value:(_vm.item.schedules[index]),callback:function ($$v) {_vm.$set(_vm.item.schedules, index, $$v);},expression:"item.schedules[index]"}})}),1)])])])]),_vm._v(" "),(_vm.definition)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " details")}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title))]),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.definedFields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})],1)],1)],1)])],2):_vm._e()],1)],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-a17e2e1c_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.plan-table-wrapper{position:relative;flex:1;display:flex;overflow:hidden}.plan-table-wrapper .cog-btn{position:absolute;top:0;right:0;width:38px;z-index:3;text-align:center}.plan-table{flex:1;position:relative;width:100%;z-index:1;margin:auto;overflow:auto;background:#f0f2f5;height:100%}.plan-table p{margin-bottom:5px!important}.plan-table mention{font-size:.8em;font-weight:500;background:rgba(0,0,0,.1);border-radius:100px;padding:2px 4px;display:inline-block;margin:0 4px}.plan-table .cell{padding:4px 8px;word-wrap:break-word;white-space:pre-wrap}.plan-table .placeholder{padding-bottom:2px;padding-top:2px;opacity:0;font-size:.8em;font-style:italic}.plan-table .row-song-key{min-width:30px;display:block;text-align-last:center;appearance:none;border:none;outline:0;font-weight:500}.plan-table .row-song-key,.plan-table .row-title{font-size:1.1em}.plan-table .row-song-key .cell,.plan-table .row-title .cell{padding-bottom:0}.plan-table .row-detail .cell{padding-top:0}.plan-table table{width:100%;min-width:600px;margin:auto;border-collapse:separate;border-spacing:0}.plan-table table td,.plan-table table th{text-align:left;padding:5px;border-bottom:1px solid #e8edf1;border-right:1px solid #e8edf1;height:inherit;white-space:nowrap}.plan-table table tr{height:1px;background:#fff}.plan-table table tr .dragger{opacity:0}.plan-table table tr:hover .placeholder{opacity:.5}.plan-table table tr:hover .dragger{opacity:.5}.plan-table table tr th:first-child,.plan-table table tr th:last-child{background:#fff}.plan-table table tr:nth-child(odd){background:#fcfcfc}.plan-table table tr:nth-child(odd) th:first-child,.plan-table table tr:nth-child(odd) th:last-child{background:#fcfcfc}.plan-table table tr.song{background:#fffbdd;color:#6b5f31}.plan-table table tr.song th:first-child,.plan-table table tr.song th:last-child{background:#fffbdd}.plan-table table tr.breaker{background:#f0f2f5}.plan-table table tr.breaker td,.plan-table table tr.breaker th{border-right:none;border-top:1px solid #e8edf1;border-bottom:1px solid #e8edf1}.plan-table table tr.breaker td .cell,.plan-table table tr.breaker th .cell{padding:15px}.plan-table table tr.breaker td.row-title .cell,.plan-table table tr.breaker th.row-title .cell{padding-top:inherit}.plan-table table tr.breaker th:first-child,.plan-table table tr.breaker th:last-child{background:#f0f2f5}.plan-table table tr.breaker .row-title-text{opacity:.7;text-transform:uppercase;font-weight:600;letter-spacing:.05em;font-size:.8em}.plan-table table tr.start{background:#93d3c8}.plan-table table tr.start td,.plan-table table tr.start th{border-right:none;border-top:1px solid #e8edf1;border-bottom:1px solid #e8edf1}.plan-table table tr.start td .cell,.plan-table table tr.start th .cell{padding:5px}.plan-table table tr.start td.row-title .cell,.plan-table table tr.start th.row-title .cell{padding-top:inherit}.plan-table table tr.start th:first-child,.plan-table table tr.start th:last-child{background:#93d3c8}.plan-table table tr.start .row-title-text{opacity:.7;text-transform:uppercase;font-weight:600;letter-spacing:.05em;font-size:.8em}.plan-table table td{vertical-align:top;padding:0;position:relative}.plan-table table td.duration-cell{text-align:center}.plan-table table td:hover{background:rgba(42,212,185,.05)}.plan-table table td .fluro-editor,.plan-table table td p:last-child{margin-bottom:0!important}.plan-table table td .fluro-inline-edit{min-height:100%;min-width:100%;display:block;width:100%;position:relative;float:left}.plan-table table td .fluro-inline-edit{width:100%;height:100%;display:block}.plan-table table td .fluro-inline-edit .inline-edit-default{height:auto!important;width:auto!important}.plan-table table td .fluro-inline-edit .inline-edit-input{background:#fff;position:absolute;left:0;top:0;right:0}.plan-table table td .fluro-inline-edit .inline-edit-input.inline-show{border-radius:3px;border:3px solid #2ad4b9;box-shadow:0 4px 10px rgba(0,0,0,.3);z-index:3}.plan-table table td .fluro-inline-edit input,.plan-table table td .fluro-inline-edit select{margin:0;max-width:100%;width:100%;display:block;padding:4px 8px;line-height:1}.plan-table table thead th{background:#fff;font-size:.8em;position:-webkit-sticky;position:sticky;top:0;z-index:3;border-bottom:3px solid rgba(0,0,0,.1)}.plan-table table thead th.center{text-align:center}.plan-table table thead th.shrink{width:1px}.plan-table table thead th.detail{max-width:300px}.plan-table table tfoot td,.plan-table table tfoot th{position:-webkit-sticky;position:sticky;bottom:0;z-index:4;background:#f0f2f5!important;border:none!important;border-top:1px solid rgba(0,0,0,.1)!important}.plan-table table th:first-child,.plan-table table th:last-child{position:-webkit-sticky;position:sticky;z-index:2;vertical-align:center!important;text-align:center}.plan-table table th:first-child:first-child,.plan-table table th:last-child:first-child{left:0;width:1px;border-right:1px solid #e8edf1}.plan-table table th:first-child:last-child,.plan-table table th:last-child:last-child{right:0;width:1px;border-left:1px solid #e8edf1}.plan-table table tfoot th:first-child,.plan-table table tfoot th:last-child,.plan-table table thead th:first-child,.plan-table table thead th:last-child{z-index:5}.plan-table table tr.sortable-ghost{opacity:.3}.plan-table table tr.sortable-ghost td,.plan-table table tr.sortable-ghost th{border-color:greyscale(#89a3b7,1%)!important;background:greyscale(#89a3b7,1%)!important}.plan-table table td .fluro-editor-textarea{min-height:0}.plan-table table td .fluro-editor-textarea>div{border-radius:0!important;padding:4px 8px!important;border:none!important}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=plan-0fba314a.js.map
