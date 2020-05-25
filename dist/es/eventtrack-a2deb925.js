import { aJ as FluroContentForm, be as __vue_normalize__, bf as _ } from './index-1a9a32db.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-95b9c444.js';
import { M as MessagingEventManager, L as LocationSelector } from './LocationSelector-69e16c45.js';
import './FluroExclusiveSelector-2c7c6fe5.js';
import { R as ReminderEventManager } from './ReminderEventManager-d53142e4.js';

//
var script = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    config: {
      type: Object,
      required: true
    },
    slotData: {
      type: Object
    }
  },
  components: {
    FluroContentForm
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {
    var self = this;

    if (!self.model.title) {
      self.model.title = self.slotData.title;
    }
  },

  methods: {},
  computed: {
    customFields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('confirmationStatus', {
        title: 'Create As',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: [{
          name: 'Proposed',
          value: ''
        }, {
          name: 'Await Confirmation',
          value: 'unknown'
        }, {
          name: 'Confirmed',
          value: 'confirmed'
        }]
      });
      addField('contacts', {
        title: `People`,
        minimum: 0,
        maximum: self.slotData.maximum,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
        }
      }); /////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  }
};

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-container',{staticClass:"full-width",attrs:{"grid-list-xl":"","fluid":"","pa-1":""}},[_c('v-layout',{attrs:{"align-center":"","row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":"","md2":"","grid-list-xl":""}},[_c('h5',{attrs:{"margin":""}},[_vm._v(_vm._s(model.title))])]),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm8":"","md6":"","grid-list-xl":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contacts},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":"","md4":"","grid-list-xl":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.confirmationStatus},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1)]}}]),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})};
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
var script$1 = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    FluroContentForm,
    DefaultRosterSlot: __vue_component__
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {
    var self = this;

    if (!self.model.slots && _.get(self.data, 'data.slots')) {
      self.$set(self.model, 'slots', []);

      _.each(self.data.data.slots, function (slot, ind) {
        self.$set(self.model.slots, ind, {});
      });
    }
  },

  methods: {
    update() {
      return this.$emit('input', this.model);
    }

  },
  computed: {
    customFields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('create', {
        title: `Create ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes("roster") ? '' : 'Roster'}`,
        description: `Create a ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes("roster") ? '' : 'Roster'} for events created in this track if one does not already exist`,
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('managedOwner', {
        title: `${_.get(self.data, 'title')} Owner`,
        description: "Set the owner of rosters created by this track",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'persona'
        }
      }); /////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var options = ref.options;
return [_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":"","pb-4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.create},on:{"input":_vm.update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),(model.create)?_c('v-flex',{attrs:{"xs12":"","sm12":"","pb-5":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.managedOwner},on:{"input":_vm.update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),(model.create && _vm.data.data && _vm.data.data.slots)?_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('list-group',{staticClass:"full-width"},_vm._l((_vm.data.data.slots),function(slot,ind){return _c('list-group-item',{staticClass:"full-width"},[_c('default-roster-slot',{attrs:{"config":_vm.config,"slotData":_vm.data.data.slots[ind]},on:{"input":_vm.update},model:{value:(model.slots[ind]),callback:function ($$v) {_vm.$set(model.slots, ind, $$v);},expression:"model.slots[ind]"}})],1)}),1)],1):_vm._e()],1)]}}]),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)};
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

