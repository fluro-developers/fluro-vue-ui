<template>
    <div>
        <!-- <currency-input v-model="model"/> -->
      
        <!-- <input v-currency v-model="currencyModel"/> -->
        <!-- <v-text-field :type="directive == 'password' ? 'password' : 'text'" :mask="params.mask" :autofocus="shouldAutofocus" :outline="showOutline" :success="success" browser-autocomplete="off" :required="required" :label="displayLabel" @input="elementValueChanged" v-model="fieldModel" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="placeholder" /> -->
      <client-only>
        <v-currency-field :prefix="prefix" :suffix="suffix" :label="label" :required="required" :autofocus="autofocus" :outline="outline" :success="success" @blur="blur" :error-messages="errorMessages" :persistent-hint="persistentHint" :hint="hint" :placeholder="placeholder" v-model="currencyModel" :min="minValue" :max="maxValue"  />
        </client-only>
        <!-- v-model="currencyModel" -->
        <div style="display: none;">
            <pre>Currency Model:{{currencyModel}}</pre>
            <pre>Actual Model: {{model}}</pre>
            <pre>{{min}} - {{max}}</pre>
            <pre>{{minValue}} - {{maxValue}}</pre>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';


// import { CurrencyDirective } from 'vue-currency-input'

// import VueCurrencyInput from 'vue-currency-input'
// Vue.component('v-currency-field', VCurrencyField);
import { VCurrencyField } from 'v-currency-field';


export default {
    // directives: {
    //     currency: CurrencyDirective
    // },
    methods: {
        // changed(event) {

        //     var parsed = parseFloat(event)
        //     // var parsedInt = parseInt(event);

        //     this.currencyModel = parsed;
        //     // console.log('INPUT FIELD CHANGED', event, parsed, parsedInt);
        // },
        blur(event) {

            //console.log('BLURR', this.model, this.value);
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
        currencyModel: {
            get() {

                var v = this.model;
                v = parseFloat(v);
                v = Math.max(v, 0);
                v = v / 100;

                console.log('GETTING currency model to', v);
                return v;
            },
            set(v) {

                v = parseFloat(v);
                v = Math.max(v, 0);
                v = parseInt(v * 100);


                console.log('Setting currency model to', v);
                this.model = v;
            },
        },
        minValue() {
            var min = parseInt(this.min || 0) / 100;

            if (!min) {
                return;
            }
            return min;
        },
        maxValue() {
            var max = parseInt(this.max || 0) / 100;

            if (!max || max == 0) {
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
            model: this.value,
        }
    },
    watch: {
        model(v) {

            // v = parseFloat(v);
            // v = Math.max(v, 0);
            // v = parseInt(v * 100);
            console.log('Input changed', v)
            this.$emit('input', v);
        }
    }
}

</script>
<style lang="scss">
</style>
