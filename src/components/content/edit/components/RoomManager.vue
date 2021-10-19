<template>
    <div>
        <list-group>
            <draggable :list="model" v-bind="dragOptions" ghost-class="ghost-dragging-class" @start="drag=true" @end="drag=false">
                <list-group-item v-for="(room, index) in model">
                    <v-layout align-center>
                        <v-flex>
                            <strong>{{room.title}}</strong><br>
                            <span class="muted" style="padding-bottom:0px">{{room.description}}</span>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn class="my-0" icon @click="edit(index)">
                                <fluro-icon icon="pencil" />
                            </v-btn>
                            <v-btn class="my-0" icon @click="remove(index)">
                                <fluro-icon icon="times" />
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </list-group-item>
            </draggable>
        </list-group>
        <fluro-panel>
            <fluro-panel-title>Add a room</fluro-panel-title>
            <fluro-panel-body>
                <form @submit.prevent.stop="add()">
                    <v-layout>
                        <v-flex>
                            <fluro-content-form ref="form" v-model="proposed" :fields="fields" /> <!-- :options="options" -->
                        </v-flex>
                        <v-flex shrink>
                            <v-btn type="submit" @click="add()">Add</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </fluro-panel-body>
        </fluro-panel>
        <!-- <pre>{{proposed}}</pre> -->
        <!-- <v-layout>
            <v-flex xs12 sm5>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm5>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn>Add</v-btn>
            </v-flex>
        </v-layout> -->
    </div>
</template>
<script>
import FluroContentForm from '../../../form/FluroContentForm.vue';
import draggable from 'vuedraggable';


export default {
    props: {
        value: {
            type: Array,
        }
    },
    components: {
        FluroContentForm,
        draggable,

    },
    created() {
        if (!this.model) {
            this.model = [];
        }
    },
    data() {
        return {
            model: this.value,
            proposed: {},
            dragOptions: {},
            drag: false,
        }
    },
    methods: {
        add() {


            var clone = JSON.parse(JSON.stringify(this.proposed));

            if (!clone.title || !clone.title.length) {
                return;
            }

            delete clone.row;



            this.model.push(clone);

            this.proposed = {};
        },
        edit(index) {
            var self = this;
            self.$fluro.prompt(self.fields, 'Edit room', self.model[index])
                .then(function(res) {

                    self.$set(self.model, index, res);
                    // _.assign(self.model[index], res);
                });
        },
        remove(index) {
            this.model.splice(index, 1);
        }
    },
    computed: {
        fields() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('row', {
                type: 'group',
                sameLine: true,
                fields: [{
                        title: 'Room Name',
                        minimum: 1,
                        maximum: 1,
                        type: 'string',
                        key: 'title',
                    },
                    {
                        title: 'Description/Directions',
                        minimum: 0,
                        maximum: 1,
                        type: 'string',
                        key: 'description',
                    },
                    {
                        title: 'External ID',
                        minimum: 0,
                        maximum: 1,
                        type: 'string',
                        description: 'An ID used to link with external services, like booking systems or image recognition services',
                        key: 'externalID',
                    },
                    // {
                    //     title: 'Add',
                    //     minimum: 0,
                    //     maximum: 1,
                    //     type: 'string',
                    //     key:'description',
                    //     // customComponent:MyVueComponent
                    // }
                ]
            });

            // addField('title', {
            //     title: 'Room Title',
            //     minimum: 1,
            //     maximum: 1,
            //     type: 'string',
            // });

            // addField('description', {
            //     title: 'Description',
            //     minimum: 0,
            //     maximum: 1,
            //     type: 'string',
            // });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        }
    }
}

</script>
<style lang="scss">
.ghost-dragging-class {
    opacity: 0.5;
    background: #c8ebfb;
}

</style>
