<template>
    <div class="fluro-content-select" :class="{outlined:showOutline}">
        <template v-if="model.length">
            <div class="fluro-content-list" v-if="showBasicList">
                <list-group>
                    <draggable v-model="model" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                        <list-group-item @click="viewItem(item)" :item="item" v-for="(item, index) in model">
                            <template v-slot:right>
                                <v-menu :left="true" v-model="actionIndexes[index]" :fixed="true" transition="slide-y-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ma-0" @click.prevent.stop icon small flat v-on="on">
                                            <fluro-icon v-if="actionIndexes[index]" icon="times" />
                                            <fluro-icon v-else icon="ellipsis-h" />
                                        </v-btn>
                                    </template>
                                    <v-list dense>
                                        <v-list-tile @click="editInPlace(item)" v-if="editInPlaceEnabled(item)">
                                            <v-list-tile-content>Edit</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="deselect(item)">
                                            <v-list-tile-content>Deselect</v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="$actions.open([item])">
                                            <v-list-tile-content>More Actions</v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </template>
                        </list-group-item>
                    </draggable>
                </list-group>
            </div>
            <div class="fluro-content-list" v-else>
                <fluro-panel>
                    <fluro-table style="max-height: 50vh" trackingKey="_id" :pageSize="40" :items="model" :columns="columns" />
                </fluro-panel>
                <!-- <list-group>
          <list-group-item :item="item" v-for="(item, index) in limited">
            <template v-slot:right>
              <v-menu
                :left="true"
                v-model="actionIndexes[index]"
                :fixed="true"
                transition="slide-y-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="ma-0" @click.prevent.stop icon small flat v-on="on">
                    <fluro-icon v-if="actionIndexes[index]" icon="times" />
                    <fluro-icon v-else icon="ellipsis-h" />
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-tile @click.prevent.stop="$actions.open([item])">
                    <v-list-tile-content>Actions</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click.prevent.stop="deselect(item)">
                    <v-list-tile-content>Deselect</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </template>
          </list-group-item>
        </list-group> -->
            </div>
        </template>
        <div class="content-select-search-bar" v-if="canAddValue">
            <div class="content-select-search">
                <v-autocomplete @focus="$emit('focus')" @blur="$emit('blur')" :outline="showOutline" :success="success" :required="required" :error-messages="errorMessages" :hint="hint" :hide-selected="true" @change="selected()" append-icon :persistent-hint="true" :placeholder="textPlaceholder" :return-object="true" item-text="title" v-model="candidates" :multiple="true" :loading="loading" :items="results" :search-input.sync="search" flat hide-no-data>
                    <template v-slot:item="{ item }">
                        <v-list-tile-avatar class="text-sm-center">
                            <template v-if="item._type == 'persona'">
                                <fluro-avatar :id="item._id" type="persona" />
                            </template>
                            <template v-else-if="item._type == 'contact'">
                                <fluro-avatar :id="item._id" type="contact" />
                            </template>
                            <template v-else-if="item._type == 'image'">
                                <fluro-image :item="item" :spinner="true" :width="40" :height="40" />
                            </template>
                            <template v-else>
                                <fluro-icon :type="item._type"></fluro-icon>
                            </template>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <template v-if="item._type == 'event'">
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                <div class="muted">{{item | readableEventDate}}</div>
                            </template>
                            <template v-else>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </template>
                        </v-list-tile-content>
                    </template>
                </v-autocomplete>
            </div>
            <div class="content-select-search-buttons">
                <v-btn small v-tippy :content="`Create new ${readableSingle}`" color="primary" class="ma-0 mr-1" v-if="canCreate" @click="create()">
                    <span>New</span>
                    <fluro-icon icon="plus" right />
                </v-btn>
                <v-btn small v-tippy :content="`Browse for ${readablePlural}`" class="ma-0" @click="showModal">
                    <span>Find</span>
                    <fluro-icon icon="search" right />
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import FluroSelectionMixin from "../../mixins/FluroSelectionMixin.js";
import FluroContentSelectModal from "./contentselect/FluroContentSelectModal.vue";
import FluroTable from "../table/FluroTable.vue";
import TypeImageCell from '../table/cells/TypeImageCell.vue';
import StatusCell from '../table/cells/StatusCell.vue';

import _ from "lodash";

