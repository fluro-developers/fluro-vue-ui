<template>
    <div>
        <list-group>
            <list-group-item v-for="(area, index) in model" class="pa-3" :key="JSON.stringify(area)">
                <v-layout align-center>
                    <v-flex>
                        <fluro-content-form ref="form" v-model="model[index]" :fields="fields" />
                    </v-flex>
                    <v-flex shrink class="ml-3">
                        <fluro-confirm-button @click="remove(index)" content="Remove">
                            <template v-slot:default="{ confirming }">
                                <v-btn flat block :color="confirming ? 'red' : ''" style="transition: all 0.1s;width:100%;">{{
                                    confirming ? "Confirm?" : "Remove"
                                    }}</v-btn>
                            </template>
                        </fluro-confirm-button>
                    </v-flex>
                </v-layout>
            </list-group-item>
        </list-group>
        <fluro-panel>
            <fluro-panel-title>Add an Area Count</fluro-panel-title>
            <fluro-panel-body>
                <form @submit.prevent.stop="add()">
                    <v-layout>
                        <v-flex>
                            <fluro-content-form ref="form" v-model="proposed" :fields="fields" /> <!-- :options="options" -->
                        </v-flex>
                        <v-flex shrink>
                            <v-btn type="submit" color="primary" @click="add()" :disabled="disableAdd">Add</v-btn>
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
import FluroConfirmButton from "../../../ui/FluroConfirmButton.vue";
import { FluroContentForm } from 'fluro-vue-ui';
import draggable from 'vuedraggable'


export default {
    props: {
        value: {
            type: Array,
        }
    },
    components: {
        FluroContentForm,
        FluroConfirmButton,
        draggable,

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

            if (!clone.name || !clone.name.length || !clone.count || (clone.count < 0)) {
                return;
            }

            delete clone.row;



            this.model.push(clone);

            this.proposed = {};
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
                        title: 'Area Name',
                        minimum: 1,
                        maximum: 1,
                        type: 'string',
                        key: 'name',
                    },
                    {
                        title: 'Count',
                        minimum: 1,
                        maximum: 1,
                        type: 'number',
                        key: 'count',
                    },
                ]
            });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
        disableAdd() {
            var self = this;
            return (!self.proposed.name || !self.proposed.name.length || !self.proposed.count || (self.proposed.count < 0));
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