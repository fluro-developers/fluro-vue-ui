<template>
    <div v-if="model" py-0>
        <fluro-content-form :options="options" v-model="model" :fields="customFields" ref="form">
            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                <v-container fluid pa-0>
                    <v-layout row wrap grid-list-xl py-0>
                        <v-flex sm6 xs6>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.trigger" v-model="model" />
                        </v-flex>
                        <v-flex sm6 xs6>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.assignments" v-model="model" />
                        </v-flex>
                    </v-layout>
                </v-container>
            </template>
        </fluro-content-form>
    </div>
</template>
<script>

    //TODO check whether this actually needs to be here
import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';
import FluroExclusiveSelector from 'src/components/content/edit/components/FluroExclusiveSelector.vue';



export default {
    mixins: [FluroContentEditMixin],
    props: {
        value: {
            type: Object,
            default: function() {
                return {};
            },
        },
        config: {
            required: true,
        },
        allPositions: {
            type: Array,
        }
    },
    components: {
        // FluroContentForm,
        FluroExclusiveSelector
    },
    data() {
        return {
            model: this.value,
        }
    },
    created() {},
    methods: {
        validate() {
            var form = this.$refs.form;
            if (!form) {
                return [];
            }
            this.model.errorMessages = form.errorMessages || [];
        },
        validateAllFields() {
            var form = this.$refs.form;
            form.touch();
            this.validate();
        },
    },
    computed: {
        customFields() {

            var self = this;
            var array = [];
            var periodOptions = [];

            ///////////////////////////////////

            addField('assignments', {
                title: 'Notify',
                minimum: 1,
                maximum: self.allPositions.length + 1,
                type: 'string',
                directive: 'select',
                options: self.allPositions
            })


            addField('trigger', {
                title: 'Trigger when',
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: ['team.join'],
                options: [{
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
                ]
            })


            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
        sendToFormatted() {
            var self = this;
            var assignments = JSON.parse(JSON.stringify(self.model.assignments));
            //console.log('ASSIGNMENTS', assignments);
            if ((assignments.length == 1) && (assignments[0] == "")) {
                return 'All Assignments';
            } else {
                return assignments.join(', ');
            }
        },
    }
}
</script>
<style>
.capitalize-text {
    text-transform: capitalize;
}
</style>