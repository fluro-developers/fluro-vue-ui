<template>
    <flex-column class="content-view">
        <fluro-page-preloader v-if="loading" contain />
        <template v-else-if="model">
            <flex-column-header class="border-bottom">
                <page-header :type="type" v-if="!hideTitle">
                    <template v-slot:left>
                        <div>
                            <h3>
                                {{title}}
                                <span class="small text-muted">{{definitionTitle}}</span>
                            </h3>
                            <v-label v-if="summary">{{summary}}</v-label>
                        </div>
                    </template>
                    <template v-slot:right>
                        <template v-if="embedded">
                            <v-btn v-tippy content="More actions" v-if="model._id" icon class="mr-0" small @click="$actions.open([model])">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn>
                            <v-btn v-tippy content="Edit" v-if="canEdit" icon small @click="edit">
                                <fluro-icon icon="pencil" />
                            </v-btn>
                            <v-btn v-tippy content="Download" v-if="canDownload" icon small :href="$fluro.asset.downloadUrl(model)" target="_blank">
                                <fluro-icon icon="cloud-download" />
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn icon v-if="refreshable" class="mr-0"  @click="refresh()">
                                <fluro-icon icon="sync" />
                            </v-btn>
                            <v-btn v-if="model._id" icon class="mr-0" @click="$actions.open([model])">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn>
                            <v-btn @click="cancel">Close</v-btn>
                            <v-btn v-if="canEdit" @click="edit">
                                Edit
                                <fluro-icon right icon="pencil" />
                            </v-btn>
                            <v-btn v-tippy content="Download" v-if="canDownload" icon small :href="$fluro.asset.downloadUrl(model)" target="_blank">
                                <fluro-icon icon="cloud-download" />
                            </v-btn>
                        </template>
                    </template>
                    <template v-slot:rightmobile>
                        <v-btn icon v-if="refreshable" class="mr-0"  small @click="refresh()">
                            <fluro-icon icon="sync" />
                        </v-btn>
                        <v-btn v-tippy content="More actions" v-if="model._id" icon class="mr-0" small @click="$actions.open([model])">
                            <fluro-icon icon="ellipsis-h" />
                        </v-btn>
                        <v-btn v-tippy content="Edit" v-if="canEdit" icon small @click="edit">
                            <fluro-icon icon="pencil" />
                        </v-btn>
                        <v-btn v-tippy content="Download" v-if="canDownload" icon small :href="$fluro.asset.downloadUrl(model)" target="_blank">
                            <fluro-icon icon="cloud-download" />
                        </v-btn>
                    </template>
                </page-header>
            </flex-column-header>
            <component :item="model" v-bind:is="component" :cacheKey="cacheKey" :config="config" v-if="component" />
        </template>
    </flex-column>
</template>
<script>
import Vue from "vue";
// import DynamicImportService from "../../../DynamicImportService.js";
import _ from "lodash";

