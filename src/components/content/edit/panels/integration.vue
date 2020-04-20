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
                                
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"/>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.module" v-model="model"/>


                                <div v-if="definition && definition.fields && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                    </fluro-content-form>
                                </div>

                                <template v-if="model._id">
                                    <v-btn class="ma-0" large @click="authenticate()" color="primary">
                                        Authenticate with Youtube <fluro-icon icon="youtube" library="fab" right/>
                                    </v-btn>
                                </template>
                                <template v-else>
                                    
                                </template>
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
        authenticate() {

            var self = this;
            var moduleName = self.model.module;
            if(!self.model._id) {
                return self.$fluro.error({message:'Please save before authenticating'});
            }

            switch(moduleName) {
                case 'youtube':
                    window.location.href = `${self.$fluro.apiURL}/integrate/${moduleName}/${self.model._id}/oauth`;
                break;
            }
            
        },
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
        moduleOptions() {

            var array = [];

            array.push(
            {
                title:'Stripe',
                value:'stripe',
            },
            {
                title:'Youtube API',
                value:'youtube',
            },
            {
                title:'Facebook API',
                value:'facebook',
            },
            // {
            //     title:'Facebook API',
            //     value:'facebook',
            // },

            )
            return array;
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

            // ///////////////////////////////////

            addField('module', {
                title: 'Module',
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive:'select',
                options:self.moduleOptions,
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