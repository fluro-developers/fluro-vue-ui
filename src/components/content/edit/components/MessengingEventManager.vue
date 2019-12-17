<template>
    <div>
        <h4>{{model.length}} scheduled message{{model.length == 1 ? '' : 's'}}</h4>
        <p class="muted">Add relative time messages to be sent before or after the event</p>
        <list-group>
            <list-group-item v-for="(message, index) in model">
                <v-layout align-start>
                    <v-flex sm10 xs12 pa-1>
                        <messenging-event-component :config="config" v-model="clonedModel[index]" :context="editing[index] ? 'edit' : 'view'" :ref="'editform' + index" :startDate="startDate" :endDate="endDate" />
                    </v-flex>
                    <v-flex sm2 xs12 pa-1>
                        <v-btn block @click="toggleEdit(index)">{{editing[index] ? 'Done' : 'Edit'}}</v-btn>
                        <fluro-confirm-button @click="remove(index)" v-tippy content="Remove">
                            <template v-slot:default="{confirming}">
                                <span class="btn" xs style="width:100%;text-align:center;">
                                    {{confirming ? 'Confirm?' : 'Remove'}}
                                </span>
                            </template>
                        </fluro-confirm-button>
                    </v-flex>
                </v-layout>
            </list-group-item>
        </list-group>

        <fluro-panel>
            <fluro-panel-body>
                <form @submit.prevent.stop="add()">
                    <v-container fluid grid-list-xl pa-1>
                        <v-layout row wrap grid-list-xl>
                            <v-flex sm10 xs12>
                                <messenging-event-component :config="config" v-model="proposed" context="create" ref="createform" />
                            </v-flex>
                            <v-flex sm2 xs12>
                                <v-btn block color="primary" type="submit" @click="add()">Add</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </form>
            </fluro-panel-body>
        </fluro-panel>
    </div>
</template>
<script>
import FluroConfirmButton from '../../../ui/FluroConfirmButton.vue';
import MessengingEventComponent from './MessengingEventComponent.vue';


export default {
    props: {
        value: {
            type: Array,
        },
        config: {
            type: Object,
            required: true,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        }
    },
    created() {
        for (let i = 0; i < this.model.length; i++) {
            this.editing.push(false);
        }
    },
    components: { MessengingEventComponent, FluroConfirmButton },
    data() {
        return {
            model: this.value,
            proposed: {},
            dragOptions: {},
            drag: false,
            editing: [],
        }
    },
    methods: {
        add() {
            var self = this;
            self.$refs.createform.validateAllFields();
            var clone = JSON.parse(JSON.stringify(self.proposed));
            if (clone.errorMessages.length) {
                return;
            }

            delete clone.row;



            this.model.push(clone);
            this.editing.push(false);
            this.proposed = {};
        },
        remove(index) {
            this.model.splice(index, 1);
            this.editing.splice(index, 1);
        },
        toggleEdit(index) {
            var self = this;
            console.log(self.$refs);
            var ref = 'editform' + index;
            console.log(self.$refs[ref]);
            if (self.editing[index]) {
                self.$refs[ref][0].validateAllFields();
                if (self.clonedModel[index].errorMessages.length) {
                    return;
                }
                self.model[index] = self.clonedModel[index];
                return self.$set(self.editing, index, false);
            }
            else {
                return self.$set(self.editing, index, true);
            }
        },
    },
    computed: {
        clonedModel() {
            return JSON.parse(JSON.stringify(this.model));
        }
    },
}
</script>
<style lang="scss">
.ghost-dragging-class {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>