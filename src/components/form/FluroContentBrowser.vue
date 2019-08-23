<template>
    <div class="fluro-content-browser">
        <v-toolbar class="elevation-0">
            <v-spacer></v-spacer>
            <v-text-field v-model="search" solo append-icon="search" label="Search" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="close()">
                Done
                <!-- <v-icon right>check</v-icon> -->
            </v-btn>
        </v-toolbar>
        <v-card>
            <template v-if="loading">
                <v-card-text class="text-sm-center">
                    <v-progress-circular indeterminate></v-progress-circular>
                </v-card-text>
            </template>
            <template v-else>
                <v-toolbar class="elevation-0" v-if="model.length">
                    <div>{{selectionSummary}}</div>
                    <v-spacer></v-spacer>
                    <v-item-group>
                        <v-btn small v-if="canSelectAll" @click="selectAll()">
                            Select all {{items.length}}
                            <!-- <v-icon right>check</v-icon> -->
                        </v-btn>
                        <v-btn small @click="deselectAll()">
                            Deselect {{maximum == 1 ? '' : 'all'}}
                            <!-- <v-icon right>check</v-icon> -->
                        </v-btn>
                    </v-item-group>
                </v-toolbar>
                <template v-if="items">
                    <v-data-table item-key="_id" :search="search" v-model="model" :select-all="multiple" :rows-per-page-items="pageOptions" :disable-initial-sort="true" :hide-headers="$vuetify.breakpoint.xsOnly" :headers="headers" :items="items">
                        <template v-slot:items="props">
                            <tr :active="isSelected(props.item)" @click.prevent.stop.capture="clicked(props.item)">
                                <td v-if="multiple">
                                    <v-checkbox v-model="props.selected" hide-details></v-checkbox>
                                </td>
                                <td class="text-xs-center fixed-w">
                                    <template v-if="props.item._type == 'image'">
                                        <fluro-image :item="props.item" :spinner="true" :width="50" :height="50" />
                                    </template>
                                    <!-- <template v-else-if="props.item._type == 'image'">
                            </template> -->
                                    <template v-else>
                                        <fluro-icon :type="props.item._type"></fluro-icon>
                                    </template>
                                </td>
                                <td>
                                    <div>{{props.item.title}}</div>
                                    <div class="small muted">{{summary(props.item)}}</div>
                                </td>
                                <td>{{props.item.created | timeago}}</td>
                                <td>{{props.item.updated | timeago}}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </template>
            </template>
        </v-card>
    </div>
</template>
<script>
import FluroSelectionMixin from '../../mixins/FluroSelectionMixin';


export default {
    mixins: [FluroSelectionMixin],
    created() {
        this.setSelection(this.value);
    },
    props: {
        'value': {
            default () {
                return []
            },
            type: Array,
        },
        'type': {
            type: String,
        },
        'minimum': {
            type: Number,
            default: 0,
        },
        'maximum': {
            type: Number,
            default: 0,
        }
    },
    watch: {
        'model': function() {
            var self = this;
            this.$emit('input', self.model); //[self.key])
        }
    },
    computed: {
        model:{
            get() {
                return this.selection;
            },
            set(array) {
                this.selection = array;
            }
        },
        canSelectAll() {
            if (this.model.length == this.items.length) {
                return;
            }

            if (this.maximum) {
                return this.total < this.maximum;
            }

            return true;
        },
        selectionSummary() {

            if (this.multiple) {

                if (this.minimum) {
                    if(this.model.length >= this.minimum) {
                        return `${this.model.length} selected`;
                    }

                    return `${this.model.length} of ${this.minimum} required`;
                }


                if (this.maximum) {

                    return `${this.model.length} of max ${this.maximum} selected`;
                }
            }


            return `${this.model.length} selected`
        },
        search: {
            get() {
                return this.terms;
            },
            set: _.debounce(function(newValue) {
                this.terms = newValue;
            }, 500)
        },
        multiple() {
            return this.maximum != 1;
        },
        total() {
            return this.model.length;
        },
        canAddValue() {
            if (this.maximum) {
                return this.total < this.maximum;
            }

            return true;
        },
    },
    data() {
        return {
            loading: true,
            terms: '',
            // selection: this.value,
            pageOptions: [10, 20, 60],
            headers: [{
                    text: '',
                    align: 'left',
                    sortable: false,
                    value: ''
                },
                {
                    text: 'Title',
                    align: 'left',
                    sortable: true,
                    value: 'title'
                },
                {
                    text: 'Updated',
                    align: 'left',
                    sortable: true,
                    value: 'updated'
                },

                {
                    text: 'Created',
                    align: 'left',
                    sortable: true,
                    value: 'created'
                },

            ]
        }
    },
    methods: {
        selectAll() {

            if(this.maximum) {
                this.setSelection(this.items.slice(0, this.maximum));
            } else {
                this.setSelection(this.items);
            }
        },
        clicked(item) {

            if (this.isSelected(item)) {
                return this.deselect(item);
            }

            if (this.multiple) {
                if (this.canAddValue) {
                    this.select(item);
                }
            } else {
                this.setSelection([item]);
            }
        },
        close() {
            this.$emit('close');
        },
        summary(item) {
            var self = this;
            var firstLine = item.firstLine || '';

            switch (item._type) {
                case 'event':
                    firstLine = `${self.$fluro.date.readableEventDate(item)} ${firstLine}`;
                    break;

            }

            return firstLine;
        },

    },
    asyncComputed: {
        items: {
            get() {

                var self = this;

                /////////////////////////////////////////////

                var endpoint = `/content`;
                if (self.type && self.type.length) {
                    endpoint = `/content/${self.type}`;
                }

                /////////////////////////////////////////////

                self.loading = true;

                // /////////////////////////////////////////////

                // var countRequest = self.$fluro.api.get(endpoint, {
                //     params: {
                //         count: true,
                //     }
                // });


                var itemsRequest = self.$fluro.api.get(endpoint, {
                    params: {
                        list: true,
                        simple: true,
                    }
                });

                return new Promise(function(resolve, reject) {
                    itemsRequest.then(function(res) {

                            resolve(res.data);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;

                        });

                });

                /////////////////////////////////////////////

                // return new Promise(function(resolve, reject) {

                // Promise.all([
                // countRequest,
                // itemsRequest,
                // ])
                //         .then(function(results) {

                //             self.loading = false;

                //             console.log('RESULTS', results);
                //             resolve({
                //                 items: results[1].data,
                //                 total: results[0].data.total,
                //             })
                //         })
                //         .catch(function(err) {

                //             self.loading = false;
                //             return reject(err);
                //         });
                // })
            }
        },
    }
}
</script>
<style lang="scss">
td.fixed-w {
    padding: 0 !important;
}

.fluro-content-browser {
    flex:1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .v-card {
        flex: 1;
        overflow: auto;
    }
}
</style>