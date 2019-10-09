<template>
    <div class="filter-group-outer" :class="{mini:mini, large:!mini}">
        <v-container ref="element" :class="[{'pa-2': mini}, model.operator]">
            <v-layout row v-if="model.filters.length > 1">
                <v-flex d-flex align-center>
                    <template v-if="mini">
                        <div class="description">
                            Match
                            <select class="select-operator" v-model="model.operator">
                                <option value="and">all</option>
                                <option value="or">any</option>
                                <option value="nor">none</option>
                            </select>
                            of these rules
                        </div>
                    </template>
                    <template v-else>
                        <div class="description">
                            Show items that match
                            <select class="select-operator" v-model="model.operator">
                                <option value="and">all</option>
                                <option value="or">any</option>
                                <option value="nor">none</option>
                            </select> of these conditions
                        </div>
                    </template>
                </v-flex>
            </v-layout>
            <v-layout row :key="group.guid" v-for="(group, g) in model.filters">
                <div class="operator-column offset " :class="model.operator" v-if="model.filters.length > 1" d-flex align-center>
                    <span class="operator" :class="[{additional:g}, model.operator]">{{operatingWord(model, g)}}</span>
                </div>
                <v-flex>
                    <!-- {additional:model.filters.length > 1} -->
                    <v-container :class="[{'pa-2': mini}, {'py-2 px-0':!mini}, group.operator]" class="additional filter-group">
                        <template v-if="group.filters">
                            <v-layout row>
                                <v-flex d-flex align-center>
                                    <template v-if="mini">
                                        <div class="description" v-if="group.filters.length > 1">
                                            Match
                                            <select class="select-operator" v-model="group.operator">
                                                <option value="and">all</option>
                                                <option value="or">any</option>
                                                <option value="nor">none</option>
                                            </select>
                                            of these conditions
                                        </div>
                                        <div class="description" v-else>
                                            Match these conditions
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div>
                                            <h4>Rule {{g+1}}</h4>
                                            <div v-if="group.filters.length > 1">
                                                Show items that match
                                                <select v-model="group.operator">
                                                    <option value="and">All</option>
                                                    <option value="or">Any</option>
                                                    <option value="nor">None</option>
                                                </select> of these conditions
                                                <!-- <v-select dense v-model="group.operator" :items="operatorOptions" /> -->
                                            </div>
                                        </div>
                                    </template>
                                </v-flex>
                                <v-spacer />
                                <template v-if="mini">
                                    <div class="hover" style="white-space: nowrap;">
                                        <v-btn class="ma-0" small flat icon content="Duplicate rule" v-tippy color="grey" @click="duplicateEntry(model, g)">
                                            <fluro-icon icon="copy" />
                                        </v-btn>
                                        <v-btn class="ma-0" small flat icon content="Remove rule" v-tippy color="red" @click="removeEntry(model, g)">
                                            <fluro-icon icon="trash-alt" />
                                        </v-btn>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="hover">
                                        <v-btn small color="grey" outline @click="duplicateEntry(model, g)">
                                            <span class="btn-label">Duplicate</span>
                                            <fluro-icon right icon="copy" />
                                        </v-btn>
                                        <v-btn small color="red" outline @click="removeEntry(model, g)">
                                            <span class="btn-label">Duplicate</span>
                                            <fluro-icon right icon="copy" />
                                        </v-btn>
                                    </div>
                                </template>
                            </v-layout>
                            <!-- :key="i" -->
                            <div v-for="(filter, index) in group.filters" :key="filter.guid">
                                <v-layout>
                                    <div class="operator-column" :class="[group.operator]" v-if="group.filters.length > 1" d-flex align-center>
                                        <span class="operator" :class="[{additional:index}, group.operator]">{{operatingWord(group, index)}}</span>
                                    </div>
                                    <v-flex>
                                        <!-- <h3 v-if="!limit && group.filters.length > 1">Rule 1</h3> -->
                                        <!-- :columns="columns" -->
                                        <filter-condition-row :rows="rows" :loadingKeys="loadingKeys" :definition="definition" :fields="availableKeys" :mini="mini" v-model="group.filters[index]"></filter-condition-row>
                                    </v-flex>
                                    <div v-if="group.filters.length > 1">
                                        <template v-if="mini">
                                            <v-btn small class="ma-0" icon @click="removeEntry(group, index)">
                                                <fluro-icon icon="times" />
                                            </v-btn>
                                        </template>
                                        <template v-else>
                                            <v-btn icon @click="removeEntry(group, index)">
                                                <fluro-icon icon="times" />
                                            </v-btn>
                                        </template>
                                    </div>
                                </v-layout>
                            </div>
                        </template>
                        <!-- <pre>{{group}}</pre> -->
                        <v-btn class="mx-0" small @click="addCondition(group)">
                            Add Condition
                            <fluro-icon right icon="plus" />
                        </v-btn>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-btn class="mx-0" color="white" v-if="!limit" @click="addRule(model)">
                Add {{model.filters.length ? 'Another' : ''}} Rule
                <fluro-icon right icon="plus" />
            </v-btn>
        </v-container>
    </div>
