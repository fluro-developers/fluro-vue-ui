<template>
    <flex-column class="content-view">
        <!-- {{loadingModel}} -- {{loadingConfig}} -->
        <fluro-page-preloader v-if="loading" contain />
        <template v-else-if="model">
            <flex-column-header class="border-bottom">
                <page-header :type="type">
                    <template v-slot:left>
                        <div>
                            <h3>{{title}} <span class="small text-muted">{{definitionTitle}}</span></h3>
                            <v-label v-if="summary">{{summary}}</v-label>
                        </div>
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
        summary() {
            var self = this;
            switch (self.type) {
                case 'event':
                    return self.$fluro.date.readableEventDate(self.model);
                    break;
                case 'plan':

                    var hasEvent = _.get(self.model, 'event.title');
                    var planStartDate = _.get(self.model, 'startDate');

                    ///////////////////////////////////////

                    var readableStartDate;

                    if (hasEvent) {
                        readableStartDate = self.$fluro.date.readableEventDate(self.model.event);
                        return readableStartDate ? `${readableStartDate} - ${self.model.event.title}` : undefined;
                    } else if (planStartDate) {
                        readableStartDate = self.$fluro.date.formatDate(planStartDate, 'h:mm ddd D MMM')
                        return readableStartDate ? readableStartDate : undefined;
                    }


                    break;
            }
        },
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

            var load;
            switch(self.typeName) {
                case 'academic':
                    //load = () => import(`src/components/content/view/panels/academic.vue`)
                break;
                case 'application':
                    //load = () => import(`src/components/content/view/panels/application.vue`)
                break;
                case 'article':
                    load = () => import(`src/components/content/view/panels/article.vue`)
                break;
                case 'asset':
                    load = () => import(`src/components/content/view/panels/asset.vue`)
                break;
                case 'attendance':
                    // load = () => import(`src/components/content/view/panels/attendance.vue`)
                break;
                case 'audio':
                    // load = () => import(`src/components/content/view/panels/audio.vue`)
                break;
                case 'capability':
                    // load = () => import(`src/components/content/view/panels/capability.vue`)
                break;
                case 'checkin':
                    // load = () => import(`src/components/content/view/panels/checkin.vue`)
                break;
                case 'code':
                    // load = () => import(`src/components/content/view/panels/code.vue`)
                break;
                case 'collection':
                    load = () => import(`src/components/content/view/panels/collection.vue`)
                break;
                case 'component':
                    // load = () => import(`src/components/content/view/panels/component.vue`)
                break;
                case 'contact':
                    load = () => import(`src/components/content/view/panels/contact.vue`)
                break;
                case 'contactdetail':
                    // load = () => import(`src/components/content/view/panels/contactdetail.vue`)
                break;
                case 'definition':
                    // load = () => import(`src/components/content/view/panels/definition.vue`)
                break;
                case 'event':
                    load = () => import(`src/components/content/view/panels/event.vue`)
                break;
                case 'eventtrack':
                    // load = () => import(`src/components/content/view/panels/eventtrack.vue`)
                break;
                case 'family':
                    // load = () => import(`src/components/content/view/panels/family.vue`)
                break;
                case 'image':
                    // load = () => import(`src/components/content/view/panels/image.vue`)
                break;
                case 'integration':
                    // load = () => import(`src/components/content/view/panels/integration.vue`)
                break;
                case 'location':
                    // load = () => import(`src/components/content/view/panels/location.vue`)
                break;
                case 'mailout':
                    load = () => import(`src/components/content/view/panels/mailout.vue`)
                break;
                case 'persona':
                    // load = () => import(`src/components/content/view/panels/persona.vue`)
                break;
                case 'plan':
                    // load = () => import(`src/components/content/view/panels/plan.vue`)
                break;
                case 'policy':
                    // load = () => import(`src/components/content/view/panels/policy.vue`)
                break;
                case 'post':
                    load = () => import(`src/components/content/view/panels/post.vue`)
                break;
                case 'process':
                    // load = () => import(`src/components/content/view/panels/process.vue`)
                break;
                case 'query':
                    // load = () => import(`src/components/content/view/panels/query.vue`)
                break;
                case 'realm':
                    // load = () => import(`src/components/content/view/panels/realm.vue`)
                break;
                case 'role':
                    // load = () => import(`src/components/content/view/panels/role.vue`)
                break;
                case 'roster':
                    // load = () => import(`src/components/content/view/panels/roster.vue`)
                break;
                case 'tag':
                    load = () => import(`src/components/content/view/panels/tag.vue`)
                break;
                case 'team':
                    // load = () => import(`src/components/content/view/panels/team.vue`)
                break;
                case 'ticket':
                    // load = () => import(`src/components/content/view/panels/ticket.vue`)
                break;
                case 'timetrigger':
                    // load = () => import(`src/components/content/view/panels/timetrigger.vue`)
                break;
                case 'video':
                    load = () => import(`src/components/content/view/panels/video.vue`)
                break;

            }

            return load;
            // var load = () => import(`src/components/content/view/panels/${this.typeName}.vue`)
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
                    self.$fluro.content.get(self.itemID, {
                        appendContactDetail:'all',
                        appendAssignments:'all',
                    })
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