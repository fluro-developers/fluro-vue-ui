<template>
    <div class="tag-select">
        <v-btn :small="small" :block="block" class="pill mx-0" @click.native="showModal">
            {{selectionSummary}}
            <fluro-icon type="tag"/>
        </v-btn>
        <!-- <pre>{{type}} {{definition}}</pre> -->
    </div>
</template>
<script>

import Vue from 'vue';
import FluroSelectionMixin from '../../../mixins/FluroSelectionMixin';

///////////////////////////////////////////////

import TagSelectModal from './TagSelectModal.vue';

///////////////////////////////////////////////

export default {
    computed: {
        selectionSummary() {
            var self = this;

            return self.selection.length;

            // if (!self.selection.length) {
            //     return `Select ${self.plural}`
            // }

            // if (self.selection.length > 3) {
            //     return `${self.selection.length} ${self.plural} selected`;
            // }

            // return _.map(self.selection, 'title').join(', ');
        }
    },
    components: {
        // FluroRealmSelectItem,
        // FluroRealmDots,
    },
    mixins: [FluroSelectionMixin],
    props: {
        small: {
            type: Boolean,
        },
        block: {
            type: Boolean,
        },
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
    data() {
        return {
            loading: true,
        }
    },
    watch: {
        'value': function() {
            //Set the value so update the selection
            this.setSelection(this.value);
        },
        'selection': function() {
            // console.log('SELECTION')
            var self = this;
            //Emit the change
            this.$emit('input', self.selection);

        }
    },
    methods: {
        showModal() {

            // console.log('SHOW MODAL', this.$fluro.modal)
            var self = this;

            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component: TagSelectModal,
                options: {
                    selector: self,
                    fixed: true,
                }
            });

        },
    }
}
</script>
<style scoped lang="scss">

</style>