import { bb as __vue_normalize__, bc as __vue_create_injector__, b0 as ListGroup, b1 as ListGroupItem, aw as FluroSelector, ay as FluroContentSelectModal, aH as FluroContentFormField, az as FluroContentSelectButton, l as FluroConfirmButton, b9 as FluroContactCommunicateMixin, P as ContactTimeline, V as ContactMessageList, W as ContactTransactionList, X as ContactInteractionList, Y as ContactCheckinList, Q as ContactPostThread, bd as ContactGroupManager, c as FluroAvatarUpdate, aA as FluroRealmSelect, aK as FluroAcademicSelect } from './index-db60994e.js';
import Vue from 'vue';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import 'fluro';
import 'vue2-ace-editor';
import 'vuex-map-fields';
import 'async';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-c1c60698.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    taskSummary() {
      if (this.formsPending) {
        return `Awaiting ${this.formsPending} form response${this.formsPending == 1 ? '' : 's'}`;
      }

      if (this.tasksIncomplete) {
        return `${this.tasksIncomplete} task${this.tasksIncomplete == 1 ? '' : 's'}`;
      }
    },

    tasksIncomplete() {
      return parseInt(this.card.taskCount.incomplete);
    },

    formsPending() {
      return parseInt(this.card.taskCount.formsRequested) - parseInt(this.card.taskCount.formsCompleted);
    },

    processStatus() {
      return this.card.processStatus;
    },

    dueDate() {
      return this.card.dueDate;
    },

    dueText() {
      var self = this;

      if (!self.dueDate) {
        return;
      }

      switch (this.processStatus) {
        case 'complete':
          return `Will progress ${self.$fluro.date.timeago(self.card.dueDate)}`;

        default:
          return `Due ${self.$fluro.date.timeago(self.card.dueDate)}`;
      }
    },

    renderStates() {
      var self = this;
      return _.chain(self.states).filter(function (state) {
        return state.style != 'waiting';
      }).map(function (state) {
        state.iconLibrary = 'fas';
        var isActiveState = state.key == self.state;

        if (isActiveState) {
          state.iconLibrary = 'far';
          state.icon = 'dot-circle';
          return state;
        }

        switch (state.result) {
          case 'failed':
            state.icon = 'exclamation-circle';
            break;

          case 'complete':
            state.icon = 'check-circle';
            break;

          default:
            state.icon = 'circle';
            state.iconLibrary = 'far';
            break;
        }

        return state; // var match = self.stateLookup[state.key];
        // return 
      }).value();
    },

    currentStep() {
      return _.findIndex(this.states, {
        key: this.state
      }); // var currentIndex = _.findIndex(this.states, { key: this.state });
      // var currentRenderIndex = _.findIndex(this.renderStates, { key: this.state });
      //    if(currentRenderIndex == -1) {
      //    	return _.finst
      //    }
      //    return currentRenderIndex;
    },

    totalSteps() {
      return this.states.length;
    },

    percent() {
      // console.log('Get percentage', currentStep, total)
      return Math.ceil(this.currentStep / this.totalSteps * 100) + '%';
    },

    currentIndex() {
      return _.findIndex(this.states, {
        key: this.state
      });
    },

    state() {
      return this.card.state;
    },

    states() {
      return this.card.states;
    },

    mode() {
      return this.card.mode;
    },

    stateLookup() {
      return _.reduce(this.card.states, function (set, state) {
        set[state.key] = state;
        return set;
      }, {});
    },

    currentState() {
      var self = this;

      var matchingState = _.find(self.states, {
        key: self.state
      });

      if (!matchingState) {
        return {
          title: 'Stuck / Limbo',
          key: '_limbo'
        };
      }

      return matchingState;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"process-state-card",class:_vm.card.processStatus},[_c('fluro-card',[_c('div',{staticClass:"color-block"}),_vm._v(" "),_c('fluro-card-body',[(_vm.card.dueDate)?_c('div',{staticClass:"due-date"},[_c('fluro-icon',{attrs:{"icon":"clock"}}),_vm._v(" "+_vm._s(_vm.dueText))],1):_vm._e(),_vm._v(" "),_c('h5',[_vm._v(_vm._s(_vm.card.title))]),_vm._v(" "),_c('div',[_c('strong',[_vm._v(_vm._s(_vm.currentState.title))]),_vm._v(" "),(_vm.mode == 'linear')?[_vm._v(" - "+_vm._s(_vm.percent))]:_vm._e()],2),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.taskSummary))]),_vm._v(" "),_c('div',{staticClass:"process-dots"},_vm._l((_vm.renderStates),function(state){return _c('span',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"process-dot",class:state.result,attrs:{"content":state.title}},[_c('fluro-icon',{attrs:{"library":state.iconLibrary,"icon":state.icon}})],1)}),0)])],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-9d420b5c_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.process-state-card .fluro-card{position:relative;overflow:hidden;box-shadow:0 2px 3px rgba(0,0,0,.1)}.process-state-card .due-date{font-style:italic;float:right}.process-state-card .color-block{width:3px;top:0;left:0;bottom:0;position:absolute}.process-state-card .fluro-card-body{padding:10px}.process-state-card.archived .fluro-card{opacity:.5;background:0 0}.process-state-card.complete .fluro-card{color:#36a93a;background:#e7f7e7;border-color:rgba(76,198,80,.1)}.process-state-card.complete .fluro-card .color-block{background:linear-gradient(#89e10c,#16d3ad)!important}.process-state-card.pending .fluro-card{color:#ec7b1f;background:#fceadb;border-color:rgba(240,151,78,.1)}.process-state-card.pending .fluro-card .color-block{background:linear-gradient(#f0974e,#f0974e)!important}.process-state-card.failed .fluro-card,.process-state-card.overdue .fluro-card{color:#be264a;background:#fbedf0;border-color:rgba(217,62,99,.1)}.process-state-card.failed .fluro-card:before,.process-state-card.overdue .fluro-card:before{display:block;background:linear-gradient(#ff4d83,#ff003c);animation-name:pulse_opacity;animation-duration:3s;animation-iteration-count:infinite;animation-timing-function:linear}.process-state-card.failed .fluro-card .color-block,.process-state-card.overdue .fluro-card .color-block{background:linear-gradient(#ff4d83,#ff003c)!important}.process-dots{display:block;white-space:nowrap}.process-dots.process-dots-flex{display:flex}.process-dots .process-dot{color:rgba(0,0,0,.3)}.process-dots .process-dot.failed{color:#d93e63}.process-dots .process-dot.pending{color:#f0974e}.process-dots .process-dot.complete{color:#4cc650}", map: undefined, media: undefined });

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
////////////////////////////////////////////////////////////

var script$1 = {
  props: {
    'value': {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      actionIndexes: {},
      model: this.value,
      loading: true,
      cards: []
    };
  },

  created() {
    this.reloadCards();
  },

  methods: {
    clicked(card) {
      var self = this;
      return self.$fluro.global.edit(card, true).then(function (result) {
        console.log('Result!', result);
        self.reloadCards();
      }).catch(function (err) {
        console.log('Cancelled!', err);
      });
    },

    // leave(team) {
    //     var self = this;
    //     //Get the ids from the teams
    //     var teamID = self.$fluro.utils.getStringID(team);
    //     self.loading = true;
    //     //////////////////////////////////
    //     var promise = self.$batch.run({
    //             operation: 'remove from team',
    //             ids: [self.contactID],
    //             teams: [teamID],
    //         })
    //         .then(function(res) {
    //             var index = _.findIndex(self.teams, { _id: teamID });
    //             self.teams.splice(index, 1);
    //             self.loading = false;
    //         })
    //         .catch(function(err) {
    //             console.log('TEAMS ERR', err);
    //             self.reloadTeams();
    //         });
    // },
    // select(type) {
    // var self = this;
    // //Ugly hack, but it's gotta be done unfortunately
    // var SelectionManager = Vue.extend(FluroSelector);
    // var instance = new SelectionManager({
    //     propsData: {
    //         minimum: 0,
    //         maximum: 0,
    //     }
    // })
    // // var isBasicType = self.$fluro.types.isBasicType(type);
    // var promise = self.$fluro.modal({
    //         component: FluroContentSelectModal,
    //         options: {
    //             allDefinitions: false, //isBasicType,
    //             selector: instance, //Vue(FluroSelector),
    //             type,
    //             minimum: 0,
    //             maximum: 0,
    //         }
    //     })
    //     .then(function(items) {
    //         if (!items || !items.length) {
    //             return;
    //         }
    //         self.loading = true;
    //         //Get the ids from the teams
    //         var teamIDs = self.$fluro.utils.arrayIDs(items);
    //         //////////////////////////////////
    //         var promise = self.$batch.run({
    //                 operation: 'add to team',
    //                 ids: [self.contactID],
    //                 teams: teamIDs,
    //             })
    //             .then(function(res) {
    //                 console.log('CARDS ADDED', res);
    //                 // self.teams = self.teams.concat(items);
    //                 // self.loading = false;
    //                 self.reloadCards();
    //             })
    //             .catch(function(err) {
    //                 console.log('CARDS ERR', err);
    //                 self.reloadCards();
    //             });
    //     })
    // },
    reloadCards() {
      var self = this;
      self.loading = true;
      return self.$fluro.api.get(`/process/states/${self.contactID}`).then(function (res) {
        self.cards = res.data;
        self.loading = false;
      }).catch(function (err) {
        self.cards = err;
        self.loading = false;
      });
    }

  },
  components: {
    ListGroup,
    ListGroupItem,
    ContactProcessState: __vue_component__
  },
  computed: {
    sorted() {
      return _.orderBy(this.cards, this.$fluro.utils.processCardPrioritySort);
    },

    contactID() {
      return this.$fluro.utils.getStringID(this.model);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('fluro-page-preloader',{attrs:{"contain":""}}):[(_vm.sorted.length)?_vm._l((_vm.sorted),function(card){return _c('contact-process-state',{key:card._id,attrs:{"card":card},nativeOn:{"click":function($event){return _vm.clicked(card)}}})}):[_c('em',[_vm._v("No process information is available")])]]],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-5fcb0e6a_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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
var script$2 = {
  props: {
    'value': {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      loading: true,
      actionIndexes: {},
      model: this.value
    };
  },

  created() {},

  methods: {
    remove(item) {
      var index = this.model.indexOf(item);
      this.model.splice(index, 1);
    },

    addItem(item) {
      var match = _.some(this.model, {
        _id: item._id
      });

      if (match) {
        return;
      }

      this.model.push(item);
    },

    select(type) {
      var self = this; //Ugly hack, but it's gotta be done unfortunately

      var SelectionManager = Vue.extend(FluroSelector);
      var instance = new SelectionManager({
        propsData: {
          minimum: 0,
          maximum: 0
        }
      }); // var isBasicType = self.$fluro.types.isBasicType(type);

      var promise = self.$fluro.modal({
        component: FluroContentSelectModal,
        options: {
          allDefinitions: false,
          //isBasicType,
          selector: instance,
          //Vue(FluroSelector),
          type,
          minimum: 0,
          maximum: 0
        }
      }).then(function (items) {
        if (!items || !items.length) {
          return;
        }

        console.log('Items');

        _.each(items, function (item) {
          self.addItem(item);
        }); // self.loading = true;
        // //Get the ids from the capabilities
        // var capabilityIDs = self.$fluro.utils.arrayIDs(items);
        // //////////////////////////////////
        // var promise = self.$batch.run({
        //         operation: 'add to capability',
        //         ids: [self.contactID],
        //         capabilities: capabilityIDs,
        //     })
        //     .then(function(res) {
        //         console.log('TEAMS ADDED', res);
        //         // self.capabilities = self.capabilities.concat(items);
        //         // self.loading = false;
        //         self.reloadCapabilities();
        //     })
        //     .catch(function(err) {
        //         console.log('TEAMS ERR', err);
        //         self.reloadCapabilities();
        //     });

      });
    }

  },
  components: {
    ListGroup,
    ListGroupItem,
    // FluroContentSelectButton,
    FluroContentSelectModal
  },
  computed: {
    capabilityGroups() {
      var self = this; ////////////////////////////////////////////////////

      var allSets = _.reduce(self.capabilityDefinitions, function (set, definition) {
        set[definition.definitionName] = {
          title: definition.plural,
          capabilities: [],
          key: definition.definitionName
        };
        return set;
      }, {
        capability: {
          title: 'Capabilities',
          capabilities: [],
          key: 'capability'
        }
      }); ////////////////////////////////////////////////////


      return _.chain(self.model).reduce(function (set, capability) {
        var capabilityType = capability.definition || 'capability';
        var existingGroup = set[capabilityType];

        if (!existingGroup) {
          existingGroup = set[capabilityType] = {
            title: self.$fluro.types.readable(capabilityType, true),
            capabilities: []
          };
        }

        existingGroup.capabilities.push(capability);
        return set;
      }, allSets).values().value();
    }

  },
  asyncComputed: {
    capabilityDefinitions: {
      default: [],

      get() {
        var self = this;
        self.loading = true;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.subTypes('capability').then(function (res) {
            resolve(res);
            self.loading = false;
          }).catch(function (err) {
            reject(err);
            self.loading = false;
          });
        });
      }

    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('fluro-page-preloader',{attrs:{"contain":""}}):_vm._l((_vm.capabilityGroups),function(group){return _c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v(_vm._s(group.title))]),_vm._v(" "),_c('list-group',[_vm._l((group.capabilities),function(capability){return [_c('list-group-item',{attrs:{"item":capability},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.remove(capability)}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)]},proxy:true}],null,true)})]})],2),_vm._v(" "),_c('v-btn',{staticClass:"ml-0",attrs:{"small":"","color":"primary"},on:{"click":function($event){return _vm.select(group.key)}}},[_vm._v("\n                Add "+_vm._s(group.title)+"\n                "),_c('fluro-icon',{attrs:{"right":"","icon":"plus"}})],1)],1)})],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-c8dec716_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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

