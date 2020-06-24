
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { ae as FluroContentView, bh as _, bf as __vue_normalize__, bg as __vue_create_injector__ } from './index-1f4bec40.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-07aa64a8.js';
import { T as TicketTypeManager, M as MessagingEventManager, L as LocationSelector } from './TicketTypeManager-abba5c8e.js';
import { G as GuestList, L as LocationViewMapComponent } from './GuestList-0900fecd.js';
import { T as TicketList } from './TicketList-558d715d.js';
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
                                                    "\n                                            " +
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
                                                "\n                                    Open in Multi Planner\n                                    "
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
                                                                              "\n                                                        " +
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
                                                                                "\n                                                    "
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
                                                                      "\n                                                        " +
                                                                        _vm._s(
                                                                          _vm._f(
                                                                            "formatDate"
                                                                          )(
                                                                            _vm.streamStartDate,
                                                                            "h:mma dddd D MMM",
                                                                            model.timezone
                                                                          )
                                                                        ) +
                                                                        "\n                                                    "
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
                                                                      "\n                                                        " +
                                                                        _vm._s(
                                                                          _vm._f(
                                                                            "formatDate"
                                                                          )(
                                                                            _vm.streamEndDate,
                                                                            "h:mma dddd D MMM",
                                                                            model.timezone
                                                                          )
                                                                        ) +
                                                                        "\n                                                    "
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
                                        3086407378
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
                                                              "\n                                                    " +
                                                                _vm._s(
                                                                  _vm._f(
                                                                    "formatDate"
                                                                  )(
                                                                    _vm.checkinStartDate,
                                                                    "h:mma dddd D MMM",
                                                                    model.timezone
                                                                  )
                                                                ) +
                                                                "\n                                                    "
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
                                                              "\n                                                    " +
                                                                _vm._s(
                                                                  _vm._f(
                                                                    "formatDate"
                                                                  )(
                                                                    _vm.checkinEndDate,
                                                                    "h:mma dddd D MMM",
                                                                    model.timezone
                                                                  )
                                                                ) +
                                                                "\n                                                    "
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
    inject("data-v-6a1d49f2_0", { source: "/**/\n.border-top[data-v-6a1d49f2] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-6a1d49f2] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-6a1d49f2] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-6a1d49f2] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.event-cover-image[data-v-6a1d49f2] {\n  border-radius: 5px;\n  width: 90%;\n  padding-bottom: 70%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  display: block;\n  margin: 5%;\n}\n.hint[data-v-6a1d49f2] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n.copystring[data-v-6a1d49f2] {\n  width: 100%;\n  overflow: auto;\n  display: block;\n  background: #eee;\n  border-radius: 3px;\n  opacity: 0.5;\n  padding: 10px;\n  line-height: 20px;\n}\n.copystring[data-v-6a1d49f2]:hover {\n  opacity: 1;\n}\n.assignment-item[data-v-6a1d49f2] {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 2px 10px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed[data-v-6a1d49f2] {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied[data-v-6a1d49f2] {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown[data-v-6a1d49f2] {\n  color: #555;\n}\n.assignment-item.proposed[data-v-6a1d49f2] {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n.btn-ghost[data-v-6a1d49f2] {\n  border: 1px dashed #555;\n  color: #555;\n  opacity: 0.5;\n}\n.btn-ghost[data-v-6a1d49f2]:hover {\n  opacity: 1;\n}\n.bordered[data-v-6a1d49f2] {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu[data-v-6a1d49f2] {\n  background: #eee;\n}\n\n/*# sourceMappingURL=event.vue.map */", map: {"version":3,"sources":["/Users/jamessandison/git/fluro-vue-ui/src/components/content/edit/panels/event.vue","event.vue"],"names":[],"mappings":"AA2uCA,GAAA;AAYA;EACA,yCAAA;ACrvCA;ADwvCA;EACA,2CAAA;ACrvCA;ADwvCA;EACA,4CAAA;ACrvCA;ADwvCA;EACA,0CAAA;ACrvCA;;AD6vCA,GAAA;AACA;EACA,kBAAA;EACA,UAAA;EACA,mBAAA;EACA,4BAAA;EACA,2BAAA;EACA,sBAAA;EACA,cAAA;EACA,UAAA;AC1vCA;AD6vCA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;AC1vCA;AD6vCA;EACA,WAAA;EACA,cAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EAGA,YAAA;EACA,aAAA;EACA,iBAAA;AC5vCA;AD8vCA;EACA,UAAA;AC5vCA;ADgwCA;EACA,eAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,qCAAA;AC7vCA;AD+vCA;EACA,cA9EA;EA+EA,yCAAA;AC7vCA;ADgwCA;EACA,cAjFA;EAkFA,yCAAA;AC9vCA;ADiwCA;EACA,WAAA;AC/vCA;ADkwCA;EACA,yCAAA;EACA,cAAA;AChwCA;ADowCA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;ACjwCA;ADmwCA;EACA,UAAA;ACjwCA;ADqwCA;EACA,oCAAA;EACA,wCAAA;AClwCA;ADowCA;EACA,gBAAA;AClwCA;;AAEA,oCAAoC","file":"event.vue","sourcesContent":["​<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <!-- <template v-slot:menuprefix v-if=\"model._id\"> -->\n            <!-- <div class=\"event-cover-image\" :style=\"{backgroundImage:`url(${coverImage})`}\"/> -->\n            <!-- <fluro-image cover :spinner=\"true\" :height=\"150\" :item=\"coverImage\"/> -->\n            <!-- </template> -->\n            <tab :heading=\"`${readableTypeName} Info`\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container class=\"grid-list-xl\">\n                            <constrain sm>\n                                <h3 margin>Event Details</h3>\n                                <!-- <pre>{{model}}</pre> -->\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\"></fluro-content-form-field>\n                                <!-- <p class=\"lead\" v-if=\"dateModel.startDate\">{{dateModel | readableEventDate}}</p> -->\n                                <v-layout row wrap>\n                                    <v-flex xs12 sm4>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.startDate\" v-model=\"dateModel\"></fluro-content-form-field>\n                                    </v-flex>\n                                    <v-flex xs12 sm4>\n                                        <!-- <template> -->\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.endDate\" v-model=\"dateModel\"></fluro-content-form-field>\n                                        <!-- </template> -->\n                                    </v-flex>\n                                    <v-flex xs12 sm4>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.timezone\" v-model=\"model\"></fluro-content-form-field>\n                                    </v-flex>\n                                </v-layout>\n                                <fluro-panel v-if=\"differentTimezoneThanUser\">\n                                    <fluro-panel-body>\n                                        <v-input class=\"no-flex\">\n                                            <v-label>Local Time</v-label>\n                                            <div>\n                                                {{ model.startDate | formatDate(\"h:mma - dddd D MMM Y\", model.timezone) }} <em class=\"text-muted\">({{ model.timezone }})</em>\n                                            </div>\n                                        </v-input>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <!-- <div class=\"panel panel-default\" ng-show=\"$root.differentTimezone(item.timezone)\">\n                                    <div class=\"panel-body\">\n                                        <div class=\"form-group\" style=\"margin:0;\">\n                                            <label>Local Time</label>\n                                            <div>{{item.startDate | formatDate:'g:ia - l j M Y':item.timezone}} <em class=\"text-muted\">({{item.timezone}})</em></div>\n                                        </div>\n                                    </div>\n                                </div> -->\n                                <!-- <div class=\"alert alert-warning\" ng-show=\"showPastWarning()\">\n                                    <i class=\"far fa-warning\"></i> This date of this event is in the past ({{item.endDate | timeago}}) are you sure that it's correct? <br /> \n                                    Please note the system will archive this event immediately after you save.</div> -->\n                                <!-- <v-input class=\"no-flex\"> -->\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\"></fluro-content-form-field>\n                                <!-- </v-input> -->\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.body\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-panel v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <fluro-panel-title>\n                                        <strong>{{ definition.title }} Information</strong>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <!-- <pre>{{model.data}}</pre> -->\n                                        <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\"> </fluro-content-form>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <fluro-content-form-field :override-label=\"definition && definition.definitionName && definition.definitionName == 'service' ? 'Service Time / Event Track' : 'Event Track'\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.track\" v-model=\"model\"></fluro-content-form-field>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <!-- <tab :heading=\"`${definition.title} details`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>{{definition.title}}</h3>\n                               \n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n                                </fluro-content-form>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n            <tab :heading=\"`Team Members`\" v-if=\"model.rostered\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <v-layout align-center>\n                                <v-flex>\n                                    <h3>Team Members</h3>\n                                </v-flex>\n                                <v-flex shrink>\n                                    <v-btn color=\"primary\" :to=\"{ name: 'events.multi', query: { ids: [model._id] } }\">\n                                        Open in Multi Planner\n                                        <fluro-icon right icon=\"game-board\" />\n                                    </v-btn>\n                                </v-flex>\n                            </v-layout>\n                            <fluro-panel :key=\"roster._id\" v-for=\"roster in model.rostered\">\n                                <fluro-panel-title>\n                                    <v-layout align-center>\n                                        <v-flex>\n                                            <strong>{{ roster.title }}</strong>\n                                        </v-flex>\n                                        <v-flex shrink v-if=\"canEditRoster(roster)\">\n                                            <v-btn icon class=\"ma-0\" @click=\"$actions.open([roster])\" v-tippy :content=\"`Actions`\">\n                                                <fluro-icon icon=\"ellipsis-h\" />\n                                            </v-btn>\n                                        </v-flex>\n                                    </v-layout>\n                                </fluro-panel-title>\n                                <fluro-panel-body>\n                                    <v-layout row wrap>\n                                        <v-flex xs6 sm4 md3 :key=\"index\" v-for=\"(slot, index) in roster.slots\" v-if=\"slot.assignments && slot.assignments.length\">\n                                            <v-container class=\"mb-2 pa-2\">\n                                                <h5>{{ slot.title }}</h5>\n                                                <div class=\"assignment-item\" @click=\"$actions.open([assignment])\" :class=\"assignment.confirmationStatus\" :key=\"assignment._id\" v-for=\"assignment in slot.assignments\">\n                                                    <v-layout>\n                                                        <v-flex>\n                                                            {{ assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName }}\n                                                        </v-flex>\n                                                        <v-flex shrink>\n                                                            <fluro-icon right :icon=\"confirmationIcon(assignment)\" />\n                                                        </v-flex>\n                                                    </v-layout>\n                                                </div>\n                                            </v-container>\n                                        </v-flex>\n                                    </v-layout>\n                                    <!-- <pre>{{roster}}</pre> -->\n                                </fluro-panel-body>\n                            </fluro-panel>\n                            <v-btn block @click=\"createRoster(rosterType)\" class=\"btn-ghost\" v-for=\"rosterType in rosterTypes\"> Add {{ rosterType.title }} </v-btn>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Livestream Settings`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h3 margin>Livestream Settings</h3>\n                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamEnabled\" v-model=\"model\" />\n                            <template v-if=\"model.streamEnabled\">\n                                <fluro-content-form :options=\"options\" v-model=\"model.streamData\" :fields=\"streamFields\">\n                                    <template v-slot:form=\"{ formFields, fieldHash, model, update, options }\">\n                                        <v-container pa-0 grid-list-xl>\n                                            <v-layout row wrap>\n                                                <v-flex xs12 sm6>\n                                                    <v-input class=\"no-flex\">\n                                                        <v-label>Stream Starts</v-label>\n                                                        <p class=\"help-block\">How many minutes earlier should the stream be available?</p>\n                                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamStartOffset\" v-model=\"model\" />\n                                                        <p class=\"lead\">\n                                                            {{ streamStartDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n                                                        </p>\n                                                    </v-input>\n                                                </v-flex>\n                                                <v-flex xs12 sm6>\n                                                    <v-input class=\"no-flex\">\n                                                        <v-label>Stream Ends</v-label>\n                                                        <p class=\"help-block\">How many minutes after this event's end time should the stream be available?</p>\n                                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamEndOffset\" v-model=\"model\" />\n                                                        <p class=\"lead\">\n                                                            {{ streamEndDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n                                                        </p>\n                                                    </v-input>\n                                                </v-flex>\n                                            </v-layout>\n                                        </v-container>\n                                    </template>\n                                </fluro-content-form>\n                                <!-- <v-btn v-if=\"model._id && liveUrl\" target=\"_blank\" :href=\"liveUrl\" block large color=\"primary\">\n                                                                                                                                                Watch on Fluro Live\n                                                                                                                                </v-btn> -->\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamIntegrations\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.streamContent\" v-model=\"model\" />\n                                <fluro-panel>\n                                    <fluro-panel-body>\n                                        <v-input class=\"no-flex\" label=\"RTMP Upstream URL\">\n                                            <div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('rtmpUrl')\">\n                                                <v-layout align-center>\n                                                    <!-- <v-flex shrink>\n                                                        <fluro-icon icon=\"copy\" />\n                                                    </v-flex> -->\n                                                    <v-flex class=\"copystring\">{{ rtmpUrl }}</v-flex>\n                                                </v-layout>\n                                                <input type=\"hidden\" ref=\"rtmpUrl\" :value=\"rtmpUrl\" />\n                                            </div>\n                                        </v-input>\n                                        <v-input class=\"no-flex\" label=\"RTMP Stream Key\">\n                                            <div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('streamKey')\">\n                                                <v-layout align-center>\n                                                    <!-- <v-flex shrink>\n                                                        <fluro-icon icon=\"copy\" />\n                                                    </v-flex> -->\n                                                    <v-flex class=\"copystring\">{{ streamKey }}</v-flex>\n                                                </v-layout>\n                                                <input type=\"hidden\" ref=\"streamKey\" :value=\"streamKey\" />\n                                            </div>\n                                        </v-input>\n                                        <!-- <v-input class=\"no-flex\" label=\"Fluro Live URL\">\n                                            <div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('liveUrl')\">\n                                                <v-layout align-center>\n                                                    <v-flex class=\"copystring\">{{liveUrl}}</v-flex>\n                                                </v-layout>\n                                                <input type=\"hidden\" ref=\"liveUrl\" :value=\"liveUrl\">\n                                            </div>\n                                        </v-input>\n                                        <v-input class=\"no-flex\" label=\"Video Stream URL\">\n                                            <div v-tippy content=\"Click to copy to clipboard\" @click.stop.prevent=\"copyToClipboard('streamUrl')\">\n                                                <v-layout align-center>\n                                                    <v-flex class=\"copystring\">{{streamUrl}}</v-flex>\n                                                </v-layout>\n                                                <input type=\"hidden\" ref=\"streamUrl\" :value=\"streamUrl\">\n                                            </div>\n                                        </v-input> -->\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                            </template>\n                            <!-- <v-layout row wrap> -->\n                            <!-- <v-flex xs12 sm6> -->\n                            <!-- <v-input class=\"no-flex\"> -->\n                            <!-- <v-label>Checkin Opens</v-label> -->\n                            <!-- <p class=\"help-block\">How many minutes earlier can users checkin</p> -->\n                            <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinStartOffset\" v-model=\"model.checkinData\"></fluro-content-form-field> -->\n                            <!-- <div class=\"input-group\">\n                                                <input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"item.checkinData.checkinStartOffset\" />\n                                                <div class=\"input-group-addon\">Minutes earlier</div>\n                                            </div> -->\n                            <!-- </v-input> -->\n                            <!-- <p class=\"help-block\">No checkins before</p> -->\n                            <!-- <p class=\"lead\"> -->\n                            <!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}}<br /> -->\n                            <!-- <em class=\"text-muted small\">{{model.timezone}}</em> -->\n                            <!-- </p> -->\n                            <!-- </v-flex> -->\n                            <!-- <v-flex xs12 sm6>\n                                        <v-input class=\"no-flex\">\n                                            <v-label>Checkin Closes</v-label>\n                                            <p class=\"help-block\">How many minutes after this event's end time can a user still checkin</p>\n                                            <div class=\"input-group\">\n                                                <input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"model.checkinData.checkinEndOffset\" />\n                                                <div class=\"input-group-addon\">Minutes later</div>\n                                            </div>\n                                        </v-input>\n                                        <p class=\"help-block\">No checkins after</p>\n                                        <p class=\"lead\">\n                                            {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}}<br />\n                                            <em class=\"text-muted small\">{{model.timezone}}</em>\n                                        </p>\n                                    </v-flex> -->\n                            <!-- </v-layout> -->\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`${plans.length} Plan${plans.length == 1 ? '' : 's'}`\" v-if=\"model._id\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container fluid>\n                        <v-layout align-center>\n                            <v-flex>\n                                <h3>{{ plans.length }} Plan{{ plans.length == 1 ? \"\" : \"s\" }}</h3>\n                            </v-flex>\n                            <v-flex shrink>\n                                <v-btn color=\"primary\" @click=\"createPlan()\" v-if=\"$fluro.access.can('create', 'plan')\">\n                                    <span>Add Plan</span>\n                                    <fluro-icon icon=\"plus\" right />\n                                </v-btn>\n                            </v-flex>\n                        </v-layout>\n                        <fluro-panel>\n                            <tabset :justified=\"true\">\n                                <tab :heading=\"plan.title\" v-for=\"(plan, index) in plans\">\n                                    <!-- <fluro-content-edit :embedded=\"true\" v-if=\"$fluro.access.canEditItem(plan)\" v-model=\"plans[index]\" :disableCacheClearOnSave=\"true\" context=\"edit\" type=\"plan\" @cancel=\"closePlan\" @success=\"planUpdated\" /> -->\n                                    <!-- v-else -->\n                                    <fluro-content-view :id=\"plans[index]\" :embedded=\"true\" type=\"plan\" />\n                                </tab>\n                            </tabset>\n                            <!-- <pre>{{plans}}</pre> -->\n                        </fluro-panel>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Location & Rooms`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container fluid pa-0>\n                        <location-view-map-component style=\"width: 100%; min-height: 300px; height: 50vh;\" name=\"locationMap\" :positions=\"model.locations\" />\n                        <constrain sm class=\"mt-4\">\n                            <location-selector v-model=\"model\" :allLocations=\"locations\" locationsPath=\"locations\" roomsPath=\"rooms\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Media & Resources`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h3 margin>Media &amp; Resources</h3>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.images\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.videos\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assets\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.externalLinks\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-panel>\n                                <fluro-panel-title>\n                                    <strong>Social Media</strong>\n                                </fluro-panel-title>\n                                <fluro-panel-body>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.socialImages\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.socialBody\" v-model=\"model\"></fluro-content-form-field>\n                                </fluro-panel-body>\n                            </fluro-panel>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Guest List`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <!-- <constrain sm> -->\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.expectTeams\" v-model=\"model\"></fluro-content-form-field>\n                        <!-- </constrain> -->\n                        <guest-list :event=\"model\" />\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Tickets`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <!-- <constrain sm> -->\n                        <h3 margin>Registrations &amp; Tickets</h3>\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.forms\" v-model=\"model\"></fluro-content-form-field>\n                        <!-- </constrain> -->\n                        <ticket-type-manager v-model=\"model\"></ticket-type-manager>\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publicTicketingEnabled\" v-model=\"model\"></fluro-content-form-field>\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publicTicketingConfirmationMessage\" v-model=\"model\"></fluro-content-form-field>\n                        <!-- <pre>{{model.ticketTypes}}</pre> -->\n                        <!-- <pre>{{model.ticketLimit}}</pre> -->\n                        <ticket-list :event=\"model\" />\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Messaging`\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain lg>\n                                <h3 margin>Automated Messages</h3>\n                                <event-message-manager v-model=\"model.messages\" />\n                                <!-- <messaging-event-manager :config=\"config\" v-model=\"model.messages\" :startDate=\"model.startDate\" :endDate=\"model.endDate\" /> -->\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <tab :heading=\"`Checkin Settings`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h3 margin>Checkin Settings</h3>\n                            <fluro-content-form :options=\"options\" v-model=\"model.checkinData\" :fields=\"checkinFields\">\n                                <template v-slot:form=\"{ formFields, fieldHash, model, update, options }\">\n                                    <v-container pa-0 grid-list-xl>\n                                        <v-layout row wrap>\n                                            <v-flex xs12 sm6>\n                                                <v-input class=\"no-flex\">\n                                                    <v-label>Checkin Opens</v-label>\n                                                    <p class=\"help-block\">How many minutes earlier can users checkin</p>\n                                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinStartOffset\" v-model=\"model\" />\n                                                    <p class=\"help-block\">No checkins before</p>\n                                                    <p class=\"lead\">\n                                                        {{ checkinStartDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n                                                        <!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}} -->\n                                                    </p>\n                                                </v-input>\n                                            </v-flex>\n                                            <v-flex xs12 sm6>\n                                                <v-input class=\"no-flex\">\n                                                    <v-label>Checkin Closes</v-label>\n                                                    <p class=\"help-block\">How many minutes after this event's end time can a user still check in?</p>\n                                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinEndOffset\" v-model=\"model\" />\n                                                    <p class=\"help-block\">No checkins after</p>\n                                                    <p class=\"lead\">\n                                                        {{ checkinEndDate | formatDate(\"h:mma dddd D MMM\", model.timezone) }}\n                                                        <!-- {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}} -->\n                                                    </p>\n                                                </v-input>\n                                            </v-flex>\n                                        </v-layout>\n                                    </v-container>\n                                </template>\n                            </fluro-content-form>\n                            <!-- <v-layout row wrap> -->\n                            <!-- <v-flex xs12 sm6> -->\n                            <!-- <v-input class=\"no-flex\"> -->\n                            <!-- <v-label>Checkin Opens</v-label> -->\n                            <!-- <p class=\"help-block\">How many minutes earlier can users checkin</p> -->\n                            <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkinStartOffset\" v-model=\"model.checkinData\"></fluro-content-form-field> -->\n                            <!-- <div class=\"input-group\">\n                                                <input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"item.checkinData.checkinStartOffset\" />\n                                                <div class=\"input-group-addon\">Minutes earlier</div>\n                                            </div> -->\n                            <!-- </v-input> -->\n                            <!-- <p class=\"help-block\">No checkins before</p> -->\n                            <!-- <p class=\"lead\"> -->\n                            <!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}}<br /> -->\n                            <!-- <em class=\"text-muted small\">{{model.timezone}}</em> -->\n                            <!-- </p> -->\n                            <!-- </v-flex> -->\n                            <!-- <v-flex xs12 sm6>\n                                        <v-input class=\"no-flex\">\n                                            <v-label>Checkin Closes</v-label>\n                                            <p class=\"help-block\">How many minutes after this event's end time can a user still checkin</p>\n                                            <div class=\"input-group\">\n                                                <input type=\"number\" min=\"0\" placeholder=\"Defaults to 90 mins\" class=\"form-control\" ng-model=\"model.checkinData.checkinEndOffset\" />\n                                                <div class=\"input-group-addon\">Minutes later</div>\n                                            </div>\n                                        </v-input>\n                                        <p class=\"help-block\">No checkins after</p>\n                                        <p class=\"lead\">\n                                            {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}}<br />\n                                            <em class=\"text-muted small\">{{model.timezone}}</em>\n                                        </p>\n                                    </v-flex> -->\n                            <!-- </v-layout> -->\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport MessagingEventManager from \"src/components/content/edit/components/MessagingEventManager.vue\";\nimport LocationViewMapComponent from \"src/components/content/event/LocationViewMapComponent.vue\";\nimport LocationSelector from \"src/components/content/edit/components/LocationSelector.vue\";\nimport FluroContentEditMixin from \"src/components/content/edit/FluroContentEditMixin.js\";\nimport GuestList from \"src/components/content/event/GuestList.vue\";\nimport TicketList from \"src/components/content/event/TicketList.vue\";\nimport TicketTypeManager from \"src/components/content/event/TicketTypeManager.vue\";\nimport FluroContentView from \"src/components/content/view/FluroContentView.vue\";\n\n/////////////////////////////////\n\nimport _ from \"lodash\";\n\nimport Vue from \"vue\";\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        GuestList,\n        TicketList,\n        TicketTypeManager,\n        // FluroContentEdit,\n        FluroContentView,\n        MessagingEventManager,\n        LocationSelector,\n        LocationViewMapComponent,\n    },\n    props: {},\n    mixins: [FluroContentEditMixin],\n    methods: {\n        copyToClipboard(refID) {\n            var self = this;\n\n            let testingCodeToCopy = this.$refs[refID];\n            testingCodeToCopy.setAttribute(\"type\", \"text\"); // 不是 hidden 才能複製\n            testingCodeToCopy.select();\n\n            try {\n                var successful = document.execCommand(\"copy\");\n                var msg = successful ? \"successful\" : \"unsuccessful\";\n                // alert('Testing code was copied ' + msg);\n                self.$fluro.notify(\"Invite Code Copied to clipboard\");\n            } catch (err) {\n                // alert('Oops, unable to copy');\n                // self.$fluro.error({message:'Unable to copy to clipboard'});\n            }\n\n            /* unselect the range */\n            testingCodeToCopy.setAttribute(\"type\", \"hidden\");\n            if (process.browser) {\n                window.getSelection().removeAllRanges();\n            }\n        },\n        closePlan() {},\n        planUpdated(result) {\n            console.log(\"changed the plan!\", result);\n        },\n        createPlan() {\n            var self = this;\n            var event = self.model;\n\n            ///////////////////////////////////////////////////////\n\n            self.$fluro.global.select(\"plan\", { title: \"Select a template\", minimum: 1, maximum: 1 }, true).then(function (plans) {\n                if (!plans || !plans.length) {\n                    return;\n                }\n\n                var planID = self.$fluro.utils.getStringID(plans[0]);\n                self.processing = true;\n\n                return self.$fluro.content.get(planID).then(function (fullPlan) {\n                    var template = fullPlan;\n                    template.realms = event.realms;\n\n                    ///////////////////////////////////\n\n                    template.event = event;\n                    template.startDate = event.startDate;\n                    template.status = \"active\";\n                    delete template._id;\n\n                    self.$fluro.global\n                        .create(\n                            \"plan\",\n                            {\n                                template,\n                                copy: true,\n                            },\n                            true\n                        )\n                        .then(\n                            function (res) {\n                                self.processing = false;\n                            },\n                            function (err) {\n                                self.processing = false;\n                            }\n                        );\n                });\n            });\n        },\n        createRoster(rosterType) {\n            var self = this;\n\n            var template = {\n                title: rosterType.title,\n                event: self.model,\n                definition: rosterType.definitionName,\n                realms: self.model.realms.slice(),\n            };\n\n            self.$fluro.global\n                .create(\n                    rosterType.definitionName,\n                    {\n                        template,\n                    },\n                    true\n                )\n                .then(function (result) {\n                    console.log(\"Result\");\n                })\n                .catch(function (err) {});\n\n            // fluro.global.create = function(definedType, options, modal) {\n        },\n        confirmationIcon(assignment) {\n            switch (assignment.confirmationStatus) {\n                case \"confirmed\":\n                    return \"check\";\n                    break;\n                case \"denied\":\n                    return \"times\";\n                    break;\n                case \"unknown\":\n                    return \"clock\";\n                    break;\n                case \"proposed\":\n                    return \"question-circle\";\n                    break;\n            }\n        },\n        canEditRoster(roster) {\n            return this.$fluro.access.canEditItem(roster);\n        },\n        // editRoster(roster) {\n        //     console.log('Eit roster', roster);\n        // },\n    },\n\n    watch: {\n        \"dateModel.startDate\": function (value) {\n            /**/\n            // console.log('VALUE IS', value)\n            var date = new Date(value);\n            this.model.startDate = date;\n            this.update(this.model);\n\n            //If there is actually a value\n            if (value) {\n                //Check what the end date is currently\n                var endDate = this.dateModel.endDate ? new Date(this.dateModel.endDate) : false;\n\n                if (endDate) {\n                    //If the end date is less than the start date, update it to the start date\n                    if (endDate < date) {\n                        this.dateModel.endDate = new Date(date);\n                    }\n                } else {\n                    //If there is no end date, we should default to match the start date\n                    this.dateModel.endDate = new Date(date);\n                }\n            }\n        },\n        \"dateModel.endDate\": function (value) {\n            /**/\n            // console.log('VALUE IS', value)\n            var date = new Date(value);\n            this.model.endDate = date;\n            this.update(this.model);\n\n            var startDate = this.dateModel.startDate ? new Date(this.dateModel.startDate) : false;\n\n            if (startDate) {\n                if (startDate > date) {\n                    // console.log('UPDATE START DATE', startDate, ' is greater than', date)\n                    this.dateModel.startDate = new Date(date);\n                }\n            }\n            /**/\n        },\n    },\n    created() {\n        var self = this;\n        if (!self.model.data) {\n            self.$set(self.model, \"data\", {});\n        }\n\n        //console.log('Start Date BEFORE', self.model.startDate, self.model.endDate);\n        if (self.model.startDate) {\n            self.dateModel.startDate = new Date(self.model.startDate);\n        }\n        if (self.model.endDate) {\n            self.dateModel.endDate = new Date(self.model.endDate);\n        }\n\n        if (!self.model.checkinData) {\n            self.$set(self.model, \"checkinData\", {\n                checkinStartOffset: 90,\n                checkinEndOffset: 90,\n            });\n        }\n\n        if (!self.model.streamData) {\n            self.$set(self.model, \"streamData\", {\n                streamStartOffset: 30,\n                streamEndOffset: 30,\n            });\n        }\n\n        if (!self.model.messages) {\n            self.$set(self.model, \"messages\", []);\n        }\n\n        if (!self.model.locations) {\n            self.$set(self.model, \"locations\", []);\n        }\n\n        if (!self.model.rooms) {\n            self.$set(self.model, \"rooms\", []);\n        }\n    },\n    asyncComputed: {\n        rosterTypes: {\n            default: [],\n            get() {\n                var self = this;\n\n                ///////////////////////////////////\n\n                return new Promise(function (resolve, reject) {\n                    return self.$fluro.types\n                        .subTypes(\"roster\")\n                        .then(function (types) {\n                            var filtered = _.filter(types, function (type) {\n                                var alreadyCreated = !self.existingRosterTypes[type.definitionName];\n                                if (!alreadyCreated) {\n                                    return;\n                                }\n\n                                //Return if we have enough permissions to create this thing\n                                return self.$fluro.access.can(\"create\", type.definitionName, \"roster\");\n                            });\n                            resolve(filtered);\n                        })\n                        .catch(reject);\n                });\n            },\n        },\n        locations: {\n            default: [],\n            get() {\n                var self = this;\n\n                return new Promise(function (resolve, reject) {\n                    self.$fluro.api\n                        .get(\"/content/location?allDefinitions=true\")\n                        .then(function (res) {\n                            resolve(res.data);\n                        })\n                        .catch(function (err) {\n                            reject(err);\n                        });\n                });\n            },\n        },\n    },\n    computed: {\n        differentTimezoneThanUser() {\n            // console.log('checkit!', this.model.timezone )\n            return this.$fluro.date.isDifferentTimezoneThanUser(this.model.timezone || \"\");\n        },\n        filteredTickets() {},\n        fieldsOutput() {\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField(\"title\", {\n                title: \"Event Title\",\n                minimum: 1,\n                maximum: 1,\n                type: \"string\",\n                placeholder: \"Event title\",\n            });\n\n            addField(\"firstLine\", {\n                title: \"Subtitle\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n                placeholder: \"Eg. A great event for the whole family. Featuring Special Guest...\",\n                description: \"A short one line description about this event\",\n            });\n\n            ///////////////////////////////////\n\n            addField(\"streamEnabled\", {\n                title: \"Stream Enabled\",\n                description: \"Enable live streaming for this event\",\n                minimum: 0,\n                maximum: 1,\n                type: \"boolean\",\n                // defaultValues: [true]\n            });\n\n            ///////////////////////////////////\n\n            addField(\"streamContent\", {\n                title: \"Pre-recorded Video\",\n                description: \"Select or create a video to stream for this event\",\n                minimum: 0,\n                maximum: 1,\n                type: \"reference\",\n                params: {\n                    restrictType: \"video\",\n                },\n            });\n\n            addField(\"streamIntegrations\", {\n                title: \"Stream Integrations\",\n                description: \"Broadcast to multiple endpoints\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                params: {\n                    restrictType: \"integration\",\n                },\n            });\n\n            ///////////////////////////////////\n            ///////////////////////////////////\n            ///////////////////////////////////\n\n            var timezoneDescription;\n            var differentTimezone = self.$fluro.date.isDifferentTimezoneThanUser(self.model.timezone);\n            if (differentTimezone) {\n                var browserTimezone = self.$fluro.date.currentTimezone();\n                timezoneDescription = browserTimezone;\n            }\n\n            var now = new Date();\n            // self.$fluro.date.moment().add('2', 'months').toDate();\n            // console.log('Create Default event date', now)\n            // new Date();\n            addField(\"startDate\", {\n                title: `Start Date`,\n                minimum: 1,\n                maximum: 1,\n                type: \"date\",\n                description: timezoneDescription,\n                directive: \"datetimepicker\",\n                defaultValues: [now],\n                params: {\n                    persistentDescription: !!timezoneDescription,\n                },\n            });\n\n            addField(\"endDate\", {\n                title: `End Date`,\n                minimum: 0,\n                maximum: 1,\n                type: \"date\",\n                description: timezoneDescription,\n                directive: \"datetimepicker\",\n                defaultValues: [now],\n                params: {\n                    persistentDescription: !!timezoneDescription,\n                },\n            });\n\n            addField(\"timezone\", {\n                title: \"Event Timezone\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n                directive: \"timezone-select\",\n                description: \"Set a local timezone for this event\",\n            });\n\n            ///////////////////////////////////\n            ///////////////////////////////////\n            ///////////////////////////////////\n\n            addField(\"mainImage\", {\n                title: \"Main Promotional Image\",\n                description: \"Select a main promotional image for this event\",\n                minimum: 0,\n                maximum: 1,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"image\",\n                },\n            });\n\n            addField(\"track\", {\n                title: \"Event Track\",\n                description: \"The event track for this event\",\n                minimum: 0,\n                maximum: 1,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"eventtrack\",\n                },\n            });\n\n            addField(\"body\", {\n                title: \"Body\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n                directive: \"wysiwyg\",\n                placeholder: \"\",\n                description: \"\",\n            });\n\n            ///////////////////////////////////\n            ///////////////////////////////////\n            ///////////////////////////////////\n\n            addField(\"images\", {\n                title: \"Additional Images\",\n                description: \"Additional promotional images for this event\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"image\",\n                },\n            });\n\n            addField(\"videos\", {\n                title: \"Videos\",\n                description: \"Additional video content for this event\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"video\",\n                },\n            });\n\n            addField(\"assets\", {\n                title: \"Files and Resources\",\n                description: \"Additional downloadable assets and resources for this event\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"asset\",\n                },\n            });\n\n            addField(\"externalLinks\", {\n                title: \"External Link\",\n                // description: '',\n                minimum: 0,\n                maximum: 0,\n                askCount: 0,\n                type: \"group\",\n                asObject: true,\n                sameLine: true,\n                fields: [\n                    {\n                        type: \"group\",\n                        sameLine: true,\n                        fields: [\n                            {\n                                title: \"Title\",\n                                key: \"title\",\n                                type: \"string\",\n                                minimum: 1,\n                                maximum: 1,\n                            },\n                            {\n                                title: \"URL\",\n                                key: \"url\",\n                                type: \"url\",\n                                minimum: 1,\n                                maximum: 1,\n                                placeholder: \"https://\",\n                            },\n                        ],\n                    },\n                ],\n            });\n\n            ///////////////////////////////////\n\n            addField(\"socialImages\", {\n                title: \"Social Media Artwork\",\n                description: \"Add images and artwork that can be shared from pulse and slipstream to promote this event\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"image\",\n                },\n            });\n\n            addField(\"socialBody\", {\n                title: \"Social Media Blurb\",\n                description: \"Add a social blurb and hashtags to use when sharing/promoting this event\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n                directive: \"textarea\",\n            });\n\n            // addField('externalLinks', {\n            //     title: 'External Links',\n            //     description: 'Relevant external links and URLs for this event',\n            //     minimum: 0,\n            //     maximum: 0,\n            //     type: '',\n            //     directive: 'reference-select',\n            //     params: {\n            //         restrictType: 'asset',\n            //     }\n            // });\n\n            ///////////////////////////////////\n            ///////////////////////////////////\n            ///////////////////////////////////\n\n            addField(\"publicTicketingEnabled\", {\n                title: \"Enable Public Ticketing\",\n                description: \"Enable ticketing for the public to register for this event\",\n                minimum: 0,\n                maximum: 1,\n                type: \"boolean\",\n            });\n\n            addField(\"publicTicketingConfirmationMessage\", {\n                title: \"Ticket Confirmation Message\",\n                description: \"Customise the message to be sent at the top of the digital tickets email\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n                directive: \"wysiwyg\",\n                expressions: {\n                    show() {\n                        return self.model.publicTicketingEnabled;\n                    },\n                },\n                params: {\n                    tokens: [\n                        {\n                            title: \"Recipient Preferred First Name\",\n                            key: \"tokens.firstName\",\n                        },\n\n                        {\n                            title: \"Event Title\",\n                            key: \"tokens.eventTitle\",\n                        },\n\n                        {\n                            title: \"Event Start Time\",\n                            key: \"tokens.startTime\",\n                        },\n\n                        {\n                            title: \"Event Start Date\",\n                            key: \"tokens.startDate\",\n                        },\n\n                        {\n                            title: \"Location names\",\n                            key: \"tokens.locations\",\n                        },\n                    ],\n                },\n            });\n\n            addField(\"forms\", {\n                title: \"Registration Forms\",\n                description: \"Manage registration forms that can be used to register for this event\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"form\",\n                },\n            });\n\n            addField(\"expectTeams\", {\n                title: \"Expect Groups\",\n                description: \"Select groups to expect as attendees. This will expect all active members of these groups as attending at the time of event start\",\n                minimum: 0,\n                maximum: 0,\n                type: \"reference\",\n                directive: \"reference-select\",\n                params: {\n                    restrictType: \"team\",\n                },\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details);\n                // // Vue.set(self.fields, key, details);\n\n                // if (details.enabled === false) {\n\n                // } else {\n                //     details.enabled = true;\n                // }\n\n                // var defaultValue = self.getDefaultValue(key, details);\n                // Vue.set(self.model, key, defaultValue);\n            }\n\n            return array;\n        },\n        eventID() {\n            return this.$fluro.utils.getStringID(this.model);\n        },\n        accountID() {\n            return this.$fluro.utils.getStringID(this.model.account);\n        },\n        rtmpUrl() {\n            if (!this.streamKey) {\n                return \"Please save this event to generate your RTMP URL\";\n            }\n            return \"rtmp://rtmp.fluro.io/live/\";\n        },\n        liveUrl() {\n            if (!this.streamKey) {\n                return \"Please save this event to generate your fluro live url\";\n            }\n\n            return `https://fluro.live/event/${this.accountID}/${this.eventID}`;\n        },\n        streamUrl() {\n            if (!this.streamKey) {\n                return \"Please save this event to generate your fluro live url\";\n            }\n\n            return `https://rtmp.fluro.io/live/${this.accountID}.${this.eventID}/index.m3u8`;\n        },\n        streamKey() {\n            var self = this;\n            if (!self.eventID || !self.accountID) {\n                return;\n                // 'Please save this event to get your stream key';\n            }\n\n            return `${self.accountID}.${self.eventID}`;\n        },\n        readableTypeName() {\n            return this.definition ? this.$fluro.types.readable(this.definition.title) : \"Event\";\n        },\n        plans() {\n            return this.model.plans || [];\n        },\n        existingRosterTypes() {\n            return _.reduce(\n                this.model.rostered,\n                function (set, roster) {\n                    set[roster.definition] = true;\n                    return set;\n                },\n                {}\n            );\n        },\n        coverImage() {\n            var self = this;\n            return self.$fluro.asset.coverImage(self.model._id, \"event\", { w: 150 });\n        },\n        checkinStartOffset() {\n            var self = this;\n            var originalOffsetValue = self.model.checkinData.checkinStartOffset;\n\n            if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n                return 90;\n            } else {\n                return parseInt(originalOffsetValue);\n            }\n        },\n        checkinStartDate() {\n            var self = this;\n            return self.$fluro.date.moment(self.model.startDate).subtract(self.checkinStartOffset, \"minutes\").toDate();\n        },\n        checkinEndOffset() {\n            var self = this;\n            var originalOffsetValue = self.model.checkinData.checkinEndOffset;\n\n            if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n                return 90;\n            } else {\n                return parseInt(originalOffsetValue);\n            }\n        },\n        checkinEndDate() {\n            var self = this;\n            return self.$fluro.date.moment(self.model.startDate).add(self.checkinEndOffset, \"minutes\").toDate();\n        },\n        checkinFields() {\n            return [\n                {\n                    title: \"Checkin Opens\",\n                    description: \"How many minutes earlier can users checkin\",\n                    key: \"checkinStartOffset\",\n                    placeholder: \"Defaults to 90 mins before event start\",\n                    minimum: 0,\n                    maximum: 1,\n                    // suffix:'minutes',\n                    type: \"integer\",\n                },\n                {\n                    title: \"Checkin Closes\",\n                    description: `How many minutes after this event's end time can a user still checkin`,\n                    key: \"checkinEndOffset\",\n                    placeholder: \"Defaults to 90 mins after event ends\",\n                    minimum: 0,\n                    maximum: 1,\n                    // suffix:'minutes',\n                    type: \"integer\",\n                },\n            ];\n        },\n\n        streamStartOffset() {\n            var self = this;\n            var originalOffsetValue = self.model.streamData.streamStartOffset;\n\n            if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n                return 90;\n            } else {\n                return parseInt(originalOffsetValue);\n            }\n        },\n        streamStartDate() {\n            var self = this;\n            return self.$fluro.date.moment(self.model.startDate).subtract(self.streamStartOffset, \"minutes\").toDate();\n        },\n        streamEndOffset() {\n            var self = this;\n            var originalOffsetValue = self.model.streamData.streamEndOffset;\n\n            if (originalOffsetValue === undefined || originalOffsetValue === null || isNaN(originalOffsetValue)) {\n                return 90;\n            } else {\n                return parseInt(originalOffsetValue);\n            }\n        },\n        streamEndDate() {\n            var self = this;\n            return self.$fluro.date\n                .moment(self.model.endDate || self.model.startDate)\n                .add(self.streamEndOffset, \"minutes\")\n                .toDate();\n        },\n        streamFields() {\n            return [\n                {\n                    title: \"Stream Opens\",\n                    description: \"How many minutes earlier can users stream\",\n                    key: \"streamStartOffset\",\n                    placeholder: \"Defaults to 30 mins before event start\",\n                    minimum: 0,\n                    maximum: 1,\n                    // suffix:'minutes',\n                    type: \"integer\",\n                },\n                {\n                    title: \"Stream Closes\",\n                    description: `How many minutes after this event's end time can a user still stream`,\n                    key: \"streamEndOffset\",\n                    placeholder: \"Defaults to 30 mins after event ends\",\n                    minimum: 0,\n                    maximum: 1,\n                    // suffix:'minutes',\n                    type: \"integer\",\n                },\n            ];\n        },\n\n        showOutline() {\n            return false; //true; //false;//true;//false;//true;\n        },\n    },\n    data() {\n        var existingModel = JSON.parse(JSON.stringify(this.value));\n\n        return {\n            dateModel: {\n                startDate: existingModel.startDate ? new Date(existingModel.startDate) : new Date(),\n                endDate: existingModel.endDate ? new Date(existingModel.endDate) : new Date(),\n            },\n        };\n    },\n};\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.event-cover-image {\n    border-radius: 5px;\n    width: 90%;\n    padding-bottom: 70%;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: cover;\n    display: block;\n    margin: 5%;\n}\n\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n\n.copystring {\n    width: 100%;\n    overflow: auto;\n    display: block;\n    background: #eee;\n    border-radius: 3px;\n    // font-size: 0.9em;\n    // font-weight: bold;\n    opacity: 0.5;\n    padding: 10px;\n    line-height: 20px;\n\n    &:hover {\n        opacity: 1;\n    }\n}\n\n.assignment-item {\n    font-size: 12px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    border-radius: 100px;\n    margin-bottom: 2px;\n    padding: 2px 10px;\n    font-weight: 500;\n    background-color: rgba(#000, 0.05);\n\n    &.confirmed {\n        color: $success;\n        background-color: rgba($success, 0.05);\n    }\n\n    &.denied {\n        color: $danger;\n        background-color: rgba($danger, 0.05);\n    }\n\n    &.unknown {\n        color: #555;\n    }\n\n    &.proposed {\n        background-color: rgba($primary, 0.1);\n        color: darken($primary, 20%);\n    }\n}\n\n.btn-ghost {\n    border: 1px dashed #555;\n    color: #555;\n    opacity: 0.5;\n\n    &:hover {\n        opacity: 1;\n    }\n}\n\n.bordered {\n    border: 1px solid rgba(#000, 0.1);\n    box-shadow: 0 2px 4px rgba(#000, 0.1);\n\n    & >>> .tabset-menu {\n        background: #eee;\n    }\n}\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.event-cover-image {\n  border-radius: 5px;\n  width: 90%;\n  padding-bottom: 70%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  display: block;\n  margin: 5%;\n}\n\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n.copystring {\n  width: 100%;\n  overflow: auto;\n  display: block;\n  background: #eee;\n  border-radius: 3px;\n  opacity: 0.5;\n  padding: 10px;\n  line-height: 20px;\n}\n.copystring:hover {\n  opacity: 1;\n}\n\n.assignment-item {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 2px 10px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown {\n  color: #555;\n}\n.assignment-item.proposed {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n\n.btn-ghost {\n  border: 1px dashed #555;\n  color: #555;\n  opacity: 0.5;\n}\n.btn-ghost:hover {\n  opacity: 1;\n}\n\n.bordered {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu {\n  background: #eee;\n}\n\n/*# sourceMappingURL=event.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-6a1d49f2";
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
//# sourceMappingURL=event-21365783.js.map
