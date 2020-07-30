<template>
  <flex-column>
    <template v-if="loading">
      <fluro-page-preloader contain />
    </template>
    <template v-else>
      <!-- :vertical="true" -->
      <tabset :justified="true" :vertical="true">
        <tab heading="Details">
          <flex-column-body style="background: #fafafa;">
            <v-container fluid grid-list-lg>
              <constrain sm>
                <v-layout row wrap>
                  <!--  -->
                  <v-flex xs12 sm12>
                    <fluro-content-form-field
                      :form-fields="formFields"
                      :outline="showOutline"
                      @input="update"
                      :options="options"
                      :field="fieldHash.title"
                      v-model="model"
                    />
                  </v-flex>
                  <v-flex xs12 sm12 v-if="!model._id">
                    <fluro-content-form-field
                      :form-fields="formFields"
                      :outline="showOutline"
                      @input="update"
                      :options="options"
                      :field="fieldHash.items"
                      v-model="model"
                    />
                  </v-flex>
                  <!--  -->
                  <v-flex xs12 sm6>
                    <fluro-content-form-field
                      :form-fields="formFields"
                      :outline="showOutline"
                      @input="update"
                      :options="options"
                      :field="fieldHash.emails"
                      v-model="model"
                    />
                  </v-flex>
                  <!--  -->
                  <v-flex xs12 sm6>
                    <fluro-content-form-field
                      :form-fields="formFields"
                      :outline="showOutline"
                      @input="update"
                      :options="options"
                      :field="fieldHash.phoneNumbers"
                      v-model="model"
                    />
                  </v-flex>
                  <!-- -->
                  <!--  -->
                  <!-- Household Address -->
                  <v-flex xs12 sm12>
                    <fluro-panel>
                      <fluro-panel-title>Home Address</fluro-panel-title>
                      <fluro-panel-body>
                        <address-manager v-model="model.address" />
                      </fluro-panel-body>
                    </fluro-panel>
                  </v-flex>
                  <!--  -->
                  <!--  -->
                  <!--  -->
                  <!-- Postal Address -->
                  <v-flex>
                    <fluro-panel>
                      <fluro-panel-title>
                        <div class="no-border-no-background">
                          <fluro-toggle-item
                            @click.native="toggleSamePostal()"
                            :inactive="model.samePostal"
                          >Different Postal Address</fluro-toggle-item>
                        </div>
                      </fluro-panel-title>
                      <fluro-panel-body v-if="!model.samePostal">
                        <address-manager v-model="model.postalAddress" />
                      </fluro-panel-body>
                    </fluro-panel>
                  </v-flex>
                </v-layout>
                <!-- 	<pre>{{model.samePostal}}</pre>
																																<pre>{{model.address}}</pre>
                <pre>{{model.postalAddress}}</pre>-->
              </constrain>
            </v-container>
          </flex-column-body>
        </tab>
        <!-- -->
        <!--  -->
        <tab :heading="`${membersLength} Members`" v-if="model._id">
          <flex-column-body style="background: #fafafa;">
            <v-container fluid grid-list-lg>
              <!-- <constrain sm> -->
              <v-layout row wrap justify-space-around fill-height style="overflow-x:scroll">
                <div v-for="(contact, index) in members" class="cards border">
                  <family-member-card
                    :contactDefinitions="contactDefinitionOptions"
                    v-model="members[index]"
                  />
                </div>
                <div class="ghost-card" @click="create">
                  <div class="add-contact ghost">
                    <!--                                             <div class="avatar-flex"> -->
                    <div class="add-circle">
                      <fluro-icon class="add-icon" icon="plus" />
                    </div>
                    <h5 class="add-contact-text">Add Contact</h5>
                    <!-- </div> -->
                  </div>
                </div>
              </v-layout>
              <!-- </constrain> -->
            </v-container>
          </flex-column-body>
          <!--                     <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
          -->
        </tab>
        <!--  -->
        <!--  -->
        <tab
          :heading="`${definition.title} Information`"
          v-if="definition && definition.fields && definition.fields.length"
        >
          <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
        </tab>
      </tabset>
    </template>
  </flex-column>
</template>
<script>
/////////////////////////////////