//
var script$3 = {
  props: {
    'value': {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      anniversaryField: {
        key: 'anniversary',
        type: 'date',
        title: 'Anniversary Date'
      },
      actionIndexes: {},
      model: this.value,
      loading: true,
      backlinks: [],
      proposed: {
        checkinAuthorised: true,
        relationshipType: null,
        relationship: null,
        anniversary: null,
        contacts: []
      }
    };
  },

  created() {
    console.log('RELOAD TEAMS');
    this.reloadRelationships();
    this.resetProposed();
  },

  methods: {
    anniversaryDate(row) {
      if (row.anniversary) {
        return `${this.$fluro.date.formatDate(row.anniversary, 'D MMM')} (${this.$fluro.date.timeago(row.anniversary)})`;
      }
    },

    add() {
      var self = this; // console.log('RELATIONSHIP', self.proposed);

      var proposed = self.proposed;

      if (!self.model.relationships || !self.model.relationships.length) {
        self.$set(self.model, 'relationships', []);
      }

      self.model.relationships.push(proposed); // self.$fluro.api.put(`/contact/${self.contactID}/relationships`)

      self.resetProposed();
    },

    resetProposed() {
      this.proposed = {
        checkinAuthorised: true,
        relationshipType: null,
        relationship: null,
        anniversary: null,
        contacts: []
      };
    },

    // leave(team) {
    //     var self = this;
    //     //Get the ids from the teams
    //     var teamID = self.$fluro.utils.getStringID(team);
    //     self.loading = true;
    //     //////////////////////////////////
    //     var promise = self.$batch.run({
    //             operation: 'remove from team',
    //             ids: [self.contactID],
    //             teams: [teamID],
    //         })
    //         .then(function(res) {
    //             var index = _.findIndex(self.teams, { _id: teamID });
    //             self.teams.splice(index, 1);
    //             self.loading = false;
    //         })
    //         .catch(function(err) {
    //             console.log('TEAMS ERR', err);
    //             self.reloadRelationships();
    //         });
    // },
    // select(type) {
    //     var self = this;
    //     //Ugly hack, but it's gotta be done unfortunately
    //     var SelectionManager = Vue.extend(FluroSelector);
    //     var instance = new SelectionManager({
    //         propsData: {
    //             minimum: 0,
    //             maximum: 0,
    //         }
    //     })
    //     // var isBasicType = self.$fluro.types.isBasicType(type);
    //     var promise = self.$fluro.modal({
    //             component: FluroContentSelectModal,
    //             options: {
    //                 allDefinitions: false, //isBasicType,
    //                 selector: instance, //Vue(FluroSelector),
    //                 type,
    //                 minimum: 0,
    //                 maximum: 0,
    //             }
    //         })
    //         .then(function(items) {
    //             if (!items || !items.length) {
    //                 return;
    //             }
    //             self.loading = true;
    //             //Get the ids from the teams
    //             var teamIDs = self.$fluro.utils.arrayIDs(items);
    //             //////////////////////////////////
    //             var promise = self.$batch.run({
    //                     operation: 'add to team',
    //                     ids: [self.contactID],
    //                     teams: teamIDs,
    //                 })
    //                 .then(function(res) {
    //                     // self.teams = self.teams.concat(items);
    //                     // self.loading = false;
    //                     self.reloadRelationships();
    //                 })
    //                 .catch(function(err) {
    //                     self.reloadRelationships();
    //                 });
    //         })
    // },
    reloadRelationships() {
      var self = this;
      self.loading = true;

      if (!self.contactID) {
        self.loading = false;
        return;
      }

      self.$fluro.api.get(`/contact/${self.contactID}/relationships`, {
        params: {
          backlinks: true
        }
      }).then(function (res) {
        self.backlinks = res.data;
        self.loading = false;
      }).catch(function (err) {
        self.loading = false;
      });
    }

  },
  components: {
    FluroContentFormField,
    FluroContentSelectButton,
    // FluroAvatarStack,
    ListGroup,
    ListGroupItem // FluroContentSelectButton,
    // FluroContentSelectModal,

  },
  watch: {
    'proposed.relationshipType': function (value) {
      var self = this; //////////////////////////////

      if (!self.customRelationship) {
        self.proposed.relationship = value;
      } // //////////////////////////////
      // switch(value) {
      //     case 'other':
      //     break;
      //     default:
      //         self.proposed.relationship = value;
      //     break;
      // }

    }
  },
  computed: {
    relationships() {
      // return this.
      return this.backlinks;
    },

    customRelationship() {
      return this.proposed.relationshipType == 'other';
    },

    disabled() {
      var invalid = !this.proposed.contacts || !this.proposed.contacts.length || !this.proposed.relationship || !this.proposed.relationship.length;

      if (invalid) {
        return true;
      }

      if (this.customRelationship && (!this.proposed.relationship || !this.proposed.relationship.length)) {
        return true;
      }
    },

    contextName() {
      var name = this.model.preferredName || this.model.firstName || '';

      if (!name || !name.length) {
        return '';
      }

      if (_.endsWith(name, 's')) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    relationshipTypes() {
      var contextName = this.contextName;
      return [{
        title: `${contextName} Parents`,
        value: `parents`
      }, {
        title: `${contextName} Guardians`,
        value: `guardians`
      }, {
        title: `${contextName} Children`,
        value: `children`
      }, {
        title: `${contextName} Siblings`,
        value: `siblings`
      }, {
        title: `${contextName} Spouse`,
        value: `spouse`
      }, {
        title: `${contextName} Partner`,
        value: `partner`
      }, {
        title: `${contextName} Grandparents`,
        value: `grandparents`
      }, {
        title: `${contextName} Grandchildren`,
        value: `grandchildren`
      }, {
        title: `${contextName} Aunt/Uncle`,
        value: `auntuncle`
      }, {
        title: `${contextName} Niece/Nephew`,
        value: `niecenephew`
      }, {
        title: `Other`,
        value: `other`
      }];
    },

    contactID() {
      if (!this.model._id) {
        return;
      }

      return this.$fluro.utils.getStringID(this.model);
    }

  },
  filters: {
    capitalize(str) {
      return _.startCase(str);
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('fluro-page-preloader',{attrs:{"contain":""}}):[_c('v-layout',{attrs:{"row":"","wrap":""}},[_vm._l((_vm.backlinks),function(row){return [_c('v-flex',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v(_vm._s(_vm._f("capitalize")(row.relationship))+" "),_c('span',{staticClass:"anniversary"},[_vm._v(_vm._s(_vm.anniversaryDate(row)))])]),_vm._v(" "),_c('div',{staticClass:"relation-faces"},_vm._l((row.contacts),function(contact){return _c('div',{staticClass:"relation-face",class:contact.status,on:{"click":function($event){return _vm.$fluro.global.edit(contact, true)}}},[_c('fluro-avatar',{attrs:{"lg":"","id":contact}}),_vm._v(" "),_c('div',{staticClass:"details"},[_c('div',[_c('strong',[_vm._v(_vm._s(contact.title))])]),_vm._v(" "),_c('div',[_vm._v(_vm._s(contact.householdRole))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(contact.gender))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(contact.age))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm._f("definitionTitle")(contact.definition)))]),_vm._v(" "),_c('fluro-status-label',{attrs:{"value":contact.status}})],1)],1)}),0)],1)],1)]}),_vm._v(" "),_vm._l((_vm.model.relationships),function(row){return [_c('v-flex',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v(_vm._s(_vm.contextName)+" "+_vm._s(_vm._f("capitalize")(row.relationship))+" "),_c('span',{staticClass:"anniversary"},[_vm._v(_vm._s(_vm.anniversaryDate(row)))])]),_vm._v(" "),_c('div',{staticClass:"relation-faces"},_vm._l((row.contacts),function(contact){return _c('div',{staticClass:"relation-face",class:contact.status,on:{"click":function($event){return _vm.$fluro.global.edit(contact, true)}}},[_c('fluro-avatar',{attrs:{"lg":"","id":contact}}),_vm._v(" "),_c('div',{staticClass:"details"},[_c('div',[_c('strong',[_vm._v(_vm._s(contact.title))])]),_vm._v(" "),_c('div',[_vm._v(_vm._s(contact.householdRole))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(contact.gender))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(contact.age))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm._f("definitionTitle")(contact.definition)))]),_vm._v(" "),_c('fluro-status-label',{attrs:{"value":contact.status}})],1)],1)}),0)],1)],1)]})],2),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('h4',[_vm._v("Add a relationship")])]),_vm._v(" "),_c('fluro-panel-body',[_c('form',[_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm5":""}},[_c('v-select',{attrs:{"label":"Relationship","item-text":"title","items":_vm.relationshipTypes},model:{value:(_vm.proposed.relationshipType),callback:function ($$v) {_vm.$set(_vm.proposed, "relationshipType", $$v);},expression:"proposed.relationshipType"}}),_vm._v(" "),(_vm.customRelationship)?[_c('v-text-field',{attrs:{"label":"Custom Relationshp","placeholder":"Boss, Coworker, Friend"},model:{value:(_vm.proposed.relationship),callback:function ($$v) {_vm.$set(_vm.proposed, "relationship", $$v);},expression:"proposed.relationship"}})]:_vm._e(),_vm._v(" "),(_vm.proposed.relationship == 'spouse')?[_c('fluro-content-form-field',{attrs:{"field":_vm.anniversaryField},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})]:_vm._e()],2),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm5":""}},[_c('fluro-content-select-button',{attrs:{"block":"","type":"contact"},model:{value:(_vm.proposed.contacts),callback:function ($$v) {_vm.$set(_vm.proposed, "contacts", $$v);},expression:"proposed.contacts"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","disabled":_vm.disabled},on:{"click":function($event){return _vm.add()}}},[_vm._v("\n                                                                                                                                    Add\n                                                                                                                                    "),_c('fluro-icon',{attrs:{"right":"","icon":"plus"}})],1)],1)],1)],1)])],1)]],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-0ee51dbb_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.anniversary{font-weight:400;opacity:.5}.relation-faces{display:block}.relation-faces .relation-face{width:100px;padding:10px;background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:4px;margin:0 1% 1% 0;display:inline-block;text-align:center;font-size:14px;cursor:pointer;vertical-align:top}.relation-faces .relation-face:hover{background:#fafafa}.relation-faces .relation-face.archived{opacity:.5;border:1px solid rgba(0,0,0,.1);background:0 0}.relation-faces .relation-face .details{padding:5px 0;text-transform:capitalize;font-size:.8em;opacity:.8}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
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
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$4 = {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      description: {
        key: 'description',
        type: 'string',
        minimum: 1,
        maximum: 1,
        placeholder: 'Away on holidays',
        title: 'Description'
      },
      actionIndexes: {},
      loading: true,
      modalStart: false,
      modalEnd: false,
      model: this.value,
      unavailabilities: [],
      proposed: {
        description: undefined,
        startDate: this.startDateMin,
        endDate: this.startDateMin
      }
    };
  },

  created() {
    console.log('RELOAD TEAMS');
    this.reloadRelationships();
    this.resetProposed();
  },

  methods: {
    add() {
      var self = this; // console.log('RELATIONSHIP', self.proposed);

      var proposed = JSON.parse(JSON.stringify(self.proposed));
      proposed.startDate = new Date(proposed.startDate);
      proposed.startDate.setHours(0);
      proposed.startDate.setMinutes(0);
      proposed.startDate.setSeconds(0);
      proposed.endDate = new Date(proposed.endDate);
      proposed.endDate.setHours(23);
      proposed.endDate.setMinutes(59);
      proposed.endDate.setSeconds(59);
      return self.$fluro.api.post(`/contact/${self.contactID}/unavailability`, proposed).then(function (res) {
        self.$fluro.notify(`Successfully updated ${self.contextName} unavailability`, {
          type: 'success'
        });
        self.unavailabilities.push(res.data);
        self.resetProposed();
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    },

    resetProposed() {
      this.proposed = {
        description: undefined,
        startDate: this.startDateMin,
        endDate: this.startDateMin
      };
    },

    reloadRelationships() {
      var self = this;
      self.loading = true;

      if (!self.contactID) {
        self.loading = false;
        return;
      }

      self.$fluro.api.get(`/contact/${self.contactID}/unavailability`, {}).then(function (res) {
        self.unavailabilities = res.data;
        self.loading = false;
      }).catch(function (err) {
        self.loading = false;
      });
    },

    remove(index) {
      var self = this;
      return self.$fluro.api.delete(`/contact/${self.contactID}/unavailability/${self.unavailabilities[index]._id}`).then(function (res) {
        self.$fluro.notify(`Successfully deleted ${self.contextName} unavailability '${self.unavailabilities[index].description}'`, {
          type: 'success'
        });
        self.unavailabilities.splice(index, 1);
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    }

  },
  components: {
    FluroContentFormField,
    FluroContentSelectButton,
    // FluroAvatarStack,
    ListGroup,
    ListGroupItem,
    FluroConfirmButton // FluroContentSelectButton,
    // FluroContentSelectModal,

  },
  watch: {
    'proposed.startDate': function () {
      var self = this;

      if (self.proposed.endDate < self.proposed.startDate) {
        self.proposed.endDate = self.proposed.startDate;
      }
    }
  },
  computed: {
    contextName() {
      var name = this.model.preferredName || this.model.firstName || '';

      if (!name || !name.length) {
        return '';
      }

      if (_.endsWith(name, 's')) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    contactID() {
      if (!this.model._id) {
        return;
      }

      return this.$fluro.utils.getStringID(this.model);
    },

    contactTitle() {
      return _.get(this.model, 'title') || '';
    },

    startDateMin() {
      var today = new Date();

      function pad(val) {
        var res = val.toString();

        if (res.length == 1) {
          return '0' + res;
        } else {
          return res;
        }
      }

      return today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
    },

    endDateMin() {
      var self = this;
      var date = new Date(_.get(self.proposed, 'startDate'));

      function pad(val) {
        var res = val.toString();

        if (res.length == 1) {
          return '0' + res;
        } else {
          return res;
        }
      }

      return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    }

  },
  filters: {
    capitalize(str) {
      return _.startCase(str);
    },

    readableDate(obj) {
      var self = this;
      var start = self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY');
      var end = self.$fluro.date.moment(obj.endDate).format('dddd, MMMM Do YYYY'); //console.log(start, end, obj.startDate, obj.endDate);

      if (start == end) {
        return self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY');
      } else {
        return self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY') + ' - ' + self.$fluro.date.moment(obj.endDate).format('dddd, MMMM Do YYYY');
      }
    }

  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('fluro-page-preloader',{attrs:{"contain":""}}):[_c('list-group',[_c('transition-group',_vm._l((_vm.unavailabilities),function(unavailability,index){return _c('list-group-item',{key:JSON.stringify(unavailability),staticClass:"ma-0 pa-0"},[_c('v-layout',{attrs:{"wrap":"","align-center":"","ma-0":""}},[_c('v-flex',{attrs:{"sm10":"","xs12":"","px-4":""}},[_c('strong',[_vm._v(_vm._s(unavailability.description))]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v(_vm._s(_vm._f("readableDate")(unavailability)))])]),_vm._v(" "),_c('v-flex',{attrs:{"sm2":"","xs12":""}},[_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1)],1)}),1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('h4',[_vm._v("Add an Unavailability Period")])]),_vm._v(" "),_c('fluro-panel-body',[_c('form',[_c('v-layout',{attrs:{"wrap":"","px-4":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"field":_vm.description},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm5":""}},[_c('v-dialog',{ref:"dialogStart",attrs:{"return-value":_vm.proposed.startDate,"lazy":"","full-width":"","width":"290px"},on:{"update:returnValue":function($event){return _vm.$set(_vm.proposed, "startDate", $event)},"update:return-value":function($event){return _vm.$set(_vm.proposed, "startDate", $event)}},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-text-field',_vm._g({attrs:{"label":"Start Date","prepend-icon":"event","readonly":""},model:{value:(_vm.proposed.startDate),callback:function ($$v) {_vm.$set(_vm.proposed, "startDate", $$v);},expression:"proposed.startDate"}},on))]}}]),model:{value:(_vm.modalStart),callback:function ($$v) {_vm.modalStart=$$v;},expression:"modalStart"}},[_vm._v(" "),_c('v-date-picker',{attrs:{"min":_vm.startDateMin,"scrollable":""},model:{value:(_vm.proposed.startDate),callback:function ($$v) {_vm.$set(_vm.proposed, "startDate", $$v);},expression:"proposed.startDate"}},[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"flat":"","color":"primary"},on:{"click":function($event){_vm.modalStart = false;}}},[_vm._v("Cancel")]),_vm._v(" "),_c('v-btn',{attrs:{"flat":"","color":"primary"},on:{"click":function($event){return _vm.$refs.dialogStart.save(_vm.proposed.startDate)}}},[_vm._v("OK")])],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm5":""}},[_c('v-dialog',{ref:"dialogEnd",attrs:{"return-value":_vm.proposed.endDate,"lazy":"","full-width":"","width":"290px"},on:{"update:returnValue":function($event){return _vm.$set(_vm.proposed, "endDate", $event)},"update:return-value":function($event){return _vm.$set(_vm.proposed, "endDate", $event)}},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-text-field',_vm._g({attrs:{"label":"End Date","prepend-icon":"event","readonly":""},model:{value:(_vm.proposed.endDate),callback:function ($$v) {_vm.$set(_vm.proposed, "endDate", $$v);},expression:"proposed.endDate"}},on))]}}]),model:{value:(_vm.modalEnd),callback:function ($$v) {_vm.modalEnd=$$v;},expression:"modalEnd"}},[_vm._v(" "),_c('v-date-picker',{attrs:{"min":_vm.endDateMin,"scrollable":""},model:{value:(_vm.proposed.endDate),callback:function ($$v) {_vm.$set(_vm.proposed, "endDate", $$v);},expression:"proposed.endDate"}},[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"flat":"","color":"primary"},on:{"click":function($event){_vm.modalEnd = false;}}},[_vm._v("Cancel")]),_vm._v(" "),_c('v-btn',{attrs:{"flat":"","color":"primary"},on:{"click":function($event){return _vm.$refs.dialogEnd.save(_vm.proposed.endDate)}}},[_vm._v("OK")])],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm2":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","disabled":false},on:{"click":function($event){return _vm.add()}}},[_vm._v("\n                                Add\n                                "),_c('fluro-icon',{attrs:{"right":"","icon":"plus"}})],1)],1)],1)],1)])],1)]],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-1d798ff2_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = __vue_normalize__(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//

var script$5 = {
  // props: {
  //     'fields': {
  //         type: Array,
  //     }
  // },
  mixins: [FluroContentEditMixin, FluroContactCommunicateMixin],
  components: {
    ContactTimeline,
    ContactMessageList,
    ContactTransactionList,
    ContactInteractionList,
    ContactCheckinList,
    ContactPostThread,
    ContactGroupManager,
    ContactProcessManager: __vue_component__$1,
    ContactCapabilityManager: __vue_component__$2,
    ContactRelationshipManager: __vue_component__$3,
    ContactUnavailabilityManager: __vue_component__$4,
    FluroAvatarUpdate,
    FluroRealmSelect,
    FluroAcademicSelect
  },
  methods: {
    ping(device) {
      var self = this;
      device.pinging = true;
      self.$fluro.api.get(`/push/ping/${device._id}`, {
        cache: false
      }).then(function (res) {
        device.pinging = false;
        self.$fluro.notify('Ping notification sent!');
      }).catch(function (err) {
        device.pinging = false;
        self.$fluro.error(err);
      });
    },

    resetDevices() {
      var self = this;
      self.$fluro.api.get(`/push/clear/${self.itemID}`, {
        cache: false
      }).then(function (res) {
        self.$fluro.notify('Devices Reset!');
        console.log('Reset');
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    },

    toggleSubscription(type) {
      var self = this;

      switch (type) {
        case 'sms':
          if (self.unsubscribedSMS) {
            self.subscribe('sms');
          } else {
            self.unsubscribe('sms');
          }

          break;

        case 'mailout':
          if (self.unsubscribedMailout) {
            self.subscribe('mailout');
          } else {
            self.unsubscribe('mailout');
          }

          break;
      }
    },

    subscribe(type) {
      var self = this;
      var url;

      switch (type) {
        case 'mailout':
          if (!self.emails || !self.emails.length) {
            self.$fluro.error('No email addresses provided');
            return;
          }

          url = `/mailout/resubscribe`;
          break;

        case 'sms':
          if (!self.phoneNumbers || !self.phoneNumbers.length) {
            self.$fluro.error('No phone numbers provided');
            return;
          }

          url = `/sms/resubscribe`;
          break;
      } ///////////////////////


      self.$fluro.api.post(url, {
        phoneNumbers: self.phoneNumbers,
        emails: self.emails
      }).then(function () {
        self.subscriptionCacheKey = Math.random();
      });
    },

    unsubscribe(type) {
      var self = this;
      var url;

      switch (type) {
        case 'mailout':
          if (!self.emails || !self.emails.length) {
            self.$fluro.error('No email addresses provided');
            return;
          }

          url = `/mailout/unsubscribe`;
          break;

        case 'sms':
          if (!self.phoneNumbers || !self.phoneNumbers.length) {
            self.$fluro.error('No phone numbers provided');
            return;
          }

          url = `/sms/unsubscribe`;
          break;
      } ///////////////////////


      self.$fluro.api.post(url, {
        phoneNumbers: self.phoneNumbers,
        emails: self.emails
      }).then(function () {
        self.subscriptionCacheKey = Math.random();
      });
    },

    updateAcademicCalendar(calendar) {
      // console.log('ACADEMIC THING', calendar);
      var self = this;
      self.$set(self.model, 'academicCalendar', calendar);
      self.update(self.model);
    },

    updateAcademicGrade(grade) {
      // console.log('ACADEMIC GRADE', grade);
      var self = this;
      self.$set(self.model, 'academicGrade', grade);
      self.update(self.model);
    },

    updateFamily() {
      var self = this;

      var enteredValues = _.chain(self.family).get('address').values().compact().value();

      if (enteredValues && enteredValues.length) {
        self.$set(self.model, 'family', self.family);
      } else {
        self.$delete(self.model, 'family');
      } // console.log('Family Updated', self.mod el);

    },

    updateSheetRealms(realms, definitionName) {
      var self = this;
      var realms = self.$fluro.utils.arrayIDs(realms);
      var existingSheet = self.model.details[definitionName];

      if (!existingSheet) {
        self.$set(self.model.details, definitionName, {});
      }

      self.$set(self.model.details[definitionName], 'realms', realms);
    },

    updateSheet(entry, definitionName) {
      var self = this; ///////////////////////////////

      var existingSheet = self.model.details[definitionName];

      if (!existingSheet) {
        self.$set(self.model.details, definitionName, {});
      }

      self.$set(self.model.details[definitionName], 'data', entry); // if (!self.model.details[definitionName]) {
      //     self.$set(self.model.details, definitionName, {
      //         realms: [],
      //         data,
      //     });
      // } else {
      //     if (!_.keys(data).length) {
      //         self.model.details[definitionName] = null;
      //     } else {
      //         self.model.details[definitionName].data = data;
      //     }
      // }
    }

  },
  watch: {
    title(val) {
      this.$set(this.model, 'title', this.title); // this.model.title = val;

      this.update(this.model);
    }

  },

  created() {
    var self = this; // console.log('INITIAL ACADEMIC CALENDAR', self.model.academicCalendar);
    // console.log('INITIAL ACADEMIC GRADE', self.model.academicGrade);

    if (!self.model.academicCalendar) {
      self.$set(self.model, 'academicCalendar', '');
    }

    if (!self.model.academicGrade) {
      self.$set(self.model, 'academicGrade', '');
    } //////////////////////////////////////////////////////////////
    //When we first create the thing, we need to double check and see if we already have data
    //If we do already have data then we will use that
    //Check if there are detail sheets


    if (self.config && self.config.details && self.config.details.length) {
      //Each detail sheet we want to create a thing for it
      self.sheetDefinitions = _.reduce(self.config.details, function (set, definition) {
        if (!definition.fields || !definition.fields.length) {
          return set;
        } /////////////////////////////////////


        var definitionName = definition.definitionName; /////////////////////////////////////

        var field = {
          _id: definition._id,
          title: definition.title,
          type: 'group',
          key: definitionName,
          fields: definition.fields,
          asObject: true,
          minimum: 1,
          maximum: 1,
          askCount: 1
        }; ///////////////////////////////////////////////////////////////

        var extractedEntry = _.get(self.model, `details.${definitionName}`);

        var existingEntry = JSON.parse(JSON.stringify(extractedEntry || {}));
        var cleanedEntry = {
          realms: [],
          data: {}
        }; ///////////////////////////////////////////////////////////////

        if (existingEntry) {
          if (existingEntry.items && existingEntry.items.length) {
            var item = existingEntry.items[0];

            if (!item.data) {
              item.data = {};
            }

            if (!item.realms) {
              item.realms = [];
            }

            cleanedEntry = item;
          }
        } ///////////////////////////////////////////////////////////////


        self.$set(definition, 'dataModel', cleanedEntry); // self.$set(self.details, definitionName, cleanedEntry);
        ///////////////////////////////////////////////////////////////

        definition.field = field;
        set.push(definition);
        return set;
      }, []);

      if (!self.model.details) {
        self.model.details = {};
      } // console.log('dETAILS', self.details)

    }
  },

  asyncComputed: {
    contactDefinitions: {
      default: [],

      get() {
        var self = this; // if (!self.config || !self.config.details || !self.config.details.length) {
        //     return [];
        // }

        return new Promise(function (resolve, reject) {
          self.$fluro.types.subTypes('contact').then(function (definitions) {
            var definitions = _.chain(definitions).filter(function (definition) {
              // console.log('Contact Definition!', definition)
              return definition.status == 'active';
            }).map(function (definition, key) {
              return {
                _id: definition._id,
                name: definition.title,
                value: definition.definitionName
              };
            }).value(); // if(definitions.length) {
            //     definitions.unshift({
            //         name:'Basic Contact',
            //         value:null,
            //     })
            // }


            resolve(definitions);
          }).catch(reject);
        });
      }

    },
    devices: {
      default: [],

      get() {
        var self = this;

        if (self.context != 'edit' || !self.itemID) {
          return Promise.resolve([]);
        } //////////////////////////////////////


        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/contact/${self.itemID}/devices`).then(function (res) {
            resolve(_.map(res.data, function (device) {
              device.pinging = false;
              return device;
            }));
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    smsUnsubscribes: {
      default: [],

      get() {
        var self = this;

        if (self.context != 'edit' || !self.itemID) {
          return Promise.resolve([]);
        } //////////////////////////////////////


        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/contact/${self.itemID}/smsunsubscribes?${self.subscriptionCacheKey}`).then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    mailoutUnsubscribes: {
      default: [],

      get() {
        var self = this;

        if (self.context != 'edit' || !self.itemID) {
          return Promise.resolve([]);
        } //////////////////////////////////////


        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/contact/${self.itemID}/unsubscribes?${self.subscriptionCacheKey}`).then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
  },
  computed: {
    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('firstName', {
        title: 'First Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. Jessica'
      });
      addField('preferredName', {
        title: 'Preferred/Nick Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. 'Jess'`
      });
      addField('middleName', {
        title: 'Middle Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. 'Heather'`
      });
      addField('ethnicName', {
        title: 'Ethnic Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. '吳爾霏'`
      });
      addField('maidenName', {
        title: 'Maiden Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. 'Johnson'`
      });
      addField('lastName', {
        title: 'Last Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. Michaels'
      });
      addField('dob', {
        title: 'Date of Birth',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'date-select'
      });
      addField('dobVerified', {
        title: 'Birthday type',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        directive: 'select',
        defaultValues: [false],
        options: [{
          name: `It's a Guess`,
          value: false
        }, {
          name: `It's Correct`,
          value: true
        }]
      });
      addField('family', {
        title: 'Household / Primary Residence',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'family',
          template: {
            _context: 'contact',
            title: self.model.lastName || '',
            realms: self.model.realms
          }
        }
      });
      addField('householdRole', {
        title: 'Household Role',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'None',
          value: ''
        }, {
          name: 'Parent',
          value: 'parent'
        }, {
          name: 'Child',
          value: 'child'
        }],
        params: {
          restrictType: 'family'
        }
      });
      addField('deceased', {
        title: 'Mark as deceased',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        directive: 'checkbox'
      });
      addField('deceasedDate', {
        title: 'Deceased Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'date-select'
      });

      var timezones = _.map(self.$fluro.date.timezones(), function (timezone) {
        return {
          name: timezone,
          value: timezone
        };
      });

      timezones.unshift({
        name: 'Use Account Default',
        value: ''
      });
      addField('gender', {
        title: 'Gender',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        placeholder: '',
        // defaultValues: ['unknown'],
        options: [{
          name: 'Male',
          value: 'male'
        }, {
          name: 'Female',
          value: 'female'
        }, {
          name: 'Unknown',
          value: 'unknown'
        }]
      });
      addField('maritalStatus', {
        title: 'Marital Status',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        placeholder: '',
        options: [{
          name: 'None',
          value: ''
        }, {
          name: 'Single',
          value: 'single'
        }, {
          name: 'In a relationship',
          value: 'relationship'
        }, {
          name: 'Married',
          value: 'married'
        }, {
          name: 'Widowed',
          value: 'widowed'
        }, {
          name: 'Seperated',
          value: 'seperated'
        }, {
          name: 'Divorced',
          value: 'divorced'
        }]
      }); ///////////////////////////////////

      addField('emails', {
        title: 'Email Address',
        minimum: 0,
        maximum: 0,
        type: 'email',
        // directive:'select',
        placeholder: ''
      });
      addField('phoneNumbers', {
        title: 'Phone Number',
        minimum: 0,
        maximum: 0,
        type: 'string',
        // directive:'select',
        placeholder: '+61 400 123 456'
      }); ///////////////////////////////////

      addField('timezone', {
        title: 'Primary Timezone',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        description: 'Set a local timezone for this contact'
      });
      addField('countryCode', {
        title: 'Default Country Code',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'countrycodeselect'
      }); ///////////////////////////////////

      addField('nametagNotes', {
        title: 'Checkin Nametag Notes',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('capabilities', {
        title: 'Capabilities',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        description: 'Add capabilities for this contact',
        params: {
          restrictType: 'capability'
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

    formOptions() {
      return {};
    },

    title() {
      if (!this.model) {
        return '';
      }

      if (this.model.preferredName) {
        return `${this.model.preferredName} ${this.model.lastName || ''}`;
      }

      if (this.model.firstName) {
        return `${this.model.firstName} ${this.model.lastName || ''}`;
      }

      return '';
    },

    phoneNumbers() {
      return this.model.phoneNumbers;
    },

    emails() {
      return this.model.emails;
    },

    unsubscribedMailout() {
      return this.mailoutUnsubscribes.length ? true : false;
    },

    unsubscribedSMS() {
      return this.smsUnsubscribes.length ? true : false;
    },

    contextName() {
      var name = this.model.preferredName || this.model.firstName || '';

      if (!name || !name.length) {
        return '';
      }

      if (_.endsWith(name, 's')) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    definitionField() {
      var self = this; ///////////////////////////////////

      return {
        title: 'Contact Type / Definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        key: 'definition',
        options: self.contactDefinitions
      };
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    showPreferredName() {
      return this.model.preferredName && this.model.preferredName.length || this.show.preferredName;
    },

    showEthnicName() {
      return this.model.ethnicName && this.model.ethnicName.length || this.show.ethnicName;
    },

    showMiddleName() {
      return this.model.middleName && this.model.middleName.length || this.show.middleName;
    },

    showMaidenName() {
      return this.model.maidenName && this.model.maidenName.length || this.show.maidenName;
    }

  },

  data() {
    return {
      // loadingDetails: true,
      // loadingDefinitions: true,
      subscriptionCacheKey: 0,
      sheetDefinitions: [],
      details: {},
      detailsModel: {},
      family: {},
      show: {
        preferredName: false,
        middleName: false,
        ethnicName: false,
        maidenName: false
      },
      familyFields: [{
        title: 'Name of household',
        key: 'title',
        minimum: 0,
        maximum: 1,
        "expressions": {
          defaultValue: 'data.lastName'
        }
      }, {
        title: 'Address',
        key: 'address',
        minimum: 1,
        maximum: 1,
        askCount: 1,
        type: 'group',
        asObject: true,
        fields: [{
          title: 'Street Address Line 1',
          key: 'addressLine1',
          minimum: 0,
          maximum: 1
        }, {
          title: 'Address Line 2',
          key: 'addressLine2',
          minimum: 0,
          maximum: 1,
          "expressions": {
            hide: '!data.addressLine1.length' // defaultValue:'data.addressLine1.length',

          },
          className: 'xs12 sm6'
        }, {
          type: 'group',
          "minimum": 1,
          "askCount": 1,
          "maximum": 1,
          sameLine: 1,
          fields: [{
            title: 'Suburb',
            key: 'suburb',
            minimum: 0,
            maximum: 1,
            className: "xs12 sm4"
          }, {
            title: 'State',
            key: 'state',
            minimum: 0,
            maximum: 1,
            className: "xs12 sm4"
          }, {
            title: 'Postal Code',
            key: 'postalCode',
            minimum: 0,
            maximum: 1,
            className: "xs12 sm4"
          }]
        }]
      }]
    };
  }

};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true},scopedSlots:_vm._u([{key:"menuprefix",fn:function(){return [(_vm.context == 'edit' && _vm.$vuetify.breakpoint.mdAndUp)?[_c('flex-column-header',{staticStyle:{"text-align":"center"}},[_c('div',{staticStyle:{"padding":"10px","max-width":"200px","margin":"auto"}},[_c('fluro-avatar-update',{attrs:{"id":_vm.model._id,"type":"contact"}})],1),_vm._v(" "),_c('v-container',{staticClass:"border-bottom text-xs-center",attrs:{"px-0":"","fluid":""}},[_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1 ml-0",attrs:{"disabled":!_vm.canEmail,"icon":"","color":"primary","content":"Send Email"},on:{"click":function($event){return _vm.communicate('email')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"envelope"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1",attrs:{"disabled":!_vm.canSMS,"icon":"","color":"primary","content":"Send SMS"},on:{"click":function($event){return _vm.communicate('sms')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"comment"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1",attrs:{"disabled":!_vm.canCall,"icon":"","color":"primary","content":"Call"},on:{"click":function($event){return _vm.communicate('phone')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"phone"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1",attrs:{"disabled":!_vm.canPost,"icon":"","color":"primary","content":"Add Post/Note"},on:{"click":_vm.addPost}},[_c('fluro-icon',{attrs:{"library":"fas","type":"post"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1 mr-0",attrs:{"icon":"","color":"primary","content":"Add to Address Book"},on:{"click":function($event){return _vm.communicate('vcard')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"address-book"}})],1)],1)],1)]:_vm._e()]},proxy:true}])},[_vm._v(" "),_c('tab',{attrs:{"heading":"Basic Details"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Basic Details")]),_vm._v(" "),(_vm.$vuetify.breakpoint.xsOnly)?[(_vm.context == 'edit')?[_c('div',{staticStyle:{"max-width":"200px","margin":"auto"}},[_c('fluro-avatar-update',{attrs:{"id":_vm.model._id,"type":"contact"}})],1)]:_vm._e()]:_vm._e(),_vm._v(" "),_c('wrapper',{attrs:{"xs":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{class:{'xs12':_vm.$vuetify.breakpoint.xsOnly}},[_c('fluro-content-form-field',{staticClass:"right-messages",attrs:{"autofocus":_vm.$vuetify.breakpoint.smAndUp,"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.firstName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.showPreferredName)?_c('fluro-content-form-field',{staticClass:"right-messages",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.preferredName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}):_vm._e(),_vm._v(" "),(_vm.showEthnicName)?_c('fluro-content-form-field',{staticClass:"right-messages",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.ethnicName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"additions"},[(!_vm.showPreferredName)?_c('a',{staticClass:"hint",on:{"click":function($event){_vm.show.preferredName = true;}}},[_vm._v("Add Nick/Preferred Name")]):_vm._e(),_vm._v(" "),(!_vm.showEthnicName)?_c('a',{staticClass:"hint",on:{"click":function($event){_vm.show.ethnicName = true;}}},[_vm._v("Add Ethnic Name")]):_vm._e()])],1),_vm._v(" "),(_vm.showMiddleName)?_c('v-flex',{class:{'xs12':_vm.$vuetify.breakpoint.xsOnly}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.middleName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),_c('v-flex',{class:{'xs12':_vm.$vuetify.breakpoint.xsOnly}},[_c('fluro-content-form-field',{staticClass:"right-messages",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.lastName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.showMaidenName)?_c('fluro-content-form-field',{staticClass:"right-messages",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.maidenName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"additions"},[(!_vm.showMiddleName)?_c('a',{staticClass:"hint",on:{"click":function($event){_vm.show.middleName = true;}}},[_vm._v("Add Middle Name")]):_vm._e(),_vm._v(" "),(!_vm.showMaidenName)?_c('a',{staticClass:"hint",on:{"click":function($event){_vm.show.maidenName = true;}}},[_vm._v("Add Maiden Name")]):_vm._e()])],1)],1),_vm._v(" "),(_vm.contactDefinitions.length)?[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.definitionField},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]:_vm._e()],2),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.gender},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.maritalStatus},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"options":_vm.formOptions,"field":_vm.fieldHash.emails},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"options":_vm.formOptions,"field":_vm.fieldHash.phoneNumbers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.dob},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.dobVerified},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.timezone},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('wrapper',{attrs:{"xs":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("School / Academic Details")]),_vm._v(" "),_c('fluro-academic-select',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions},on:{"calendar":_vm.updateAcademicCalendar,"grade":_vm.updateAcademicGrade},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Checkin Nametag Notes")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Publicly displayed notes to be printed on "+_vm._s(_vm.contextName)+" nametag")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"showLabel":false,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.nametagNotes},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],2)],1)],1)])],2),_vm._v(" "),(_vm.itemID)?_c('tab',{attrs:{"heading":"Activity Timeline"}},[_c('tabset',{staticClass:"timeline-tabset",attrs:{"justified":true}},[_c('tab',{attrs:{"tooltip":"Activity Timeline","icon":{icon:'user-clock'}}},[_c('contact-timeline',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('tab',{attrs:{"tooltip":"Form Submissions","icon":{type:'form'}}},[_c('contact-interaction-list',{attrs:{"contact":_vm.model}})],1),_vm._v(" "),_c('tab',{attrs:{"tooltip":"Attendance","icon":{type:'checkin'}}},[_c('contact-checkin-list',{attrs:{"contact":_vm.model}})],1),_vm._v(" "),_c('tab',{attrs:{"tooltip":"Messaging","icon":{icon:'envelope'}}},[_c('contact-message-list',{attrs:{"contact":_vm.model}})],1),_vm._v(" "),_c('tab',{attrs:{"tooltip":"Transactions","icon":{type:'transaction'}}},[_c('contact-transaction-list',{attrs:{"contact":_vm.model}})],1),_vm._v(" "),_c('tab',{attrs:{"tooltip":"Posts and Notes","icon":{type:'post'}}},[_c('contact-post-thread',{attrs:{"contact":_vm.model}})],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Household & Relationships"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[(_vm.context == 'edit')?[_c('h3',{attrs:{"margin":""}},[_vm._v("Household / Residence")]),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"override-label":(_vm.contextName + " Household Role"),"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.householdRole},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Family Household")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select "+_vm._s(_vm.contextName)+" primary residence")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"showLabel":false,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.family},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)]:[_c('h3',{attrs:{"margin":""}},[_vm._v("Household")]),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"override-label":(_vm.contextName + " Household Role"),"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.householdRole},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(!_vm.model._id)?_c('fluro-panel',[_c('tabset',[_c('tab',{attrs:{"heading":"Create new Household"}},[_c('v-container',[_c('fluro-content-form',{attrs:{"options":_vm.formOptions,"fields":_vm.familyFields},on:{"input":_vm.updateFamily},model:{value:(_vm.family),callback:function ($$v) {_vm.family=$$v;},expression:"family"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Add to existing Household"}},[_c('v-container',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Family Household")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select "+_vm._s(_vm.contextName)+" primary residence")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"showLabel":false,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.family},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1):[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Family Household")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select "+_vm._s(_vm.contextName)+" primary residence")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"showLabel":false,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.family},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)]],_vm._v(" "),_c('h3',{attrs:{"margin":""}},[_vm._v("Relationships")]),_vm._v(" "),_c('contact-relationship-manager',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],2)],1)],1)])],2),_vm._v(" "),(_vm.model._id)?_c('tab',{attrs:{"heading":"Groups & Teams"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.contextName)+" Groups & Teams")]),_vm._v(" "),_c('contact-group-manager',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)])],2):_vm._e(),_vm._v(" "),(_vm.model._id)?_c('tab',{attrs:{"heading":"Processes"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.contextName)+" Progress")]),_vm._v(" "),_c('contact-process-manager',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)])],2):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Capabilities"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.contextName)+" Capabilities")]),_vm._v(" "),_c('contact-capability-manager',{model:{value:(_vm.model.capabilities),callback:function ($$v) {_vm.$set(_vm.model, "capabilities", $$v);},expression:"model.capabilities"}})],1)],1)],1)])],2),_vm._v(" "),(_vm.context == 'edit')?_c('tab',{attrs:{"heading":"Rostering / Availability"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[(_vm.model._id)?_c('div',[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.contextName)+" Unavailability")]),_vm._v(" "),_c('contact-unavailability-manager',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()])],1)],1)])],2):_vm._e(),_vm._v(" "),(_vm.context == 'edit')?_c('tab',{attrs:{"heading":"Notifications"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Notifications")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.countryCode},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.phoneNumbers.length || _vm.emails.length)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Communication Preferences")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Manage "+_vm._s(_vm.contextName)+" subscription preferences below")]),_vm._v(" "),_c('div',{staticClass:"toggle-items"},[(_vm.emails.length)?[_c('fluro-toggle-item',{attrs:{"inactive":_vm.unsubscribedMailout},nativeOn:{"click":function($event){return _vm.toggleSubscription('mailout')}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAllow Promotional Emails\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])]:_vm._e(),_vm._v(" "),(_vm.phoneNumbers.length)?[_c('fluro-toggle-item',{attrs:{"inactive":_vm.unsubscribedSMS},nativeOn:{"click":function($event){return _vm.toggleSubscription('sms')}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAllow Promotional SMS\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])]:_vm._e()],2)],1):_vm._e(),_vm._v(" "),_c('p'),_vm._v(" "),(_vm.devices.length)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v(_vm._s(_vm.contextName)+" Connected Devices")]),_vm._v(" "),_c('list-group',_vm._l((_vm.devices),function(device){return _c('list-group-item',{scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('fluro-icon',{attrs:{"icon":"mobile"}})]},proxy:true},{key:"default",fn:function(){return [_c('div',[_c('strong',{staticClass:"text-capitalize"},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(device.application)+" - "+_vm._s(device.metadata.model)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"sm text-muted"},[_vm._v(_vm._s(device.metadata.platform)+" "+_vm._s(device.metadata.version))])])]},proxy:true},{key:"right",fn:function(){return [_c('v-btn',{attrs:{"small":"","loading":device.pinging},on:{"click":function($event){return _vm.ping(device)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tPing\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])]},proxy:true}],null,true)})}),1),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tIf you are experiencing problems with push notifications it can sometimes be helpful to reset all devices for a contact allowing them to reconnect next time they sign in to an application\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('v-btn',{attrs:{"small":""},on:{"click":function($event){return _vm.resetDevices()}}},[_c('span',[_vm._v("Reset all devices")]),_vm._v(" "),_c('fluro-icon',{attrs:{"icon":"trash"}})],1)],1):_vm._e()],1)],1)],1)])],2):_vm._e(),_vm._v(" "),_vm._l((_vm.sheetDefinitions),function(sheet){return _c('tab',{key:sheet._id,attrs:{"heading":sheet.title}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(sheet.title))]),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Realms")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select where "+_vm._s(_vm.contextName)+" "+_vm._s(sheet.title)+" information should be stored")]),_vm._v(" "),_c('fluro-realm-select',{attrs:{"type":"contactdetail","definition":sheet.definitionName},on:{"input":function($event){return _vm.updateSheetRealms($event, sheet.definitionName)}},model:{value:(sheet.dataModel.realms),callback:function ($$v) {_vm.$set(sheet.dataModel, "realms", $$v);},expression:"sheet.dataModel.realms"}})],1),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.formOptions,"fields":sheet.fields},on:{"input":function($event){return _vm.updateSheet($event, sheet.definitionName)}},model:{value:(sheet.dataModel.data),callback:function ($$v) {_vm.$set(sheet.dataModel, "data", $$v);},expression:"sheet.dataModel.data"}})],1)],1)],1)])],2)}),_vm._v(" "),(_vm.context == 'edit')?_c('tab',{attrs:{"heading":"Metadata"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Metadata")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.timezone},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-layout',[_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.deceased},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{directives:[{name:"show",rawName:"v-show",value:(_vm.model.deceased),expression:"model.deceased"}]},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.formOptions,"field":_vm.fieldHash.deceasedDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(_vm.model.data)?_c('div',[_c('v-card',[_c('v-card-text',[_c('h5',[_vm._v("Explore Metadata")]),_vm._v(" "),_c('json-view',{attrs:{"deep":3,"data":_vm.model.data}})],1)],1)],1):_vm._e()],1)],1)],1)])],2):_vm._e()],2)],2)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-c3bae22a_0", { source: ".border-top[data-v-c3bae22a]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-c3bae22a]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-c3bae22a]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-c3bae22a]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-c3bae22a]{font-size:10px;opacity:.5;color:inherit;display:block}.bordered[data-v-c3bae22a]{border:1px solid rgba(0,0,0,.1);box-shadow:0 2px 4px rgba(0,0,0,.1)}.bordered[data-v-c3bae22a] .tabset-menu{background:#eee}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-c3bae22a";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = __vue_normalize__(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$5;
//# sourceMappingURL=contact-5aaff349.js.map
