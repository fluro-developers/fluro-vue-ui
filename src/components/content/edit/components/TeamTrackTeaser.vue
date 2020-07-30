<template>
  <fluro-panel>
    <fluro-panel-title>
      <v-layout align-center>
        <v-flex>
          <h3>{{model.title}}</h3>
        </v-flex>
        <v-flex shrink>
          <v-btn small class="mx-0" icon @click="$actions.open([model])">
            <fluro-icon icon="ellipsis-h" />
          </v-btn>
          <template v-if="editMode">
            <v-btn class="mx-0" small @click="cancel()">Cancel</v-btn>
            <v-btn class="mx-0" small color="primary" :loading="saving" @click="save()">
              Save
              <fluro-icon right icon="check" />
            </v-btn>
          </template>
          <template v-else-if="canEdit">
            <v-btn class="mx-0" small icon v-if="!editMode" @click="editMode = true">
              <fluro-icon icon="pencil" />
            </v-btn>
          </template>
        </v-flex>
      </v-layout>
    </fluro-panel-title>
    <fluro-panel-body v-if="editMode">
      <fluro-content-form v-model="model" :fields="fields">
        <template v-slot:form="{formFields, fieldHash, model, update, options}">
          <fluro-content-form-field
            :form-fields="formFields"
            @input="update"
            :options="options"
            :field="fieldHash.title"
            v-model="model"
          />
          <fluro-content-form-field
            :form-fields="formFields"
            @input="update"
            :options="options"
            :field="fieldHash.autoRecur"
            v-model="model"
          />
          <template v-if="model.autoRecur">
            <fluro-content-form-field
              :form-fields="formFields"
              @input="update"
              :options="options"
              :field="fieldHash.recurDefinition"
              v-model="model"
            />
            <v-layout>
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.nextRecurDate"
                  v-model="model"
                />
              </v-flex>
              <v-spacer />
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.archiveDate"
                  v-model="model"
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.recurCount"
                  v-model="model"
                />
              </v-flex>
              <v-spacer />
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.recurMeasure"
                  v-model="model"
                />
              </v-flex>
              <v-spacer />
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.recurNth"
                  v-model="model"
                />
              </v-flex>
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.recurWeekday"
                  v-model="model"
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.defaultStartTime"
                  v-model="model"
                />
              </v-flex>
              <v-spacer />
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.defaultDuration"
                  v-model="model"
                />
              </v-flex>
              <v-spacer />
              <v-flex>
                <fluro-content-form-field
                  :form-fields="formFields"
                  @input="update"
                  :options="options"
                  :field="fieldHash.defaultTimezone"
                  v-model="model"
                />
              </v-flex>
            </v-layout>
          </template>
        </template>
      </fluro-content-form>
    </fluro-panel-body>
    <fluro-panel-body v-else>{{summary}}</fluro-panel-body>
  </fluro-panel>
</template>
<script>
import FluroContentForm from "../../../form/FluroContentForm.vue";
import FluroContentFormField from "../../../form/FluroContentFormField.vue";

