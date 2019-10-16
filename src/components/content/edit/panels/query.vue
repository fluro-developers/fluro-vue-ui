<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Event details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container class="grid-list-xl">
                            <constrain sm>
                                <h3 margin>Query Details</h3>
                                <!-- <pre>{{model}}</pre> -->
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.filterType" v-model="model"></fluro-content-form-field>
                                <filter-condition-group :rows="rows" :mini="true" v-model="model.filterConfiguration" :type="model.filterType" :debounce="filterDebounce" />
                                <!-- <p class="lead" v-if="dateModel.startDate">{{dateModel | readableEventDate}}</p> -->
                                <!-- <v-layout>
                                    <v-flex xs12 sm4>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.startDate" v-model="dateModel"></fluro-content-form-field>
                                    </v-flex>
                                    <v-flex xs12 sm4>

                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.endDate" v-model="dateModel"></fluro-content-form-field>
                                    </v-flex>
                                    <v-flex xs12 sm4>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                </v-layout> -->
                                <!-- <v-input class="no-flex"> -->
                                <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model"></fluro-content-form-field> -->
                                <!-- </v-input> -->
                                <!-- <v-input class="no-flex"> -->
                                <!-- <v-label>Body</v-label> -->
                                <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.body" v-model="model"></fluro-content-form-field> -->
                                <!-- </v-input> -->
                                <!-- <fluro-content-form-field :override-label="definition && definition.definitionName && definition.definitionName == 'service' ? 'Service Time / Event Track' : 'Event Track' " :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.track" v-model="model"></fluro-content-form-field> -->
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <!-- <tab :heading="`Access Passes`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>{{contextName}} Access Passes</h3>
                                <fluro-access-pass-select @input="modelUpdated" :host="model" v-model="model.policies" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Individual Permissions`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>{{contextName}} Individual Permissions</h3>
                                <fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab> -->
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin';
import FilterConditionGroup from '../../../form/filters/FilterConditionGroup.vue';

console.log()

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {


    mixins: [FluroContentEditMixin],
    components: {
        FilterConditionGroup,
    },
    methods: {
        modelUpdated() {
            this.update(this.model);
        },
    },
    created() {
        var self = this;

        if (!this.model.filterConfiguration) {
            this.model.filterConfiguration = {}
        }
    },
    asyncComputed: {
        typeOptions: {
            default: [],
            get() {
                var self = this;

                return new Promise(function(resolve, reject) {


                   

                    self.$fluro.types.terms()
                        .then(function(res) {

                             console.log('Load the types!!!', res);

                            var mappedTypeOptions = _.chain(res)
                            .reduce(function(set, entry, key) {

                                if(entry.parentType) {
                                    key = entry.parentType;
                                }

                                var existingEntry = set[key];

                                if(!existingEntry)  {
                                    existingEntry = 
                                    set[key] = {
                                        title:self.$fluro.types.readable(key),
                                        items:[],
                                    }
                                }

                                existingEntry.push(entry);
                                console.log(entry, type)

                                return set;


                            }, {})
                            .values()
                            .value();

                            console.log('MAPPED TYPES', mappedTypeOptions)
                            //Resolve the array
                            resolve(mappedTypeOptions);

                        })
                        .catch(function(err) {

                            reject(err);
                        });

                })

            },
        }
    },
    computed: {
        rows() {
            return [];
        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },

        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: 'Eg. My Awesome List',
            })

            addField('firstLine', {
                title: 'Description',
                minimum: 0,
                maximum: 1,
                type: 'string',
                placeholder: 'Eg. A list of my favorite people',
            })


            console.log('TYPE OPTIONS', self.typeOptions);



            addField('filterType', {
                title: 'Type',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                description: 'The type of item you want to return from this query',
                options: self.typeOptions,
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;

        },
    },
    data() {
        return {
            filterDebounce: 500,
        }
    },
}
</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}
</style>