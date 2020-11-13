<template>
    <flex-column-body>
        <v-container pa-0 fluid v-if="item.parentType == 'interaction'">
            <constrain  >
                <fluro-page-preloader contain v-if="loading" />
                <template v-else>
                    <div class="form-image" v-if="image">
                        <fluro-image cover :from="form" :imageWidth="1000" :imageHeight="300" :spinner="true" :item="image" />
                    </div>
                    <v-container fluid>
                        <wrapper>
                            <constrain sm>
                                <fluro-interaction-form :title="form.title" :definition="form" :paymentIntegration="paymentIntegration" context="publicForm" :debugMode="false" v-model="formModel" ref="previewForm">
                                    <template v-slot:info>
                                        <h1 margin v-if="!hideDisplayTitle">{{displayTitle}}</h1>
                                        <fluro-compile-html class="form-body" :template="publicData.body" :context="form" />
                                    </template>
                                    <template v-slot:success v-if="publicData.thankyou">
                                        <div v-html="publicData.thankyou">
                                        </div>
                                    </template>
                                   <!--  <template v-slot:submit>
                                        <v-btn @click="saveDraft">
                                            Save & Finish later
                                            <fluro-icon right icon="paper-plane" />
                                        </v-btn>
                                    </template> -->
                                </fluro-interaction-form>
                                
                            </constrain>
                        </wrapper>
                    </v-container>
                </template>
            </constrain>
           </v-container>
           <v-container fluid v-else>
            <constrain sm>
                <h1>{{item.title}}</h1>
                <fluro-content-render :fields="definedFields" v-model="item.data" />
                <template v-if="item.body && item.body.length">
                    <div v-html="item.body"></div>
                </template>
            </constrain>
        </v-container>
    </flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';
import FluroInteractionForm from '../../../form/FluroInteractionForm.vue';
// import FluroContentRender from '../../../FluroContentRender.vue';

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    components: {
        FluroInteractionForm,
    },
    mixins: [FluroContentViewMixin],
    methods: {},
    computed: {
        model() {
            return this.item
        },
        data() {
            return this.item.data || {}
        },
        definedFields() {
            return this.definition ? this.definition.fields : null;
        },


        image() {

            var image = _.get(this.publicData, 'mainImage');
            if (!image || (!image._id && !image.length)) {
                return;
            }

            return image;
        },
        noImage() {
            return !this.image;
        },
        displayTitle() {
            var self = this;
            return self.publicData.title || self.form.title;
        },
        hideDisplayTitle() {
            var self = this;
            return self.publicData.hideDisplayTitle;
        },
        formData() {
            if (!this.form) {
                return;
            }
            return this.form.data;
        },
        publicData() {
            var self = this;
            return self.formData.publicData || {};
        },
        paymentIntegration() {
            var self = this;
            return _.first(self.form.gateways);
        },
    },
    data() {
        return {
            loading: false,
            formModel: {},
        }
    },
    asyncComputed: {
        form: {
            default: null,
            get() {
                var self = this;
                self.loading = true;

                var options;
                return new Promise(function(resolve, reject) {
                    self.$fluro.content.form(self.$fluro.utils.getStringID(self.item), options)
                        .then(function(form) {
                            resolve(form);
                            self.loading = false;
                            return;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;
                            return;
                        });

                });
            },
        }
    }
}

</script>
<style scoped lang="scss">
</style>
