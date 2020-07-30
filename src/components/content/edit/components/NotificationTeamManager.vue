<template>
    <div>
        <h4>{{model.length}} notification trigger{{model.length == 1 ? '' : 's'}}</h4>
        <p class="muted">Add notifications for when events happen within this group</p>
        <list-group>
            <list-group-item v-for="(notification, index) in model" v-bind:key="JSON.stringify(notification)">
                <v-layout align-center row wrap ma-0>
                    <v-flex sm1 xs1 pa-1 style="text-align:center">
                        <fluro-icon icon="bell" v-tippy content="Sends notification" />
                    </v-flex>
                    <v-flex sm7 xs11 pa-1 class="full-width">
                        <strong>{{displayTrigger(notification.trigger)}}</strong>
                        <p class="muted mb-0">Notify {{displayAssignments(notification.assignments)}}</p>
                        <notification-team-component v-if="editing[index]" :config="config" v-model="clonedModel[index]" :allPositions="allPositionsObjects" />
                    </v-flex>
                    <v-flex sm2 xs6 py-0 class="full-width">
                        <v-btn block @click="toggleEdit(index)">{{editing[index] ? 'Done' : 'Edit'}}</v-btn>
                    </v-flex>
                    <v-flex sm2 xs6 py-0 class="full-width">
                        <fluro-confirm-button @click="remove(index)" content="Remove">
                            <template v-slot:default="{confirming}">
                                    <v-btn flat block :color="confirming ? 'red' : ''" style="transition: all 0.1s;width:100%;">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>
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
                                <notification-team-component :config="config" v-model="proposed" ref="createform" :allPositions="allPositionsObjects" />
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
import NotificationTeamComponent from './NotificationTeamComponent.vue';
import _ from 'lodash';


export default {
    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
        },
        config: {
            type: Object,
            required: true,
        },
        allPositions: {
            type: Array,
        }
    },
    created() {
        for (let i = 0; i < this.model.length; i++) {
            this.editing.push(false);
        }
    },
    components: { NotificationTeamComponent, FluroConfirmButton },
    data() {
        return {
            model: this.value,
            proposed: {},
            editing: [],
            clonedModel: this.value,
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
            self.$set(self, 'proposed', { 'assignments': [''], 'methods': [''] });
        },
        remove(index) {
            this.model.splice(index, 1);
            this.editing.splice(index, 1);
        },
        toggleEdit(index) {
            var self = this;
            //console.log(self.$refs);
            //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);
            console.log('MODEL', this.model[index].methods, 'CLONEDMODEL', this.clonedModel[index].methods);
            if (self.editing[index]) {
                if (self.clonedModel[index].assignments.length) {
                    self.model[index] = self.clonedModel[index];
                    return self.$set(self.editing, index, false);
                }
                return;
            } else {
                return self.$set(self.editing, index, true);
            }
        },
        displayTrigger(value) {
            var self = this;
            var data = [{
                    name: 'A new contact joins this group',
                    value: 'team.join',
                },
                {
                    name: 'A contact leaves this group',
                    value: 'team.leave',
                },
                {
                    name: 'This group\'s information is updated',
                    value: 'content.edit',
                },
                {
                    name: 'A group member updates their availability',
                    value: 'contact.unavailability',
                },
                {
                    name: 'A group member confirms an assignment',
                    value: 'confirmation.confirmed',
                },
                {
                    name: 'A group member declines an assignments',
                    value: 'confirmation.unavailable',
                },
                {
                    name: 'Group member\'s birthday',
                    value: 'contact.birthday',
                },
            ];
            var res = _.find(data, function(obj) {
                return value == obj.value;
            });
            return res.name;
        },
        displayAssignments(value) {
            if (!Array.isArray(value)) {
                return;
            }
            else if (value.length) {
                return value.join(', ');
            } else {
                return value;
            }
        }
    },
    watch: {
        'model': function() {
            this.clonedModel = JSON.parse(JSON.stringify(this.model));
        },
    },
    computed: {
        allPositionsObjects() {
            var self = this;
            return _.map(self.allPositions, function(pos) {
                return { 'name': pos, 'value': pos };
            });
        }
    }
}
</script>
<style lang="scss">
.full-width {
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>