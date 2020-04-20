<template>
    <div>
        <list-group>
            <list-group-item v-for="(column, index) in model">
                <v-container fluid grid-list-xl>
                    <v-layout align-start row wrap>
                        <v-flex sm10 xs12 pa-1 class="full-width">
                            <v-layout align-start row wrap>
                                <v-flex sm4 xs12>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.title" v-model="model[index]">
                                    </fluro-content-form-field>
                                </v-flex>
                                <v-flex sm8 xs12>
                                    <path-selector v-model="model[index].key" :options="columnKeyOptions" :loading="loadingSample" @pathupdated="pathUpdated(index, ...arguments)" />
                                </v-flex>
                                <!-- <v-flex sm8 xs12>
                                    <v-select/>
                                </v-flex> -->
                            </v-layout>
                        </v-flex>
                        <v-flex sm2 xs12 pa-1 class="full-width">
                            <fluro-confirm-button @click="remove(index)" content="Remove">
                                <template v-slot:default="{ confirming }">
                                    <v-btn flat block :color="confirming ? 'red' : ''" style="transition: all 0.1s;width:100%;">{{
                                        confirming ? "Confirm?" : "Remove"
                                        }}</v-btn>
                                </template>
                            </fluro-confirm-button>
                        </v-flex>
                    </v-layout>
                </v-container>
            </list-group-item>
        </list-group>
        <fluro-panel>
            <fluro-panel-body>
                <form @submit.prevent.stop="add()">
                    <v-container fluid grid-list-xl pa-1>
                        <v-layout row wrap grid-list-xl>
                            <v-flex sm10 xs12>
                                <v-layout row wrap>
                                    <v-flex sm4 xs12>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.title" v-model="proposed">
                                        </fluro-content-form-field>
                                    </v-flex>
                                    <v-flex sm8 xs12>
                                        <path-selector v-model="proposed.key" :options="columnKeyOptions" @pathupdated="proposedPathUpdated" :loading="loadingSample"/>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex sm2 xs12>
                                <v-btn block color="primary" type="submit" @click="add()" :disabled="!proposed.key">Add</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </form>
            </fluro-panel-body>
        </fluro-panel>
    </div>
</template>
<script>
import FluroConfirmButton from "src/components/ui/FluroConfirmButton.vue";
import FluroContentEditMixin from "src/components/content/edit/FluroContentEditMixin.js";
import PathSelector from "src/components/content/edit/components/PathSelector.vue";
export default {
    mixins: [FluroContentEditMixin],
    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
        },
        sampleData: {
            type: Array,
            default: function() {
                return [];
            }
        },
        config: {
            type: Object
        },
        loadingSample: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    components: { FluroConfirmButton, PathSelector },
    data() {
        return {
            model: this.value,
            proposed: { title: '', key: '' },
        };
    },
    methods: {
        add() {
            var self = this;
            var clone = JSON.parse(JSON.stringify(self.proposed));

            this.model.push(clone);
            self.$set(self, "proposed", { title: '', key: '' });
        },
        proposedPathUpdated(value) {
            this.proposed.key = value;
        },
        pathUpdated(index, value) {
            this.model[index].key = value;
        },
        remove(index) {
            this.model.splice(index, 1);
        },
        extract(model) {

            var self = this;

            var item = this.flatten(model);
            return _.chain(item)
                .map(function(value, key) {

                    var depth = key.split('.').length;
                    var indent = '';

                    _.times(depth - 1, function() {
                        indent += '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
                    });

                    var matchObject = _.get(model, key);
                    var type = (typeof matchObject);

                    /////////////////////////

                    var readable = key + ' - ' + value;

                    /////////////////////////

                    if (_.isArray(matchObject)) {
                        type = 'array';
                        readable = key + ' (multiple items)';
                    }

                    if (_.isString(matchObject)) {
                        var momentDate = self.$fluro.date.moment(matchObject, self.$fluro.date.moment.ISO_8601, true);
                        var isValid = momentDate.isValid();
                        if (isValid) {
                            matchObject = momentDate.toDate();
                        }
                    }
                    if (_.isDate(matchObject)) {
                        type = 'date';
                    }



                    /////////////////////////

                    return {
                        //value: value,
                        key: key,
                        //depth: depth,
                        //type: type,
                        //indent: indent,
                        title: readable,
                    };
                })
                .sortBy(function(entry) {
                    return entry.title;
                })
                .value();
        },
        flatten(obj) {
            var flattened = {}

            var circlular = []
            var circLoc = []

            function _route(prefix, value) {
                var i, len, type, keys, circularCheck, loc

                if (value == null) {
                    if (prefix === "") {
                        return
                    }
                    flattened[prefix] = null
                    return
                }
                type = typeof value
                if (typeof value == "object") {
                    circularCheck = circlular.indexOf(value)
                    if (circularCheck >= 0) {
                        loc = circLoc[circularCheck] || "this"
                        flattened[prefix] = "[Circular (" + loc + ")]"
                        return
                    }
                    circlular.push(value)
                    circLoc.push(prefix)

                    if (Array.isArray(value)) {
                        len = value.length





                        _route(prefix);


                        //Dont loop if the array is massive
                        if (len > 10) {
                            len = 10;
                        }

                        for (i = 0; i < len; i++) {
                            _route(prefix + "[" + i + "]", value[i])
                        }

                        return
                    }

                    keys = Object.keys(value)
                    len = keys.length
                    if (prefix) prefix = prefix + "."
                    if (len == 0) _route(prefix, null)

                    for (i = 0; i < len; i++) {
                        _route(prefix + keys[i], value[keys[i]])
                    }
                    return
                }
                flattened[prefix] = value
            }

            _route("", obj)

            return flattened
        }
    },
    computed: {
        fieldsOutput() {
            var self = this;
            var array = [];

            ///////////////////////////////////

            addField("title", {
                title: "Column Title",
                minimum: 0,
                maximum: 1,
                type: "string"
            });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details);
            }

            return array;
        },
        sampleQuery() {
            var self = this;
            if (!self.sampleData.length) {
                return [];
            }
            return _.chain(self.sampleData)
                .reduce(function(set, item) {

                    //We have the column
                    var columns = self.extract(item);

                    _.each(columns, function(column) {
                        var existing = set[column.key];
                        if (!existing) {
                            existing = set[column.key] = column;
                            existing.examples = [];
                        }

                        //add the examples
                        if (existing.examples.indexOf(column.value) == -1) {
                            existing.examples.push(column.value)
                        }
                    })

                    return set;
                }, {})
                .values()
                // .reduce(function(obj) {
                //     return {title: obj.readable, key: obj.key};
                // })
                .value();
        },
        columnKeyOptions() {
            var self = this;
            if (!self.sampleQuery || !self.sampleQuery.length) {
                return [];
            }
            var res = JSON.parse(JSON.stringify(self.sampleQuery));
            res.splice(0, 0, { title: 'Select a Data Source', key: '' });
            return res;
        }
    },
};
</script>
<style lang="scss">
.full-width {
    width: 100%;
}
</style>