</template>
<script>
import Vue from 'vue';
import {FilterService} from 'fluro';

// import FilterConditionRow from './FilterConditionRow.vue';


var indexIterator = 0;
var DEFAULT_COMPARATOR = 'in';//'in'; //'=='

function getFlattenedFields(array, trail, titles) {


    return _.chain(array)
        .map(function(field, key) {

            var returnValue = [];



            // console.log('FIELD WOOT', field);
            /////////////////////////////////////////

            //If there are sub fields
            if (field.fields && field.fields.length) {


                if (field.asObject || field.directive == 'embedded') {
                    //Push the field itself
                    trail.push(field.key);
                    titles.push(field.title)

                    field.trail = trail.slice();
                    field.titles = titles.slice();

                    trail.pop();
                    titles.pop();
                    returnValue.push(field);


                    ///////////////////////////////

                    //Prepend the key to all lowed fields




                    if (field.maximum != 1) {
                        trail.push(field.key + '[' + indexIterator + ']');
                        titles.push(field.title);
                    } else {
                        trail.push(field.key);
                        titles.push(field.title);
                    }
                }

                // console.log('Go down', field.key);
                var fields = getFlattenedFields(field.fields, trail, titles);

                if (field.asObject || field.directive == 'embedded') {
                    trail.pop()
                    titles.pop();
                }
                //console.log('Go back up')
                returnValue.push(fields);


            } else {
                /////////////////////////////////////////

                //Push the field key
                trail.push(field.key);
                titles.push(field.title);

                field.trail = trail.slice();
                field.titles = titles.slice();
                trail.pop();
                titles.pop();
                returnValue.push(field);
            }



            /////////////////////////////////////////

            return returnValue;

        })
        .flattenDeep()
        .value();
}




