<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <flex-column-body style="background: #fafafa;">
                <v-container fluid grid-list-xl>
                    <constrain sm>
                       
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                        <v-layout wrap>
                            <v-flex xs12 sm12>
                                <h4>Realm Colors</h4>
                                <p class="muted mb-0">Select colors for the realm below</p>
                                <v-chip label small disabled class="chip" :color="model.bgColor" :text-color="model.color">{{model.title || 'Realm Title'}}</v-chip>
                            </v-flex>
                            <v-flex xs6 sm3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.color" v-model="model" />
                            </v-flex>
                            <v-flex xs6 sm3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.bgColor" v-model="model" />
                            </v-flex>
                            <v-flex xs12 sm6>
                                <h4>Example Colors</h4>
                                <v-chip label small class="chip" v-for="eg in exampleColors" :color="eg.bgColor" :text-color="eg.color" @click="setColor(eg)">{{eg.title}}</v-chip>
                            </v-flex>
                        </v-layout>
                        <template v-if="definition && definition.fields && definition.fields.length">
                            <h3 margin>{{definition.title}} Information</h3>
                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                        </template>
                        <!-- <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" /> -->
                        <!-- <fluro-content-form v-if="definition && definition.fields && definition.fields.length" :options="options" v-model="model.data" :fields="definition.fields" /> -->
                    </constrain>
                </v-container>
            </flex-column-body>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////


import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';


/////////////////////////////////

/////////////////////////////////

export default {
    components: {},
    created() {},
    mixins: [FluroContentEditMixin],
    computed: {
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
            });

            addField('color', {
                title: 'Text Color',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'color',
            });

            addField('bgColor', {
                title: 'Background Color',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'color',
            });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
        exampleColors() {
            var res = [];

            function addColor(title, color, bgcolor) {
                res.push({
                    title: title,
                    color: color,
                    bgColor: bgcolor,
                });
            }

            addColor('Black', '#eee', '#555');
            addColor('Red', '#8f0f0f', '#ffb5ba');
            addColor('Pink', '#b3125f', '#ffa3c4');
            addColor('Purple', '#7f12b3', '#e7b3ff');
            addColor('Deep Purple', '#7f12b3', '#e2a3ff');
            addColor('Deep Blue', '#433aab', '#a5a3ff');
            addColor('Baby Blue', '#174b99', '#a6caff');
            addColor('Light Blue', '#1366a3', '#9ee2ff');
            addColor('Cyan', '#008b94', '#97f0ed');
            addColor('Medical Green', '#007357', '#97f0cb');
            addColor('Light Green', '#00703a', '#97f0a5');
            addColor('Lime Green', '#00783e', '#a8ed87');
            addColor('Banana Green', '#306b13', '#dbe37f');
            addColor('Desert Camo', '#6b5813', '#e3cd7f');
            addColor('Amber', '#966639', '#ffe175');
            addColor('Fluro Yellow', '#695e00', '#faff00');

            return res;
        }
    },
    methods: {
        setColor(obj) {
            var self = this;
            self.model.color = obj.color;
            self.model.bgColor = obj.bgColor;
        }
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="scss">
.chip {
    font-weight: 500;
}
</style>