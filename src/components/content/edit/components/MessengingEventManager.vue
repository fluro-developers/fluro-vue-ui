<template>
    <div>
        <list-group>
                <list-group-item v-for="(grade, index) in model">
                    <v-layout align-center>
                        <v-flex>
                            <strong>{{grade.title}}</strong>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn @click="remove(index)">
                                <fluro-icon icon="times" />
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </list-group-item>
        </list-group>
        <fluro-panel>
            <fluro-panel-title>Add a grade</fluro-panel-title>
            <fluro-panel-body>
                <form @submit.prevent.stop="add()">
                    <v-layout row wrap>
                        <v-flex>
                        
                        </v-flex>
                        <v-flex shrink>
                            <v-btn type="submit" @click="add()">Add</v-btn>
                        </v-flex>
                    
                    </v-layout>
                </form>
            </fluro-panel-body>
        </fluro-panel>
    </div>
</template>
<script>
import MessengingEventComponent from '../components/MessengingEventComponent.vue';


export default {
    props: {
        value: {
            type: Array,
        }
    },
    components: {
        FluroContentForm,

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

            var self = this;
            var clone = JSON.parse(JSON.stringify(this.proposed));

            if (self.valid) {
                return;
            }

            clone.key = _.camelCase(clone.title);
            delete clone.row;



            this.model.push(clone);

            this.proposed = {};
        },
        remove(index) {
            this.model.splice(index, 1);
        }
    },
    computed: {

    }
}
</script>
<style lang="scss">
.ghost-dragging-class {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>