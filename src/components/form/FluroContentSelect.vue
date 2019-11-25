<template>
    <div class="fluro-content-select" :class="{outlined:showOutline}">
        <!-- <pre>TESTING WOWOWOW {{selectionMinimum}} {{selectionMaximum}}</pre> -->
        <!-- <pre>{{model}}</pre> -->
        <div class="fluro-content-list" v-if="model.length">
            <list-group>
                <draggable v-model="model" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                    <list-group-item :item="item" v-for="(item, index) in model">
                        <template v-slot:right>
                            <v-menu :left="true" v-model="actionIndexes[index]" :fixed="true" transition="slide-y-transition" offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn class="ma-0" icon small flat v-on="on">
                                        <fluro-icon v-if="actionIndexes[index]" icon="times" />
                                        <fluro-icon v-else icon="ellipsis-h" />
                                    </v-btn>
                                </template>
                                <v-list dense>
                                    <v-list-tile @click="$actions.open([item])">
                                        <v-list-tile-content>Actions</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile @click="deselect(item)">
                                        <v-list-tile-content>Deselect</v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </template>
                    </list-group-item>
                </draggable>
            </list-group>
        </div>
        <div class="content-select-search-bar" v-if="canAddValue">
            <div class="content-select-search">
                <!-- :label="label" -->
                <v-autocomplete :outline="showOutline" :success="success" :required="required" :error-messages="errorMessages" :hint="hint" :hide-selected="true" @change="selected()" prepend-inner-icon="search" append-icon="" :persistent-hint="true" :placeholder="textPlaceholder" :return-object="true" item-text="title" v-model="candidates" :multiple="true" :loading="loading" :items="results" :search-input.sync="search" flat hide-no-data>
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
                <v-btn color="primary" block class="mr-1" v-if="canCreate" @click="create()">
                    Create
                </v-btn>
                <v-btn block class="" @click="showModal">
                    Browse
                </v-btn>
            </div>
        </div>
        <!-- <v-layout row v-if="canAddValue">
            <v-flex grow>
                <v-autocomplete :hide-selected="true" @change="selected()" prepend-inner-icon="search" append-icon="" :hint="hint" :persistent-hint="true" :placeholder="placeholder" :return-object="true" item-text="title" v-model="candidates" :multiple="true" :loading="loading" :items="results" :search-input.sync="search" flat hide-no-data :label="label">
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
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </template>-
                </v-autocomplete>
            </v-flex>
            <v-flex shrink class="buttons"> 
                <v-btn flat block @click="dialog = true">
                    Browse
                </v-btn>
            </v-flex>
        </v-layout> -->
        <!-- <v-dialog content-class="fluro-content-select-dialog" v-model="dialog">
            <template v-if="dialog">
                <fluro-content-browser :minimum="minimum" :maximum="maximum" :type="type" @close="closeModal()" v-model="model"></fluro-content-browser>
            </template>
        </v-dialog> -->
    </div>
</template>
<script>
// import FluroContentBrowser from './FluroContentBrowser.vue';
import FluroSelectionMixin from '../../mixins/FluroSelectionMixin';
import draggable from 'vuedraggable'
// import { mapFields } from 'vuex-map-fields';

import FluroContentSelectModal from './contentselect/FluroContentSelectModal.vue';



