<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <!--  <template v-slot:menuprefix>
                    <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                        <flex-column-header style="text-align:center">
                            <div style="padding: 10px; max-width:200px; margin: auto;">
                                <fluro-image  :height="200" :image-height="450" contain :item="model" :cacheKey="imageCacheKey" :spinner="true"></fluro-image>
                            </div>
                            <div>
                                {{model.width}}x{{model.height}}
                            </div>
                        </flex-column-header>
                    </template>
                </template> -->
                <tab heading="Details">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <!--  -->
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <!-- -->
                                <grade-manager v-model="model.grades" />
                                <!--  -->
                                <fluro-panel>
                                    <fluro-panel-title>
                                        <div class="no-border-no-background" @click="toggleAutoGraduate()">
                                            <fluro-toggle-item :inactive="!model.autoGraduate">Auto-Graduate Students</fluro-toggle-item>
                                        </div>
                                    </fluro-panel-title>
                                    <fluro-panel-body v-if="model.autoGraduate">
                                        <v-layout column>
                                            <v-flex>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.graduationDate" v-model="model"></fluro-content-form-field>
                                            </v-flex>
                                            <v-flex>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.graduateTo" v-model="model"></fluro-content-form-field>
                                            </v-flex>
                                        </v-layout>
                                    </fluro-panel-body>
                                </fluro-panel>
                                <!--  -->

                                <!-- <pre>{{model}}</pre> -->
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                </tab>
                <!-- <tab heading="Advanced / Metadata" v-if="hasMeta">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                               
                                <fluro-panel v-if="model.data.iptc">
                                    <fluro-panel-title>
                                        <h5>IPTC Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.iptc" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                
                               
                                <fluro-panel v-if="model.data.exif">
                                    <fluro-panel-title>
                                        <h5>EXIF Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.exif" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab> -->
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import GradeManager from '../components/GradeManager.vue';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
        GradeManager,
    },
    created() {

    },
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
                params:{
                    autofocus:!self.model.title
                },
            });


            var now = new Date();
            addField('graduationDate', {
                title: 'Graduation Date',
                minimum: 0,
                maximum: 1,
                type: 'date',
                directive: 'datetimepicker',
                defaultValues: [now],
            });


            addField('graduateTo', {
                title: 'Graduate To',
                description: 'Which academic calendar does a contact graduate to if they reach the end of the grades in this calendar',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'academic',
                },
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
    },
    methods: {
        toggleAutoGraduate() {
            console.log('TOGGLE')
            var self = this;
            if (!self.model.autoGraduate) {
                self.$set(self.model, 'autoGraduate', true);
            }
            else {
                self.$set(self.model, 'autoGraduate', false);
            }
        }
    },
    data() {
        return {}
    },
}
</script>
<style lang="scss">
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding:0px;
}
</style>