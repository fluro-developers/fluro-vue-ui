import { b4 as MailoutRenderPreview, b5 as MailoutTestPanel, b6 as MailoutPreflightPanel, b7 as MailoutResultsPanel, bd as __vue_normalize__ } from './index-53cb5ffc.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-c67566ae.js';

//

var script = {
  components: {
    MailoutRenderPreview,
    MailoutTestPanel,
    MailoutPreflightPanel,
    MailoutResultsPanel
  },
  mixins: [FluroContentEditMixin],
  methods: {
    toggleExpand(key) {
      var self = this;
      self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);
      console.log('TOGGLE', key, self.expandedSettings);
    }

  },
  computed: {
    resultsEnabled() {
      var self = this;

      if (self.model.state == 'sent') {
        return true;
      }

      if (self.model.stats && self.model.stats.mailoutSent) {
        return true;
      }
    },

    expanded() {
      var self = this;
      return {
        contacts: self.expandedSettings._contacts || self.model.contacts && self.model.contacts.length,
        teams: self.expandedSettings._teams || self.model.teams && self.model.teams.length,
        tickets: self.expandedSettings._tickets || self.model.tickets && self.model.tickets.length,
        events: self.expandedSettings._events || self.model.events && self.model.events.length,
        interactions: self.expandedSettings._interactions || self.model.interactions && self.model.interactions.length,
        cards: self.expandedSettings._cards || self.model.cards && self.model.cards.length,
        checkins: self.expandedSettings._checkins || self.model.checkins && self.model.checkins.length,
        details: self.expandedSettings._details || self.model.details && self.model.details.length,
        families: self.expandedSettings._families || self.model.families && self.model.families.length,
        personas: self.expandedSettings._personas || self.model.personas && self.model.personas.length,
        collections: self.expandedSettings._collections || self.model.collections && self.model.collections.length,
        tags: self.expandedSettings._tags || self.model.tags && self.model.tags.length,
        realms: self.expandedSettings._realms || self.model.realms && self.model.realms.length,
        definitions: self.expandedSettings._definitions || self.model.definitions && self.model.definitions.length,
        query: self.expandedSettings._query || self.model.query
      };
    },

    mailoutType() {
      return this.model.mailoutType;
    },

    user() {
      return this.$fluro.auth.getCurrentUser();
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My awesome new email'
      });
      addField('subject', {
        title: 'Subject',
        description: 'Text to be shown in the subject of the email',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My awesome new email',
        expressions: {
          defaultValue() {
            return self.model.title;
          } // : 'data.title',


        }
      });
      addField('fromEmail', {
        title: 'From / Sender Email Address',
        description: 'Email address this mailout will be sent from, and replies will be sent to',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. ${this.user.email}`,
        defaultValues: [`${this.user.email}`]
      });
      addField('fromFirstName', {
        title: 'Sender First Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. ${this.user.firstName}`,
        defaultValues: [`${this.user.firstName}`]
      });
      addField('fromLastName', {
        title: 'Sender Last Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. ${this.user.lastName}`,
        defaultValues: [`${this.user.lastName}`]
      });
      addField('mailoutType', {
        title: 'Mailout Type',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['promotional'],
        options: [{
          name: 'Promotional',
          value: 'promotional'
        }, {
          name: 'Transactional',
          value: 'transactional'
        }]
      }); //////////////////////////////////////////////////////

      addField('contacts', {
        title: 'Select contacts',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact'
        }
      });
      addField('teams', {
        title: 'Select Groups/Teams',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'team'
        }
      });
      addField('tickets', {
        title: 'Select tickets',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'ticket'
        }
      }); ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////

      addField('events', {
        title: 'Select events',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'event'
        }
      });
      addField('data', {
        type: 'group',
        minimum: 1,
        maximum: 1,
        asObject: true,
        fields: [{
          key: 'eventCheckins',
          title: 'Send to people who have checked in',
          description: 'Send mailout to any contacts checked in to these events',
          minimum: 0,
          maximum: 1,
          type: 'boolean'
        }, {
          key: 'eventTickets',
          title: 'Send to people who have a ticket',
          description: 'Send mailout to any contacts that have a registered ticket for these events',
          minimum: 0,
          maximum: 1,
          type: 'boolean'
        }, {
          key: 'eventAssignments',
          title: 'Send to people who are rostered on to this event',
          description: 'Send mailout to any contacts that have been rostered/assigned to these events',
          minimum: 0,
          maximum: 1,
          type: 'boolean'
        }]
      }); ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////

      addField('interactions', {
        title: 'Select interactions',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'interaction'
        }
      });
      addField('cards', {
        title: 'Select Process Cards',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'process'
        }
      });
      addField('checkins', {
        title: 'Select Checkins',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'checkin'
        }
      });
      addField('families', {
        title: 'Select Households',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'family'
        }
      });
      addField('collections', {
        title: 'Select Collections',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'collection'
        }
      });
      addField('tags', {
        title: 'Select Tags',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'tag'
        }
      });
      addField('realms', {
        title: 'Select Realms',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'realm-select',
        params: {
          restrictType: 'realm'
        }
      });
      addField('details', {
        title: 'Select Detail Sheet',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contactdetail'
        }
      });
      addField('personas', {
        title: 'Select User Personas',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'persona'
        }
      });
      addField('query', {
        title: 'Select Query',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'query',
          allDefinitions: true
        }
      }); // // console.log('TYPE OPTIONS', self.typeOptions);
      // addField('filterType', {
      //     title: 'Type',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     description: 'The type of item you want to return from this query',
      //     options: self.typeOptions,
      // })
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      } // console.log('DO THE OUTPUT!!!');


      return array;
    }

  },

  data() {
    return {
      expandedSettings: {
        _contacts: false,
        _teams: false,
        _events: false,
        _tickets: false
      },
      editorOptions: {
        editor: {
          tokens: [{
            title: 'Recipient Preferred First Name',
            key: 'firstName'
          }, {
            title: 'Recipient Last Name',
            key: 'lastName'
          }, {
            title: 'Sender/From First Name',
            key: 'mailout.fromFirstName'
          }, {
            title: 'Sender/From Last Name',
            key: 'mailout.fromLastName'
          }, {
            title: 'Sender/From Email Address',
            key: 'mailout.fromEmail'
          }, {
            title: 'Account Title',
            key: 'mailout.account.title'
          }, {
            title: 'Account Timezone',
            key: 'mailout.account.timezone'
          }, {
            title: 'Subject',
            key: 'mailout.subject'
          }, {
            title: 'Send Date',
            key: 'date'
          }]
        }
      }
    };
  }

};

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[(_vm.model.state != 'sent')?[_c('tab',{attrs:{"heading":"Basic Details"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Mailout Basics")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.subject},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('strong',[_vm._v("Sender Details")])]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.fromEmail},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.fromFirstName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.fromLastName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.mailoutType},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.mailoutType == 'promotional')?_c('fluro-card',[_c('fluro-card-body',[_c('h6',[_vm._v("\n                                            Promotional Mode\n                                        ")]),_vm._v("\n                                        Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.\n                                    ")])],1):_vm._e(),_vm._v(" "),(_vm.mailoutType == 'transactional')?_c('fluro-card',[_c('fluro-card-body',[_c('h6',[_vm._v("\n                                            Transactional Mode\n                                        ")]),_vm._v("\n                                        It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.\n                                        Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.\n                                    ")])],1):_vm._e()],1)],1)],1)],1),_vm._v(" "),(_vm.definition)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Fields")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Fields")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.editorOptions,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Recipients"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"mailout-recipients"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Recipients")]),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.contacts},nativeOn:{"click":function($event){return _vm.toggleExpand('contacts')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.contacts.length)+" Contacts")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.contacts)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.contacts},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.teams},nativeOn:{"click":function($event){return _vm.toggleExpand('teams')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.teams.length)+" Groups and Teams")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.teams)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.teams},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.tickets},nativeOn:{"click":function($event){return _vm.toggleExpand('tickets')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.tickets.length)+" Tickets")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.tickets)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.tickets},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.events},nativeOn:{"click":function($event){return _vm.toggleExpand('events')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.events.length)+" Events")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.events)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.data},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.events},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.interactions},nativeOn:{"click":function($event){return _vm.toggleExpand('interactions')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.interactions.length)+" Interactions")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.interactions)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.interactions},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.checkins},nativeOn:{"click":function($event){return _vm.toggleExpand('checkins')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.checkins.length)+" Checkins")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.checkins)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.checkins},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.details},nativeOn:{"click":function($event){return _vm.toggleExpand('details')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.details.length)+" Detail Sheets")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.details)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.details},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.families},nativeOn:{"click":function($event){return _vm.toggleExpand('families')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.families.length)+" Households")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.families)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.families},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.personas},nativeOn:{"click":function($event){return _vm.toggleExpand('personas')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.personas.length)+" User Personas")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.personas)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.personas},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.collections},nativeOn:{"click":function($event){return _vm.toggleExpand('collections')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.collections.length)+" Collections")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.collections)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.collections},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.tags},nativeOn:{"click":function($event){return _vm.toggleExpand('tags')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.tags.length)+" Tags")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.tags)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.tags},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.realms},nativeOn:{"click":function($event){return _vm.toggleExpand('realms')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.realms.length)+" Realms")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.realms)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.realms},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.cards},nativeOn:{"click":function($event){return _vm.toggleExpand('cards')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v(_vm._s(_vm.model.cards.length)+" Process Cards")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.cards)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.cards},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',{class:{collapsed:!_vm.expanded.query},nativeOn:{"click":function($event){return _vm.toggleExpand('query')}}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h6',[_vm._v("Contacts matching query")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"chevron",attrs:{"icon":"angle-down"}})],1)],1)],1),_vm._v(" "),(_vm.expanded.query)?_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.query},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()],1)],1)],1)],1)],1)]:_vm._e(),_vm._v(" "),(_vm.model._id && _vm.definition)?[_c('tab',{attrs:{"heading":"Preview"}}),_vm._v(" "),(_vm.model.state != 'sent')?_c('tab',{attrs:{"heading":"Testing"}},[_c('mailout-test-panel',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),(_vm.model.state != 'sent')?_c('tab',{attrs:{"heading":"Send and Publish"}},[_c('mailout-preflight-panel',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),(_vm.resultsEnabled)?_c('tab',{attrs:{"heading":"Results"}},[_c('mailout-results-panel',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()]:_vm._e()],2)]],2)};
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

export default __vue_component__;
//# sourceMappingURL=mailout-0edbb950.js.map