export default {
    props: {
        type: {
            type: String,
        },
        fields: {
            type: Array,
            default () {
                return [];
            },
        },
        mini: {
            type: Boolean,
        },
        rows: {
            type: Array,
        },
        // columns: {
        //     type: Array,
        // },
        'value': {
            type: Object,
            required: true,
            default () {
                return {
                    guid: this.$fluro.utils.guid(),
                    operator: 'and',
                    filters: [],
                }
            }
        },
        'debounce': {
            type: Number,
            default: 0,
        },
        limit: {
            type: Boolean,
        }
    },
    beforeCreate: function() {
        this.$options.components.FilterConditionRow = require('./FilterConditionRow.vue').default;
        this.$options.components.FilterConditionGroup = require('./FilterConditionGroup.vue').default;
    },
    created() {

        var self = this;

        //Get the filters as an array
        // self.$set(self.model, 'filters', self.model.filters.slice())

        ////////////////////////////////////////////////

        self.debounced = _.debounce(function() {
            // self.model = self.words;
            // console.log('DEBOUNCED', self.model, self.debounce)
            self.$emit('input', JSON.parse(JSON.stringify(self.model)));
        }, self.debounce);


        // this.retrieveKeys();

    },


    // components: {
    //     FilterConditionRow,
    // },
    methods: {
        operatingWord(group, i) {
            if (i) {
                return group.operator;
            } else {
                switch (group.operator) {
                    case 'nor':
                        return 'Not';
                        break;
                    default:
                        return 'Where';
                        break;
                }
            }
        },
        addRule(group) {
            group.filters.push({
                operator: 'and',
                guid: this.$fluro.utils.guid(),
                filters: [{
                    comparator: DEFAULT_COMPARATOR,
                }]
            })
        },
        addCondition(group) {
            group.filters.push({
                guid: this.$fluro.utils.guid(),
                comparator: DEFAULT_COMPARATOR,
            })
        },
        duplicateEntry(group, i) {


            var newEntry = JSON.parse(JSON.stringify(group.filters[i]));
            newEntry.guid = this.$fluro.utils.guid();
            group.filters.splice(i, 0, newEntry);
        },
        removeEntry(group, i) {

            this.$delete(group.filters, i)

            var length = group.filters.length;
            if (length < 2) {
                console.log('Set to AND')
                this.$set(group, 'operator', 'and');
            }


            // group.filters.splice(i, 1)
            // Vue.set(group, 'filters', group.filters);

            // this.model.filters.splice(index, 1);
            // this.$set(this.model.filters, index, null);//this.model.filters);
            // this.$delete(this.model.filters, index)
            // this.$set(this.model, 'filters', this.model.filters.slice())
            // var index = this.model.filters.indexOf(filter);
            // this.model.filters.splice(index, 1);
        },

        retrieveKeys() {

            var self = this;


            ////////////////////////////////////

            //There are no rows
            if (!self.rows || !self.rows.length) {
                //console.log('Values > No rows')
                self.availableKeys = [];
                this.loadingKeys = false;
                return;
            }

            ////////////////////////////////////

            //Show feedback to the user that we are loading
            //the values for them
            this.loadingKeys = true;

            //This is the key for our cached request
            var cacheKey = self.rowChangeString;

            ////////////////////////////////////

            //Get the storage cache
            var valueStorageCache = this.$fluro.cache.get('filter-distinct-keys');

            ////////////////////////////////////

            //Check to see if there is already a cached set of values
            //for this query
            var valueCache = valueStorageCache[cacheKey];

            ////////////////////////////////////

            //If we haven't already got the values for this request
            if (!valueCache) {

                //Get all the ids
                var subSetIDs = self.$fluro.utils.arrayIDs(self.rows);

                //We need to make an asynchronous request to the server
                //to find out what values we can filter by
                var options = {}


                ///////////////////////////////////////////////////////

                if(self.definition && self.definition.type) {
                    options.type = self.definition.type.definitionName;
                }

                ///////////////////////////////////////////////////////

                //Make the request and cache it
                valueCache = valueStorageCache[cacheKey] = self.$fluro.content.keys(subSetIDs, options);
            }

            /////////////////////////////////////////////////////////////////

            //When the request is complete
            valueCache.then(function(res) {

                console.log('Keys!!', res);

                self.availableKeys = res;
                self.loadingKeys = false;
            }, function(err) {

                console.log('Error', err);

                self.availableKeys = [];
                self.loadingKeys = false;

                //Clear the cache request for next time
                valueStorageCache[cacheKey] = null;
            });


        }
    },
    data() {

        var self = this;

        var clone = JSON.parse(JSON.stringify(this.value));

        if(!clone.filters) {
            clone.filters  = [];
        }
        _.each(clone.filters, function(filter) {
            filter.guid = self.$fluro.utils.guid();
        })

        return {
            model: clone,
            debounced: null,
            operatorOptions: [
                { text: 'All', value: 'and' },
                { text: 'Any', value: 'or' },
                { text: 'All', value: 'and' },
            ],
            // availableKeys:[],
            loadingKeys: false,
        }
    },
    asyncComputed: {
        definition: {
            get() {

                var self = this;

                if (!self.type || !self.type.length) {
                    return Promise.resolve(null);
                }

                return new Promise(function(resolve, reject) {

                    return self.$fluro.types.get(self.type)
                        .then(function(definition) {
                            return resolve(definition);
                        })
                        .catch(reject);
                })

            }
        },

    },
    computed: {
        // rowChangeString() {
        //     return `${this.type}-${_.orderBy(this.$fluro.utils.arrayIDs(this.rows), function(r) {
        //         return r;
        //     }).toString()}`;
        // },
        availableKeys() {

            var self = this;

            var fields = self.fields || [];





            if (self.definition) {

                var definitionFields = _.chain(self.definition)
                .get('definition.fields')
                .map(function(field) {

                    field.key = 'data.'+ field.key;
                    return field;
                })
                .value();



                fields = fields.concat((_.get(self, 'definition.type.fields') || []), definitionFields);

                if (self.definition.details && self.definition.details.length) {

                    // console.log('DETAIL SHEETS FIELDS', self.definition.details)
                    _.each(self.definition.details, function(detailSheet) {

                        // //Get all the flattened fields
                        var flattened = getFlattenedFields(detailSheet.fields, [], []);

                        var mapped = _.chain(flattened)
                            .map(function(field) {

                                if(field.type =='group') {
                                    return;
                                }

                                return {
                                    title: detailSheet.title + ' - ' + field.titles.join(' > '),
                                    key: `details.${detailSheet.definitionName}.items[0].data.${field.trail.join('.')}`,
                                    minimum: field.minimum,
                                    maximum: field.maximum,
                                    detail: detailSheet.definitionName,
                                    type: field.type,
                                }
                            })
                            .compact()
                            .value();



                        // _.map(detailSheet.fields, function(field) {

                        //     return {
                        //         title:detailSheet.title + ' - ' + field.title,
                        //         key:`details.${detailSheet.definitionName}.${field.key}`,
                        //         // key:field.key,
                        //         // `details.${detailSheet.definitionName}.items[0].data[${field.key}]`,
                        //         type:field.type,
                        //         minimum:field.minimum,
                        //         maximum:field.maximum,
                        //         detail:detailSheet.definitionName,

                        //     }

                        // })

                        fields = fields.concat(mapped);
                    })
                }
            }

            return _.orderBy(fields, 'title')

        },
    },
    watch: {
        // rowChangeString() {
        //     this.retrieveKeys();
        // },
        value(v) {

            // console.log('Value changed')
            var clone = JSON.parse(JSON.stringify(v || {}));
            if(!clone.filters) {
            clone.filters  = [];
        }
            this.model = clone;
        },
        'model': {
            handler: function() {
                this.debounced();
            },
            deep: true,
        }
    },
}
</script>
<style scoped lang="scss">
$color-nor: #333;
$color-or: $warning;
$color-and: $success;



