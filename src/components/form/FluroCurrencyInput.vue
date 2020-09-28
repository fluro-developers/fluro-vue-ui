<template>
    <div>
        <!-- <currency-input v-model="model"/> -->
        <v-currency-field :prefix="prefix" :suffix="suffix" :label="label" :required="required" :autofocus="autofocus" :outline="outline" :success="success" @blur="blur" :error-messages="errorMessages" :persistent-hint="persistentHint" :hint="hint" :placeholder="placeholder" :min="minValue" :max="maxValue" v-model="model" />      
    <div style="display: none;">
    <pre>{{min}} - {{max}}</pre>
    <pre>{{minValue}} - {{maxValue}}</pre>
   </div>
    </div>
</template>
<script>
import Vue from 'vue';


// Vue.component('v-currency-field', VCurrencyField);
import { VCurrencyField } from 'v-currency-field';


export default {
    methods: {
        blur(event) {
            this.$emit('blur', event);
        }
    },
    components: {
        VCurrencyField,
    },
    props: {
        currency: {
            type: String,
            default: 'USD',
        },
        hint: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        persistentHint: {
            type: Boolean,
        },
        errorMessages: {
            type: Array,
        },
        label: {
            type: String,
        },
        required: {
            type: Boolean,
        },
        success: {
            type: Boolean,
        },
        autofocus: {
            type: Boolean,
        },
        outline: {
            type: Boolean,
        },
        outline: {
            type: Boolean,
        },
        'hideSuffix': {
            type: Boolean,
        },
        'value': {
            type: Number,
            default () {
                return 0;
            }
        },
        'min': {
            type: Number,
            default () {
                return 0;
            }
        },
        'max': {
            type: Number,
        },
    },
    computed: {
        minValue() {
            var min = parseInt(this.min || 0) / 100;

            if (!min) {
                return;
            }
            return min;
        },
        maxValue() {
            var max = parseInt(this.max || 0) / 100;

            if (!max) {
                return;
            }
            return max;
        },
        prefix() {
            return this.$fluro.utils.currencySymbol(this.currency);

        },
        suffix() {
            if (this.hideSuffix) {
                return;
            }

            return String(this.currency || '').toUpperCase();
        },
    },
    data() {
        return {
            model: (this.value / 100),
        }
    },
    watch: {
        model(v) {

            v = parseFloat(v);
            v = Math.max(v, 0);
            v = parseInt(v * 100);
            console.log('Input changed', v)
            this.$emit('input', v);
        }
    }
}

</script>
<style lang="scss">
</style>
