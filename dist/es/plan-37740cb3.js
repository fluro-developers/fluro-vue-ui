import { be as _, bd as __vue_normalize__ } from './index-53cb5ffc.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-2120e551.js';

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
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
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
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=plan-37740cb3.js.map
