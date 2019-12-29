<template>
    <div>
        <fluro-content-form :options="options" v-model="model" :fields="customFields" ref="form">
            <template v-slot:form="{formFields, fieldHash, model, options}">
                <v-layout row wrap grid-list-xl>
                    <v-flex xs12 sm12 pb-4>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.create" v-model="model" />
                    </v-flex>
                    <v-flex xs12 sm12 pb-5 v-if="model.create">
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.managedOwner" v-model="model" />
                    </v-flex>
                    <v-flex xs12 sm12 v-if="model.create && data.data && data.data.slots">
                        <list-group class="full-width">
                            <list-group-item v-for="(slot, ind) in data.data.slots" class="full-width">
                                <default-roster-slot @input="update" :config="config" :slotData="data.data.slots[ind]" v-model="model.slots[ind]"/>
                            </list-group-item>
                        </list-group>
                    </v-flex>
                </v-layout>
            </template>
        </fluro-content-form>
    </div>
</template>
<script>
import { FluroContentForm, Layout } from 'fluro-vue-ui';
import FluroContentEditMixin from '../FluroContentEditMixin';
import DefaultRosterSlot from './DefaultRosterSlot.vue';

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
        data: {
            type: Object,
            required: true,
        }
    },
    components: {
        FluroContentForm,
        DefaultRosterSlot,
    },
    data() {
        return {
            model: this.value,
        }
    },
    created() {
        var self = this;
        if (!self.model.slots && _.get(self.data, 'data.slots')) {
            self.$set(self.model, 'slots', []);
            _.each(self.data.data.slots, function(slot, ind) {
                self.$set(self.model.slots, ind, {})
            });
        }
    },
    methods: {
        update() {
            return this.$emit('input', this.model);
        }
    },
    computed: {
        customFields() {

            var self = this;
            var array = [];
            ///////////////////////////////////


            addField('create', {
                title: `Create ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes("roster") ? '' : 'Roster'}`,
                description: `Create a ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes("roster") ? '' : 'Roster'} for events created in this track if one does not already exist`,
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })


            addField('managedOwner', {
                title: `${_.get(self.data, 'title')} Owner`,
                description: "Set the owner of rosters created by this track",
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'reference-select',
                params: {
                    restrictType: 'persona',
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
.capitalize-text {
    text-transform: capitalize;
}

.full-width {
    width: 100%;
}
</style>