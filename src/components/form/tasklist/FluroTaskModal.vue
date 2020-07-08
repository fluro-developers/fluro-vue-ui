<template>
  <flex-column class="fluro-task-modal">
    <flex-column-header class="border-bottom">
      <v-container fluid>
        <h3>{{title}}</h3>
        <!-- <div class="introduction" v-html="description"></div> -->
      </v-container>
    </flex-column-header>
    <flex-column-body>
      <v-container fluid>
        <div class="introduction" v-html="description"></div>
      </v-container>
      <div class="task-options border-top border-bottom">
        <div
          class="task-option-item complete"
          :class="{active:task.status == 'complete'}"
          @click="select('complete')"
        >
          <v-layout align-center>
            <v-flex>
              <strong>{{completeLabel}}</strong>
              <div class="sm muted" v-if="completeDescription">{{completeDescription}}</div>
            </v-flex>
            <v-flex shrink>
              <div class="task-icon">
                <fluro-icon icon="thumbs-up" />
              </div>
            </v-flex>
          </v-layout>
        </div>
        <div
          class="task-option-item pending"
          :class="{active:task.status == 'pending'}"
          @click="select('pending')"
          v-if="pendingEnabled"
        >
          <v-layout align-center>
            <v-flex>
              <strong>{{pendingLabel}}</strong>
              <div class="sm muted" v-if="pendingDescription">{{pendingDescription}}</div>
            </v-flex>
            <v-flex shrink>
              <div class="task-icon">
                <fluro-icon icon="tasks" />
              </div>
            </v-flex>
          </v-layout>
        </div>
        <div
          class="task-option-item failed"
          :class="{active:task.status == 'failed'}"
          @click="select('failed')"
          v-if="failedEnabled"
        >
          <v-layout align-center>
            <v-flex>
              <strong>{{failedLabel}}</strong>
              <div class="sm muted" v-if="failedDescription">{{failedDescription}}</div>
            </v-flex>
            <v-flex shrink>
              <div class="task-icon">
                <fluro-icon icon="thumbs-down" />
              </div>
            </v-flex>
          </v-layout>
        </div>
        <div
          class="task-option-item"
          @click="select('incomplete')"
          v-if="task.status != 'incomplete'"
        >
          <v-layout align-center>
            <v-flex>
              <strong>Incomplete</strong>
              <div class="sm muted">Reset this task back to it's untouched state</div>
            </v-flex>
            <v-flex shrink>
              <div class="task-icon">
                <fluro-icon icon="circle" />
              </div>
            </v-flex>
          </v-layout>
        </div>
      </div>
      <!-- <pre>{{task.status}}</pre> -->
    </flex-column-body>
    <flex-column-footer class="border-top">
      <v-container class="py-1 px-2">
        <v-btn block @click="dismiss()">Cancel</v-btn>
      </v-container>
    </flex-column-footer>
  </flex-column>
</template>
<script>
import ModalMixin from "src/mixins/ModalMixin";
import AddPostModal from "src/components/ui/modal/AddPost.vue";
import FluroOptionsDialog from "src/components/ui/modal/OptionsDialog.vue";

