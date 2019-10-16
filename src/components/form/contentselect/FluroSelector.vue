<script>
import Vue from 'vue';
import FluroSelectionMixin from '../../../mixins/FluroSelectionMixin';

///////////////////////////////////////////////

export default {
     props: {
        'minimum':{
            type:Number,
            default:0,
        },
        'maximum':{
            type:Number,
            default:0,
        },
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
    created() {
        this.selectionMinimum = this.minimum;
        this.selectionMaximum = this.maximum;
    },
    mixins:[FluroSelectionMixin],
    watch: {
        minimum(v) {
            this.selectionMinimum = Math.max(parseInt(v), 0)
        },
        maximum(v) {
            this.selectionMaximum = Math.max(parseInt(v), 0)
        },
        'value': function() {
            //Set the value so update the selection
            this.setSelection(this.value);
        },
        'selection': function() {
            var self = this;
            this.$emit('input', self.selection);
        }
    },
}
</script>