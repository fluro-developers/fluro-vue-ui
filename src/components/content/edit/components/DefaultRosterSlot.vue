<template>
    <div class="full-width">
        <fluro-content-form :options="options" v-model="model" :fields="customFields" ref="form">
            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                <v-layout row wrap grid-list-xl>
                    <v-flex xs12 sm12 md3>
                        <h5 margin>{{slotData.title}}</h5>
                    </v-flex>
                    <v-flex xs12 sm8 md6>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contacts" v-model="model" />
                    </v-flex>
                    <v-flex xs12 sm4 md3>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.confirmationStatus" v-model="model" />
                    </v-flex>
                </v-layout>
            </template>
        </fluro-content-form>
    </div>
</template>
<script>
import { FluroContentForm, Layout } from 'fluro-vue-ui';
import FluroContentEditMixin from '../FluroContentEditMixin';

import moment from 'moment';

export default {
    mixins: [FluroContentEditMixin, Layout],
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
    created() {},
    methods: {},
    computed: {
        customFields() {

            var self = this;
            var array = [];
            ///////////////////////////////////


            addField('confirmationStatus', {
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })


            addField('contacts', {
                title: `People`,
                minimum: 0,
                maximum: 0,
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