import FamilyMemberCard from "../components/FamilyMemberCard.vue";
import FluroContentEditMixin from "../FluroContentEditMixin.js";
import AddressManager from "../components/AddressManager.vue";
import FluroAcademicSelect from "../../../form/FluroAcademicSelect.vue";

/////////////////////////////////

import Vue from "vue";
import _ from "lodash";

/////////////////////////////////

export default {
  components: {
    AddressManager,
    FamilyMemberCard
  },
  created() {
    //If we are creating a new family
    if (!this.model._id) {
      //Set the postal address to be the same by default
      this.$set(this.model, "samePostal", true);
    }
  },
  mixins: [FluroContentEditMixin],
  computed: {
    members() {
      return _.orderBy(this.model.items, function(contact) {
        if (contact.householdRole == "parent") {
          return -1;
        }

        if (contact.age) {
          return 120 - parseInt(contact.age);
        }

        return 0;
      });
    },
    fieldsOutput() {
      var self = this;
      var array = [];

      ///////////////////////////////////

      addField("title", {
        title: "Title/Family Name",
        placeholder: "Family Name",
        minimum: 1,
        maximum: 1,
        type: "string",
        params: {
          autofocus: !self.model._id
        }
      });

      ///////////////////////////////////

      addField("phoneNumbers", {
        title: "Household Phone Number",
        minimum: 0,
        maximum: 0,
        type: "string"
      });

      addField("emails", {
        title: "Household Email Address",
        minimum: 0,
        maximum: 0,
        type: "email"
      });

      /////////////////////////////////////

      var contactFields = [];

      /////////////////////////////////////

      var row0 = {
        title: "Definition",
        key: "definitions",
        type: "group",
        sameLine: true
      };

      row0.fields = [
        {
          title: "Household Role",
          key: "householdRole",
          minimum: 0,
          maximum: 1,
          type: "string",
          directive: "select",
          options: [
            {
              title: "None",
              value: ""
            },
            {
              title: "Parent",
              value: "parent"
            },
            {
              title: "Child",
              value: "child"
            }
          ]
        },
        {
          title: "Definition",
          key: "definition",
          minimum: 0,
          maximum: 1,
          type: "string",
          directive: "select",
          options: self.contactDefinitionOptions,
          expressions: {
            hide() {
              var number =
                !self.contactDefinitions || !self.contactDefinitions.length;
              // console.log('NUMBER?', number, self.contactDefinitions)
              return number;
            }
          }
        }
      ];
      contactFields.push(row0);

      /////////////////////////////////////

      var row1 = {
        title: "Names",
        key: "names",
        type: "group",
        sameLine: true
      };

      row1.fields = [
        {
          title: "First Name",
          key: "firstName",
          minimum: 1,
          maximum: 1,
          type: "string"
        },
        {
          title: "Last Name",
          key: "lastName",
          placeholder: self.model.title,
          minimum: 0,
          maximum: 1,
          type: "string",
          expressions: {
            defaultValue() {
              return self.model.title;
            }
          }
        }
      ];
      contactFields.push(row1);

      /////////////////////////////////////

      var row2 = {
        title: "Bits",
        key: "bits",
        type: "group",
        sameLine: true
      };

      row2.fields = [
        {
          title: "Gender",
          key: "gender",
          minimum: 0,
          maximum: 1,
          type: "string",
          directive: "select",
          options: [
            {
              title: "Male",
              value: "male"
            },
            {
              title: "Female",
              value: "female"
            },
            {
              title: "Unknown",
              value: ""
            }
          ]
        },
        {
          title: "Date of Birth",
          key: "dob",
          minimum: 0,
          maximum: 1,
          type: "date"
        }
      ];
      contactFields.push(row2);

      /////////////////////////////////////

      /////////////////////////////////////

      var row3 = {
        title: "Comms",
        key: "comms",
        type: "group",
        sameLine: true
      };

      row3.fields = [
        {
          title: "Email Address",
          key: "emails",
          minimum: 0,
          maximum: 0,
          type: "email"
        },
        {
          title: "Phone Number",
          key: "phoneNumbers",
          minimum: 0,
          maximum: 0,
          type: "string"
        }
      ];
      contactFields.push(row3);

      var row4 = {
        title: "Comms",
        key: "realmsandstuff",
        type: "group",
        sameLine: true,
        fields: []
      };

      row4.fields = [
        {
          title: "Realms",
          description: "If different from the family",
          key: "realms",
          minimum: 0,
          maximum: 0,
          type: "reference",
          directive: "realmselect",
          params: {
            restrictType: "realm"
          },
          expressions: {
            defaultValue() {
              return self.model.realms.slice();
            }
          }
        },
        {
          title: "Tags",
          key: "tags",
          minimum: 0,
          maximum: 0,
          type: "reference",
          directive: "content-select-button",
          params: {
            restrictType: "tag",
            allDefinitions: true
          }
        }
      ];

      contactFields.push({
        title: "School / Academic Calendar",
        key: "_academic",
        minimum: 0,
        maximum: 1,
        type: "string",
        customComponent: FluroAcademicSelect,
        expressions: {
          hide: `model.householdRole == 'parent'`
        }
      });

      contactFields.push(row4);

      // <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="formOptions" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" />
      //                             </fluro-academic-select>

      var minimumFamilyMembers = self.model._context == "contact" ? 0 : 1;

      addField("items", {
        title:
          self.model._context == "contact"
            ? "Additional Family Member"
            : "Family Member",
        minimum: minimumFamilyMembers,
        maximum: 0,
        type: "group",
        asObject: true,
        askCount: minimumFamilyMembers,
        fields: contactFields,
        expressions: {
          hide() {
            return self.model._context == "contact";
          }
        }
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },
    membersLength() {
      var self = this;
      if (_.get(self.model, "items")) {
        return self.model.items.length;
      } else {
        return 0;
      }
    },
    contactDefinitionOptions() {
      var self = this;

      var options = self.contactDefinitions.slice();

      if (options.length) {
        options.unshift({
          name: "None",
          value: ""
        });
      }

      return options;
    }
  },
  methods: {
    toggleSamePostal() {
      var self = this;

      console.log("Toggle Same Postal!", self.model.samePostal);

      self.$set(self.model, "samePostal", !self.model.samePostal);

      // if (!self.model.samePostal) {
      // return self.$set(self.model, 'samePostal', true);
      // } else {
      // return self.$set(self.model, 'samePostal', false);
      // }
    },
    create() {
      var self = this;
      //self.$fluro.global.create

      var template = {
        family: self.model,
        lastName: self.model.title
      };

      console.log("Create new contact", template);
      self.$fluro.global
        .create(
          "contact",
          {
            template
          },
          true
        )
        .then(function(res) {
          self.model.items.push(res);
        });
    }
  },
  data() {
    return {};
  },
  asyncComputed: {
    contactDefinitions: {
      default: [],
      get() {
        var self = this;

        return new Promise(function(resolve, reject) {
          return self.$fluro.types
            .subTypes("contact")
            .catch(reject)
            .then(function(res) {
              return resolve(res);
            });
        }).catch(function(err) {
          console.log(err);
          self.$fluro.notify(err);

          return reject(err);
        });
      }
    }
  }
};
</script>
<style lang="scss">
.no-border-no-background .toggle-item {
  border: none !important;
  background: none !important;
  font-size: 14px;
  padding: 0px;
}

.cards {
  width: 200px !important;
  background-color: white;
  margin: 10px;
}

.border {
  border-color: rgba(0, 0, 0, 0.05);
  border-style: solid;
  border-width: 1px;
}

.ghost-card {
  padding: 16px;
  width: 200px !important;
  margin: 10px;
  border: 1px dashed #ccc;
  color: inherit;
  background-color: transparent;
  transition: background-color 0.3s;

  &:hover {
    background-color: white;
  }
}

.add-circle {
  border: 1px dashed #ccc;
  border-radius: 50%;
  height: 132.8px;
  width: 132.8px;
  padding: 8px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filler-ghost {
  height: 100%;
  display: block;
}

.add-icon {
  width: 100%;
  height: 100%;
}

.add-contact-text {
  text-align: center;
  padding-top: 16px;
}
</style>