export default {
  components: {
    FluroContentForm,
    FluroContentFormField
  },
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      model: this.value,
      editMode: false,
      saving: false
    };
  },
  computed: {
    canEdit() {
      return this.$fluro.access.canEditItem(this.model);
    },
    fields() {
      var self = this;
      var array = [];

      array.push({
        title: "Track Title",
        key: "title",
        type: "string",
        minimum: 1,
        maximum: 1
      });

      array.push({
        title: "Enable Recurring Events",
        key: "autoRecur",
        type: "boolean",
        minimum: 0,
        maximum: 1
      });

      array.push({
        title: "Event Type",
        // description: 'Choose an event type',
        key: "recurDefinition",
        type: "string",
        directive: "select",
        options: self.eventDefinitionOptions,
        minimum: 0,
        maximum: 1
      });

      array.push({
        title: "Track Start Date",
        description: "When do events start for this track",
        key: "nextRecurDate",
        type: "date",
        directive: "date-select",
        minimum: 1,
        maximum: 1
      });

      array.push({
        title: "Track End Date",
        description:
          "On this date all events will cease for this track and the track will be archived",
        key: "archiveDate",
        type: "date",
        directive: "date-select",
        minimum: 0,
        maximum: 1
      });

      array.push({
        title: "Start Time",
        description: "When do events for this track usually start?",
        key: "defaultStartTime",
        type: "string",
        directive: "time-select",
        minimum: 1,
        maximum: 1
      });

      array.push({
        title: "Duration (mins)",
        description: "How long do these events usually run for?",
        key: "defaultDuration",
        type: "integer",
        params: {
          minValue: 0
        },
        defaultValues: [90],
        minimum: 1,
        maximum: 1
      });

      array.push({
        title: "Timezone",
        description:
          "What timezone do these events run in? Leave blank to use account default",
        key: "defaultTimezone",
        type: "string",
        directive: "timezone-select",
        minimum: 0,
        maximum: 1
      });

      array.push({
        title: "Meets every",
        // description: 'Choose an event type',
        key: "recurCount",
        type: "integer",
        minimum: 1,
        maximum: 1
      });

      var frequencyOptions = _.map(
        [
          { title: "Week", name: "Week", value: "weeks" },
          { title: "Month", name: "Month", value: "months" }
          //'year',
        ],
        function(measure) {
          if (self.model.recurCount != 1) {
            measure.name = measure.title = `${measure.title}s`;
          }

          return measure;
        }
      );

      array.push({
        title: "Frequency",
        // description: 'Choose an event type',
        key: "recurMeasure",
        type: "string",
        minimum: 1,
        maximum: 1,
        directive: "select",
        options: frequencyOptions
      });

      array.push({
        title: "On the",
        // description: 'Choose an event type',
        key: "recurNth",
        type: "string",
        directive: "select",
        minimum: 1,
        maximum: 1,
        options: [
          {
            name: "Same Date",
            value: "date"
          },
          {
            name: "First",
            value: "1"
          },
          {
            name: "Second",
            value: "2"
          },
          {
            name: "Third",
            value: "3"
          },
          {
            name: "Fourth",
            value: "4"
          },
          {
            name: "Fifth",
            value: "5"
          }
        ],
        expressions: {
          show() {
            return self.model.recurMeasure == "months";
          }
        }
      });

      array.push({
        title: "Weekday",
        // description: 'Choose an event type',
        key: "recurWeekday",
        type: "string",
        directive: "select",
        minimum: 1,
        maximum: 1,
        options: [
          {
            name: "Sunday",
            value: "sunday"
          },
          {
            name: "Monday",
            value: "monday"
          },
          {
            name: "Tuesday",
            value: "tuesday"
          },
          {
            name: "Wednesday",
            value: "wednesday"
          },
          {
            name: "Thursday",
            value: "thursday"
          },
          {
            name: "Friday",
            value: "friday"
          },
          {
            name: "Saturday",
            value: "saturday"
          }
        ],
        expressions: {
          show() {
            return (
              self.model.recurMeasure == "weeks" ||
              (self.model.recurMeasure == "months" &&
                self.model.recurNth != "date")
            );
          }
        }
      });

      return array;
    },

    summary() {
      var self = this;
      var track = this.model;

      var pieces = [];

      pieces.push(track.defaultDuration + "min");
      pieces.push(self.$fluro.types.readable(track.recurDefinition || "event"));

      if (track.autoRecur) {
        pieces.push(`-`);
        pieces.push(`Meets every`);

        switch (track.recurMeasure) {
          case "weeks":
            if ((track.recurCount = 1)) {
              pieces.push("week");
            } else {
              pieces.push(track.recurCount);
              pieces.push(track.recurMeasure);
            }

            pieces.push("on");
            pieces.push(track.recurWeekday);
            break;
          case "months":
            if ((track.recurCount = 1)) {
              pieces.push("month");
            } else {
              pieces.push(track.recurCount);
              pieces.push(track.recurMeasure);
            }

            pieces.push("on the");
            switch (track.recurNth) {
              case "date":
                pieces.push(track.recurNth);
                break;
              case "1":
                pieces.push("first");
                break;
              case "2":
                pieces.push("second");
                break;
              case "3":
                pieces.push("third");
                break;
              case "4":
                pieces.push("fourth");
                break;
              case "5":
                pieces.push("fifth");
                break;
              default:
                break;
            }

            pieces.push(track.recurWeekday);
            pieces.push("of the month");
            break;
        }
      }

      return _.compact(pieces).join(" ");
    },
    eventDefinitionOptions() {
      var self = this;
      return _.map(self.eventDefinitions, function(definition) {
        return {
          title: definition.title,
          name: definition.title,
          value: definition.definitionName
        };
      });
    }
  },
  watch: {
    value(v) {
      this.model = v;
    }
  },
  methods: {
    save() {
      var self = this;

      self.saving = true;

      self.$fluro.api
        .put(
          `/content/${self.model.definition || "eventtrack"}/${self.model._id}`,
          self.model
        )
        .then(function(res) {
          _.assign(self.model, res);
          self.$fluro.notify(`Event track updated successfully`);
          self.editMode = false;
          self.saving = false;
        })
        .catch(function(err) {
          self.$fluro.error(err);
          self.editMode = false;
          self.saving = false;
        });
    },
    cancel() {
      this.editMode = false;
    }
  },
  asyncComputed: {
    eventDefinitions: {
      default: [],
      get() {
        var self = this;

        // self.loadingDefinitions = true;

        // return new Promise(function(resolve, reject) {

        return self.$fluro.types.subTypes("event", true);
        // })
      }
    }
  }
};
</script>
<style>
</style>