export default {
  props: {
    options: {
      type: Object
    }
  },
  mixins: [ModalMixin],
  data() {
    return {
      flipped: false
    };
  },
  computed: {
    instructions() {
      return this.task.instructions || {};
    },
    pendingEnabled() {
      return !this.instructions.pendingDisabled;
    },
    failedEnabled() {
      return !this.instructions.failedDisabled;
    },
    completeLabel() {
      return this.instructions.completeLabel &&
        this.instructions.completeLabel.length
        ? this.instructions.completeLabel
        : "Complete";
    },
    pendingLabel() {
      return this.instructions.pendingLabel &&
        this.instructions.pendingLabel.length
        ? this.instructions.pendingLabel
        : "In Progress";
    },
    failedLabel() {
      return this.instructions.failedLabel &&
        this.instructions.failedLabel.length
        ? this.instructions.failedLabel
        : "Failed";
    },

    completeDescription() {
      return this.instructions.completeDescription &&
        this.instructions.completeDescription.length
        ? this.instructions.completeDescription
        : "";
    },
    pendingDescription() {
      return this.instructions.pendingDescription &&
        this.instructions.pendingDescription.length
        ? this.instructions.pendingDescription
        : "";
    },
    failedDescription() {
      return this.instructions.failedDescription &&
        this.instructions.failedDescription.length
        ? this.instructions.failedDescription
        : "";
    },

    task() {
      return this.options.task;
    },
    card() {
      return this.options.card;
    },
    title() {
      return this.task.name;
    },
    description() {
      return this.task.description;
    }
    // actions() {
    //     return this.task.options;
    // }
  },
  methods: {
    select(option) {
      var self = this;

      //Mark as the option we selected
      self.task.status = option;

      /////////////////////////////////////

      var definitionName;

      switch (option) {
        case "complete":
          definitionName = self.task.postComplete;
          break;
        case "pending":
          definitionName = self.task.postPending;
          break;
        case "failed":
          definitionName = self.task.postFailed;
          break;
      }

      /////////////////////////////////////

      if (!definitionName) {
        return self.close(option);
      }

      /////////////////////////////////////
      /////////////////////////////////////
      /////////////////////////////////////

      // console.log('GOTTA DO A TASK', definitionName, AddPostModal);

      // self.$fluro.content.type(definitionName)
      //     .then(function(form) {

      console.log("Do a task", self.card.item, self.card);

      var promise = self.$fluro
        .modal({
          // component: FluroOptionsDialog,
          component: AddPostModal,
          options: {
            definitionName,
            skip: true,
            // definition:{
            //     definitionName,
            // },
            item: self.card.item || self.card
            // title:'something',
            // description:'desc',
            // options:[]
          }
        })
        .then(function(res) {
          // console.log('POST RESULT', res);
          return self.close(option);
        })
        .catch(function(err) {
          if (err) {
            return self.$fluro.error(err);
          }

          return self.close(option);
        });
      // })
      // .catch(self.$fluro.error);;

      // //If there is a callback registered
      // //then fire the callback
      // if (option.action) {
      //     option.action();
      // }
    }
  }
};
</script>
<style lang="scss">
.fluro-task-modal {
  min-width: 300px;

  @media (min-width: 768px) {
    max-width: 500px;
  }

  .introduction {
    font-size: 1.1em;
  }

  // text-align: center;
  //
  .task-options {
    padding: 15px;
    background: rgba(#000, 0.05);

    .task-option-item {
      background: #fff;
      padding: 10px 15px;
      font-size: 1.2em;
      border: 1px solid rgba(#000, 0.2);
      border-radius: 5px;
      margin-bottom: 5px;
      cursor: pointer;

      &:hover {
        border: 1px solid rgba(#000, 0.4);
      }

      .task-icon {
        width: 50px;
        height: 50px;
        line-height: 50px;
        background: #eee;
        border-radius: 50%;
        text-align: center;
        font-size: 20px;
        border: 1px solid rgba(#000, 0.05);
        color: rgba(#000, 0.5);
        margin-left: 15px;
      }

      &.complete {
        .task-icon {
          color: $success;
        }

        &.active {
          background-color: lighten($success, 15%);
          border-color: $success;
          color: darken($success, 30%);

          .task-icon {
            background-color: $success;
            color: #fff;
          }
        }
      }

      &.pending {
        .task-icon {
          color: $warning;
        }

        &.active {
          background-color: lighten($warning, 20%);
          border-color: $warning;
          color: darken($warning, 10%);

          .task-icon {
            background-color: $warning;
            color: #fff;
          }
        }
      }

      &.failed {
        .task-icon {
          color: $danger;
        }

        &.active {
          background-color: lighten($danger, 15%);
          border-color: $danger;
          color: darken($danger, 30%);

          .task-icon {
            background-color: $danger;
            color: #fff;
          }
        }
      }

      display: flex;
      align-items: center;
    }
  }
}
</style>
