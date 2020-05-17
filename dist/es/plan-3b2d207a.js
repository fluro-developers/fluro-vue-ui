import { bf as _, bd as __vue_normalize__, be as __vue_create_injector__, m as FluroInlineEdit, aE as FluroCodeEditor } from './index-7451aec5.js';
import Vue from 'vue';
import draggable from 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-0a2ca6c6.js';

//
var script = {
  props: {
    'value': {
      type: [Number, String]
    }
  },

  data() {
    return {
      model: parseInt(this.value || 0)
    };
  },

  methods: {
    focus() {
      this.$emit('focus');
    },

    blur() {
      this.$emit('blur');
    }

  },
  computed: {
    number: {
      get() {
        return this.$fluro.utils.hhmmss(this.model);
      },

      set(input) {
        if (!input) {
          input = '00:00:00';
        }

        var pieces = input.split(':');

        if (!pieces.length) {
          pieces = ['00', '00', '00'];
        }

        if (pieces.length == 1) {
          pieces.unshift('00');
          pieces.push('00');
        } else if (pieces.length == 2) {
          pieces.unshift('00');
        } // } else if (pieces.length < 2) {
        //     pieces.unshift('00');
        //     pieces.unshift('00');
        // }
        //Ensure we have 2 digits


        input = _.map(pieces, function (piece) {
          if (piece.length < 2) {
            return `0${piece}`;
          } else {
            return piece.slice(0, 2);
          }
        }).join(':');
        var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);

        if (matches) {
          input = +matches[1] * (60 * 60) + +matches[2] * 60 + +matches[3];
          this.model = input;
          this.$emit('input', this.model);
        } // var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);
        // if (matches) {
        //     
        //     this.model = input;
        //     this.$emit('input', this.model);
        // } else {
        //     console.log('INPUIT', input);
        //     input.split(':');
        //     if(input)
        // }
        // console.log('INPUT MATCH', matches)

      }

    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{directives:[{name:"model",rawName:"v-model.lazy",value:(_vm.number),expression:"number",modifiers:{"lazy":true}}],attrs:{"pattern":"[0-9]*","placeholder":"Duration (mins)","inputmode":"numeric"},domProps:{"value":(_vm.number)},on:{"focus":function($event){return _vm.$emit('focus')},"blur":_vm.blur,"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.blur($event)},"change":function($event){_vm.number=$event.target.value;}}})};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-432316e2_0", { source: ".border-top[data-v-432316e2]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-432316e2]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-432316e2]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-432316e2]{border-left:1px solid rgba(0,0,0,.05)}input[data-v-432316e2]{width:100%;min-width:70px;text-align:center;font-size:.9em;padding:5px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-432316e2";
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
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

let ColumnCell = Vue.extend({
  props: {
    'value': {
      type: String
    },
    'row': {
      type: Object
    },
    'column': {
      type: Object
    },
    'index': {
      type: Number
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  components: {
    FluroInlineEdit,
    FluroEditor: FluroCodeEditor
  },
  computed: {
    detailBodyOptions() {
      return {
        disable: {
          bubble: false,
          bar: true
        }
      };
    },

    placeholder() {
      return `${this.column.title} Notes`;
    },

    input: {
      get() {
        var self = this;
        return self.model;
      },

      set(input) {
        var self = this;
        self.model = input;
        self.$emit('input', self.model);
      }

    }
  },
  template: `
    <td>
    <fluro-inline-edit v-if="row.type != 'breaker'">
        <template v-slot:default>
            <div class="cell " v-html="model"></div>
        </template>
        <template v-slot:edit="{props, blur, focus}">
            <fluro-editor @focus="focus" @blur="blur" v-model="input" :options="detailBodyOptions" :placeholder="placeholder" />
        </template>
    </fluro-inline-edit>
    </td>`
}); //////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var script$1 = {
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
  components: {
    ColumnCell,
    FluroInlineEdit,
    FluroEditor: FluroCodeEditor,
    DurationPicker: __vue_component__
  },
  watch: {
    value(val) {
      this.row = val;
    }

  },

  mounted() {
    var self = this;
    self.$nextTick(function () {
      if (self.row.isNew) {
        // delete self.row.isNew;
        if (self.$refs.title) {
          self.$refs.title.focus();
          self.$refs.title.select();
          console.log('ADDED');
        }
      }
    });
  },

  data() {
    return {
      actionsOpen: false,
      row: this.value,
      added: false
    };
  },

  created() {
    if (!this.row.notes) {
      this.row.notes = {};
    }
  },

  methods: {
    swap() {
      if (this.row.type != 'song') {
        return;
      }

      this.$emit('swap');
    },

    remove() {
      this.$emit('delete');
    }

  },
  computed: {
    songKeys() {
      return ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    },

    availableActions() {
      var self = this;
      var actions = [{
        title: 'Add Row',
        icon: 'plus',

        click() {
          self.$emit('add', {
            index: self.index,
            type: 'item'
          });
        }

      }, {
        title: 'Add Songs',
        icon: 'music',

        click() {
          self.$emit('add', {
            index: self.index,
            type: 'song'
          });
        }

      }, {
        title: 'Add Section',
        icon: 'megaphone',

        click() {
          self.$emit('add', {
            index: self.index,
            type: 'breaker'
          });
        }

      }];

      if (self.type != 'start') {
        actions.push({
          title: 'Duplicate this row',
          icon: 'copy',

          click() {
            self.$emit('duplicate');
          }

        });
      }

      return actions;
    },

    type() {
      return this.row.type; // switch(this.row.type) {
      //     case 'breaker':
      //     break;
      // }
    },

    detailBodyOptions() {
      return {
        disable: {
          bubble: false,
          bar: true
        }
      };
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',{class:_vm.type},[_c('th',{staticClass:"handle"},[_c('v-btn',{staticClass:"ma-0",attrs:{"icon":"","small":""}},[_c('fluro-icon',{staticClass:"dragger",attrs:{"icon":"arrows"}})],1)],1),_vm._v(" "),_c('td',{staticClass:" duration-cell"},[((_vm.type != 'breaker') && (_vm.type != 'start'))?_c('fluro-inline-edit',{attrs:{"enabled":_vm.row.editDuration},scopedSlots:_vm._u([{key:"default",fn:function(){return [_c('div',{staticClass:"cell"},[_c('div',[_vm._v(_vm._s(_vm.row.time))]),_vm._v(" "),_c('div',{staticClass:"sm muted"},[_c('em',[_vm._v(_vm._s(_vm._f("mins")(_vm.row.duration)))])])])]},proxy:true},{key:"edit",fn:function(ref){
var props = ref.props;
var blur = ref.blur;
var focus = ref.focus;
return [_c('duration-picker',{on:{"focus":function($event){return focus($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return blur($event)},"blur":blur},model:{value:(_vm.row.duration),callback:function ($$v) {_vm.$set(_vm.row, "duration", $$v);},expression:"row.duration"}})]}}],null,false,1803891112)}):_vm._e()],1),_vm._v(" "),_c('td',[_c('v-layout',[_c('v-flex',[_c('div',{staticClass:"row-title"},[_c('fluro-inline-edit',{attrs:{"enabled":_vm.row.editTitle},scopedSlots:_vm._u([{key:"default",fn:function(){return [_c('div',{staticClass:"cell"},[_c('strong',{staticClass:"row-title-text"},[_vm._v(_vm._s(_vm.row.title))])])]},proxy:true},{key:"edit",fn:function(ref){
var props = ref.props;
var blur = ref.blur;
var focus = ref.focus;
return [_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.row.title),expression:"row.title"}],ref:"title",domProps:{"value":(_vm.row.title)},on:{"focus":function($event){return focus($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return blur($event)},"blur":blur,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.row, "title", $event.target.value);}}})]}}])})],1)]),_vm._v(" "),(_vm.type == 'song')?_c('div',[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.row.key),expression:"row.key"}],staticClass:"row-song-key cell",attrs:{"placeholder":"Select a Key"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.row, "key", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},[_c('option',{attrs:{"value":""}},[_vm._v("(Select Key)")]),_vm._v(" "),_vm._l((_vm.songKeys),function(key){return _c('option',{domProps:{"value":key}},[_vm._v(_vm._s(key))])})],2)]):_vm._e()],1),_vm._v(" "),((_vm.type != 'breaker') && (_vm.type != 'start'))?_c('div',{staticClass:"row-detail"},[_c('fluro-inline-edit',{attrs:{"enabled":_vm.row.editDetail},scopedSlots:_vm._u([{key:"default",fn:function(){return [(_vm.row.detail)?_c('div',{staticClass:"cell"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.row.detail)}})]):_c('div',{staticClass:"cell placeholder"},[_vm._v("Click here to add extra details")])]},proxy:true},{key:"edit",fn:function(ref){
var props = ref.props;
var blur = ref.blur;
var focus = ref.focus;
return [_c('fluro-editor',{attrs:{"options":_vm.detailBodyOptions,"placeholder":"Add extra detail and notes"},on:{"focus":focus,"blur":blur},model:{value:(_vm.row.detail),callback:function ($$v) {_vm.$set(_vm.row, "detail", $$v);},expression:"row.detail"}})]}}],null,false,3266597843)})],1):_vm._e()],1),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('column-cell',{key:column.key,attrs:{"column":column,"row":_vm.row},model:{value:(_vm.row.notes[column.key]),callback:function ($$v) {_vm.$set(_vm.row.notes, column.key, $$v);},expression:"row.notes[column.key]"}})}),_vm._v(" "),_c('th',{staticStyle:{"padding":"0"}},[_c('v-menu',{attrs:{"attach":"","nudge-left":10,"offset-x":"","left":"","bottom":_vm.index < _vm.plan.schedules.length/2,"top":_vm.index > _vm.plan.schedules.length/2,"transition":"slide-x-transition"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({staticClass:"ma-0",attrs:{"icon":""}},on),[(_vm.actionsOpen)?_c('fluro-icon',{attrs:{"icon":"times"}}):_c('fluro-icon',{attrs:{"icon":"ellipsis-v"}})],1)]}}]),model:{value:(_vm.actionsOpen),callback:function ($$v) {_vm.actionsOpen=$$v;},expression:"actionsOpen"}},[_vm._v(" "),_c('div',{staticStyle:{"background":"#fff","width":"250px","text-align":"left"}},[_c('v-list',{attrs:{"dense":""}},[_c('v-list-tile',{attrs:{"disabled":""}},[_c('v-label',{staticStyle:{"overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[_c('fluro-icon',{attrs:{"type":"plan","left":""}}),_vm._v(_vm._s(_vm.row.title)+"\n                        ")],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),(_vm.row.type =='song')?_c('v-list-tile',{on:{"click":function($event){return _vm.swap()}}},[_c('fluro-icon',{attrs:{"icon":"retweet","left":""}}),_vm._v("Replace song\n                        ")],1):_vm._e(),_vm._v(" "),_vm._l((_vm.availableActions),function(action){return _c('v-list-tile',{on:{"click":action.click}},[_c('fluro-icon',{attrs:{"icon":action.icon,"left":""}}),_vm._v(_vm._s(action.title)+"\n                        ")],1)}),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-list-tile',{on:{"click":function($event){return _vm.remove()}}},[_c('fluro-icon',{attrs:{"icon":"trash-alt","left":""}}),_vm._v("Delete\n                        ")],1)],2)],1)])],1)],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-cff72a82_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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

//
/////////////////////////////////

var script$2 = {
  components: {
    draggable,
    PlanRow: __vue_component__$1
  },
  props: {},
  mixins: [FluroContentEditMixin],

  created() {
    var self = this;

    _.each(self.model.schedules, function (row) {
      self.$set(row, 'guid', self.$fluro.utils.guid());
    });

    self.calculateDurations();
  },

  watch: {
    'times': 'calculateDurations'
  },
  methods: {
    calculateDurations() {
      var self = this;
      var startIndex = self.startRowIndex;

      if (startIndex == -1) {
        startIndex = 0;
      } //////////////////////////////////////////////////


      var eventStartDate = _.get(self.model, 'event.startDate');

      var planStartDate = _.get(self.model, 'startDate'); // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); 


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

      var rows = self.model.schedules;
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
    },

    updateColumns() {
      this.$set(this.model, "teams", this.model.teams.slice());
    },

    selectSongs() {
      var self = this;
      return self.$fluro.global.select("song", {
        minimum: 0,
        maximum: 0
      }, true);
    },

    injectSongs(index) {
      var self = this;
      return self.selectSongs().then(function (songs) {
        // console.log('Selection', songs);
        var rows = _.map(songs, function (song) {
          var duration = self.getDuration(song);
          var key = self.getDefaultKey(song);
          return {
            title: song.title,
            type: "song",
            links: [song._id],
            _id: song._id,
            duration,
            key,
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          };
        }); /////////////////////////////////////////


        _.each(rows, function (row, i) {
          //Mark that we want to scroll to this row
          if (index || index == 0) {
            var targetIndex = index + 1 + i;
            self.model.schedules.splice(targetIndex, 0, row);
          } else {
            self.model.schedules.push(row);
          }
        });
      });
    },

    createRows(type) {
      var self = this;

      switch (type) {
        case "breaker":
          return [{
            title: "Section",
            type: "breaker",
            duration: 0,
            links: [],
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          }];

        case "start":
          return [{
            title: "Event Start",
            type: "start",
            duration: 0,
            links: [],
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          }];

        default:
          return [{
            title: "New item",
            duration: 300,
            links: [],
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          }];
      }
    },

    remove(index) {
      this.model.schedules.splice(index, 1);
      console.log("Removed item");
    },

    addFromRow(details) {
      var self = this;

      if (details.type == "song") {
        return self.injectSongs(details.index);
      } //Create the rows


      var rows = self.createRows(details.type);

      _.each(rows, function (row, i) {
        //Mark that we want to scroll to this row
        self.model.schedules.splice(details.index + 1 + i, 0, row);
      });
    },

    duplicate(index) {
      var row = JSON.parse(JSON.stringify(this.model.schedules[index]));
      row.guid = this.$fluro.utils.guid();
      this.model.schedules.splice(index + 1, 0, row);
    },

    getDuration(song) {
      return 300;
    },

    getDefaultKey(song) {
      return "";
    },

    swap(index) {
      var self = this;
      return self.selectSongs().then(function (songs) {
        var rows = _.map(songs, function (song) {
          var duration = self.getDuration(song);
          var key = self.getDefaultKey(song);
          return {
            title: song.title,
            type: "song",
            links: [song._id],
            _id: song._id,
            duration,
            key,
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          };
        }); /////////////////////////////////////////


        _.each(rows, function (row, i) {
          self.model.schedules.splice(index, i === 0 ? 1 : 0, row); // //Mark that we want to scroll to this row
          // if (index || index == 0) {
          //     var targetIndex = (index + 1) + i;
          //     self.model.schedules.splice(targetIndex, 0, row)
          // } else {
          //     self.model.schedules.push(row)
          // }
        });
      });
    },

    add(type) {
      var self = this;

      if (!self.model.schedules) {
        self.$set(self.model, "schedules", []);
      }

      if (type == "song") {
        return self.injectSongs();
      }

      var rows = self.createRows(type);

      _.each(rows, function (row) {
        //Mark that we want to scroll to this row
        self.model.schedules.push(row);
      });

      var container = self.$refs.container;
      container.scrollTo({
        top: container.scrollHeight + container.offsetHeight,
        left: 0,
        behavior: "smooth"
      }); ///////////////////////////////////////
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

      var index = _.findIndex(self.model.schedules, {
        type: 'start'
      });

      return index;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField("startDate", {
        title: "Plan Starts",
        minimum: 0,
        maximum: 1,
        type: "date",
        directive: "datetimepicker"
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    columnEditField() {
      return {
        key: "teams",
        minimum: 0,
        maximum: 0,
        title: "Extra Column",
        type: "string",
        placeholder: "Eg. Lighting, MC, Band"
      };
    },

    teams() {
      var self = this;
      return self.model.teams;
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Plan"}},[_c('div',{staticClass:"plan-table-wrapper"},[_c('v-menu',{staticStyle:{"position":"relative"},attrs:{"attach":"","offset-x":"","left":"","close-on-content-click":false,"transition":"slide-x-transition"},nativeOn:{"click":function($event){$event.stopPropagation();}},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('div',_vm._g({staticClass:"cog-btn"},on),[_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0",attrs:{"content":"Configure Columns","small":"","icon":""}},[_c('fluro-icon',{attrs:{"icon":"cog"}})],1)],1)]}}])},[_vm._v(" "),_c('v-card',{attrs:{"tile":""}},[_c('v-container',{staticStyle:{"background":"#f0f2f5"},attrs:{"pa-3":""}},[_c('fluro-content-form-field',{attrs:{"field":_vm.columnEditField},on:{"input":_vm.updateColumns},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('div',{ref:"container",staticClass:"plan-table"},[_c('table',{staticClass:"main-table",attrs:{"id":"main-table"}},[_c('thead',[_c('tr',[_c('th'),_vm._v(" "),_c('th',{staticClass:"shrink center"},[_c('fluro-icon',{attrs:{"icon":"clock"}})],1),_vm._v(" "),_c('th',{staticClass:"detail"},[_vm._v("Detail")]),_vm._v(" "),_vm._l((_vm.columns),function(column,key){return _c('th',{key:key},[_vm._v("\n                                    "+_vm._s(column.title)+"\n                                ")])}),_vm._v(" "),_c('th',[_c('div',{staticStyle:{"width":"28px","height":"22px"}})])],2)]),_vm._v(" "),_c('draggable',_vm._b({attrs:{"tag":"tbody","handle":".handle"},on:{"start":function($event){_vm.drag = true;},"end":function($event){_vm.drag = false;},"sort":function($event){return _vm.calculateDurations()}},model:{value:(_vm.model.schedules),callback:function ($$v) {_vm.$set(_vm.model, "schedules", $$v);},expression:"model.schedules"}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model.schedules),function(row,index){return _c('plan-row',{key:row.guid,attrs:{"index":index,"plan":_vm.model},on:{"delete":function($event){return _vm.remove(index)},"swap":function($event){return _vm.swap(index)},"duplicate":function($event){return _vm.duplicate(index)},"add":_vm.addFromRow},model:{value:(_vm.model.schedules[index]),callback:function ($$v) {_vm.$set(_vm.model.schedules, index, $$v);},expression:"model.schedules[index]"}})}),1),_vm._v(" "),_c('tfoot',[_c('tr',[_c('th',{attrs:{"colspan":"2"}}),_vm._v(" "),_c('td',[_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-2",staticStyle:{"border":"1px solid #ddd","background":"#fff"},attrs:{"content":"Add Row"},on:{"click":function($event){return _vm.add('row')}}},[_c('fluro-icon',{attrs:{"icon":"plus"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-2",staticStyle:{"border":"1px solid #ddd","background":"#fff"},attrs:{"content":"Add Songs"},on:{"click":function($event){return _vm.add('song')}}},[_c('fluro-icon',{attrs:{"icon":"music"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-2",staticStyle:{"border":"1px solid #ddd","background":"#fff"},attrs:{"content":"Add Section"},on:{"click":function($event){return _vm.add('breaker')}}},[_c('fluro-icon',{attrs:{"icon":"megaphone"}})],1),_vm._v(" "),(_vm.startRowIndex == -1)?_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-2",staticStyle:{"border":"1px solid #ddd","background":"#fff"},attrs:{"content":"Add Start Time"},on:{"click":function($event){return _vm.add('start')}}},[_c('fluro-icon',{attrs:{"icon":"clock"}})],1):_vm._e()],1),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('td')}),_vm._v(" "),_c('th')],2)])],1)])],1)]),_vm._v(" "),(_vm.definition)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " details")}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title))]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)])],2):_vm._e()],1)],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-28a4bf7a_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.plan-table-wrapper{position:relative;flex:1;display:flex;overflow:hidden}.plan-table-wrapper .cog-btn{position:absolute;top:0;right:0;width:38px;z-index:3;text-align:center}.plan-table{flex:1;position:relative;width:100%;z-index:1;margin:auto;overflow:auto;background:#f0f2f5;height:100%}.plan-table p{margin-bottom:5px!important}.plan-table mention{font-size:.8em;font-weight:500;background:rgba(0,0,0,.1);border-radius:100px;padding:2px 4px;display:inline-block;margin:0 4px}.plan-table .cell{padding:4px 8px;word-wrap:break-word;white-space:pre-wrap}.plan-table .placeholder{padding-bottom:2px;padding-top:2px;opacity:0;font-size:.8em;font-style:italic}.plan-table .row-song-key{min-width:30px;display:block;text-align-last:center;appearance:none;border:none;outline:0;font-weight:500}.plan-table .row-song-key,.plan-table .row-title{font-size:1.1em}.plan-table .row-song-key .cell,.plan-table .row-title .cell{padding-bottom:0}.plan-table .row-detail .cell{padding-top:0}.plan-table table{width:100%;min-width:600px;margin:auto;border-collapse:separate;border-spacing:0}.plan-table table td,.plan-table table th{text-align:left;padding:5px;border-bottom:1px solid #e8edf1;border-right:1px solid #e8edf1;height:inherit;white-space:nowrap}.plan-table table tr{height:1px;background:#fff}.plan-table table tr .dragger{opacity:0}.plan-table table tr:hover .placeholder{opacity:.5}.plan-table table tr:hover .dragger{opacity:.5}.plan-table table tr th:first-child,.plan-table table tr th:last-child{background:#fff}.plan-table table tr:nth-child(odd){background:#fcfcfc}.plan-table table tr:nth-child(odd) th:first-child,.plan-table table tr:nth-child(odd) th:last-child{background:#fcfcfc}.plan-table table tr.song{background:#fffbdd;color:#6b5f31}.plan-table table tr.song th:first-child,.plan-table table tr.song th:last-child{background:#fffbdd}.plan-table table tr.breaker{background:#f0f2f5}.plan-table table tr.breaker td,.plan-table table tr.breaker th{border-right:none;border-top:1px solid #e8edf1;border-bottom:1px solid #e8edf1}.plan-table table tr.breaker td .cell,.plan-table table tr.breaker th .cell{padding:15px}.plan-table table tr.breaker td.row-title .cell,.plan-table table tr.breaker th.row-title .cell{padding-top:inherit}.plan-table table tr.breaker th:first-child,.plan-table table tr.breaker th:last-child{background:#f0f2f5}.plan-table table tr.breaker .row-title-text{opacity:.7;text-transform:uppercase;font-weight:600;letter-spacing:.05em;font-size:.8em}.plan-table table tr.start{background:#93d3c8}.plan-table table tr.start td,.plan-table table tr.start th{border-right:none;border-top:1px solid #e8edf1;border-bottom:1px solid #e8edf1}.plan-table table tr.start td .cell,.plan-table table tr.start th .cell{padding:5px}.plan-table table tr.start td.row-title .cell,.plan-table table tr.start th.row-title .cell{padding-top:inherit}.plan-table table tr.start th:first-child,.plan-table table tr.start th:last-child{background:#93d3c8}.plan-table table tr.start .row-title-text{opacity:.7;text-transform:uppercase;font-weight:600;letter-spacing:.05em;font-size:.8em}.plan-table table td{vertical-align:top;padding:0;position:relative}.plan-table table td.duration-cell{text-align:center}.plan-table table td:hover{background:rgba(42,212,185,.05)}.plan-table table td .fluro-editor,.plan-table table td p:last-child{margin-bottom:0!important}.plan-table table td .fluro-inline-edit{min-height:100%;min-width:100%;display:block;width:100%;position:relative;float:left}.plan-table table td .fluro-inline-edit{width:100%;height:100%;display:block}.plan-table table td .fluro-inline-edit .inline-edit-default{height:auto!important;width:auto!important}.plan-table table td .fluro-inline-edit .inline-edit-input{background:#fff;position:absolute;left:0;top:0;right:0}.plan-table table td .fluro-inline-edit .inline-edit-input.inline-show{border-radius:3px;border:3px solid #2ad4b9;box-shadow:0 4px 10px rgba(0,0,0,.3);z-index:3}.plan-table table td .fluro-inline-edit input,.plan-table table td .fluro-inline-edit select{margin:0;max-width:100%;width:100%;display:block;padding:4px 8px;line-height:1}.plan-table table thead th{background:#fff;font-size:.8em;position:-webkit-sticky;position:sticky;top:0;z-index:3;border-bottom:3px solid rgba(0,0,0,.1)}.plan-table table thead th.center{text-align:center}.plan-table table thead th.shrink{width:1px}.plan-table table thead th.detail{max-width:300px}.plan-table table tfoot td,.plan-table table tfoot th{position:-webkit-sticky;position:sticky;bottom:0;z-index:4;background:#f0f2f5!important;border:none!important;border-top:1px solid rgba(0,0,0,.1)!important}.plan-table table th:first-child,.plan-table table th:last-child{position:-webkit-sticky;position:sticky;z-index:2;vertical-align:center!important;text-align:center}.plan-table table th:first-child:first-child,.plan-table table th:last-child:first-child{left:0;width:1px;border-right:1px solid #e8edf1}.plan-table table th:first-child:last-child,.plan-table table th:last-child:last-child{right:0;width:1px;border-left:1px solid #e8edf1}.plan-table table tfoot th:first-child,.plan-table table tfoot th:last-child,.plan-table table thead th:first-child,.plan-table table thead th:last-child{z-index:5}.plan-table table tr.sortable-ghost{opacity:.3}.plan-table table tr.sortable-ghost td,.plan-table table tr.sortable-ghost th{border-color:greyscale(#89a3b7,1%)!important;background:greyscale(#89a3b7,1%)!important}.plan-table table td .fluro-editor-textarea{min-height:0}.plan-table table td .fluro-editor-textarea>div{border-radius:0!important;padding:4px 8px!important;border:none!important}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = __vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$2;
//# sourceMappingURL=plan-3b2d207a.js.map