export default {
    props: {
        hideTitle: {
            type: Boolean,
            default: false,
        },
        embedded: {
            type: Boolean
        },
        id: {
            type: [String, Object],
            required: true
        },
        type: {
            type: String,
            required: true
        },
        definition: {
            type: String
        },
        options: {
            default: function() {
                return {};
            },
            type: Object
        }
    },
    data() {
        return {
            loadingConfig: true,
            loadingModel: true,
            cacheKey: 0,
        };
    },
    methods: {
        refresh() {
            this.cacheKey++;
        },
        cancel() {
            this.$emit("cancel");
        },
        edit() {
            this.$fluro.global.edit(this.model);
        }
    },

    created() {
        // this.reset(true);
        if (this.model && !this.model.data) {
            this.$set(this.model, "data", {});
        }
    },
    computed: {
        refreshable() {
            return this.type == 'query';
        },
        component() {
            var self = this;
            if (!self.type) {
                return;
            }
            return () => import(`./panels/${this.type}.vue`)
        },
        summary() {
            var self = this;
            switch (self.type) {
                case "event":
                    return self.$fluro.date.readableEventDate(self.model);
                    break;
                case "plan":
                    var hasEvent = _.get(self.model, "event.title");
                    var planStartDate = _.get(self.model, "startDate");

                    ///////////////////////////////////////

                    var readableStartDate;

                    if (hasEvent) {
                        readableStartDate = self.$fluro.date.readableEventDate(
                            self.model.event
                        );
                        return readableStartDate ?
                            `${readableStartDate} - ${self.model.event.title}` :
                            undefined;
                    } else if (planStartDate) {
                        readableStartDate = self.$fluro.date.formatDate(
                            planStartDate,
                            "h:mm ddd D MMM"
                        );
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
            return this.config.definition ?
                this.config.definition.title :
                this.config.type.title;
        },
        // definition() {
        //     return this.config.definition;
        // },
        canDownload() {
            switch (this.type) {
                case 'asset':
                case 'audio':
                case 'video':
                case 'image':
                    return true;
                    break;
            }
        },
        canEdit() {
            switch (this.type) {
                case "mailout":
                    if (this.model.state == "sent") {
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
        }
    },
    asyncComputed: {
        /**
           component: {
               default: null,
               get() {
                   var self = this;
                   if (!self.type) {
                       // console.log('No type name yet!')
                       return Promise.resolve(null);
                   }

                   //////////////////////////////////////////

                   switch (self.type) {
                       case "academic":
                           break;
                       case "application":
                           break;
                       case "article":
                           return DynamicImportService.load(
                               "./panels/article.vue",
                               function() {
                                   return import("./panels/article.vue");
                               }
                           );
                           break;
                       case "team":
                           return DynamicImportService.load(
                               "./panels/team.vue",
                               function() {
                                   return import("./panels/team.vue");
                               }
                           );
                           break;
                       case "asset":
                           return DynamicImportService.load(
                               "./panels/asset.vue",
                               function() {
                                   return import("./panels/asset.vue");
                               }
                           );
                           break;
                       case "attendance":
                           break;
                       case "audio":
                           return DynamicImportService.load(
                               "./panels/audio.vue",
                               function() {
                                   return import("./panels/audio.vue");
                               }
                           );
                           break;
                       case "capability":
                           break;
                       case "checkin":
                           break;
                       case "code":
                           break;
                       case "collection":
                           return DynamicImportService.load(
                               "./panels/collection.vue",
                               function() {
                                   return import(
                                       "./panels/collection.vue"
                                   );
                               }
                           );
                           break;
                       case "component":
                           break;
                       case "contact":
                           return DynamicImportService.load(
                               "./panels/contact.vue",
                               function() {
                                   return import("./panels/contact.vue");
                               }
                           );
                           break;
                       case "contactdetail":
                           return DynamicImportService.load(
                               "./panels/contactdetail.vue",
                               function() {
                                   return import(
                                       "./panels/contactdetail.vue"
                                   );
                               }
                           );
                           break;
                       case "definition":
                           break;
                       case "event":
                           return DynamicImportService.load(
                               "./panels/event.vue",
                               function() {
                                   return import("./panels/event.vue");
                               }
                           );
                           break;
                       case "eventtrack":
                           break;
                       case "family":
                           return DynamicImportService.load(
                               "./panels/family.vue",
                               function() {
                                   return import("./panels/family.vue");
                               }
                           );
                           break;
                       case "image":
                           return DynamicImportService.load(
                               "./panels/image.vue",
                               function() {
                                   return import("./panels/image.vue");
                               }
                           );
                           break;
                       case "integration":
                           break;
                       case "location":
                           break;
                       case "interaction":
                           return DynamicImportService.load(
                               "./panels/interaction.vue",
                               function() {
                                   return import(
                                       "./panels/interaction.vue"
                                   );
                               }
                           );
                           break;
                       case "mailout":
                           return DynamicImportService.load(
                               "./panels/mailout.vue",
                               function() {
                                   return import("./panels/mailout.vue");
                               }
                           );
                           break;
                       case "persona":
                           break;
                       case "plan":
                           return DynamicImportService.load(
                               "./panels/plan.vue",
                               function() {
                                   return import("./panels/plan.vue");
                               }
                           );
                           break;
                       case "policy":
                           break;
                       case "post":
                           return DynamicImportService.load(
                               "./panels/post.vue",
                               function() {
                                   return import("./panels/post.vue");
                               }
                           );
                           break;
                       case "process":
                           break;
                       case "query":
                           return DynamicImportService.load(
                               "./panels/query.vue",
                               function() {
                                   return import("./panels/query.vue");
                               }
                           );
                           break;
                       case "realm":
                           break;
                       case "role":
                           break;
                       case "roster":
                           break;
                       case "tag":
                           return DynamicImportService.load(
                               "./panels/tag.vue",
                               function() {
                                   return import("./panels/tag.vue");
                               }
                           );
                           break;
                       case "team":
                           break;
                       case "ticket":
                           return DynamicImportService.load(
                               "./panels/ticket.vue",
                               function() {
                                   return import("./panels/ticket.vue");
                               }
                           );
                           break;
                       case "timetrigger":
                           break;
                       case "video":
                           return DynamicImportService.load(
                               "./panels/video.vue",
                               function() {
                                   return import("./panels/video.vue");
                               }
                           );
                           break;
                   }

                   return Promise.resolve(null);
               }
           },
           /**/
        config: {
            default: null,
            get() {
                var self = this;

                //////////////////////////////////////////////

                self.loadingConfig = true;

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.api
                        .get(`/defined/type/${self.typeName}`)
                        .then(function(res) {
                            resolve(res.data);
                            self.loadingConfig = false;
                        }, reject);
                });
            }
        },
        model: {
            default: null,
            get() {
                var self = this;
                self.loadingModel = true;

                return new Promise(function(resolve, reject) {
                    self.$fluro.content.get(self.itemID, {
                            appendContactDetail: "all",
                            appendAssignments: "all",
                            type: self.type,
                            //cacheKey:self.cacheKey,
                        })
                        .then(function(res) {
                            if (!res.data) {
                                res.data = {};
                            }

                            resolve(res);
                            self.loadingModel = false;
                        })
                        .catch(function(err) {
                            console.log("Error", err);

                            resolve(null);
                            self.loadingModel = false;
                        });
                });
            }
        }
    }
};

</script>
<style lang="scss">
</style>
<style scoped lang="scss">
</style>
