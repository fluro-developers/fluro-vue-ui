<template>
    <div class="content-select">
        <v-btn :small="small" :color="color" :block="block" class="pill mx-0" @click.native="showModal">
            <span>{{selectionSummary}}</span>
        </v-btn>
        <!-- <pre>{{type}} {{definition}}</pre> -->
    </div>
</template>
<script>
import Vue from 'vue';
import FluroSelectionMixin from '../../../mixins/FluroSelectionMixin';

///////////////////////////////////////////////

import FluroContentSelectModal from './FluroContentSelectModal.vue';

///////////////////////////////////////////////

export default {
     props: {
        small:{
            type:Boolean,
        },
        block:{
            type:Boolean,
        },
        color:{
            type:String,
        },
        allDefinitions:{
            type:Boolean,
        },
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
        'type': {
            //The type of thing we are selecting realms for
            type: String,
        },
    },
    computed: {
        title() {
            return this.$fluro.types.readable(this.type, false);
        },
        plural() {
            return this.$fluro.types.readable(this.type, true);
        },
        selectionSummary() {
            var self = this;


            var matchingSelection = _.filter(self.selection, function(entry) {
                return entry.definition ? entry.definition == self.type : (entry._type == self.type)
            })

            if (!matchingSelection.length) {
                return `Select ${self.plural}`
            }

            if (matchingSelection.length > 3) {
                return `${matchingSelection.length} ${self.plural} selected`;
            }

            return _.map(matchingSelection, 'title').join(', ');
        }
    },
    created() {
         this.setSelection(this.value);
    },
    components: {
    },
    mixins: [FluroSelectionMixin],
    watch: {
        'value': function() {
            //Set the value so update the selection
            this.setSelection(this.value);
        },
        'selection': function() {
            var self = this;
            this.$emit('input', self.selection);
        }
    },
    methods: {
        showModal() {
            // console.log('SHOW MODAL', this.$fluro.modal)
            var self = this;

            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component:FluroContentSelectModal,
                options: {
                    selector:self,
                    type:self.type,
                    allDefinitions:self.allDefinitions,
                }
            });

            //////////////////////////////////////

            // promise.then(function(res) {}, function(err) {})
        },
    }
}
</script>
<style lang="scss">



</style>