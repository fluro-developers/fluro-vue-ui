<template>
    <v-container fluid grid-list-lg v-if="model">
        <fluro-content-form v-model="model" :fields="fields">
            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                <v-layout row wrap>
                    <v-flex xs12 sm12>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.addressLine1" v-model="model"></fluro-content-form-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.addressLine2" v-model="model"></fluro-content-form-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.suburb" v-model="model"></fluro-content-form-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.state" v-model="model"></fluro-content-form-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.postalCode" v-model="model"></fluro-content-form-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.country" v-model="model"></fluro-content-form-field>
                    </v-flex>
                </v-layout>
            </template>
        </fluro-content-form>
    </v-container>
</template>
<script>
import FluroContentForm from 'src/components/form/FluroContentForm.vue';
import FluroContentFormField from 'src/components/form/FluroContentFormField.vue';


export default {
    props: {
        value: {
            type: Object,
            default: function() {
                return {};
            },
        }
    },
    components: {
        FluroContentForm,
        FluroContentFormField,
    },
    data() {
        return {
            model: this.value,
            proposed: {},
        }
    },
    methods: {},
    computed: {
        fields() {

            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('addressLine1', {
                title: 'Address Line 1',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('addressLine2', {
                title: 'Address Line 2',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('suburb', {
                title: 'Suburb',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('state', {
                title: 'State',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('postalCode', {
                title: 'Postal Code',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('country', {
                title: 'Country',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'countryselect'
            });

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
</style>