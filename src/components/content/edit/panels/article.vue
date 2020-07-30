<template>
  <flex-column>
    <template v-if="loading">
      <fluro-page-preloader contain />
    </template>
    <template v-else>
      <tabset :justified="true" :vertical="true">
        <tab :heading="bodyLabel" v-if="!definition || fullBody">
          <fluro-editor
            class="full-bleed"
            v-model="model.body"
            :options="editorOptions"
            placeholder="Type your text in here"
          ></fluro-editor>
        </tab>
        <tab :heading="`${definition.title} Details`" v-if="definition">
          <flex-column-body style="background: #fafafa;">
            <v-container fluid>
              <constrain sm>
                <!-- <pre>{{definition}}</pre> -->
                <template v-if="showTitleField">
                  <fluro-content-form-field
                    :form-fields="formFields"
                    :outline="showOutline"
                    @input="update"
                    :options="options"
                    :field="fieldHash.title"
                    v-model="model"
                  />
                </template>
                <h3 margin>{{definition.title}} Details</h3>
                <fluro-content-form
                  :options="options"
                  v-model="model.data"
                  :fields="definition.fields"
                />
                <template v-if="!hideBody && !fullBody">
                  <v-label>{{bodyLabel}}</v-label>
                  <fluro-editor
                    v-model="model.body"
                    :options="editorOptions"
                    placeholder="Type your text in here"
                  ></fluro-editor>
                </template>
              </constrain>
            </v-container>
          </flex-column-body>
        </tab>
      </tabset>
    </template>
  </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from "../../../form/FluroEditor.vue";
import FluroContentEditMixin from "../FluroContentEditMixin.js";

/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

export default {
  components: {
    FluroEditor
  },
  mixins: [FluroContentEditMixin],
  computed: {
    showTitleField() {
      if (
        this.definition &&
        this.definition.data &&
        this.definition.data.titleGeneration == "force"
      ) {
        return;
      }
      return true;
    },
    fieldsOutput() {
      var self = this;
      var array = [];

      ///////////////////////////////////

      addField("title", {
        title: self.titleLabel,
        minimum: 1,
        maximum: 1,
        type: "string",
        params: {
          autofocus: !self.model._id
        }
        // placeholder: self.titleLabel,
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },
    fullBody() {
      return (
        this.definition && this.definition.data && this.definition.data.fullBody
      );
    },
    hideBody() {
      return (
        this.definition && this.definition.data && this.definition.data.hideBody
      );
    },
    titleLabel() {
      return _.get(this.definition, "data.titleLabel") || "Title";
    },
    bodyLabel() {
      return _.get(this.definition, "data.bodyLabel") || "Body";
    }
  },
  data() {
    return {
      editorOptions: {
        // tokens: [{
        //     title: 'First Name',
        //     key: 'firstName'
        // },{
        //     title: 'Last Name',
        //     key: 'lastName'
        // }]
      }
    };
  }
};
</script>
<style lang="scss">
.fluro-editor.full-bleed {
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .fluro-editor-textarea {
    flex: 1;

    & > div {
      border: none !important;
      border-radius: 0;
      overflow: auto;
      padding: 3%;
    }
  }

  & .editor-code-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;

    .fluro-code-editor {
      display: block;
      flex: 1;
      position: relative;

      .ace_editor {
        width: 100% !important;
        height: 100% !important;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        border-radius: 0;
      }
    }
  }
}
</style>
