
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { ah as FluroContentView, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-193e7148.js';
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
import 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-06e5b453.js';
import { T as TicketTypeManager, M as MessagingEventManager, L as LocationSelector } from './TicketTypeManager-84c9b694.js';
import { G as GuestList, L as LocationViewMapComponent } from './GuestList-7d22d0d3.js';
import { T as TicketList } from './TicketList-273b7383.js';
import 'fluro-vue-ui';

//

var script = {
  components: {
    GuestList,
    TicketList,
    TicketTypeManager,
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
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製

      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful"; // alert('Testing code was copied ' + msg);

        self.$fluro.notify("Invite Code Copied to clipboard");
      } catch (err) {} // alert('Oops, unable to copy');
      // self.$fluro.error({message:'Unable to copy to clipboard'});

      /* unselect the range */


      testingCodeToCopy.setAttribute("type", "hidden");

      if (process.browser) {
        window.getSelection().removeAllRanges();
      }
    },

    closePlan() {},

    planUpdated(result) {
      console.log("changed the plan!", result);
    },

    createPlan() {
      var self = this;
      var event = self.model; ///////////////////////////////////////////////////////

      self.$fluro.global.select("plan", {
        title: "Select a template",
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
          template.status = "active";
          delete template._id;
          self.$fluro.global.create("plan", {
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
        console.log("Result");
      }).catch(function (err) {}); // fluro.global.create = function(definedType, options, modal) {
    },

    confirmationIcon(assignment) {
      switch (assignment.confirmationStatus) {
        case "confirmed":
          return "check";

        case "denied":
          return "times";

        case "unknown":
          return "clock";

        case "proposed":
          return "question-circle";
      }
    },

    canEditRoster(roster) {
      return this.$fluro.access.canEditItem(roster);
    } // editRoster(roster) {
    //     console.log('Eit roster', roster);
    // },


  },
  watch: {
    "dateModel.startDate": function (value) {
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
    "dateModel.endDate": function (value) {
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
      self.$set(self.model, "data", {});
    } //console.log('Start Date BEFORE', self.model.startDate, self.model.endDate);


    if (self.model.startDate) {
      self.dateModel.startDate = new Date(self.model.startDate);
    }

    if (self.model.endDate) {
      self.dateModel.endDate = new Date(self.model.endDate);
    }

    if (!self.model.checkinData) {
      self.$set(self.model, "checkinData", {
        checkinStartOffset: 90,
        checkinEndOffset: 90
      });
    }

    if (!self.model.streamData) {
      self.$set(self.model, "streamData", {
        streamStartOffset: 30,
        streamEndOffset: 30
      });
    }

    if (!self.model.messages) {
      self.$set(self.model, "messages", []);
    }

    if (!self.model.locations) {
      self.$set(self.model, "locations", []);
    }

    if (!self.model.rooms) {
      self.$set(self.model, "rooms", []);
    }
  },

  asyncComputed: {
    rosterTypes: {
      default: [],

      get() {
        var self = this; ///////////////////////////////////

        return new Promise(function (resolve, reject) {
          return self.$fluro.types.subTypes("roster").then(function (types) {
            var filtered = _.filter(types, function (type) {
              var alreadyCreated = !self.existingRosterTypes[type.definitionName];

              if (!alreadyCreated) {
                return;
              } //Return if we have enough permissions to create this thing


              return self.$fluro.access.can("create", type.definitionName, "roster");
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
          self.$fluro.api.get("/content/location?allDefinitions=true").then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
  },
  computed: {
    differentTimezoneThanUser() {
      // console.log('checkit!', this.model.timezone )
      return this.$fluro.date.isDifferentTimezoneThanUser(this.model.timezone || "");
    },

    filteredTickets() {},

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField("title", {
        title: "Event Title",
        minimum: 1,
        maximum: 1,
        type: "string",
        placeholder: "Event title"
      });
      addField("firstLine", {
        title: "Subtitle",
        minimum: 0,
        maximum: 1,
        type: "string",
        placeholder: "Eg. A great event for the whole family. Featuring Special Guest...",
        description: "A short one line description about this event"
      }); ///////////////////////////////////

      addField("streamEnabled", {
        title: "Stream Enabled",
        description: "Enable live streaming for this event",
        minimum: 0,
        maximum: 1,
        type: "boolean" // defaultValues: [true]

      }); ///////////////////////////////////

      addField("streamContent", {
        title: "Pre-recorded Video",
        description: "Select or create a video to stream for this event",
        minimum: 0,
        maximum: 1,
        type: "reference",
        params: {
          restrictType: "video"
        }
      });
      addField("streamIntegrations", {
        title: "Stream Integrations",
        description: "Broadcast to multiple endpoints",
        minimum: 0,
        maximum: 0,
        type: "reference",
        params: {
          restrictType: "integration"
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      var timezoneDescription;
      var differentTimezone = self.$fluro.date.isDifferentTimezoneThanUser(self.model.timezone);

      if (differentTimezone) {
        var browserTimezone = self.$fluro.date.currentTimezone();
        timezoneDescription = browserTimezone;
      }

      var now = new Date(); // self.$fluro.date.moment().add('2', 'months').toDate();
      // console.log('Create Default event date', now)
      // new Date();

      addField("startDate", {
        title: `Start Date`,
        minimum: 1,
        maximum: 1,
        type: "date",
        description: timezoneDescription,
        directive: "datetimepicker",
        defaultValues: [now],
        params: {
          persistentDescription: !!timezoneDescription
        }
      });
      addField("endDate", {
        title: `End Date`,
        minimum: 0,
        maximum: 1,
        type: "date",
        description: timezoneDescription,
        directive: "datetimepicker",
        defaultValues: [now],
        params: {
          persistentDescription: !!timezoneDescription
        }
      });
      addField("timezone", {
        title: "Event Timezone",
        minimum: 0,
        maximum: 1,
        type: "string",
        directive: "timezone-select",
        description: "Set a local timezone for this event"
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField("mainImage", {
        title: "Main Promotional Image",
        description: "Select a main promotional image for this event",
        minimum: 0,
        maximum: 1,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "image"
        }
      });
      addField("track", {
        title: "Event Track",
        description: "The event track for this event",
        minimum: 0,
        maximum: 1,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "eventtrack"
        }
      });
      addField("body", {
        title: "Body",
        minimum: 0,
        maximum: 1,
        type: "string",
        directive: "wysiwyg",
        placeholder: "",
        description: ""
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField("images", {
        title: "Additional Images",
        description: "Additional promotional images for this event",
        minimum: 0,
        maximum: 0,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "image"
        }
      });
      addField("videos", {
        title: "Videos",
        description: "Additional video content for this event",
        minimum: 0,
        maximum: 0,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "video"
        }
      });
      addField("assets", {
        title: "Files and Resources",
        description: "Additional downloadable assets and resources for this event",
        minimum: 0,
        maximum: 0,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "asset"
        }
      });
      addField("externalLinks", {
        title: "External Link",
        // description: '',
        minimum: 0,
        maximum: 0,
        askCount: 0,
        type: "group",
        asObject: true,
        sameLine: true,
        fields: [{
          type: "group",
          sameLine: true,
          fields: [{
            title: "Title",
            key: "title",
            type: "string",
            minimum: 1,
            maximum: 1
          }, {
            title: "URL",
            key: "url",
            type: "url",
            minimum: 1,
            maximum: 1,
            placeholder: "https://"
          }]
        }]
      }); ///////////////////////////////////

      addField("socialImages", {
        title: "Social Media Artwork",
        description: "Add images and artwork that can be shared from pulse and slipstream to promote this event",
        minimum: 0,
        maximum: 0,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "image"
        }
      });
      addField("socialBody", {
        title: "Social Media Blurb",
        description: "Add a social blurb and hashtags to use when sharing/promoting this event",
        minimum: 0,
        maximum: 1,
        type: "string",
        directive: "textarea"
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

      addField("publicTicketingEnabled", {
        title: "Enable Public Ticketing",
        description: "Enable ticketing for the public to register for this event",
        minimum: 0,
        maximum: 1,
        type: "boolean"
      });
      addField("publicTicketingConfirmationMessage", {
        title: "Ticket Confirmation Message",
        description: "Customise the message to be sent at the top of the digital tickets email",
        minimum: 0,
        maximum: 1,
        type: "string",
        directive: "wysiwyg",
        expressions: {
          show() {
            return self.model.publicTicketingEnabled;
          }

        },
        params: {
          tokens: [{
            title: "Recipient Preferred First Name",
            key: "tokens.firstName"
          }, {
            title: "Event Title",
            key: "tokens.eventTitle"
          }, {
            title: "Event Start Time",
            key: "tokens.startTime"
          }, {
            title: "Event Start Date",
            key: "tokens.startDate"
          }, {
            title: "Location names",
            key: "tokens.locations"
          }]
        }
      });
      addField("forms", {
        title: "Registration Forms",
        description: "Manage registration forms that can be used to register for this event",
        minimum: 0,
        maximum: 0,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "form"
        }
      });
      addField("expectTeams", {
        title: "Expect Groups",
        description: "Select groups to expect as attendees. This will expect all active members of these groups as attending at the time of event start",
        minimum: 0,
        maximum: 0,
        type: "reference",
        directive: "reference-select",
        params: {
          restrictType: "team"
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
        return "Please save this event to generate your RTMP URL";
      }

      return "rtmp://rtmp.fluro.io/live/";
    },

    liveUrl() {
      if (!this.streamKey) {
        return "Please save this event to generate your fluro live url";
      }

      return `https://fluro.live/event/${this.accountID}/${this.eventID}`;
    },

    streamUrl() {
      if (!this.streamKey) {
        return "Please save this event to generate your fluro live url";
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
      return this.definition ? this.$fluro.types.readable(this.definition.title) : "Event";
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
      return self.$fluro.asset.coverImage(self.model._id, "event", {
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
      return self.$fluro.date.moment(self.model.startDate).subtract(self.checkinStartOffset, "minutes").toDate();
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
      return self.$fluro.date.moment(self.model.startDate).add(self.checkinEndOffset, "minutes").toDate();
    },

    checkinFields() {
      return [{
        title: "Checkin Opens",
        description: "How many minutes earlier can users checkin",
        key: "checkinStartOffset",
        placeholder: "Defaults to 90 mins before event start",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: "integer"
      }, {
        title: "Checkin Closes",
        description: `How many minutes after this event's end time can a user still checkin`,
        key: "checkinEndOffset",
        placeholder: "Defaults to 90 mins after event ends",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: "integer"
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
      return self.$fluro.date.moment(self.model.startDate).subtract(self.streamStartOffset, "minutes").toDate();
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
      return self.$fluro.date.moment(self.model.endDate || self.model.startDate).add(self.streamEndOffset, "minutes").toDate();
    },

    streamFields() {
      return [{
        title: "Stream Opens",
        description: "How many minutes earlier can users stream",
        key: "streamStartOffset",
        placeholder: "Defaults to 30 mins before event start",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: "integer"
      }, {
        title: "Stream Closes",
        description: `How many minutes after this event's end time can a user still stream`,
        key: "streamEndOffset",
        placeholder: "Defaults to 30 mins after event ends",
        minimum: 0,
        maximum: 1,
        // suffix:'minutes',
        type: "integer"
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
        startDate: existingModel.startDate ? new Date(existingModel.startDate) : new Date(),
        endDate: existingModel.endDate ? new Date(existingModel.endDate) : new Date()
      }
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    [
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                { attrs: { heading: _vm.readableTypeName + " Info" } },
                [
                  _vm._t("default", [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          { staticClass: "grid-list-xl" },
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
                              [
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v("Event Details")
                                ]),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.title
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                }),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.firstLine
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "v-layout",
                                  { attrs: { row: "", wrap: "" } },
                                  [
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm4: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.startDate
                                          },
                                          model: {
                                            value: _vm.dateModel,
                                            callback: function($$v) {
                                              _vm.dateModel = $$v;
                                            },
                                            expression: "dateModel"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm4: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.endDate
                                          },
                                          model: {
                                            value: _vm.dateModel,
                                            callback: function($$v) {
                                              _vm.dateModel = $$v;
                                            },
                                            expression: "dateModel"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm4: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.timezone
                                          },
                                          on: { input: _vm.update },
                                          model: {
                                            value: _vm.model,
                                            callback: function($$v) {
                                              _vm.model = $$v;
                                            },
                                            expression: "model"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.differentTimezoneThanUser
                                  ? _c(
                                      "fluro-panel",
                                      [
                                        _c(
                                          "fluro-panel-body",
                                          [
                                            _c(
                                              "v-input",
                                              { staticClass: "no-flex" },
                                              [
                                                _c("v-label", [
                                                  _vm._v("Local Time")
                                                ]),
                                                _vm._v(" "),
                                                _c("div", [
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                      _vm._s(
                                                        _vm._f("formatDate")(
                                                          _vm.model.startDate,
                                                          "h:mma - dddd D MMM Y",
                                                          _vm.model.timezone
                                                        )
                                                      ) +
                                                      " "
                                                  ),
                                                  _c(
                                                    "em",
                                                    {
                                                      staticClass: "text-muted"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "(" +
                                                          _vm._s(
                                                            _vm.model.timezone
                                                          ) +
                                                          ")"
                                                      )
                                                    ]
                                                  )
                                                ])
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.mainImage
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                }),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.body
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                }),
                                _vm._v(" "),
                                _vm.definition &&
                                _vm.definition.fields &&
                                _vm.definition.fields.length
                                  ? _c(
                                      "fluro-panel",
                                      [
                                        _c("fluro-panel-title", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.definition.title) +
                                                " Information"
                                            )
                                          ])
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "fluro-panel-body",
                                          [
                                            _c("fluro-content-form", {
                                              attrs: {
                                                options: _vm.options,
                                                fields: _vm.definition.fields
                                              },
                                              model: {
                                                value: _vm.model.data,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.model,
                                                    "data",
                                                    $$v
                                                  );
                                                },
                                                expression: "model.data"
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "override-label":
                                      _vm.definition &&
                                      _vm.definition.definitionName &&
                                      _vm.definition.definitionName == "service"
                                        ? "Service Time / Event Track"
                                        : "Event Track",
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.track
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _vm.model.rostered
                ? _c(
                    "tab",
                    { attrs: { heading: "Team Members" } },
                    [
                      _c(
                        "flex-column-body",
                        { staticStyle: { background: "#fafafa" } },
                        [
                          _c(
                            "v-container",
                            [
                              _c(
                                "constrain",
                                { attrs: { sm: "" } },
                                [
                                  _c(
                                    "v-layout",
                                    { attrs: { "align-center": "" } },
                                    [
                                      _c("v-flex", [
                                        _c("h3", [_vm._v("Team Members")])
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "v-flex",
                                        { attrs: { shrink: "" } },
                                        [
                                          _c(
                                            "v-btn",
                                            {
                                              attrs: {
                                                color: "primary",
                                                to: {
                                                  name: "events.multi",
                                                  query: {
                                                    ids: [_vm.model._id]
                                                  }
                                                }
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tOpen in Multi Planner\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                              ),
                                              _c("fluro-icon", {
                                                attrs: {
                                                  right: "",
                                                  icon: "game-board"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm._l(_vm.model.rostered, function(roster) {
                                    return _c(
                                      "fluro-panel",
                                      { key: roster._id },
                                      [
                                        _c(
                                          "fluro-panel-title",
                                          [
                                            _c(
                                              "v-layout",
                                              { attrs: { "align-center": "" } },
                                              [
                                                _c("v-flex", [
                                                  _c("strong", [
                                                    _vm._v(_vm._s(roster.title))
                                                  ])
                                                ]),
                                                _vm._v(" "),
                                                _vm.canEditRoster(roster)
                                                  ? _c(
                                                      "v-flex",
                                                      { attrs: { shrink: "" } },
                                                      [
                                                        _c(
                                                          "v-btn",
                                                          {
                                                            directives: [
                                                              {
                                                                name: "tippy",
                                                                rawName:
                                                                  "v-tippy"
                                                              }
                                                            ],
                                                            staticClass: "ma-0",
                                                            attrs: {
                                                              icon: "",
                                                              content: "Actions"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.$actions.open(
                                                                  [roster]
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c("fluro-icon", {
                                                              attrs: {
                                                                icon:
                                                                  "ellipsis-h"
                                                              }
                                                            })
                                                          ],
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : _vm._e()
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "fluro-panel-body",
                                          [
                                            _c(
                                              "v-layout",
                                              { attrs: { row: "", wrap: "" } },
                                              _vm._l(roster.slots, function(
                                                slot,
                                                index
                                              ) {
                                                return slot.assignments &&
                                                  slot.assignments.length
                                                  ? _c(
                                                      "v-flex",
                                                      {
                                                        key: index,
                                                        attrs: {
                                                          xs6: "",
                                                          sm4: "",
                                                          md3: ""
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-container",
                                                          {
                                                            staticClass:
                                                              "mb-2 pa-2"
                                                          },
                                                          [
                                                            _c("h5", [
                                                              _vm._v(
                                                                _vm._s(
                                                                  slot.title
                                                                )
                                                              )
                                                            ]),
                                                            _vm._v(" "),
                                                            _vm._l(
                                                              slot.assignments,
                                                              function(
                                                                assignment
                                                              ) {
                                                                return _c(
                                                                  "div",
                                                                  {
                                                                    key:
                                                                      assignment._id,
                                                                    staticClass:
                                                                      "assignment-item",
                                                                    class:
                                                                      assignment.confirmationStatus,
                                                                    on: {
                                                                      click: function(
                                                                        $event
                                                                      ) {
                                                                        return _vm.$actions.open(
                                                                          [
                                                                            assignment
                                                                          ]
                                                                        )
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "v-layout",
                                                                      [
                                                                        _c(
                                                                          "v-flex",
                                                                          [
                                                                            _vm._v(
                                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                                _vm._s(
                                                                                  assignment.contact &&
                                                                                    assignment
                                                                                      .contact
                                                                                      .title
                                                                                    ? assignment
                                                                                        .contact
                                                                                        .title
                                                                                    : assignment.contactName
                                                                                ) +
                                                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                            )
                                                                          ]
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _c(
                                                                          "v-flex",
                                                                          {
                                                                            attrs: {
                                                                              shrink:
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "fluro-icon",
                                                                              {
                                                                                attrs: {
                                                                                  right:
                                                                                    "",
                                                                                  icon: _vm.confirmationIcon(
                                                                                    assignment
                                                                                  )
                                                                                }
                                                                              }
                                                                            )
                                                                          ],
                                                                          1
                                                                        )
                                                                      ],
                                                                      1
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                              }
                                                            )
                                                          ],
                                                          2
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : _vm._e()
                                              }),
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  }),
                                  _vm._v(" "),
                                  _vm._l(_vm.rosterTypes, function(rosterType) {
                                    return _c(
                                      "v-btn",
                                      {
                                        staticClass: "btn-ghost",
                                        attrs: { block: "" },
                                        on: {
                                          click: function($event) {
                                            return _vm.createRoster(rosterType)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          " Add " +
                                            _vm._s(rosterType.title) +
                                            " "
                                        )
                                      ]
                                    )
                                  })
                                ],
                                2
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Livestream Settings" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Livestream Settings")
                              ]),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  options: _vm.options,
                                  field: _vm.fieldHash.streamEnabled
                                },
                                on: { input: _vm.update },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _vm.model.streamEnabled
                                ? [
                                    _c("fluro-content-form", {
                                      attrs: {
                                        options: _vm.options,
                                        fields: _vm.streamFields
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "form",
                                            fn: function(ref) {
                                              var formFields = ref.formFields;
                                              var fieldHash = ref.fieldHash;
                                              var model = ref.model;
                                              var update = ref.update;
                                              var options = ref.options;
                                              return [
                                                _c(
                                                  "v-container",
                                                  {
                                                    attrs: {
                                                      "pa-0": "",
                                                      "grid-list-xl": ""
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "v-layout",
                                                      {
                                                        attrs: {
                                                          row: "",
                                                          wrap: ""
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-flex",
                                                          {
                                                            attrs: {
                                                              xs12: "",
                                                              sm6: ""
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-input",
                                                              {
                                                                staticClass:
                                                                  "no-flex"
                                                              },
                                                              [
                                                                _c("v-label", [
                                                                  _vm._v(
                                                                    "Stream Starts"
                                                                  )
                                                                ]),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "p",
                                                                  {
                                                                    staticClass:
                                                                      "help-block"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "How many minutes earlier should the stream be available?"
                                                                    )
                                                                  ]
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "fluro-content-form-field",
                                                                  {
                                                                    attrs: {
                                                                      "form-fields": formFields,
                                                                      options: options,
                                                                      field:
                                                                        fieldHash.streamStartOffset
                                                                    },
                                                                    on: {
                                                                      input: update
                                                                    },
                                                                    model: {
                                                                      value: model,
                                                                      callback: function(
                                                                        $$v
                                                                      ) {
                                                                        model = $$v;
                                                                      },
                                                                      expression:
                                                                        "model"
                                                                    }
                                                                  }
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "p",
                                                                  {
                                                                    staticClass:
                                                                      "lead"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                        _vm._s(
                                                                          _vm._f(
                                                                            "formatDate"
                                                                          )(
                                                                            _vm.streamStartDate,
                                                                            "h:mma dddd D MMM",
                                                                            model.timezone
                                                                          )
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                    )
                                                                  ]
                                                                )
                                                              ],
                                                              1
                                                            )
                                                          ],
                                                          1
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "v-flex",
                                                          {
                                                            attrs: {
                                                              xs12: "",
                                                              sm6: ""
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-input",
                                                              {
                                                                staticClass:
                                                                  "no-flex"
                                                              },
                                                              [
                                                                _c("v-label", [
                                                                  _vm._v(
                                                                    "Stream Ends"
                                                                  )
                                                                ]),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "p",
                                                                  {
                                                                    staticClass:
                                                                      "help-block"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "How many minutes after this event's end time should the stream be available?"
                                                                    )
                                                                  ]
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "fluro-content-form-field",
                                                                  {
                                                                    attrs: {
                                                                      "form-fields": formFields,
                                                                      options: options,
                                                                      field:
                                                                        fieldHash.streamEndOffset
                                                                    },
                                                                    on: {
                                                                      input: update
                                                                    },
                                                                    model: {
                                                                      value: model,
                                                                      callback: function(
                                                                        $$v
                                                                      ) {
                                                                        model = $$v;
                                                                      },
                                                                      expression:
                                                                        "model"
                                                                    }
                                                                  }
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "p",
                                                                  {
                                                                    staticClass:
                                                                      "lead"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                        _vm._s(
                                                                          _vm._f(
                                                                            "formatDate"
                                                                          )(
                                                                            _vm.streamEndDate,
                                                                            "h:mma dddd D MMM",
                                                                            model.timezone
                                                                          )
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                    )
                                                                  ]
                                                                )
                                                              ],
                                                              1
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ],
                                                  1
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        false,
                                        3467748818
                                      ),
                                      model: {
                                        value: _vm.model.streamData,
                                        callback: function($$v) {
                                          _vm.$set(_vm.model, "streamData", $$v);
                                        },
                                        expression: "model.streamData"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.streamIntegrations
                                      },
                                      on: { input: _vm.update },
                                      model: {
                                        value: _vm.model,
                                        callback: function($$v) {
                                          _vm.model = $$v;
                                        },
                                        expression: "model"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.streamContent
                                      },
                                      on: { input: _vm.update },
                                      model: {
                                        value: _vm.model,
                                        callback: function($$v) {
                                          _vm.model = $$v;
                                        },
                                        expression: "model"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "fluro-panel",
                                      [
                                        _c(
                                          "fluro-panel-body",
                                          [
                                            _c(
                                              "v-input",
                                              {
                                                staticClass: "no-flex",
                                                attrs: {
                                                  label: "RTMP Upstream URL"
                                                }
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    directives: [
                                                      {
                                                        name: "tippy",
                                                        rawName: "v-tippy"
                                                      }
                                                    ],
                                                    attrs: {
                                                      content:
                                                        "Click to copy to clipboard"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        $event.stopPropagation();
                                                        $event.preventDefault();
                                                        return _vm.copyToClipboard(
                                                          "rtmpUrl"
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "v-layout",
                                                      {
                                                        attrs: {
                                                          "align-center": ""
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-flex",
                                                          {
                                                            staticClass:
                                                              "copystring"
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.rtmpUrl
                                                              )
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      ref: "rtmpUrl",
                                                      attrs: { type: "hidden" },
                                                      domProps: {
                                                        value: _vm.rtmpUrl
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-input",
                                              {
                                                staticClass: "no-flex",
                                                attrs: {
                                                  label: "RTMP Stream Key"
                                                }
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    directives: [
                                                      {
                                                        name: "tippy",
                                                        rawName: "v-tippy"
                                                      }
                                                    ],
                                                    attrs: {
                                                      content:
                                                        "Click to copy to clipboard"
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        $event.stopPropagation();
                                                        $event.preventDefault();
                                                        return _vm.copyToClipboard(
                                                          "streamKey"
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "v-layout",
                                                      {
                                                        attrs: {
                                                          "align-center": ""
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-flex",
                                                          {
                                                            staticClass:
                                                              "copystring"
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.streamKey
                                                              )
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      ref: "streamKey",
                                                      attrs: { type: "hidden" },
                                                      domProps: {
                                                        value: _vm.streamKey
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e()
                            ],
                            2
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm.model._id
                ? _c(
                    "tab",
                    {
                      attrs: {
                        heading:
                          _vm.plans.length +
                          " Plan" +
                          (_vm.plans.length == 1 ? "" : "s")
                      }
                    },
                    [
                      _c(
                        "flex-column-body",
                        { staticStyle: { background: "#fafafa" } },
                        [
                          _c(
                            "v-container",
                            { attrs: { fluid: "" } },
                            [
                              _c(
                                "v-layout",
                                { attrs: { "align-center": "" } },
                                [
                                  _c("v-flex", [
                                    _c("h3", [
                                      _vm._v(
                                        _vm._s(_vm.plans.length) +
                                          " Plan" +
                                          _vm._s(
                                            _vm.plans.length == 1 ? "" : "s"
                                          )
                                      )
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    { attrs: { shrink: "" } },
                                    [
                                      _vm.$fluro.access.can("create", "plan")
                                        ? _c(
                                            "v-btn",
                                            {
                                              attrs: { color: "primary" },
                                              on: {
                                                click: function($event) {
                                                  return _vm.createPlan()
                                                }
                                              }
                                            },
                                            [
                                              _c("span", [_vm._v("Add Plan")]),
                                              _vm._v(" "),
                                              _c("fluro-icon", {
                                                attrs: {
                                                  icon: "plus",
                                                  right: ""
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "fluro-panel",
                                [
                                  _c(
                                    "tabset",
                                    { attrs: { justified: true } },
                                    _vm._l(_vm.plans, function(plan, index) {
                                      return _c(
                                        "tab",
                                        { attrs: { heading: plan.title } },
                                        [
                                          _c("fluro-content-view", {
                                            attrs: {
                                              id: _vm.plans[index],
                                              embedded: true,
                                              type: "plan"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    }),
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Location & Rooms" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        { attrs: { fluid: "", "pa-0": "" } },
                        [
                          _c("location-view-map-component", {
                            staticStyle: {
                              width: "100%",
                              "min-height": "300px",
                              height: "50vh"
                            },
                            attrs: {
                              name: "locationMap",
                              positions: _vm.model.locations
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "constrain",
                            { staticClass: "mt-4", attrs: { sm: "" } },
                            [
                              _c("location-selector", {
                                attrs: {
                                  allLocations: _vm.locations,
                                  locationsPath: "locations",
                                  roomsPath: "rooms"
                                },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Media & Resources" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Media & Resources")
                              ]),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.mainImage
                                },
                                on: { input: _vm.update },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.images
                                },
                                on: { input: _vm.update },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.videos
                                },
                                on: { input: _vm.update },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.assets
                                },
                                on: { input: _vm.update },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.externalLinks
                                },
                                on: { input: _vm.update },
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "fluro-panel",
                                [
                                  _c("fluro-panel-title", [
                                    _c("strong", [_vm._v("Social Media")])
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "fluro-panel-body",
                                    [
                                      _c("fluro-content-form-field", {
                                        attrs: {
                                          "form-fields": _vm.formFields,
                                          outline: _vm.showOutline,
                                          options: _vm.options,
                                          field: _vm.fieldHash.socialImages
                                        },
                                        on: { input: _vm.update },
                                        model: {
                                          value: _vm.model,
                                          callback: function($$v) {
                                            _vm.model = $$v;
                                          },
                                          expression: "model"
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("fluro-content-form-field", {
                                        attrs: {
                                          "form-fields": _vm.formFields,
                                          outline: _vm.showOutline,
                                          options: _vm.options,
                                          field: _vm.fieldHash.socialBody
                                        },
                                        on: { input: _vm.update },
                                        model: {
                                          value: _vm.model,
                                          callback: function($$v) {
                                            _vm.model = $$v;
                                          },
                                          expression: "model"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Guest List" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c("fluro-content-form-field", {
                            attrs: {
                              "form-fields": _vm.formFields,
                              outline: _vm.showOutline,
                              options: _vm.options,
                              field: _vm.fieldHash.expectTeams
                            },
                            on: { input: _vm.update },
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("guest-list", { attrs: { event: _vm.model } })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Tickets" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c("h3", { attrs: { margin: "" } }, [
                            _vm._v("Registrations & Tickets")
                          ]),
                          _vm._v(" "),
                          _c("fluro-content-form-field", {
                            attrs: {
                              "form-fields": _vm.formFields,
                              outline: _vm.showOutline,
                              options: _vm.options,
                              field: _vm.fieldHash.forms
                            },
                            on: { input: _vm.update },
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("ticket-type-manager", {
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("fluro-content-form-field", {
                            attrs: {
                              "form-fields": _vm.formFields,
                              outline: _vm.showOutline,
                              options: _vm.options,
                              field: _vm.fieldHash.publicTicketingEnabled
                            },
                            on: { input: _vm.update },
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("fluro-content-form-field", {
                            attrs: {
                              "form-fields": _vm.formFields,
                              outline: _vm.showOutline,
                              options: _vm.options,
                              field:
                                _vm.fieldHash.publicTicketingConfirmationMessage
                            },
                            on: { input: _vm.update },
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("ticket-list", { attrs: { event: _vm.model } })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Messaging" } },
                [
                  _vm._t("default", [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          [
                            _c(
                              "constrain",
                              { attrs: { lg: "" } },
                              [
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v("Automated Messages")
                                ]),
                                _vm._v(" "),
                                _c("event-message-manager", {
                                  model: {
                                    value: _vm.model.messages,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "messages", $$v);
                                    },
                                    expression: "model.messages"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Checkin Settings" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Checkin Settings")
                              ]),
                              _vm._v(" "),
                              _c("fluro-content-form", {
                                attrs: {
                                  options: _vm.options,
                                  fields: _vm.checkinFields
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "form",
                                    fn: function(ref) {
                                      var formFields = ref.formFields;
                                      var fieldHash = ref.fieldHash;
                                      var model = ref.model;
                                      var update = ref.update;
                                      var options = ref.options;
                                      return [
                                        _c(
                                          "v-container",
                                          {
                                            attrs: {
                                              "pa-0": "",
                                              "grid-list-xl": ""
                                            }
                                          },
                                          [
                                            _c(
                                              "v-layout",
                                              { attrs: { row: "", wrap: "" } },
                                              [
                                                _c(
                                                  "v-flex",
                                                  {
                                                    attrs: { xs12: "", sm6: "" }
                                                  },
                                                  [
                                                    _c(
                                                      "v-input",
                                                      {
                                                        staticClass: "no-flex"
                                                      },
                                                      [
                                                        _c("v-label", [
                                                          _vm._v(
                                                            "Checkin Opens"
                                                          )
                                                        ]),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass:
                                                              "help-block"
                                                          },
                                                          [
                                                            _vm._v(
                                                              "How many minutes earlier can users checkin"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "fluro-content-form-field",
                                                          {
                                                            attrs: {
                                                              "form-fields": formFields,
                                                              options: options,
                                                              field:
                                                                fieldHash.checkinStartOffset
                                                            },
                                                            on: {
                                                              input: update
                                                            },
                                                            model: {
                                                              value: model,
                                                              callback: function(
                                                                $$v
                                                              ) {
                                                                model = $$v;
                                                              },
                                                              expression:
                                                                "model"
                                                            }
                                                          }
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass:
                                                              "help-block"
                                                          },
                                                          [
                                                            _vm._v(
                                                              "No checkins before"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass: "lead"
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                _vm._s(
                                                                  _vm._f(
                                                                    "formatDate"
                                                                  )(
                                                                    _vm.checkinStartDate,
                                                                    "h:mma dddd D MMM",
                                                                    model.timezone
                                                                  )
                                                                ) +
                                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "v-flex",
                                                  {
                                                    attrs: { xs12: "", sm6: "" }
                                                  },
                                                  [
                                                    _c(
                                                      "v-input",
                                                      {
                                                        staticClass: "no-flex"
                                                      },
                                                      [
                                                        _c("v-label", [
                                                          _vm._v(
                                                            "Checkin Closes"
                                                          )
                                                        ]),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass:
                                                              "help-block"
                                                          },
                                                          [
                                                            _vm._v(
                                                              "How many minutes after this event's end time can a user still check in?"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "fluro-content-form-field",
                                                          {
                                                            attrs: {
                                                              "form-fields": formFields,
                                                              options: options,
                                                              field:
                                                                fieldHash.checkinEndOffset
                                                            },
                                                            on: {
                                                              input: update
                                                            },
                                                            model: {
                                                              value: model,
                                                              callback: function(
                                                                $$v
                                                              ) {
                                                                model = $$v;
                                                              },
                                                              expression:
                                                                "model"
                                                            }
                                                          }
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass:
                                                              "help-block"
                                                          },
                                                          [
                                                            _vm._v(
                                                              "No checkins after"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass: "lead"
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                _vm._s(
                                                                  _vm._f(
                                                                    "formatDate"
                                                                  )(
                                                                    _vm.checkinEndDate,
                                                                    "h:mma dddd D MMM",
                                                                    model.timezone
                                                                  )
                                                                ) +
                                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                            )
                                                          ]
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ]
                                    }
                                  }
                                ]),
                                model: {
                                  value: _vm.model.checkinData,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "checkinData", $$v);
                                  },
                                  expression: "model.checkinData"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-14fd77d8_0", { source: "/**/\n.border-top[data-v-14fd77d8] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-14fd77d8] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-14fd77d8] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-14fd77d8] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.event-cover-image[data-v-14fd77d8] {\n  border-radius: 5px;\n  width: 90%;\n  padding-bottom: 70%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  display: block;\n  margin: 5%;\n}\n.hint[data-v-14fd77d8] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n.copystring[data-v-14fd77d8] {\n  width: 100%;\n  overflow: auto;\n  display: block;\n  background: #eee;\n  border-radius: 3px;\n  opacity: 0.5;\n  padding: 10px;\n  line-height: 20px;\n}\n.copystring[data-v-14fd77d8]:hover {\n  opacity: 1;\n}\n.assignment-item[data-v-14fd77d8] {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 2px 10px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed[data-v-14fd77d8] {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied[data-v-14fd77d8] {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown[data-v-14fd77d8] {\n  color: #555;\n}\n.assignment-item.proposed[data-v-14fd77d8] {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n.btn-ghost[data-v-14fd77d8] {\n  border: 1px dashed #555;\n  color: #555;\n  opacity: 0.5;\n}\n.btn-ghost[data-v-14fd77d8]:hover {\n  opacity: 1;\n}\n.bordered[data-v-14fd77d8] {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu[data-v-14fd77d8] {\n  background: #eee;\n}\n\n/*# sourceMappingURL=event.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/event.vue","event.vue"],"names":[],"mappings":"AAktCA,GAAA;AAYA;EACA,yCAAA;AC5tCA;AD+tCA;EACA,2CAAA;AC5tCA;AD+tCA;EACA,4CAAA;AC5tCA;AD+tCA;EACA,0CAAA;AC5tCA;;ADouCA,GAAA;AACA;EACA,kBAAA;EACA,UAAA;EACA,mBAAA;EACA,4BAAA;EACA,2BAAA;EACA,sBAAA;EACA,cAAA;EACA,UAAA;ACjuCA;ADouCA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACjuCA;ADouCA;EACA,WAAA;EACA,cAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EAGA,YAAA;EACA,aAAA;EACA,iBAAA;ACnuCA;ADquCA;EACA,UAAA;ACnuCA;ADuuCA;EACA,eAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,qCAAA;ACpuCA;ADsuCA;EACA,cA9EA;EA+EA,yCAAA;ACpuCA;ADuuCA;EACA,cAjFA;EAkFA,yCAAA;ACruCA;ADwuCA;EACA,WAAA;ACtuCA;ADyuCA;EACA,yCAAA;EACA,cAAA;ACvuCA;AD2uCA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;ACxuCA;AD0uCA;EACA,UAAA;ACxuCA;AD4uCA;EACA,oCAAA;EACA,wCAAA;ACzuCA;AD2uCA;EACA,gBAAA;ACzuCA;;AAEA,oCAAoC","file":"event.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${readableTypeName} Info`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<slot>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Event Details</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"lead\" v-if=\"dateModel.startDate\">{{dateModel | readableEventDate}}</p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.startDate\" v-model=\"dateModel\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.endDate\" v-model=\"dateModel\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.timezone\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"differentTimezoneThanUser\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Local Time</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ model.startDate | formatDate(\"h:mma - dddd D MMM Y\", model.timezone) }} <em class=\"text-muted\">({{ model.timezone }})</em>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.body\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>{{ definition.title }} Information</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.data}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\"> </fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :override-label=\"definition && definition.definitionName && definition.definitionName == 'service' ? 'Service Time / Event Track' : 'Event Track'\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.track\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tab :heading=\"`${definition.title} details`\" v-if=\"definition && definition.fields && definition.fields.length\">\n<slot>\n<flex-column-body style=\"background: #fafafa;\">\n<v-container>\n<constrain sm>\n<h3 margin>{{definition.title}}</h3>\n\n<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n</fluro-content-form>\n</constrain>\n</v-container>\n</flex-column-body>\n</slot>\n</tab> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Team Members`\" v-if=\"model.rostered\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>Team Members</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn color=\"primary\" :to=\"{ name: 'events.multi', query: { ids: [model._id] } }\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tOpen in Multi Planner\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right icon=\"game-board\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel :key=\"roster._id\" v-for=\"roster in model.rostered\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>{{ roster.title }}</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink v-if=\"canEditRoster(roster)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn icon class=\"ma-0\" @click=\"$actions.open([roster])\" v-tippy :content=\"`Actions`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"ellipsis-h\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs6 sm4 md3 :key=\"index\" v-for=\"(slot, index) in roster.slots\" v-if=\"slot.assignments && slot.assignments.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"mb-2 pa-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5>{{ slot.title }}</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"assignment-item\" @click=\"$actions.open([assignment])\" :class=\"assignment.confirmationStatus\" :key=\"assignment._id\" v-for=\"assignment in slot.assignments\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName }}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right :icon=\"confirmationIcon(assignment)\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{roster}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn block @click=\"createRoster(rosterType)\" class=\"btn-ghost\" v-for=\"rosterType in rosterTypes\"> Add {{ rosterType.title }} </v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Livestream Settings`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Livestream Settings</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamEnabled\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"model.streamEnabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.streamData\" :fields=\"streamFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{ formFields, fieldHash, model, update, options }\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container pa-0 grid-list-xl>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Stream Starts</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">How many minutes earlier should the stream be available?</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamStartOffset\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"lead\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ streamStartDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Stream Ends</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">How many minutes after this event's end time should the stream be available?</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamEndOffset\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"lead\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ streamEndDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-btn v-if=\"model._id && liveUrl\" target=\"_blank\" :href=\"liveUrl\" block large color=\"primary\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tWatch on Fluro Live\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamIntegrations\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamContent\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" label=\"RTMP Upstream URL\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('rtmpUrl')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"copy\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"copystring\">{{ rtmpUrl }}</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" ref=\"rtmpUrl\" :value=\"rtmpUrl\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" label=\"RTMP Stream Key\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('streamKey')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"copy\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"copystring\">{{ streamKey }}</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" ref=\"streamKey\" :value=\"streamKey\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-input class=\"no-flex\" label=\"Fluro Live URL\">\n\t\t\t\t\t\t\t\t<div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('liveUrl')\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"copystring\">{{liveUrl}}</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" ref=\"liveUrl\" :value=\"liveUrl\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</v-input>\n\t\t\t\t<v-input class=\"no-flex\" label=\"Video Stream URL\">\n\t\t\t\t\t\t\t\t<div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('streamUrl')\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"copystring\">{{streamUrl}}</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" ref=\"streamUrl\" :value=\"streamUrl\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</v-input> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-layout row wrap> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-flex xs12 sm6> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-input class=\"no-flex\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-label>Checkin Opens</v-label> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"help-block\">How many minutes earlier can users checkin</p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinStartOffset\" v-model=\"model.checkinData\"></fluro-content-form-field> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"item.checkinData.checkinStartOffset\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">Minutes earlier</div>\n\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-input> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"help-block\">No checkins before</p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"lead\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}}<br /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <em class=\"text-muted small\">{{model.timezone}}</em> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-flex> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-flex xs12 sm6>\n\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t<v-label>Checkin Closes</v-label>\n\t\t\t\t\t\t\t\t<p class=\"help-block\">How many minutes after this event's end time can a user still checkin</p>\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"model.checkinData.checkinEndOffset\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">Minutes later</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</v-input>\n\t\t\t\t<p class=\"help-block\">No checkins after</p>\n\t\t\t\t<p class=\"lead\">\n\t\t\t\t\t\t\t\t{{checkinEndDate | formatDate:'g:ia l j M':model.timezone}}<br />\n\t\t\t\t\t\t\t\t<em class=\"text-muted small\">{{model.timezone}}</em>\n\t\t\t\t</p>\n</v-flex> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-layout> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${plans.length} Plan${plans.length == 1 ? '' : 's'}`\" v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{ plans.length }} Plan{{ plans.length == 1 ? \"\" : \"s\" }}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn color=\"primary\" @click=\"createPlan()\" v-if=\"$fluro.access.can('create', 'plan')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>Add Plan</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"plus\" right />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tabset :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"plan.title\" v-for=\"(plan, index) in plans\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-edit :embedded=\"true\" v-if=\"$fluro.access.canEditItem(plan)\" v-model=\"plans[index]\" :disableCacheClearOnSave=\"true\" context=\"edit\" type=\"plan\" @cancel=\"closePlan\" @success=\"planUpdated\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- v-else -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-view :id=\"plans[index]\" :embedded=\"true\" type=\"plan\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{plans}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Location & Rooms`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid pa-0>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<location-view-map-component style=\"width: 100%; min-height: 300px; height: 50vh;\" name=\"locationMap\" :positions=\"model.locations\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm class=\"mt-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<location-selector v-model=\"model\" :allLocations=\"locations\" locationsPath=\"locations\" roomsPath=\"rooms\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Media & Resources`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Media &amp; Resources</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.images\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.videos\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assets\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.externalLinks\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>Social Media</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.socialImages\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.socialBody\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Guest List`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <constrain sm> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.expectTeams\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </constrain> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<guest-list :event=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Tickets`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <constrain sm> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Registrations &amp; Tickets</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.forms\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </constrain> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ticket-type-manager v-model=\"model\"></ticket-type-manager>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publicTicketingEnabled\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publicTicketingConfirmationMessage\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.ticketTypes}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.ticketLimit}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ticket-list :event=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Messaging`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<slot>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain lg>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Automated Messages</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<event-message-manager v-model=\"model.messages\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <messaging-event-manager :config=\"config\" v-model=\"model.messages\" :startDate=\"model.startDate\" :endDate=\"model.endDate\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`Checkin Settings`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Checkin Settings</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.checkinData\" :fields=\"checkinFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{ formFields, fieldHash, model, update, options }\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container pa-0 grid-list-xl>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Checkin Opens</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">How many minutes earlier can users checkin</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinStartOffset\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">No checkins before</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"lead\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ checkinStartDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}} -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Checkin Closes</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">How many minutes after this event's end time can a user still check in?</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinEndOffset\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">No checkins after</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"lead\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{ checkinEndDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}} -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-layout row wrap> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-flex xs12 sm6> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-input class=\"no-flex\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-label>Checkin Opens</v-label> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"help-block\">How many minutes earlier can users checkin</p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinStartOffset\" v-model=\"model.checkinData\"></fluro-content-form-field> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"item.checkinData.checkinStartOffset\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">Minutes earlier</div>\n\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-input> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"help-block\">No checkins before</p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"lead\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}}<br /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <em class=\"text-muted small\">{{model.timezone}}</em> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-flex> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-flex xs12 sm6>\n\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t<v-label>Checkin Closes</v-label>\n\t\t\t\t\t\t\t\t<p class=\"help-block\">How many minutes after this event's end time can a user still checkin</p>\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"model.checkinData.checkinEndOffset\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">Minutes later</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</v-input>\n\t\t\t\t<p class=\"help-block\">No checkins after</p>\n\t\t\t\t<p class=\"lead\">\n\t\t\t\t\t\t\t\t{{checkinEndDate | formatDate:'g:ia l j M':model.timezone}}<br />\n\t\t\t\t\t\t\t\t<em class=\"text-muted small\">{{model.timezone}}</em>\n\t\t\t\t</p>\n</v-flex> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-layout> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport MessagingEventManager from \"src/components/content/edit/components/MessagingEventManager.vue\";\nimport LocationViewMapComponent from \"src/components/content/event/LocationViewMapComponent.vue\";\nimport LocationSelector from \"src/components/content/edit/components/LocationSelector.vue\";\nimport FluroContentEditMixin from \"src/components/content/edit/FluroContentEditMixin.js\";\nimport GuestList from \"src/components/content/event/GuestList.vue\";\nimport TicketList from \"src/components/content/event/TicketList.vue\";\nimport TicketTypeManager from \"src/components/content/event/TicketTypeManager.vue\";\nimport FluroContentView from \"src/components/content/view/FluroContentView.vue\";\n\n/////////////////////////////////\n\nimport _ from \"lodash\";\n\nimport Vue from \"vue\";\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tGuestList,\n\t\t\t\t\t\t\t\tTicketList,\n\t\t\t\t\t\t\t\tTicketTypeManager,\n\t\t\t\t\t\t\t\t// FluroContentEdit,\n\t\t\t\t\t\t\t\tFluroContentView,\n\t\t\t\t\t\t\t\tMessagingEventManager,\n\t\t\t\t\t\t\t\tLocationSelector,\n\t\t\t\t\t\t\t\tLocationViewMapComponent,\n\t\t\t\t},\n\t\t\t\tprops: {},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tcopyToClipboard(refID) {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tlet testingCodeToCopy = this.$refs[refID];\n\t\t\t\t\t\t\t\t\t\t\t\ttestingCodeToCopy.setAttribute(\"type\", \"text\"); // 不是 hidden 才能複製\n\t\t\t\t\t\t\t\t\t\t\t\ttestingCodeToCopy.select();\n\n\t\t\t\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar successful = document.execCommand(\"copy\");\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar msg = successful ? \"successful\" : \"unsuccessful\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// alert('Testing code was copied ' + msg);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.notify(\"Invite Code Copied to clipboard\");\n\t\t\t\t\t\t\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// alert('Oops, unable to copy');\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// self.$fluro.error({message:'Unable to copy to clipboard'});\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t/* unselect the range */\n\t\t\t\t\t\t\t\t\t\t\t\ttestingCodeToCopy.setAttribute(\"type\", \"hidden\");\n\t\t\t\t\t\t\t\t\t\t\t\tif (process.browser) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twindow.getSelection().removeAllRanges();\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tclosePlan() {},\n\t\t\t\t\t\t\t\tplanUpdated(result) {\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log(\"changed the plan!\", result);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcreatePlan() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar event = self.model;\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global.select(\"plan\", { title: \"Select a template\", minimum: 1, maximum: 1 }, true).then(function(plans) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!plans || !plans.length) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar planID = self.$fluro.utils.getStringID(plans[0]);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.processing = true;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.content.get(planID).then(function(fullPlan) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar template = fullPlan;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate.realms = event.realms;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate.event = event;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate.startDate = event.startDate;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate.status = \"active\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdelete template._id;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.create(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\"plan\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcopy: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttrue\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfunction(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.processing = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfunction(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.processing = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcreateRoster(rosterType) {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar template = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: rosterType.title,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tevent: self.model,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefinition: rosterType.definitionName,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trealms: self.model.realms.slice(),\n\t\t\t\t\t\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.create(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trosterType.definitionName, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttrue\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(result) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconsole.log(\"Result\");\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {});\n\n\t\t\t\t\t\t\t\t\t\t\t\t// fluro.global.create = function(definedType, options, modal) {\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tconfirmationIcon(assignment) {\n\t\t\t\t\t\t\t\t\t\t\t\tswitch (assignment.confirmationStatus) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase \"confirmed\":\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"check\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase \"denied\":\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"times\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase \"unknown\":\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"clock\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase \"proposed\":\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"question-circle\";\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcanEditRoster(roster) {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.$fluro.access.canEditItem(roster);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t// editRoster(roster) {\n\t\t\t\t\t\t\t\t//     console.log('Eit roster', roster);\n\t\t\t\t\t\t\t\t// },\n\t\t\t\t},\n\n\t\t\t\twatch: {\n\t\t\t\t\t\t\t\t\"dateModel.startDate\": function(value) {\n\t\t\t\t\t\t\t\t\t\t\t\t/**/\n\t\t\t\t\t\t\t\t\t\t\t\t// console.log('VALUE IS', value)\n\t\t\t\t\t\t\t\t\t\t\t\tvar date = new Date(value);\n\t\t\t\t\t\t\t\t\t\t\t\tthis.model.startDate = date;\n\t\t\t\t\t\t\t\t\t\t\t\tthis.update(this.model);\n\n\t\t\t\t\t\t\t\t\t\t\t\t//If there is actually a value\n\t\t\t\t\t\t\t\t\t\t\t\tif (value) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//Check what the end date is currently\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar endDate = this.dateModel.endDate ? new Date(this.dateModel.endDate) : false;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (endDate) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//If the end date is less than the start date, update it to the start date\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (endDate < date) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tthis.dateModel.endDate = new Date(date);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//If there is no end date, we should default to match the start date\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tthis.dateModel.endDate = new Date(date);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\"dateModel.endDate\": function(value) {\n\t\t\t\t\t\t\t\t\t\t\t\t/**/\n\t\t\t\t\t\t\t\t\t\t\t\t// console.log('VALUE IS', value)\n\t\t\t\t\t\t\t\t\t\t\t\tvar date = new Date(value);\n\t\t\t\t\t\t\t\t\t\t\t\tthis.model.endDate = date;\n\t\t\t\t\t\t\t\t\t\t\t\tthis.update(this.model);\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar startDate = this.dateModel.startDate ? new Date(this.dateModel.startDate) : false;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (startDate) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (startDate > date) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// console.log('UPDATE START DATE', startDate, ' is greater than', date)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tthis.dateModel.startDate = new Date(date);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t/**/\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\tif (!self.model.data) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, \"data\", {});\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t//console.log('Start Date BEFORE', self.model.startDate, self.model.endDate);\n\t\t\t\t\t\t\t\tif (self.model.startDate) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.dateModel.startDate = new Date(self.model.startDate);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (self.model.endDate) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.dateModel.endDate = new Date(self.model.endDate);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.checkinData) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, \"checkinData\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcheckinStartOffset: 90,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcheckinEndOffset: 90,\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.streamData) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, \"streamData\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstreamStartOffset: 30,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstreamEndOffset: 30,\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.messages) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, \"messages\", []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.locations) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, \"locations\", []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.rooms) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, \"rooms\", []);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\trosterTypes: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.types\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.subTypes(\"roster\")\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(types) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar filtered = _.filter(types, function(type) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar alreadyCreated = !self.existingRosterTypes[type.definitionName];\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!alreadyCreated) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//Return if we have enough permissions to create this thing\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.access.can(\"create\", type.definitionName, \"roster\");\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(filtered);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(reject);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tlocations: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.api\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.get(\"/content/location?allDefinitions=true\")\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(res.data);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tdifferentTimezoneThanUser() {\n\t\t\t\t\t\t\t\t\t\t\t\t// console.log('checkit!', this.model.timezone )\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.$fluro.date.isDifferentTimezoneThanUser(this.model.timezone || \"\");\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfilteredTickets() {},\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"title\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Event Title\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"Event title\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"firstLine\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Subtitle\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"Eg. A great event for the whole family. Featuring Special Guest...\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"A short one line description about this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"streamEnabled\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Stream Enabled\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Enable live streaming for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"boolean\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// defaultValues: [true]\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"streamContent\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Pre-recorded Video\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Select or create a video to stream for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"video\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"streamIntegrations\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Stream Integrations\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Broadcast to multiple endpoints\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"integration\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar timezoneDescription;\n\t\t\t\t\t\t\t\t\t\t\t\tvar differentTimezone = self.$fluro.date.isDifferentTimezoneThanUser(self.model.timezone);\n\t\t\t\t\t\t\t\t\t\t\t\tif (differentTimezone) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar browserTimezone = self.$fluro.date.currentTimezone();\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttimezoneDescription = browserTimezone;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar now = new Date();\n\t\t\t\t\t\t\t\t\t\t\t\t// self.$fluro.date.moment().add('2', 'months').toDate();\n\t\t\t\t\t\t\t\t\t\t\t\t// console.log('Create Default event date', now)\n\t\t\t\t\t\t\t\t\t\t\t\t// new Date();\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"startDate\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: `Start Date`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"date\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: timezoneDescription,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"datetimepicker\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [now],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tpersistentDescription: !!timezoneDescription,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"endDate\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: `End Date`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"date\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: timezoneDescription,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"datetimepicker\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [now],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tpersistentDescription: !!timezoneDescription,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"timezone\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Event Timezone\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"timezone-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Set a local timezone for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"mainImage\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Main Promotional Image\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Select a main promotional image for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"image\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"track\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Event Track\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"The event track for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"eventtrack\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"body\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Body\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"wysiwyg\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"images\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Additional Images\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Additional promotional images for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"image\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"videos\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Videos\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Additional video content for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"video\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"assets\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Files and Resources\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Additional downloadable assets and resources for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"asset\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"externalLinks\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"External Link\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// description: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taskCount: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"group\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tasObject: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"group\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Title\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"title\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"URL\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"url\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"url\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"https://\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, ],\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"socialImages\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Social Media Artwork\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Add images and artwork that can be shared from pulse and slipstream to promote this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"image\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"socialBody\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Social Media Blurb\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Add a social blurb and hashtags to use when sharing/promoting this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"textarea\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('externalLinks', {\n\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'External Links',\n\t\t\t\t\t\t\t\t\t\t\t\t//     description: 'Relevant external links and URLs for this event',\n\t\t\t\t\t\t\t\t\t\t\t\t//     minimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     maximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     type: '',\n\t\t\t\t\t\t\t\t\t\t\t\t//     directive: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t//     params: {\n\t\t\t\t\t\t\t\t\t\t\t\t//         restrictType: 'asset',\n\t\t\t\t\t\t\t\t\t\t\t\t//     }\n\t\t\t\t\t\t\t\t\t\t\t\t// });\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"publicTicketingEnabled\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Enable Public Ticketing\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Enable ticketing for the public to register for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"boolean\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"publicTicketingConfirmationMessage\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Ticket Confirmation Message\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Customise the message to be sent at the top of the digital tickets email\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"string\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"wysiwyg\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tshow() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.model.publicTicketingEnabled;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttokens: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Recipient Preferred First Name\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"tokens.firstName\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Event Title\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"tokens.eventTitle\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Event Start Time\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"tokens.startTime\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Event Start Date\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"tokens.startDate\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Location names\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"tokens.locations\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"forms\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Registration Forms\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Manage registration forms that can be used to register for this event\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"form\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField(\"expectTeams\", {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Expect Groups\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Select groups to expect as attendees. This will expect all active members of these groups as attending at the time of event start\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"reference\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: \"reference-select\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: \"team\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// // Vue.set(self.fields, key, details);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// if (details.enabled === false) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// } else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     details.enabled = true;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// }\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// var defaultValue = self.getDefaultValue(key, details);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Vue.set(self.model, key, defaultValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\teventID() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.$fluro.utils.getStringID(this.model);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\taccountID() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.$fluro.utils.getStringID(this.model.account);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\trtmpUrl() {\n\t\t\t\t\t\t\t\t\t\t\t\tif (!this.streamKey) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"Please save this event to generate your RTMP URL\";\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\treturn \"rtmp://rtmp.fluro.io/live/\";\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tliveUrl() {\n\t\t\t\t\t\t\t\t\t\t\t\tif (!this.streamKey) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"Please save this event to generate your fluro live url\";\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn `https://fluro.live/event/${this.accountID}/${this.eventID}`;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstreamUrl() {\n\t\t\t\t\t\t\t\t\t\t\t\tif (!this.streamKey) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn \"Please save this event to generate your fluro live url\";\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn `https://rtmp.fluro.io/live/${this.accountID}.${this.eventID}/index.m3u8`;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstreamKey() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.eventID || !self.accountID) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// 'Please save this event to get your stream key';\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn `${self.accountID}.${self.eventID}`;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\treadableTypeName() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.definition ? this.$fluro.types.readable(this.definition.title) : \"Event\";\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tplans() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.plans || [];\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\texistingRosterTypes() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.reduce(\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tthis.model.rostered,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfunction(set, roster) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tset[roster.definition] = true;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn set;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, {}\n\t\t\t\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcoverImage() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.asset.coverImage(self.model._id, \"event\", { w: 150 });\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcheckinStartOffset() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar originalOffsetValue = self.model.checkinData.checkinStartOffset;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 90;\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn parseInt(originalOffsetValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcheckinStartDate() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.date.moment(self.model.startDate).subtract(self.checkinStartOffset, \"minutes\").toDate();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcheckinEndOffset() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar originalOffsetValue = self.model.checkinData.checkinEndOffset;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 90;\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn parseInt(originalOffsetValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcheckinEndDate() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.date.moment(self.model.startDate).add(self.checkinEndOffset, \"minutes\").toDate();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcheckinFields() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Checkin Opens\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"How many minutes earlier can users checkin\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"checkinStartOffset\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"Defaults to 90 mins before event start\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// suffix:'minutes',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"integer\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Checkin Closes\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: `How many minutes after this event's end time can a user still checkin`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"checkinEndOffset\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"Defaults to 90 mins after event ends\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// suffix:'minutes',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"integer\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t];\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\tstreamStartOffset() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar originalOffsetValue = self.model.streamData.streamStartOffset;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 90;\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn parseInt(originalOffsetValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstreamStartDate() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.date.moment(self.model.startDate).subtract(self.streamStartOffset, \"minutes\").toDate();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstreamEndOffset() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar originalOffsetValue = self.model.streamData.streamEndOffset;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 90;\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn parseInt(originalOffsetValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstreamEndDate() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.date\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.moment(self.model.endDate || self.model.startDate)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.add(self.streamEndOffset, \"minutes\")\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.toDate();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstreamFields() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Stream Opens\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"How many minutes earlier can users stream\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"streamStartOffset\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"Defaults to 30 mins before event start\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// suffix:'minutes',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"integer\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: \"Stream Closes\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: `How many minutes after this event's end time can a user still stream`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: \"streamEndOffset\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"Defaults to 30 mins after event ends\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// suffix:'minutes',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: \"integer\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t];\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\tshowOutline() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\tvar existingModel = JSON.parse(JSON.stringify(this.value));\n\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tdateModel: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tstartDate: existingModel.startDate ? new Date(existingModel.startDate) : new Date(),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tendDate: existingModel.endDate ? new Date(existingModel.endDate) : new Date(),\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t};\n\t\t\t\t},\n};\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.event-cover-image {\n\t\t\t\tborder-radius: 5px;\n\t\t\t\twidth: 90%;\n\t\t\t\tpadding-bottom: 70%;\n\t\t\t\tbackground-repeat: no-repeat;\n\t\t\t\tbackground-position: center;\n\t\t\t\tbackground-size: cover;\n\t\t\t\tdisplay: block;\n\t\t\t\tmargin: 5%;\n}\n\n.hint {\n\t\t\t\tfont-size: 10px;\n\t\t\t\topacity: 0.5;\n\t\t\t\tcolor: inherit;\n\t\t\t\tdisplay: block;\n}\n\n.copystring {\n\t\t\t\twidth: 100%;\n\t\t\t\toverflow: auto;\n\t\t\t\tdisplay: block;\n\t\t\t\tbackground: #eee;\n\t\t\t\tborder-radius: 3px;\n\t\t\t\t// font-size: 0.9em;\n\t\t\t\t// font-weight: bold;\n\t\t\t\topacity: 0.5;\n\t\t\t\tpadding: 10px;\n\t\t\t\tline-height: 20px;\n\n\t\t\t\t&:hover {\n\t\t\t\t\t\t\t\topacity: 1;\n\t\t\t\t}\n}\n\n.assignment-item {\n\t\t\t\tfont-size: 12px;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\toverflow: hidden;\n\t\t\t\tborder-radius: 100px;\n\t\t\t\tmargin-bottom: 2px;\n\t\t\t\tpadding: 2px 10px;\n\t\t\t\tfont-weight: 500;\n\t\t\t\tbackground-color: rgba(#000, 0.05);\n\n\t\t\t\t&.confirmed {\n\t\t\t\t\t\t\t\tcolor: $success;\n\t\t\t\t\t\t\t\tbackground-color: rgba($success, 0.05);\n\t\t\t\t}\n\n\t\t\t\t&.denied {\n\t\t\t\t\t\t\t\tcolor: $danger;\n\t\t\t\t\t\t\t\tbackground-color: rgba($danger, 0.05);\n\t\t\t\t}\n\n\t\t\t\t&.unknown {\n\t\t\t\t\t\t\t\tcolor: #555;\n\t\t\t\t}\n\n\t\t\t\t&.proposed {\n\t\t\t\t\t\t\t\tbackground-color: rgba($primary, 0.1);\n\t\t\t\t\t\t\t\tcolor: darken($primary, 20%);\n\t\t\t\t}\n}\n\n.btn-ghost {\n\t\t\t\tborder: 1px dashed #555;\n\t\t\t\tcolor: #555;\n\t\t\t\topacity: 0.5;\n\n\t\t\t\t&:hover {\n\t\t\t\t\t\t\t\topacity: 1;\n\t\t\t\t}\n}\n\n.bordered {\n\t\t\t\tborder: 1px solid rgba(#000, 0.1);\n\t\t\t\tbox-shadow: 0 2px 4px rgba(#000, 0.1);\n\n\t\t\t\t&>>>.tabset-menu {\n\t\t\t\t\t\t\t\tbackground: #eee;\n\t\t\t\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.event-cover-image {\n  border-radius: 5px;\n  width: 90%;\n  padding-bottom: 70%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  display: block;\n  margin: 5%;\n}\n\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n.copystring {\n  width: 100%;\n  overflow: auto;\n  display: block;\n  background: #eee;\n  border-radius: 3px;\n  opacity: 0.5;\n  padding: 10px;\n  line-height: 20px;\n}\n.copystring:hover {\n  opacity: 1;\n}\n\n.assignment-item {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 2px 10px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown {\n  color: #555;\n}\n.assignment-item.proposed {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n\n.btn-ghost {\n  border: 1px dashed #555;\n  color: #555;\n  opacity: 0.5;\n}\n.btn-ghost:hover {\n  opacity: 1;\n}\n\n.bordered {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu {\n  background: #eee;\n}\n\n/*# sourceMappingURL=event.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-14fd77d8";
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
//# sourceMappingURL=event-c1913e6e.js.map
