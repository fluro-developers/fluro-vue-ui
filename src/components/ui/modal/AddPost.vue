<template>
    <form @submit.prevent="submit" :disabled="state == 'processing'" class="add-post-modal">
        <fluro-page-preloader v-if="loading" contain />
        <flex-column  v-else>
            <flex-column-header class="border-bottom">
                <page-header type="post">
                    <template v-slot:left>
                        <h3>New {{definition.title}} <span class="muted">// {{summary}}</span></h3>
                    </template>
                </page-header>
            </flex-column-header>
            <flex-column-body>
                <v-container>

                    <!-- <pre>{{definition}}</pre> -->
                    <fluro-content-form v-model="dataModel.data" ref="form" @errorMessages="validate" :fields="definition.fields"></fluro-content-form>
                    <fluro-realm-select v-model="dataModel.realms" type="event" :definition="dataModel.definition" />
                </v-container>
            </flex-column-body>
            <flex-column-footer class="border-top">
                <v-container class="pa-2">
                    <div class="actions">
                        <template v-if="state == 'error'">
                            <v-alert :value="true" type="error" outline>
                                {{serverErrors}}
                            </v-alert>
                        </template>
                        <template v-else>
                            <v-alert :value="true" type="error" outline v-if="hasErrors">
                                Please check the following issues before submitting
                                <div v-for="error in errorMessages">
                                    <strong>{{error.title}}</strong>: {{error.messages[0]}}
                                </div>
                            </v-alert>
                        </template>
                    </div>
                    <v-layout>
                        <template v-if="options.skip">
                            <v-btn @click="dismiss()">
                                Skip
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn @click="dismiss()">
                                Cancel
                            </v-btn>
                        </template>
                        <v-spacer />
                        <v-btn class="mx-0" :loading="state == 'processing'" :disabled="hasErrors" type="submit" color="primary">
                            Submit
                        </v-btn>
                    </v-layout>
                </v-container>
            </flex-column-footer>
        </flex-column>
    </form>
</template>
<script>
import async from 'async';
// import { FluroModalMixin } from 'fluro-vue-ui';
// import { FluroRealmSelect, FluroContentForm, FluroModalMixin } from 'fluro-vue-ui';
import FluroRealmSelect from '../../form/realmselect/FluroRealmSelect.vue';
import FluroContentForm from '../../form/FluroContentForm.vue';
import FluroModalMixin from '../../../mixins/ModalMixin';

// , FluroContentForm, FluroModalMixin } from 'fluro-vue-ui';

// console.log('ADD POST EXISTS NOW', FluroRealmSelect, FluroContentForm, FluroModalMixin)

export default {
    props: {
        options: {
            type: Object
        }
    },
    // beforeCreate: function() {
    //     this.$options.components.FluroContentForm = require('../../form/FluroContentForm.vue').default;
    //     this.$options.components.FluroRealmSelect = require('../../form/realmselect/FluroRealmSelect.vue').default;
    // },
    components: {
        FluroRealmSelect,
        FluroContentForm,
    },
    mixins: [FluroModalMixin],
    data() {
        return {
            loading: true,
            dataModel: {
                data: {
                    // parent: this.options.item,
                },
            },
            serverErrors: '',
            errorMessages: [],
            thread: [],
            state: 'ready',
        }
    },
    asyncComputed: {
        definition: {
            default: null,
            get() {

                var self = this;




                var definition = self.options.definition;
                var definitionName = definition ? definition.definitionName : self.options.definitionName;

                self.loading = true;
                return new Promise(function(resolve, reject) {
                    return self.$fluro.types.get(definitionName)
                        .then(function(def) {


                            resolve(def.definition);

                            // console.log('GOT THE DEFINITION', def)
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);

                            self.loading = false;
                        })
                });
            }
        }
    },
    computed: {
        summary() {
            return this.items.length != 1 ? `${this.items.length} items` : this.items[0].title;
        },
        // definition() {
        //     return this.options.definition;
        // },
        items() {
            var self = this;
            var items = self.options.items || [self.options.item];
            return _.compact(items);
        },
        hasErrors() {
            // console.log('Has Errors?', this.errorMessages)
            return this.errorMessages.length ? true : false;
        },
    },
    methods: {
        validate() {
            this.errorMessages = _.get(this.$refs, 'form.errorMessages');
        },
        clear() {
            this.reset()
        },
        reset() {
            var self = this;
            //Reset the model
            // Vue.set(self.model, 'data', {});
            self.$set(self, 'dataModel', {});

            self.state = 'ready';
            self.$emit('reset');
        },
        submit() {

            var self = this;
            self.validate();

            if (self.errorMessages && self.errorMessages.length) {
                return;
            }

            self.state = 'processing';

            ///////////////////////////////////////////////////////////

            if (self.items.length == 1) {
                console.log('submit to one item', self.items)
                return submitItem(self.items[0], submissionComplete);
            } else {
                console.log('Submit to multiple', self.items)
                return async.mapLimit(self.items, 3, submitItem, multipleComplete)
            }

            ///////////////////////////////////////////////////////////

            function submitItem(item, next) {

                var submission = JSON.parse(JSON.stringify(self.dataModel));
                submission.parent = self.$fluro.utils.getStringID(item);

                console.log('SUBMIT POST AGAINST', submission.parent);

                //Create the post
                return self.$fluro.content.submitPost(submission.parent, self.definition.definitionName, submission)
                    .then(function(result) {
                        return next(null, result);
                    })
                    .catch(next);
            }

            ///////////////////////////////////////////////////////////

            function multipleComplete(err, results) {
                if (err) {
                    //Dispatch an error
                    self.$fluro.error(err);
                    self.state = 'error';
                    self.$emit('error', err);
                    self.serverErrors = self.$fluro.utils.errorMessage(err);
                    return;

                }

                self.$fluro.notify(`${self.definition.title} for ${results.length} items were saved successfully`, {
                    type: 'success',
                });


                // self.$fluro.resetCache();
                self.close(results);


            }

            ///////////////////////////////////////////////////////////

            function submissionComplete(err, res) {

                if (err) {
                    //Dispatch an error
                    self.$fluro.error(err);
                    self.state = 'error';
                    self.$emit('error', err);
                    self.serverErrors = self.$fluro.utils.errorMessage(err);
                    return;

                }



                self.$fluro.notify(`${self.definition.title} for ${self.items[0].title} was saved successfully`, {
                    type: 'success',
                });

                // self.$fluro.resetCache();
                self.close(res);
            }




        }

    }
}
</script>
<style lang="scss">
.add-post-modal {
    display: flex;
    flex: 1;
    max-height: 80vh;
    min-width: 300px;
    max-width: 750px;
    width: 100%;
}
</style>