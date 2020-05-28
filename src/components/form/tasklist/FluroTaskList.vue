<template>
    <div class="fluro-task-list">
        <!-- <fluro-panel> -->
        <!-- <fluro-panel-title class="border-bottom"> -->
        <v-layout align-center row>
            <v-flex style="padding: 5px;">
                <h5>
                    <!-- :enabled="editMode" -->
                    <fluro-inline-edit >
                        <template v-slot:default>
                            {{model.title}}
                        </template>
                        <template v-slot:edit="{props, blur, focus}">
                            <input block @input="update" @focus="focus($event)" v-model="model.title" @keyup.enter="blur" @blur="blur" />
                        </template>
                    </fluro-inline-edit>
                </h5>
                <p class="help-block" v-if="requiredMessage" v-html="requiredMessage"></p>
            </v-flex>
            <v-flex shrink class="hover">
                <!-- <v-btn v-tippy content="Add Task" icon class="ma-0"> -->
                <!-- Add a task -->
                <!-- <fluro-icon icon="plus" /> -->
                <!-- </v-btn> -->
                <v-menu :left="true" v-model="actionsOpen" :fixed="true" transition="slide-y-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn v-tippy content="More Options" class="ma-0" icon flat v-on="on">
                            <fluro-icon v-if="actionsOpen" icon="times" />
                            <fluro-icon v-else icon="ellipsis-h" />
                        </v-btn>
                    </template>
                    <v-list dense>
                        <!-- <v-list-tile @click="action.click" v-for="action in availableActions">
                                <v-list-tile-content>{{action.title}}</v-list-tile-content>
                            </v-list-tile> -->
                        <!-- <v-divider /> -->
                        <!-- @click="action.click" -->
                        <v-list-tile @click="selectState(state.key)" v-for="state in states">
                            <v-list-tile-content>Mark as required to complete '{{state.title}}'</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="selectState(null)">
                            <v-list-tile-content>Disconnect from process</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile @click="remove()">
                            <v-list-tile-content>Delete '{{model.title}}'</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-flex>
        </v-layout>
        <!-- </fluro-panel-title> -->
        <!-- <fluro-panel-body> -->
        <!--  -->
        <draggable class="task-list-items" @start="dragStart" @change="onChange" @end="dragEnd" :list="model.tasks" :options="dragOptions">
            <fluro-task-item :state="state" :definition="definition" :card="card" v-model="model.tasks[index]" @input="update" :key="task.guid" v-for="(task, index) in model.tasks" />
        </draggable>
        <template >
            <fluro-inline-edit :autofocus="value.autofocus">
                <template v-slot:default>
                    <v-btn small class="ml-0">
                        Add task
                        <fluro-icon right icon="plus" />
                    </v-btn>
                </template>
                <template v-slot:edit="{props, blur, focus}">
                    <v-layout row>
                        <v-flex>
                            <input block v-model="proposedTaskName" @blur="blur" placeholder="Type a title for this task and then press enter" @keyup.enter="pushProposedTask()" />
                        </v-flex>
                        <v-flex shrink v-if="proposedTaskName.length">

                            <!-- @click.stop.prevent="pushProposedTask(blur)" -->
                            <v-btn  icon class="ma-0" @mousedown="newTaskMore()">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </template>
            </fluro-inline-edit>
        </template>
        <!-- <v-btn small @click="addTask" class="ml-0">
                Add task
                <fluro-icon right icon="plus" />
            </v-btn> -->
        <!-- <pre>{{model}}</pre> -->
        <!-- </fluro-panel-body> -->
        <!-- </fluro-panel> -->
    </div>
</template>
<script>

	import _ from 'lodash';

import draggable from 'vuedraggable';
import FluroTaskItem from 'src/components/form/tasklist/FluroTaskItem.vue';
import FluroInlineEdit from 'src/components/form/FluroInlineEdit.vue';

