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

            if (!self.selection.length) {
                return `Select ${self.plural}`
            }

            if (self.selection.length > 3) {
                return `${self.selection.length} ${self.plural} selected`;
            }

            return _.map(self.selection, 'title').join(', ');
        }
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