export default {
    components: {
        draggable,
        FluroContentSelectModal,
        FluroTable,
    },
    mixins: [FluroSelectionMixin],
    props: {
        template: {
            type: Object
        },
        success: {
            type: Boolean
        },
        required: {
            type: Boolean
        },
        errorMessages: {
            type: Array
        },
        label: {
            type: String
        },
        hint: {
            default: "",
            type: String
        },
        placeholder: {
            type: String
        },
        value: {
            type: [Array, Object],
            default: function() {
                return [];
            }
        },
        type: {
            type: String
        },
        types: {
            type: Array
        },
        minimum: {
            type: Number,
            default: 0
        },
        maximum: {
            type: Number,
            default: 0
        },
        outline: {
            type: Boolean
        },
        options: {
            default: function() {
                return {};
            },
            type: Object
        },
        searchInheritable: {
            type: Boolean,
            default: true
        },
        allDefinitions: {
            type: Boolean,
            default: true
        },
        lockFilter: {
            type: Object
        }
    },
    created() {
        this.setInitialValue(this.value);
    },
    computed: {
        showBasicList() {
            return !this.options.forceTableView && (this.model.length <= this.listLimit)
        },
        columns() {

            var self = this;
            var array = [];


            array.push({
                title: "",
                key: "_id",
                renderer: TypeImageCell,
                shrink: true,
            });

            if (this.type == 'contact') {

                array.push({
                    title: "First Name",
                    key: "firstName"
                });

                array.push({
                    title: "Last Name",
                    key: "lastName"
                });


            } else {
                array.push({
                    title: "Title",
                    key: "title"
                });
            }



            array.push({
                title: "Status",
                key: "status",
                renderer: StatusCell,
                shrink: true,
            });

            // <v-list-tile @click="editInPlace(item)" v-if="editInPlaceEnabled(item)">
            //                     <v-list-tile-content>Edit</v-list-tile-content>
            //                 </v-list-tile>
            //                 <v-list-tile @click="deselect(item)">
            //                     <v-list-tile-content>Deselect</v-list-tile-content>
            //                 </v-list-tile>
            //                 <v-list-tile @click="$actions.open([item])">
            //                     <v-list-tile-content>More Actions</v-list-tile-content>
            //                 </v-list-tile>

            if (self.editInPlaceEnabled) {
                array.push({
                    title: '',
                    key: '_id',
                    renderer: 'button',
                    shrink: true,
                    button: {
                        icon: 'pencil',
                        action(row) {
                            return new Promise(function(resolve, reject) {
                                self.editInPlace(row);
                                resolve();
                            })

                        },
                    }
                })
            }

            array.push({
                title: '',
                key: '_id',
                renderer: 'button',
                shrink: true,
                button: {
                    icon: 'times',
                    action(row) {

                        return new Promise(function(resolve, reject) {

                            if (self.$fluro.confirm) {
                                self.$fluro.confirm('Deselect', `Deselect ${row.title}?`)
                                    .then(deselect).catch(reject);
                            } else {
                                deselect();
                            }

                            function deselect() {

                                self.deselect(row);
                                resolve();

                            }
                        })

                    },
                }
            })

            if (self.options && self.options.actions && self.options.actions.length) {
                array = array.concat(self.options.actions);
            }


            return array;
        },
        readableSingle() {
            return this.$fluro.types.readable(this.type);
        },
        readablePlural() {
            return this.$fluro.types.readable(this.type, true);
        },
        canCreate() {
            var self = this;
            var type = self.type;

            if (!type) {
                return;
            }

            switch (type) {
                case "node":
                    break;
                default:
                    return this.$fluro.access.can(
                        "create",
                        type,
                        self.$fluro.types.parentType(type)
                    );
                    break;
            }
        },

        textPlaceholder() {
            var restrictType = this.type ?
                this.$fluro.types.readable(this.type, true) :
                "items";
            return this.placeholder || `Quick search for ${restrictType}`; //Search for ${this.label || 'items'}`;
        },
        showOutline() {
            return this.outline || this.options.outline;
        },
        limited() {
            return this.model.slice(0, this.listLimit);
        },
        model: {
            get() {
                return this.selection;
            },
            set(array) {
                this.selection = array;
            }
        },
        multiple() {
            return this.maximum != 1;
        },
        total() {
            // if(this.multiple) {
            return this.model.length;
            // } else {
            // return this.model ? 1 : 0;
            // }
        },
        canAddValue() {
            if (this.maximum) {
                return this.total < this.maximum;
            }

            return true;
        },
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        search: {
            get() {
                return this.terms;
            },
            set: _.debounce(function(newValue) {
                this.terms = newValue;
            }, 500)
        }
    },
    methods: {
        viewItem(item) {
            this.$fluro.global.view(item, true);
        },
        editInPlaceEnabled(item) {
            return this.$fluro.access.canEditItem(item) && this.$fluro.global.edit;
        },
        editInPlace(item) {
            var self = this;
            if (self.$fluro.global.edit) {
                self.$fluro.global.edit(item, true).then(function(res) {
                    //Update the item with what we know about it now
                    _.assign(item, res);

                    // console.log("Updated!", item);
                });
            }
        },
        setInitialValue(initialValue) {
            // var initialValue = this.selection; // || [];
            this.selectionMinimum = this.minimum;
            this.selectionMaximum = this.maximum;

            // console.log('SET INITIAL VALUE', initialValue, initialValue.length);
            // return

            ////////////////////////

            // if(this.selection == initialValue) {
            //     console.log('No change necessary')
            //     return;
            // }

            // if(this.multiple) {


            if (initialValue) {
                if (_.isArray(initialValue) && initialValue.length) {
                    //this.selection = initialValue;//.slice();
                    return this.setSelection(initialValue);
                } else {
                    if (initialValue._id || initialValue.length) {
                        // console.log('CHECKINT WHAT IS IT', typeof initialValue)
                        return this.setSelection([initialValue]);
                        //this.selection = [initialValue];
                    }
                }
            }


            if (this.selection && this.selection.length) {
                //Reset to empty array
                // console.log('Reset to empty')
                this.setSelection([]);
            }

        },
        create() {
            // console.log('SHOW MODAL', this.$fluro.modal)
            var self = this;

            //////////////////////////////////////

            self.$fluro.global
                .create(
                    self.type, {
                        disableCacheClearOnSave: true,
                        template: JSON.parse(JSON.stringify(self.template || {}))
                    },
                    true
                )
                .then(function(res) {
                    self.select(res);
                });
        },
        showModal() {
            var self = this;
            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component: FluroContentSelectModal,
                options: {
                    selector: self,
                    type: self.type,
                    minimum: self.minimum,
                    maximum: self.maximum,
                    allDefinitions: self.allDefinitions,
                    searchInheritable: self.searchInheritable,
                    lockFilter: self.lockFilter
                }
            });

            //////////////////////////////////////

            // promise.then(function(res) {}, function(err) {})
        },

        closeModal() {
            this.dialog = false;
        },
        selected() {
            var self = this;

            //////////////////////////////////////////

            var newEntries = self.candidates;

            //If we haven't hit the maximum yet
            if (self.canAddValue) {
                if (self.maximum) {
                    var numOpenSlots = self.maximum - self.total;
                    newEntries = newEntries.slice(0, numOpenSlots);
                }

                if (newEntries.length) {
                    _.each(newEntries, function(item) {
                        self.select(item);
                    });
                }
            }

            //////////////////////////////////////////

            //Reset the search and clear the candidates
            self.terms = "";
            self.candidates = [];

            //////////////////////////////////////////
        },
        getActions(item) {
            var self = this;
            var actions = [];

            actions.push({
                title: "Deselect",
                click: function() {
                    return self.deselect(item);
                }
            });

            return actions;
        }
    },
    watch: {
        value(v) {
            var self = this;
            // console.log('VALUE CHANGED');
            self.setInitialValue(v);
        },
        terms(searchTerms) {
            var self = this;
            self.results = [];

            if (searchTerms && searchTerms.length) {
                self.loading = true;
                var params = {
                    allDefinitions: true
                };

                if (self.type) {
                    params.types = self.type;
                }

                // console.log('OPTIONS', this);

                self.$fluro.content
                    .search(searchTerms, params)
                    .then(function(results) {
                        self.results = results; //_.map(results, 'title');
                        self.loading = false;
                    })
                    .catch(function(err) {
                        self.loading = false;
                        self.results = [];
                    });
            }
        },
        selection(s) {
            // console.log('SELECTION CHANGED')
            this.model = s;
        },
        model: function() {
            var self = this;

            if (!this.multiple) {
                this.$emit("input", _.first(self.model)); //[self.key])
            } else {
                this.$emit("input", self.model);
            }

            // console.log('MODEL CHANGED')
        },
        minimum(min) {
            // console.log("CHANGESSS", min);
            var self = this;
            self.selectionMinimum = min;
        },
        maximum(max) {
            // console.log("CHANGESSS", max);
            var self = this;
            self.selectionMaximum = max;
        }
    },
    data() {
        return {
            listLimit: 50,
            actionIndexes: {},
            // selection: [],
            candidates: [],
            results: [],
            terms: "",
            loading: false,
            dialog: false,
            // model: this.value,
            drag: false
        };
    }
};

</script>
<style lang="scss">
.fluro-content-list {
    margin-bottom: 5px;
}

.fluro-content-select {
    &>>>.v-select__selections {
        padding-top: 0 !important;
    }

    &>>>.v-input__slot {
        min-height: 48px !important;
    }

    &>>>.v-input__prepend-inner,
    &>>>.v-input__append-inner {
        margin-top: 11px !important;
    }

    &>>>.v-text-field--box .v-input__slot {
        background: rgba(#000, 0.03);
    }

    .content-select-search-bar {
        position: relative;

        .content-select-search-buttons {
            position: absolute;
            right: 5px;
            top: 10px;

            display: flex;
            align-items: center;

            // .v-btn {
            // background: #fff;
            // }
        }
    }

    &.outlined {
        &>>>.v-input__slot {
            height: 60px;
        }

        &>>>.v-input__prepend-inner {
            margin-top: 16px !important;
        }

        .content-select-search-bar .content-select-search-buttons {
            top: 6px;
        }
    }

    .fluro-content-select-dialog {
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .ghost {
        opacity: 0.5;
    }

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

    .no-move {
        transition: transform 0s;
    }
}

</style>