export default {
    components: {
        draggable,
        // FluroContentBrowser,
    },
    mixins: [FluroSelectionMixin],
    props: {
        'success': {
            type: Boolean,
        },
        'required': {
            type: Boolean,
        },
        'errorMessages': {
            type: Array,
        },
        'label': {
            type: String,
        },
        'hint': {
            default: '',
            type: String,
        },
        'placeholder': {
            type: String,
        },
        'value': {
            type: [Array, Object],
            default: function() {
                return [];
            },
        },
        'type': {
            type: String,
        },
        'types': {
            type: Array,
        },
        'minimum': {
            type: Number,
            default: 0,
        },
        'maximum': {
            type: Number,
            default: 0,
        },
        'outline': {
            type: Boolean,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
    },
    created() {

        var initialValue = this.value || [];
        this.selectionMinimum = this.minimum;
        this.selectionMaximum = this.maximum;

        ////////////////////////

        // if(this.multiple) {
        if (_.isArray(initialValue)) {
            this.setSelection(initialValue);
        } else {
            // console.log('WHAT IS IS IT IT SHOULD BE AN IBJECT', initialValue.length)
            this.setSelection([initialValue]);
        }



    },

    // <v-input class="no-flex" :success="success" :label="label" :required="required" :error-messages="errorMessages" :hint="field.description">
    computed: {
        canCreate() {
            var self = this;
            var type = self.type;

            if (!type) {
                return;
            }

            switch (type) {
                case 'node':
                    break;
                default:
                    return this.$fluro.access.can('create', type, self.$fluro.types.parentType(type));
                    break;
            }
        },

        textPlaceholder() {

            var restrictType = this.type ? this.$fluro.types.readable(this.type, true) : 'items';
            return this.placeholder || `Search for ${restrictType}`; //Search for ${this.label || 'items'}`;
        },
        showOutline() {
            return this.outline || this.options.outline;
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
        },
        // ...mapFields('fluro', [
        //     'realmSelectFullScreen', //The authenticated user if they log in
        // ]),
    },
    methods: {
        create() {
            // console.log('SHOW MODAL', this.$fluro.modal)
            var self = this;

            //////////////////////////////////////

            self.$fluro.global.create(self.type, null, true)
                .then(function(res) {
                    self.select(res);
                });
        },
        showModal() {
            // console.log('SHOW MODAL', this.$fluro.modal)
            var self = this;
            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component: FluroContentSelectModal,
                options: {
                    selector: self,
                    type: self.type,
                    minimum: self.minimum,
                    maximum: self.maximum,
                    allDefinitions: true,
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

                    var numOpenSlots = (self.maximum - self.total);
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
            self.terms = '';
            self.candidates = [];

            //////////////////////////////////////////

        },
        getActions(item) {
            var self = this;
            var actions = [];

            actions.push({
                title: 'Deselect',
                click: function() {
                    return self.deselect(item);
                }
            });

            return actions;


        }
    },
    watch: {
        'terms': function(searchTerms) {

            var self = this;
            self.results = [];

            if (searchTerms && searchTerms.length) {

                self.loading = true;
                var params = {
                    allDefinitions: true,
                };

                if (self.type) {
                    params.types = self.type;


                }


                // console.log('OPTIONS', this);

                self.$fluro.content.search(searchTerms, params)
                    .then(function(results) {

                        self.results = results; //_.map(results, 'title');
                        self.loading = false;
                    })
                    .catch(function(err) {
                        self.loading = false;
                        self.results = [];
                    })
            }


        },
        'model': function() {
            var self = this;

            if (!this.multiple) {
                this.$emit('input', _.first(self.model)); //[self.key])
            } else {
                this.$emit('input', self.model);
            }

        },
        minimum(min) {
            console.log('CHANGESSS', min)
            var self = this;
            self.selectionMinimum = min;
        },
        maximum(max) {
            console.log('CHANGESSS', max)
            var self = this;
            self.selectionMaximum = max;
        },
    },
    data() {




        return {
            actionIndexes: {},
            selection: [],
            candidates: [],
            results: [],
            terms: '',
            loading: false,
            dialog: false,
            // model: this.value,
            drag: false,
        }
    },
}
</script>
<style lang="scss">
.fluro-content-list {
    margin-bottom: 5px;
}


.fluro-content-select {

    & /deep/ .v-select__selections {
        padding-top: 0 !important;
    }

    & /deep/ .v-input__slot {
        min-height: 48px !important;
    }

    & /deep/ .v-input__prepend-inner,
    & /deep/ .v-input__append-inner {
        margin-top: 11px !important;
    }

    & /deep/ .v-text-field--box .v-input__slot {
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
        & /deep/ .v-input__slot {
            height: 60px;
        }


        & /deep/ .v-input__prepend-inner {
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