export default {
    components: {
        // draggable,
        draggable,
        FluroTaskItem,
        FluroInlineEdit,
    },
    props: {
        card:{
            type:Object,
        },
        editMode: {
            type: Boolean,
        },
        value: {
            type: Object,
            required: true,
        },
        state:{
            type:String,
            required:true,
        },
        // card: {
        //     type: Object,
        //     required: true,
        // },
        definition: {
            type: Object,
            required: true,
        }
    },
    data() {

        var copy = JSON.parse(JSON.stringify(this.value));
        delete copy.autofocus;

        return {
            over: false,
            actionsOpen: false,
            model: copy,
            proposedTaskName: '',
        }
    },
    watch: {
        value() {
            this.model = JSON.parse(JSON.stringify(this.value));
        }
    },
    methods: {
        newTaskMore() {
            var self = this;
            
            self.model.tasks.push({
                // immediateModal:true,
                name: self.proposedTaskName,
                required: true,
                state: self.state,
                status: 'incomplete',
            })

            self.proposedTaskName = '';
            self.update();


        },
        pushProposedTask(blur) {
            var self = this;

            if (self.proposedTaskName && self.proposedTaskName.length) {
                self.model.tasks.push({
                    autofocus: true,
                    name: String(self.proposedTaskName),
                    required: true,
                    state: self.state,
                })
                self.update();
            }

            self.proposedTaskName = '';
            if (blur) {
                blur();
            }

        },
        addTask() {

            var self = this;
            self.model.tasks.push({
                name: 'New task',
                required: true,
                state: self.state,
                status: 'incomplete',
            })

            self.update();
        },
        selectState(key) {
            this.model.state = key
            this.update();
        },
        dragStart() {},
        dragEnd() {
            this.update();
        },
        onChange() {
            this.update();
        },

        update() {
            this.$emit('input', this.model);
        },
        remove() {
            this.update();
            this.$emit('remove', this.model);
        },
    },
    computed: {
        dragOptions() {
            var self = this;

            return {
                group: 'tasks',
                animation: 150,
            }
        },
        requiredMessage() {

            var modelState = this.model.state;

            if (modelState) {
                var matchingState = _.find(this.states, { key: modelState })
                if (matchingState) {
                    return `Required to complete <strong>${matchingState.title}</strong>`
                }
            }
        },
        states() {
            return _.get(this.definition, 'data.states');
        },

        availableActions() {

            var self = this;

            return [{
                title: `Edit '${self.model.title}'`,
                click: function() {

                }
            }]
        }
    },
}
</script>
<style lang="scss">
.fluro-task-list {
    // background: rgba(#000, 0.03);
    // padding: 15px;
    // border-radius: 5px;
    margin-bottom: 25px;


    border: 1px solid rgba(#000, 0.15);
    padding: 10px;
    border-radius: 3px;
    background: #fff;


input[block] {
	display: block;
    padding: 5px;
    background: #fff;
    border: 1px solid #2ad4b9;
    width: 100%;
}


    // margin-bottom: 10px;
    // padding-top: 10px;
    // border-top: 3px solid rgba(#000, 0.05);

    .task-list-items {


        // .fluro-task-item {

        //     &:hover {
        //         opacity:0.9;
        //         // background: #fff;
        //     }

        //     border:none;
        //     border-radius: 0;
        //     border-bottom:none;

        //     &:first-child {
        //         border-radius: 3px 3px 0 0;
        //     }

        //     &:last-child {
        //         border-radius: 0 0 3px 3px;
        //         // border-bottom:1px solid rgba(#000, 0.1);
        //     }
        // }

        .fluro-task-item {
            background: #eee; // rgba(#000, 0.03);
            margin-bottom: 1px;
            //     &:hover {
            //         background: #fff;
            //     }

            //     border:none;
            //     border-radius: 4px;
            //     border-bottom:none;
        }
    }



    .hover {
        opacity: 0;
    }

    &:hover .hover {
        opacity: 1;
    }
}
</style>