<template>
    <fluro-content-form :options="options" v-model="model" :fields="customFields" ref="form">
        <template v-slot:form="{formFields, fieldHash, model, update, options}">
            <v-container grid-list-xl fluid pa-1 class="full-width">
                <v-layout align-center row wrap>
                    <v-flex xs12 sm12 md2 grid-list-xl>
                        <h5 margin>{{model.title}}</h5>
                    </v-flex>
                    <v-flex xs12 sm8 md6 grid-list-xl>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contacts" v-model="model" />
                    </v-flex>
                    <v-flex xs12 sm4 md4 grid-list-xl>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.confirmationStatus" v-model="model" />
                    </v-flex>
                </v-layout>
            </v-container>
        </template>
    </fluro-content-form>
</template>
<script>
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroContentForm from '../../../form/FluroContentForm.vue';


export default {
    mixins: [FluroContentEditMixin],
    props: {
        value: {
            type: Object,
            default: function() {
                return {};
            }
        },
        config: {
            type: Object,
            required: true,
        },
        slotData: {
            type: Object,
        }
    },
    components: {
        FluroContentForm
    },
    data() {
        return {
            model: this.value,
        }
    },
    created() {
        var self = this;
        if (!self.model.title) {
            self.model.title = self.slotData.title;
        }
    },
    methods: {},
    computed: {
        customFields() {

            var self = this;
            var array = [];
            ///////////////////////////////////


            addField('confirmationStatus', {
                title: 'Create As',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: [''],
                options: [{
                        name: 'Proposed',
                        value: '',
                    },
                    {
                        name: 'Await Confirmation',
                        value: 'unknown',
                    },
                    {
                        name: 'Confirmed',
                        value: 'confirmed',
                    },
                ],
            })


            addField('contacts', {
                title: `People`,
                minimum: 0,
                maximum: self.slotData.maximum,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'contact',
                }
            });

            /////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
    }
}
</script>
<style>
.full-width {
    width: 100%;
}
</style>