//
var script$2 = {
  props: {
    value: {
      type: Array
    },
    config: {
      type: Object,
      required: true
    },
    rosterOptions: {
      type: Array,
      required: true
    }
  },

  created() {// var self = this;
    // var mapped = _.map(self.model, function(m) {
    //     return m.definition;
    // });
    // if (!self.value) {
    //     self.model = [];
    // } else {
    //     self.model = self.value;
    // }
    // _.each(self.rosterOptions, function(val) {
    //     if (mapped.includes(val.definitionName)) {
    //         self.$set(self.workingModel, val.definitionName, _.filter(self.model, function(m) {
    //             return m.definition == val.definitionName;
    //         })[0]);
    //     } else {
    //         self.$set(self.workingModel, val.definitionName, {
    //             definition: val.definitionName,
    //         });
    //     }
    // });
  },

  components: {
    DefaultRosterComponent: __vue_component__$1
  },

  data() {
    return {
      model: this.value,
      workingModel: {}
    };
  },

  methods: {
    getTitle(def) {
      return _.get(def, 'title');
    },

    updateModel(val) {
      var self = this; //console.log('HELLO');

      var find = _.find(self.model, function (o) {
        return val.definition == o.definition;
      }); //console.log('FIND',find, self.model[find])


      if (!find && val.create) {
        self.model.push(val);
      } else if (val.create) {
        self.model[find] = val;
      } else {
        self.model.splice(find, 1);
      }
    },

    iconObject(model) {

      if (model.create) {
        return {
          icon: 'check-circle',
          library: 'fas',
          color: '#4cc650'
        };
      } else return;
    },

    muted(model) {
      return !model.create;
    }

  },
  watch: {}
};

/* script */
const __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.workingModel)?_c('div',[_c('fluro-panel',[_c('tabset',{attrs:{"justified":true,"vertical":false}},_vm._l((_vm.rosterOptions),function(def,ind){return _c('tab',{attrs:{"heading":_vm.getTitle(def),"muted":_vm.muted(_vm.workingModel[def.definitionName]),"icon":_vm.iconObject(_vm.workingModel[def.definitionName])}},[_c('fluro-panel-body',[_c('default-roster-component',{attrs:{"config":_vm.config,"data":def},on:{"input":_vm.updateModel},model:{value:(_vm.workingModel[def.definitionName]),callback:function ($$v) {_vm.$set(_vm.workingModel, def.definitionName, $$v);},expression:"workingModel[def.definitionName]"}})],1)],1)}),1)],1)],1):_vm._e()};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//

