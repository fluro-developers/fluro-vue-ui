<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab>
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <div class="grid-list-xl">
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <div v-if="definition && definition.fields && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                </div>
                            </div>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {


    mixins: [FluroContentEditMixin],
    components: {},
    methods: {
        modelUpdated() {
            this.update(this.model);
        },
    },
    created() {
        var self = this;
    },
    asyncComputed: {

    },
    computed: {
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
        fieldsOutput() {

            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
            })

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;

        },
    },
    data() {
        return {

        }
    },
}
</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}
</style>