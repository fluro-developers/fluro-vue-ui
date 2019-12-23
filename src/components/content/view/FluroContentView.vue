<template>
    <flex-column class="content-view">
        <!-- {{loadingModel}} -- {{loadingConfig}} -->
        <fluro-page-preloader v-if="loading" contain />
        <template v-else-if="model">
            <flex-column-header class="border-bottom">
                <page-header :type="type">
                    <template v-slot:left>
                        <h3>{{title}} <span class="small text-muted">{{definitionTitle}}</span></h3>
                    </template>
                    <template v-slot:right>
                        <v-btn v-if="model._id" icon class="mr-0" small @click="$actions.open([model])">
                            <fluro-icon icon="ellipsis-h" />
                        </v-btn>
                        <template v-if="embedded">
                            <v-btn icon v-if="canEdit" @click="edit">
                            <fluro-icon icon="pencil" />
                        </v-btn>
                        </template>
                        <template v-else>
                            <v-btn @click="cancel">
                                Close
                            </v-btn>
                            <v-btn class="mx-0" v-if="canEdit" @click="edit" color="primary">
                                Edit
                            </v-btn>
                        </template>
                        
                    </template>
                </page-header>
            </flex-column-header>
            <!-- BOOM TEST {{model}}  -->
            <!-- <pre>TESTING NOW? {{id}} {{model}}</pre> -->
            <!-- <flex-column-body> -->
            <component :item="model" v-bind:is="component" :config="config" v-if="component" />
            <!-- </flex-column-body> -->
        </template>
    </flex-column>
</template>
<script>
import Vue from 'vue';

export default {
    props: {
        embedded: {
            type: Boolean,
        },
        'id': {
            type: [String, Object],
            required: true,
        },
        'type': {
            type: String,
            required: true,
        },
        'definition': {
            type: String,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
    },
    data() {
        return {
            loadingConfig: true,
            loadingModel: true,
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        edit() {
            this.$fluro.global.edit(this.model);
        },
    },

    created() {
        // this.reset(true);
        if (this.model && !this.model.data) {
            this.$set(this.model, 'data', {});
        }
    },
    computed: {
        typeName() {
            var self = this;
            return self.definition || self.type;
        },
        title() {
            return this.model.title;
        },
        definitionTitle() {
            return this.config.definition ? this.config.definition.title : this.config.type.title;
        },
        // definition() {
        //     return this.config.definition;
        // },
        canEdit() {

            switch (this.type) {
                case 'mailout':
                    if (this.model.state == 'sent') {
                        return;
                    }
                    break;
            }

            ///////////////////////////////////////

            return this.$fluro.access.canEditItem(this.model);
        },
        itemID() {
            return this.$fluro.utils.getStringID(this.id);
        },
        loading() {
            return this.loadingModel || this.loadingConfig;
        },
        component() {

            var self = this;
            if (!self.type) {
                return;
            }

            return () => import(`./panels/${this.type}.vue`)
        }
    },
    asyncComputed: {
        config: {
            default: null,
            get() {

                var self = this;


                //////////////////////////////////////////////

                self.loadingConfig = true;

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.api.get(`/defined/type/${self.typeName}`).then(function(res) {
                        resolve(res.data);
                        self.loadingConfig = false;
                    }, reject);
                })
            },
        },
        model: {
            default: null,
            get() {
                var self = this;
                self.loadingModel = true;
                return new Promise(function(resolve, reject) {
                    self.$fluro.content.get(self.itemID)
                        .then(function(res) {

                            if (!res.data) {
                                res.data = {};
                            }

                            resolve(res);
                            self.loadingModel = false;
                        })
                        .catch(function(err) {
                            // reject(err);

                            console.log('Error', err);

                            resolve(null);
                            self.loadingModel = false;
                        });
                });
            },
        }
    },
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
</style>