.filter-group-outer {


    .description {
        font-size: 13px;
        padding: 10px 0;
    }

    .select-operator {
        font-size: 13px;
        border: 1px solid transparent;
        background: none;
        text-align: center;
        appearance: none;
        display: inline-block;

        &:hover {
            border: 1px solid rgba(#000, 0.1);
            background: #fff;
        }
    }


    &.mini {
        .operator {

            font-weight: 700;
            // letter-spacing: 0.1em;
            overflow: hidden;
            text-align: center;
            text-transform: uppercase;
            font-size: 10px;
            padding: 0 3px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            line-height: 20px;
            height: 20px;
            color: transparent;
            // border-radius: 50%;
            border: 1px solid #fff;
            background: $color-and;
            border-radius: 10px;
            opacity: 0;

            &.additional {
                opacity: 1;
                color: #fff;
            }

            &.nor {
                background: $color-nor;
            }

            &.or {
                background: $color-or;
            }

        }

        .operator-column {
            flex: none !important;

            padding-top: 8px;

            width: 20px;
            position: relative;

            &:before {
                content: '';
                border-left: 2px solid rgba(#000, 0.1);
                display: block;
                position: absolute;
                right: 50%;
                height: 100%;
                top: 0;
                bottom: 0;
            }


            &.and:before {
                border-left-color: $color-and;

            }

            &.nor:before {
                border-left-color: $color-nor;

            }

            &.or:before {
                border-left-color: $color-or;

            }


        }

        .filter-group {

            &.additional {
                border: 1px solid #ccc;
                box-shadow: 0 2px 2px rgba(#000, 0.1);
                border-radius: 5px;
                background: #fff;
                margin-bottom: 15px;
            }

            // &.additional {
            //     border-top: 1px solid rgba(#000, 0.1);
            //     padding-top: 15px;
            //     margin-top: 15px;
            // }

            & .hover {
                @media(min-width: 769px) {
                    opacity: 0;
                }
            }

            &:hover {
                .hover {
                    opacity: 1;
                }
            }
        }



    }


    &.large {
        .operator {

            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-size: 12px;
            padding: 0 10px;
            position: absolute;
            right: 30px;
            line-height: 32px;
            color: transparent;

            &.additional {
                background: $color-and;
                color: #fff;




                border-radius: 5px 0 0 5px;

                &:after {
                    content: '';
                    display: block;
                    border: 16px solid transparent;
                    border-left-color: $color-and;
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    top: 0;
                    right: -32px;
                }


                &.nor {
                    background: $color-nor;

                    &:after {
                        border-left-color: $color-nor;
                    }
                }

                &.or {
                    background: $color-or;

                    &:after {
                        border-left-color: $color-or;
                    }
                }


            }


            &:before {
                content: '';
                display: block;
                background: $success;
                position: absolute;
                right: -30px;
                top: 50%;
                margin-top: -6px;
                width: 12px;
                height: 12px;
                border-radius: 100%;
                border: 1px solid #fff;
            }


            &.nor {
                &:before {
                    background: $color-nor;
                }
            }

            &.or {
                &:before {
                    background: $color-or;
                }
            }

        }

        .operator-column {
            flex: none !important;

            padding-top: 20px;

            width: 90px;
            margin-right: 25px;
            position: relative;

            &:before {
                content: '';
                border-left: 2px solid rgba(#000, 0.1);
                display: block;
                position: absolute;
                right: 5px;
                height: 100%;
                top: 0;
                bottom: 0;
            }


            &.and:before {
                border-left-color: $color-and;

            }

            &.nor:before {
                border-left-color: $color-nor;

            }

            &.or:before {
                border-left-color: $color-or;

            }


        }

        .filter-group-outer,
        .filter-group {}

        .filter-group {

            &.additional {
                border-top: 1px solid rgba(#000, 0.1);
                padding-top: 15px;
                margin-top: 15px;
            }

            & .hover {
                opacity: 0;
            }

            &:hover {
                .hover {
                    opacity: 1;
                }
            }
        }

    }

    .v-btn.ghost {
        border: 1px dashed rgba(#000, 0.5);
    }
}
</style>