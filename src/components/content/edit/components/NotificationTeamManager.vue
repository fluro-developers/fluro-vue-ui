<template>
    <div>
        <h4>{{model.length}} notification trigger{{model.length == 1 ? '' : 's'}}</h4>
        <p class="muted">Add notifications for when events happen within this group</p>
        <list-group>
            <list-group-item v-for="(notification, index) in model" :key="notification.guid">
                <v-layout row align-center>
                    <v-flex shrink>
                        <fluro-icon icon="bell" />
                    </v-flex>
                    <v-flex>
                       
                            <notification-team-component :editMode="editing[notification.guid]" :config="config" v-model="model[index]" :allPositions="allPositionsObjects" />
                        
                    </v-flex>
                    <v-flex shrink>
                        <template v-if="editing[notification.guid]">
                            <v-btn icon v-tippy content="Done" color="success" @click="toggleEdit(notification)">
                                <fluro-icon icon="check" />
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn icon v-tippy content="Edit" @click="toggleEdit(notification)">
                                <fluro-icon icon="pencil" />
                            </v-btn>
                        </template>
                    </v-flex>
                    <v-flex shrink>
                        <v-btn icon v-tippy content="Remove this notification" @click="remove(index)">
                            <fluro-icon icon="trash-alt" />
                        </v-btn>
                    </v-flex>
                </v-layout>
            </list-group-item>
            
        </list-group>
        <fluro-panel>
            <fluro-panel-body>
               
                    <v-container fluid grid-list-xl pa-1>
                        <v-layout row wrap grid-list-xl>
                            <v-flex sm10 xs12>
                                <notification-team-component :config="config" :editMode="true" v-model="proposed" :allPositions="allPositionsObjects" />
                            </v-flex>
                            <v-flex sm2 xs12>
                                <v-btn block color="primary" @click="add()">Add</v-btn>
                            </v-flex>
                        </v-layout>

                     
                    </v-container>
               
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
    components: { NotificationTeamComponent, FluroConfirmButton },
    data() {
        return {
            model: this.value,
            editing: {},
            proposed: {
                assignments: [],
                methods: [],
            },
            // editing: [],
        }
    },
    created() {
        var self = this;

        //Ensure all entries have a guid
        if (self.model && self.model.length) {
            _.each(self.model, function(notification) {

                if (notification.guid) {
                    return;
                }
                self.$set(notification, 'guid', self.$fluro.utils.guid())
            })
        }
    },
    methods: {
        toggleEdit(notification) {
            var isEditing = this.editing[notification.guid];
            this.$set(this.editing, notification.guid, !isEditing);
        },
        remove(index) {
            this.model.splice(index, 1);
        },
        add() {

            var self = this;


            console.log(self.proposed.assignments)

            if (!self.proposed.assignments || !self.proposed.assignments.length) {
                console.log('NO PROPOSED', self.proposed)
                self.$fluro.notify('Please select at least one position', { type: 'error' })
                return;
            }

            /////////////////////////////////////////////////////////////

            var clone = JSON.parse(JSON.stringify(self.proposed));
            clone.guid = self.$fluro.utils.guid();

            //Add to the list
            self.model.push(clone);

            self.$set(self, 'proposed', { assignments: [], methods: [] });


            //     var self = this;


            //     self.$refs.createform.validateAllFields();
            //     var clone = JSON.parse(JSON.stringify(self.proposed));

            //     clone.guid = self.$fluro.utils.guid();
            //     if (clone.errorMessages.length) {
            //         return;
            //     }

            //     delete clone.row;



            //     this.model.push(clone);
            //     this.editing.push(false);
            //     self.$set(self, 'proposed', { 'assignments': [''], 'methods': [''] });
            // },
            // remove(index) {
            //     this.model.splice(index, 1);
            //     this.editing.splice(index, 1);
            // },
            // toggleEdit(index) {
            //     var self = this;
            //     //console.log(self.$refs);
            //     //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);
            //     console.log('MODEL', this.model[index].methods, 'CLONEDMODEL', this.clonedModel[index].methods);
            //     if (self.editing[index]) {
            //         if (self.clonedModel[index].assignments.length) {
            //             self.model[index] = self.clonedModel[index];
            //             return self.$set(self.editing, index, false);
            //         }
            //         return;
            //     } else {
            //         return self.$set(self.editing, index, true);
            //     }
            // },
            // displayTrigger(value) {
            //     var self = this;
            //     var data = [, ];

            //     var res = _.find(data, function(obj) {
            //         return value == obj.value;
            //     });

            //     return res.name;
            // },
            // displayAssignments(value) {
            //     if (!Array.isArray(value)) {
            //         return;
            //     } else if (value.length) {
            //         return value.join(', ');
            //     } else {
            //         return value;
            //     }
        }
    },
    // watch: {
    //     'model': function() {
    //         this.clonedModel = JSON.parse(JSON.stringify(this.model));
    //     },
    // },
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
