import { aa as FluroContentView, bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-d8661d8f.js';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'vue2-ace-editor';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-ed7add5b.js';
import { M as MessagingEventManager, L as LocationSelector } from './LocationSelector-474e9717.js';
import { G as GuestList, L as LocationViewMapComponent } from './GuestList-5514b13b.js';

//

var script = {
  components: {
    GuestList,
    // FluroContentEdit,
    FluroContentView,
    MessagingEventManager,
    LocationSelector,
    LocationViewMapComponent
  },
  props: {},
  mixins: [FluroContentEditMixin],
  methods: {
    copyToClipboard(refID) {
      var self = this;
      let testingCodeToCopy = this.$refs[refID];
      testingCodeToCopy.setAttribute('type', 'text'); // 不是 hidden 才能複製

      testingCodeToCopy.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful'; // alert('Testing code was copied ' + msg);

        self.$fluro.notify('Invite Code Copied to clipboard');
      } catch (err) {} // alert('Oops, unable to copy');
      // self.$fluro.error({message:'Unable to copy to clipboard'});

      /* unselect the range */


      testingCodeToCopy.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    },

    closePlan() {},

    planUpdated(result) {
      console.log('changed the plan!', result);
    },

    createPlan() {
      var self = this;
      var event = self.model; ///////////////////////////////////////////////////////

      self.$fluro.global.select('plan', {
        title: 'Select a template',
        minimum: 1,
        maximum: 1
      }, true).then(function (plans) {
        if (!plans || !plans.length) {
          return;
        }

        var planID = self.$fluro.utils.getStringID(plans[0]);
        self.processing = true;
        return self.$fluro.content.get(planID).then(function (fullPlan) {
          var template = fullPlan;
          template.realms = event.realms; ///////////////////////////////////

          template.event = event;
          template.startDate = event.startDate;
          template.status = 'active';
          delete template._id;
          self.$fluro.global.create('plan', {
            template,
            copy: true
          }, true).then(function (res) {
            self.processing = false;
          }, function (err) {
            self.processing = false;
          });
        });
      });
    },

    createRoster(rosterType) {
      var self = this;
      var template = {
        title: rosterType.title,
        event: self.model,
        definition: rosterType.definitionName,
        realms: self.model.realms.slice()
      };
      self.$fluro.global.create(rosterType.definitionName, {
        template
      }, true).then(function (result) {
        console.log('Result');
      }).catch(function (err) {}); // fluro.global.create = function(definedType, options, modal) {
    },

    confirmationIcon(assignment) {
      switch (assignment.confirmationStatus) {
        case 'confirmed':
          return 'check';

        case 'denied':
          return 'times';

        case 'unknown':
          return 'clock';

        case 'proposed':
          return 'question-circle';
      }
    },

    canEditRoster(roster) {
      return this.$fluro.access.canEditItem(roster);
    } // editRoster(roster) {
    //     console.log('Eit roster', roster);
    // },


  },
  watch: {
    'dateModel.startDate': function (value) {
      /**/
      // console.log('VALUE IS', value)
      var date = new Date(value);
      this.model.startDate = date;
      this.update(this.model); //If there is actually a value

      if (value) {
        //Check what the end date is currently
        var endDate = this.dateModel.endDate ? new Date(this.dateModel.endDate) : false;

        if (endDate) {
          //If the end date is less than the start date, update it to the start date
          if (endDate < date) {
            this.dateModel.endDate = new Date(date);
          }
        } else {
          //If there is no end date, we should default to match the start date
          this.dateModel.endDate = new Date(date);
        }
      }
    },
    'dateModel.endDate': function (value) {
      /**/
      // console.log('VALUE IS', value)
      var date = new Date(value);
      this.model.endDate = date;
      this.update(this.model);
      var startDate = this.dateModel.startDate ? new Date(this.dateModel.startDate) : false;

      if (startDate) {
        if (startDate > date) {
          // console.log('UPDATE START DATE', startDate, ' is greater than', date)
          this.dateModel.startDate = new Date(date);
        }
      }
      /**/

    }
  },

  created() {
    var self = this;

    if (!self.model.data) {
      self.$set(self.model, 'data', {});
    } //console.log('Start Date BEFORE', self.model.startDate, self.model.endDate);


    if (self.model.startDate) {
      self.dateModel.startDate = new Date(self.model.startDate);
    }

    if (self.model.endDate) {
      self.dateModel.endDate = new Date(self.model.endDate);
    }

    if (!self.model.checkinData) {
      self.$set(self.model, 'checkinData', {
        checkinStartOffset: 90,
        checkinEndOffset: 90
      });
    }

    if (!self.model.streamData) {
      self.$set(self.model, 'streamData', {
        streamStartOffset: 30,
        streamEndOffset: 30
      });
    }

    if (!self.model.messages) {
      self.$set(self.model, 'messages', []);
    }

    if (!self.model.locations) {
      self.$set(self.model, 'locations', []);
    }

    if (!self.model.rooms) {
      self.$set(self.model, 'rooms', []);
    }
  },

  asyncComputed: {
    rosterTypes: {
      default: [],

      get() {
        var self = this; ///////////////////////////////////

        return new Promise(function (resolve, reject) {
          return self.$fluro.types.subTypes('roster').then(function (types) {
            var filtered = _.filter(types, function (type) {
              var alreadyCreated = !self.existingRosterTypes[type.definitionName];

              if (!alreadyCreated) {
                return;
              } //Return if we have enough permissions to create this thing


              return self.$fluro.access.can('create', type.definitionName, 'roster');
            });

            resolve(filtered);
          }).catch(reject);
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
  },
  computed: {
    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Event Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Event title'
      });
      addField('firstLine', {
        title: 'Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. A great event for the whole family. Featuring Special Guest...',
        description: 'A short one line description about this event'
      }); ///////////////////////////////////

      addField('streamEnabled', {
        title: 'Stream Enabled',
        description: 'Enable live streaming for this event',
        minimum: 0,
        maximum: 1,
        type: 'boolean' // defaultValues: [true]

      }); ///////////////////////////////////

      addField('streamContent', {
        title: 'Pre-recorded Video',
        description: 'Select or create a video to stream for this event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'video'
        }
      });
      addField('streamIntegrations', {
        title: 'Stream Integrations',
        description: 'Broadcast to multiple endpoints',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'integration'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      var now = self.$fluro.date.moment().add('2', 'months').toDate();
      console.log('Create Default event date', now); // new Date();

      addField('startDate', {
        title: 'Start Date',
        minimum: 1,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker',
        defaultValues: [now]
      });
      addField('endDate', {
        title: 'End Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker',
        defaultValues: [now]
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

      addField('mainImage', {
        title: 'Main Promotional Image',
        description: 'Select a main promotional image for this event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      });
      addField('track', {
        title: 'Event Track',
        description: 'The event track for this event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'eventtrack'
        }
      });
      addField('body', {
        title: 'Body',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg',
        placeholder: '',
        description: ''
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('images', {
        title: 'Additional Images',
        description: 'Additional promotional images for this event',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      });
      addField('videos', {
        title: 'Videos',
        description: 'Additional video content for this event',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'video'
        }
      });
      addField('assets', {
        title: 'Files and Resources',
        description: 'Additional downloadable assets and resources for this event',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'asset'
        }
      });
      addField('externalLinks', {
        title: 'External Link',
        // description: '',
        minimum: 0,
        maximum: 0,
        askCount: 0,
        type: 'group',
        asObject: true,
        sameLine: true,
        fields: [{
          type: 'group',
          sameLine: true,
          fields: [{
            title: 'Title',
            key: 'title',
            type: 'string',
            minimum: 1,
            maximum: 1
          }, {
            title: 'URL',
            key: 'url',
            type: 'url',
            minimum: 1,
            maximum: 1,
            placeholder: 'https://'
          }]
        }]
      }); ///////////////////////////////////

      addField('socialImages', {
        title: 'Social Media Artwork',
        description: 'Add images and artwork that can be shared from pulse and slipstream to promote this event',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      });
      addField('socialBody', {
        title: 'Social Media Blurb',
        description: 'Add a social blurb and hashtags to use when sharing/promoting this event',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'textarea'
      }); // addField('externalLinks', {
      //     title: 'External Links',
      //     description: 'Relevant external links and URLs for this event',
      //     minimum: 0,
      //     maximum: 0,
      //     type: '',
      //     directive: 'reference-select',
      //     params: {
      //         restrictType: 'asset',
      //     }
      // });
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('forms', {
        title: 'Registration Forms',
        description: 'Manage registration forms that can be used to register for this event',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'form'
        }
      });
      addField('expectTeams', {
        title: 'Expect Groups',
        description: 'Select groups to expect as attendees. This will expect all active members of these groups as attending at the time of event start',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'team'
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

    eventID() {
      return this.$fluro.utils.getStringID(this.model);
    },

    accountID() {
      return this.$fluro.utils.getStringID(this.model.account);
    },

    rtmpUrl() {
      if (!this.streamKey) {
        return 'Please save this event to generate your RTMP URL';
      }

      return 'rtmp://rtmp.fluro.io/live/';
    },

    liveUrl() {
      if (!this.streamKey) {
        return 'Please save this event to generate your fluro live url';
      }

      return `https://fluro.live/event/${this.accountID}/${this.eventID}`;
    },

    streamUrl() {
      if (!this.streamKey) {
        return 'Please save this event to generate your fluro live url';
      }

      return `https://rtmp.fluro.io/live/${this.accountID}.${this.eventID}/index.m3u8`;
    },

    streamKey() {
      var self = this;

      if (!self.eventID || !self.accountID) {
        return; // 'Please save this event to get your stream key';
      }

      return `${self.accountID}.${self.eventID}`;
    },

    readableTypeName() {
      return this.definition ? this.$fluro.types.readable(this.definition.title) : 'Event';
    },

    plans() {
      return this.model.plans || [];
    },

    existingRosterTypes() {
      return _.reduce(this.model.rostered, function (set, roster) {
        set[roster.definition] = true;
        return set;
      }, {});
    },

    coverImage() {
      var self = this;
      return self.$fluro.asset.coverImage(self.model._id, 'event', {
        w: 150
      });
    },

    checkinStartOffset() {
      var self = this;
      var originalOffsetValue = self.model.checkinData.checkinStartOffset;

      if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {
        return 90;
      } else {
        return parseInt(originalOffsetValue);
      }
    },

    checkinStartDate() {
      var self = this;
      return self.$fluro.date.moment(self.model.startDate).subtract(self.checkinStartOffset, 'minutes').toDate();
    },

    checkinEndOffset() {
      var self = this;
      var originalOffsetValue = self.model.checkinData.checkinEndOffset;

      if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {
        return 90;
      } else {
        return parseInt(originalOffsetValue);
      }
    },

    checkinEndDate() {
      var self = this;
      return self.$fluro.date.moment(self.model.startDate).add(self.checkinEndOffset, 'minutes').toDate();
    },

    checkinFields() {
      return [{
        title: 'Checkin Opens',
        description: 'How many minutes earlier can users checkin',
        key: 'checkinStartOffset',
        placeholder: "Defaults to 90 mins before event start",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: 'integer'
      }, {
        title: 'Checkin Closes',
        description: `How many minutes after this event's end time can a user still checkin`,
        key: 'checkinEndOffset',
        placeholder: "Defaults to 90 mins after event ends",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: 'integer'
      }];
    },

    streamStartOffset() {
      var self = this;
      var originalOffsetValue = self.model.streamData.streamStartOffset;

      if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {
        return 90;
      } else {
        return parseInt(originalOffsetValue);
      }
    },

    streamStartDate() {
      var self = this;
      return self.$fluro.date.moment(self.model.startDate).subtract(self.streamStartOffset, 'minutes').toDate();
    },

    streamEndOffset() {
      var self = this;
      var originalOffsetValue = self.model.streamData.streamEndOffset;

      if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {
        return 90;
      } else {
        return parseInt(originalOffsetValue);
      }
    },

    streamEndDate() {
      var self = this;
      return self.$fluro.date.moment(self.model.endDate || self.model.startDate).add(self.streamEndOffset, 'minutes').toDate();
    },

    streamFields() {
      return [{
        title: 'Stream Opens',
        description: 'How many minutes earlier can users stream',
        key: 'streamStartOffset',
        placeholder: "Defaults to 30 mins before event start",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: 'integer'
      }, {
        title: 'Stream Closes',
        description: `How many minutes after this event's end time can a user still stream`,
        key: 'streamEndOffset',
        placeholder: "Defaults to 30 mins after event ends",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: 'integer'
      }];
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    }

  },

  data() {
    var existingModel = JSON.parse(JSON.stringify(this.value));
    return {
      dateModel: {
        startDate: existingModel.startDate ? new Date(existingModel.startDate) : null,
        endDate: existingModel.endDate ? new Date(existingModel.endDate) : null
      }
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":(_vm.readableTypeName + " Info")}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Event Details")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.startDate},model:{value:(_vm.dateModel),callback:function ($$v) {_vm.dateModel=$$v;},expression:"dateModel"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.endDate},model:{value:(_vm.dateModel),callback:function ($$v) {_vm.dateModel=$$v;},expression:"dateModel"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.timezone},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.mainImage},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.body},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('fluro-panel',[_c('fluro-panel-title',[_c('strong',[_vm._v(_vm._s(_vm.definition.title)+" Information")])]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1):_vm._e(),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"override-label":_vm.definition && _vm.definition.definitionName && _vm.definition.definitionName == 'service' ? 'Service Time / Event Track' : 'Event Track',"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.track},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)])],2),_vm._v(" "),(_vm.model.rostered)?_c('tab',{attrs:{"heading":"Team Members"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h3',[_vm._v("Team Members")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{attrs:{"color":"primary","to":{name:'events.multi', query:{ids:[_vm.model._id]}}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tOpen in Multi Planner\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"right":"","icon":"game-board"}})],1)],1)],1),_vm._v(" "),_vm._l((_vm.model.rostered),function(roster){return _c('fluro-panel',{key:roster._id},[_c('fluro-panel-title',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('strong',[_vm._v(_vm._s(roster.title))])]),_vm._v(" "),(_vm.canEditRoster(roster))?_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0",attrs:{"icon":"","content":"Actions"},on:{"click":function($event){return _vm.$actions.open([roster])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)],1):_vm._e()],1)],1),_vm._v(" "),_c('fluro-panel-body',[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((roster.slots),function(slot,index){return (slot.assignments && slot.assignments.length)?_c('v-flex',{key:index,attrs:{"xs6":"","sm4":"","md3":""}},[_c('v-container',{staticClass:"mb-2 pa-2"},[_c('h5',[_vm._v(_vm._s(slot.title))]),_vm._v(" "),_vm._l((slot.assignments),function(assignment){return _c('div',{key:assignment._id,staticClass:"assignment-item",class:assignment.confirmationStatus,on:{"click":function($event){return _vm.$actions.open([assignment])}}},[_c('v-layout',[_c('v-flex',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{attrs:{"right":"","icon":_vm.confirmationIcon(assignment)}})],1)],1)],1)})],2)],1):_vm._e()}),1)],1)],1)}),_vm._v(" "),_vm._l((_vm.rosterTypes),function(rosterType){return _c('v-btn',{staticClass:"btn-ghost",attrs:{"block":""},on:{"click":function($event){return _vm.createRoster(rosterType)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd "+_vm._s(rosterType.title)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])})],2)],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Livestream Settings"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Livestream Settings")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"options":_vm.options,"field":_vm.fieldHash.streamEnabled},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.model.streamEnabled)?[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.streamFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-container',{attrs:{"pa-0":"","grid-list-xl":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Stream Starts")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("How many minutes earlier should the stream be available?")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.streamStartOffset},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(_vm._f("formatDate")(_vm.streamStartDate,'h:mma dddd D MMM', model.timezone))+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Stream Ends")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("How many minutes after this event's end time should the stream be available?")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.streamEndOffset},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(_vm._f("formatDate")(_vm.streamEndDate,'h:mma dddd D MMM', model.timezone))+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)],1)],1)]}}],null,false,1565591026),model:{value:(_vm.model.streamData),callback:function ($$v) {_vm.$set(_vm.model, "streamData", $$v);},expression:"model.streamData"}}),_vm._v(" "),(_vm.model._id && _vm.liveUrl)?_c('v-btn',{attrs:{"target":"_blank","href":_vm.liveUrl,"block":"","large":"","color":"primary"}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tWatch on Fluro Live\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]):_vm._e(),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.streamIntegrations},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.streamContent},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('v-input',{staticClass:"no-flex",attrs:{"label":"RTMP Upstream URL"}},[_c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"content":"Click to copy to clipboard"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.copyToClipboard('rtmpUrl')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticClass:"copystring"},[_vm._v(_vm._s(_vm.rtmpUrl))])],1),_vm._v(" "),_c('input',{ref:"rtmpUrl",attrs:{"type":"hidden"},domProps:{"value":_vm.rtmpUrl}})],1)]),_vm._v(" "),_c('v-input',{staticClass:"no-flex",attrs:{"label":"RTMP Stream Key"}},[_c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"content":"Click to copy to clipboard"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.copyToClipboard('streamKey')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticClass:"copystring"},[_vm._v(_vm._s(_vm.streamKey))])],1),_vm._v(" "),_c('input',{ref:"streamKey",attrs:{"type":"hidden"},domProps:{"value":_vm.streamKey}})],1)]),_vm._v(" "),_c('v-input',{staticClass:"no-flex",attrs:{"label":"Fluro Live URL"}},[_c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"content":"Click to copy to clipboard"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.copyToClipboard('liveUrl')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticClass:"copystring"},[_vm._v(_vm._s(_vm.liveUrl))])],1),_vm._v(" "),_c('input',{ref:"liveUrl",attrs:{"type":"hidden"},domProps:{"value":_vm.liveUrl}})],1)]),_vm._v(" "),_c('v-input',{staticClass:"no-flex",attrs:{"label":"Video Stream URL"}},[_c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"content":"Click to copy to clipboard"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.copyToClipboard('streamUrl')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticClass:"copystring"},[_vm._v(_vm._s(_vm.streamUrl))])],1),_vm._v(" "),_c('input',{ref:"streamUrl",attrs:{"type":"hidden"},domProps:{"value":_vm.streamUrl}})],1)])],1)],1)]:_vm._e()],2)],1)],1)],1),_vm._v(" "),(_vm.model._id)?_c('tab',{attrs:{"heading":((_vm.plans.length) + " Plan" + (_vm.plans.length == 1 ? '' : 's'))}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h3',[_vm._v(_vm._s(_vm.plans.length)+" Plan"+_vm._s(_vm.plans.length == 1 ? '' : 's'))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[(_vm.$fluro.access.can('create', 'plan'))?_c('v-btn',{attrs:{"color":"primary"},on:{"click":function($event){return _vm.createPlan()}}},[_c('span',[_vm._v("Add Plan")]),_vm._v(" "),_c('fluro-icon',{attrs:{"icon":"plus","right":""}})],1):_vm._e()],1)],1),_vm._v(" "),_c('fluro-panel',[_c('tabset',{attrs:{"justified":true}},_vm._l((_vm.plans),function(plan,index){return _c('tab',{attrs:{"heading":plan.title}},[_c('fluro-content-view',{attrs:{"id":_vm.plans[index],"embedded":true,"type":"plan"}})],1)}),1)],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Location & Rooms"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('location-view-map-component',{staticStyle:{"width":"100%","min-height":"300px","height":"50vh"},attrs:{"name":"locationMap","positions":_vm.model.locations}}),_vm._v(" "),_c('constrain',{staticClass:"mt-4",attrs:{"sm":""}},[_c('location-selector',{attrs:{"allLocations":_vm.locations,"locationsPath":"locations","roomsPath":"rooms"},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Media & Resources"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Media & Resources")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.mainImage},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.images},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.videos},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.assets},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.externalLinks},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('strong',[_vm._v("Social Media")])]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.socialImages},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.socialBody},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Guests / Ticketing"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('h3',{attrs:{"margin":""}},[_vm._v("Registrations & Ticketing")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.forms},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.expectTeams},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('guest-list',{attrs:{"event":_vm.model}})],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Messaging"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"lg":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Automated Messages")]),_vm._v(" "),_c('messaging-event-manager',{attrs:{"config":_vm.config,"startDate":_vm.model.startDate,"endDate":_vm.model.endDate},model:{value:(_vm.model.messages),callback:function ($$v) {_vm.$set(_vm.model, "messages", $$v);},expression:"model.messages"}})],1)],1)],1)])],2),_vm._v(" "),_c('tab',{attrs:{"heading":"Checkin Settings"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Checkin Settings")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.checkinFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-container',{attrs:{"pa-0":"","grid-list-xl":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Checkin Opens")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("How many minutes earlier can users checkin")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.checkinStartOffset},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("No checkins before")]),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(_vm._f("formatDate")(_vm.checkinStartDate,'h:mma dddd D MMM', model.timezone))+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Checkin Closes")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("How many minutes after this event's end time can a user still check in?")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.checkinEndOffset},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("No checkins after")]),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(_vm._f("formatDate")(_vm.checkinEndDate,'h:mma dddd D MMM', model.timezone))+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)],1)],1)]}}]),model:{value:(_vm.model.checkinData),callback:function ($$v) {_vm.$set(_vm.model, "checkinData", $$v);},expression:"model.checkinData"}})],1)],1)],1)],1)],1)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-63ef2219_0", { source: ".border-top[data-v-63ef2219]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-63ef2219]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-63ef2219]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-63ef2219]{border-left:1px solid rgba(0,0,0,.05)}.event-cover-image[data-v-63ef2219]{border-radius:5px;width:90%;padding-bottom:70%;background-repeat:no-repeat;background-position:center;background-size:cover;display:block;margin:5%}.hint[data-v-63ef2219]{font-size:10px;opacity:.5;color:inherit;display:block}.copystring[data-v-63ef2219]{width:100%;overflow:auto;display:block;background:#eee;border-radius:3px;opacity:.5;padding:10px;line-height:20px}.copystring[data-v-63ef2219]:hover{opacity:1}.assignment-item[data-v-63ef2219]{font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;border-radius:100px;margin-bottom:2px;padding:2px 10px;font-weight:500;background-color:rgba(0,0,0,.05)}.assignment-item.confirmed[data-v-63ef2219]{color:#4cc650;background-color:rgba(76,198,80,.05)}.assignment-item.denied[data-v-63ef2219]{color:#d93e63;background-color:rgba(217,62,99,.05)}.assignment-item.unknown[data-v-63ef2219]{color:#555}.assignment-item.proposed[data-v-63ef2219]{background-color:rgba(42,212,185,.1);color:#197f6f}.btn-ghost[data-v-63ef2219]{border:1px dashed #555;color:#555;opacity:.5}.btn-ghost[data-v-63ef2219]:hover{opacity:1}.bordered[data-v-63ef2219]{border:1px solid rgba(0,0,0,.1);box-shadow:0 2px 4px rgba(0,0,0,.1)}.bordered[data-v-63ef2219] .tabset-menu{background:#eee}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-63ef2219";
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

export default __vue_component__;
//# sourceMappingURL=event-d89967ee.js.map