var script$3 = {
  components: {
    DefaultRosterManager: __vue_component__$2,
    ReminderEventManager,
    MessagingEventManager,
    LocationSelector
  },
  mixins: [FluroContentEditMixin],

  data() {
    return {
      eventList: null
    };
  },

  created() {
    var self = this;

    if (!self.model.messages) {
      self.$set(self.model, 'messages', []);
    }

    if (!self.model._id) {
      self.$set(self.model, 'autoRecur', false);
    }

    if (!self.model.defaultLocations) {
      self.$set(self.model, 'defaultLocations', []);
    }

    if (!self.model.defaultRooms) {
      self.$set(self.model, 'defaultRooms', []);
    }

    if (!self.model.defaultRosters) {
      self.$set(self.model, 'defaultRosters', []);
    }
  },

  /**
  mounted() {
      if(!this.eventList) {
          console.log('Create and mount')
          this.eventList = this.createEventList();
      }
  },
  /**/
  methods: {
    /**
    createEventList() {
         var self = this;
        if(!self.model || !self.model._id) {
            return;
        }
         //Load the list view component
        var ListView = import('@/router/routes/List.vue');
        var ListViewInstanceConstructor = Vue.extend(ListView);
         
        //Setup the list settings
        var includeArchivedByDefault = true;
        var dateFilterEnabled = true;
        var groupingFunction = self.$fluro.date.groupEventByDate
        var allDefinitions = true;
        var searchInheritable = false;
        var dateFilterPresets = [];
        var dateFilterDefault;
         var lockFilter = {
            operator: 'and',
            filters: [{
                key: 'track',
                comparator: '==',
                value: self.model._id,
                dataType: 'reference',
            }],
        }
         /////////////////////////////////////////////////
         var initialDefaultSort = {
             sortKey: 'startDate',
            sortDirection: 'asc',
            sortType: 'date',
        }
         /////////////////////////////////////////////////
         var initialDefaultFilters = {
            operator: 'and',
            filters: [{
                operator: 'and',
                filters: [{
                    key: 'status',
                    comparator: 'in',
                    values: ['active', 'draft', 'archived'],
                }, ]
            }]
        }
         ///////////////////////////////////////
         var now = new Date();
         dateFilterPresets.push({
            title: 'This Week',
            startDate: moment().startOf('week').toDate(),
            endDate: moment().endOf('week').toDate(),
        });
         dateFilterPresets.push({
            title: 'Last Week',
            startDate: moment().subtract(1, 'weeks').startOf('week').toDate(),
            endDate: moment().subtract(1, 'weeks').endOf('week').toDate(),
        });
         dateFilterPresets.push({
            title: 'This Month',
            startDate: moment().startOf('month').toDate(),
            endDate: moment().endOf('month').toDate(),
        });
         dateFilterPresets.push({
            title: 'Last Month',
            startDate: moment().subtract(1, 'months').startOf('week').toDate(),
            endDate: moment().subtract(1, 'months').endOf('week').toDate(),
        });
         dateFilterPresets.push({
            title: 'This Year',
            startDate: moment().startOf('year').toDate(),
            endDate: moment().endOf('year').toDate(),
        });
         dateFilterPresets.push({
            title: 'Last Year',
            startDate: moment().subtract(1, 'years').startOf('week').toDate(),
            endDate: moment().subtract(1, 'years').endOf('week').toDate(),
        });
          dateFilterDefault = {
            startDate: now, //moment().subtract(12, 'months').toDate(),
            endDate: moment().endOf('year').toDate(), //endDate: now,
        }
         //////////////////////////////////
         var propsData = {
            type: 'event',
            initialDefaultFilters,
            includeArchivedByDefault,
            initialDefaultSort,
            dateFilterEnabled,
            groupingFunction,
            allDefinitions,
            dateFilterPresets,
            dateFilterDefault,
            searchInheritable,
            lockFilter,
        }
          //////////////////////////////////////////////////
         return new ListViewInstanceConstructor({
            propsData
        })
     },
    /**/
    toggleAutoRecur() {
      //console.log('INIT TOGGLE');
      var self = this;

      if (!self.model.autoRecur) {
        //console.log('COLLECTED IS FALSY', self.model.autoRecur);
        return self.$set(self.model, 'autoRecur', true);
      } else {
        //console.log('COLLECTED IS TRUTHY', self.model.autoRecur);
        return self.$set(self.model, 'autoRecur', false);
      }
    }

  },
  computed: {
    fieldsOutput() {
      var self = this;
      var array = [];
      var periodOptions; //console.log('SELF', self);

      if (self.model.recurCount != 1) {
        periodOptions = [{
          name: 'Days',
          value: 'days'
        }, {
          name: 'Weeks',
          value: 'weeks'
        }, {
          name: 'Months',
          value: 'months'
        }, {
          name: 'Years',
          value: 'years'
        }];
      } else {
        periodOptions = [{
          name: 'Day',
          value: 'days'
        }, {
          name: 'Week',
          value: 'weeks'
        }, {
          name: 'Month',
          value: 'months'
        }, {
          name: 'Year',
          value: 'years'
        }];
      } ///////////////////////////////////


      addField('title', {
        title: 'Track Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Title'
      });
      addField('firstLine', {
        title: 'Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Subtitle',
        description: 'A short one line description for this event track'
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('mainImage', {
        title: 'Image',
        description: 'Default image for events in this track',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('defaultPlans', {
        title: 'Default Plans',
        description: "This plan will be duplicated and attached as a 'draft' to new events in this event track",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'plan'
        }
      }); // addField('defaultOwners', {
      //     title: 'Default Owners',
      //     description: "Set the owners of events created in this track",
      //     minimum: 0,
      //     maximum: 0,
      //     type: 'reference',
      //     directive: 'reference-select',
      //     params: {
      //         restrictType: 'persona',
      //     }
      // });
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('recurAmount', {
        title: 'Number of Future Events',
        minimum: 1,
        maximum: 1,
        type: 'integer',
        description: 'Fluro will ensure that at any point in time there will be at least this many events into the future',
        defaultValues: [5],
        params: {
          minValue: 1
        }
      });
      var now = new Date();
      addField('nextRecurDate', {
        title: 'Create Next Event At',
        minimum: 1,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker',
        //description: moment(now).fromNow(),
        defaultValues: [now]
      });
      addField('archiveDate', {
        title: 'End Track At',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker' //description: moment(now).fromNow(),

      }); ///////////////////////////////////

      addField('recurDefinition', {
        title: 'Definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        description: 'What definition should be used for events within this track?',
        options: self.defOptions
      });
      addField('recurCount', {
        title: 'Every',
        minimum: 0,
        maximum: 1,
        type: 'integer',
        defaultValues: [1],
        params: {
          minValue: 1
        }
      });
      addField('recurMeasure', {
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['days'],
        options: periodOptions
      });
      addField('recurWeekday', {
        title: 'Weekday',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['Monday'],
        options: [{
          name: 'Monday'
        }, {
          name: 'Tuesday'
        }, {
          name: 'Wednesday'
        }, {
          name: 'Thursday'
        }, {
          name: 'Friday'
        }, {
          name: 'Saturday'
        }, {
          name: 'Sunday'
        }]
      });
      addField('recurNth', {
        title: 'On The',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['date'],
        options: [{
          name: 'Same Date',
          value: 'date'
        }, {
          name: 'First',
          value: '1'
        }, {
          name: 'Second',
          value: '2'
        }, {
          name: 'Third',
          value: '3'
        }, {
          name: 'Fourth',
          value: '4'
        }, {
          name: 'Fifth',
          value: '5'
        }]
      });
      addField('defaultStartTime', {
        title: 'Start Time',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: '1300' //directive: 'timepicker',
        //description: moment(now).fromNow(),

      });
      addField('defaultDuration', {
        title: 'Duration (Mins)',
        placeholder: '120',
        minimum: 0,
        maximum: 1,
        type: 'integer',
        params: {
          minValue: 0
        }
      });
      addField('timezone', {
        title: 'Event Timezone',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        description: 'Set a local timezone for this event'
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('defaultTitle', {
        title: 'Default Event Title',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: "If left blank will be '" + (self.model.title ? self.model.title : "") + "'"
      });
      addField('defaultFirstLine', {
        title: 'Default Event Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: "If left blank will be '" + (self.model.firstLine ? self.model.firstLine : "") + "'"
      });
      addField('defaultBody', {
        title: 'Default Event Body',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg'
      });
      addField('defaultExpectTeams', {
        title: 'Expected Groups/Teams',
        description: "Select groups whose members should be expected to attend",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'team'
        }
      });
      addField('defaultForms', {
        title: 'Registration Forms',
        description: "These forms will be added to each created event",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'form'
        }
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details); // // Vue.set(self.fields, key, details);
        // if (details.enabled === false) {
        // } else {
        //     details.enabled = true;
        // }
        // var defaultValue = self.getDefaultValue(key, details);
        // Vue.set(self.model, key, defaultValue);
      }

      return array;
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    nextRecurDateFromNow() {
      var self = this;
      return self.$fluro.date.moment(self.model.nextRecurDate).fromNow();
    },

    allPositions() {
      var self = this;
      var options = []; //////////////////////////
      //Add add each definition

      _.each(self.rosterDefinitions.definitions, function (def) {
        if (_.get(def, 'data.slots')) {
          return _.each(def.data.slots, function (slot) {
            if (!options.includes(slot.title)) {
              return options.push(slot.title);
            }
          });
        }
      }); //console.log(options);


      return options;
    }

  },
  asyncComputed: {
    defOptions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.get('event', true).then(function (res) {
            var options = [];
            options.push({
              name: 'Basic Event',
              value: ''
            }); //////////////////////////
            //Add add each definition

            _.each(res.definitions, function (def) {
              options.push({
                name: def.title,
                value: def.definitionName
              });
            }); //////////////////////////
            //console.log(options);


            resolve(options);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    rosterDefinitions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.retrieve(['roster']).then(function (res) {
            return resolve(res[0]);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    locations: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.api.get('/content/location?allDefinitions=true').then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(!_vm.$asyncComputed.defOptions.success && !_vm.$asyncComputed.locations.success)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Event Track Info"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Event Track Details")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.mainImage},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('location-selector',{attrs:{"allLocations":_vm.locations,"locationsPath":"defaultLocations","roomsPath":"defaultRooms"},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultPlans},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultOwners},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " details")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title))]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Default Rosters"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"md":""}},[_c('reminder-event-manager',{attrs:{"config":_vm.config,"allAssignmentOptions":_vm.allPositions},model:{value:(_vm.model.defaultReminders),callback:function ($$v) {_vm.$set(_vm.model, "defaultReminders", $$v);},expression:"model.defaultReminders"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Messaging"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"lg":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Automated Messages")]),_vm._v(" "),_c('messaging-event-manager',{attrs:{"config":_vm.config,"startDate":_vm.model.startDate,"endDate":_vm.model.endDate},model:{value:(_vm.model.messages),callback:function ($$v) {_vm.$set(_vm.model, "messages", $$v);},expression:"model.messages"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Recurring Automation"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-panel',[_c('fluro-panel-title',[_c('div',{staticClass:"no-border-no-background",on:{"click":function($event){return _vm.toggleAutoRecur()}}},[_c('fluro-toggle-item',{attrs:{"inactive":!_vm.model.autoRecur}},[_vm._v("Auto-Create Future Events")])],1)]),_vm._v(" "),(_vm.model.autoRecur)?_c('fluro-panel-body',{staticClass:"pa-0"},[_c('flex-column',[_c('tabset',{attrs:{"justified":true,"vertical":false}},[_c('tab',{attrs:{"heading":"Frequency"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurAmount},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.nextRecurDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('p',{staticClass:"muted"},[_vm._v(_vm._s(_vm.nextRecurDateFromNow))])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.archiveDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurDefinition},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurCount},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm8":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurMeasure},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),(_vm.model.recurMeasure == 'weeks')?_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurWeekday},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),(_vm.model.recurMeasure == 'weeks')?_c('v-flex',{attrs:{"xs12":"","sm8":""}}):_vm._e(),_vm._v(" "),(_vm.model.recurMeasure == 'months')?_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurNth},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),((_vm.model.recurMeasure == 'months') && (_vm.model.recurNth == 'date'))?_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.recurWeekday},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),((_vm.model.recurMeasure == 'months') && (_vm.model.recurNth == 'date'))?_c('v-flex',{attrs:{"xs12":"","sm4":""}}):(_vm.model.recurMeasure == 'months')?_c('v-flex',{attrs:{"xs12":"","sm8":""}}):_vm._e(),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultStartTime},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultDuration},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.timezone},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Defaults"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h5',[_vm._v("Add default information for events that are generated for this track.")]),_c('br'),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultTitle},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_c('br'),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultFirstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_c('br'),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultBody},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultExpectTeams},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_c('br'),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.defaultForms},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1)],1)],1):_vm._e()],1)],1)],1)],1)],1),_vm._v(" "),(_vm.eventList)?_c('tab',{attrs:{"heading":"Events"}},[_c(_vm.eventList,{tag:"component"})],1):_vm._e()],1)],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = __vue_normalize__(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__$3;
//# sourceMappingURL=eventtrack-a2deb925.js.map
