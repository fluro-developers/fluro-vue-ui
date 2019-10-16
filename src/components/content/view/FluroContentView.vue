<template>
    <flex-column class="content-view">
        <!-- {{loadingModel}} -- {{loadingConfig}} -->
        <fluro-page-preloader v-if="loading" contain />
        <template v-else>
            <!-- BOOM TEST {{model}}  -->
            <!-- <pre>TESTING NOW? {{model}}</pre> -->
            <component :item="model" v-bind:is="component" :config="config" v-if="component" />
        </template>
    </flex-column>
</template>
<script>
import Vue from 'vue';

export default {
    props: {
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

    },
    computed: {
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
                var typeName = self.definition || self.type;

                //////////////////////////////////////////////

                self.loadingConfig = true;

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.api.get(`/defined/type/${typeName}`).then(function(res) {
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
                            resolve(res);
                            self.loadingModel = false;
                        })
                        .catch(function(err) {
                            reject(err);
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