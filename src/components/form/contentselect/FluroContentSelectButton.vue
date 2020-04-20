<template>
    <div class="content-select-button">
        <v-btn :small="small" :large="large" :color="color" :block="block" class="pill mx-0" @click.native="showModal">
            <span>{{selectionSummary}}</span>
        </v-btn>
        
    </div>
</template>
<script>
import Vue from 'vue';

///////////////////////////////////////////////

import FluroContentSelectModal from 'src/components/form/contentselect/FluroContentSelectModal.vue';
import FluroSelector from 'src/components/form/contentselect/FluroSelector.vue';

///////////////////////////////////////////////

export default {
    props: {
        label: {
            type: String,
        },

        filter: {
            type: Object,
            default () {
                return {
                    operator: 'and',
                    filters: [{
                        operator: 'and',
                        filters: [{
                            key: 'status',
                            comparator: 'in',
                            values: ['active', 'draft'],
                        }, ]
                    }]
                }
            },
        },
        small: {
            type: Boolean,
        },
        block: {
            type: Boolean,
        },
        large: {
            type: Boolean,
        },
        color: {
            type: String,
        },
        searchInheritable:{
            type:Boolean,
            default:true,
        },
        allDefinitions: {
            type: Boolean,
        },
        singleValue: {
            type: Boolean,
        },
        'type': {
            //The type of thing we are selecting realms for
            type: String,
            default() {
                return 'node';
            }
        },

        'minimum': {
            type: Number,
            default: 0,
        },
        'maximum': {
            type: Number,
            default: 0,
        },
        'value': {
            // type: [Array, Object],
        },
    },
    computed: {
        selection() {
            return this.selector.selection;
        },
        title() {
            return this.$fluro.types.readable(this.type, false);
        },
        plural() {
            return this.$fluro.types.readable(this.type, true);
        },
        selectionSummary() {


            var self = this;

            ///////////////////////////////////////

            var matchingSelection = _.filter(self.selection, function(entry) {
                if(!entry) {
                    return;
                }

                if(!self.type || self.type == 'node') {
                    return true;
                }

                return entry.definition ? entry.definition == self.type : (entry._type == self.type)
            })

            ///////////////////////////////////////
            
            // console.log('NATCHING SELECTION',self.selection );

            ///////////////////////////////////////

            if (!matchingSelection.length) {
                if (self.label && self.label.length) {
                    return self.label;
                } else {
                    return self.small ?  `Select ${self.plural}` : `Click to select ${self.plural}`
                }
            }

            ///////////////////////////////////////

            if (matchingSelection.length > 3) {
                return `${matchingSelection.length} ${self.plural} selected`;
            }

            ///////////////////////////////////////

            return _.map(matchingSelection, 'title').join(', ');
        }
    },
    data() {

        var self = this;
        var SelectionManager = Vue.extend(FluroSelector);


        var defaultValue = self.singleValue ? [self.value] : self.value;

        var selector = new SelectionManager({
            propsData: {
                minimum: self.minimum,
                maximum: self.maximum,
                allDefinitions:self.allDefinitions,
                searchInheritable:self.searchInheritable,
                value: defaultValue,
            }
        });

        return {
            selector,
        }
    },
    watch: {
        minimum(v) {
            this.selector.minimum = v;
        },
        maximum(v) {
            this.selector.maximum = v;
        },
        'value': function(v) {
            //Set the value so update the selection
            this.selector.value = this.singleValue ? [v] : v;
        },
        'selection': function(model) {
            if (this.singleValue) {
                model = _.first(model)
            }
            // console.log('EMIT CHANGE', this.singleValue || 'multiple', model);
            this.$emit('input', model);
        }
    },
    methods: {
        showModal() {
            console.log('SHOW MODAL', this.selector)
            var self = this;

            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component: FluroContentSelectModal,
                options: {
                    selector: self.selector,
                    type: self.type,
                    allDefinitions: self.allDefinitions,
                    searchInheritable:self.searchInheritable,
                    filter: self.filter,
                }
            });

            //////////////////////////////////////

        },
    }
}
</script>
<style lang="scss">
</style>