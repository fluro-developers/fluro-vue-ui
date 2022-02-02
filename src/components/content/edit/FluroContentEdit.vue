<template>
    <flex-column class="content-edit">
        <fluro-page-preloader v-if="showLoading" contain />
        <template v-else>
            <!-- <pre>{{config}}</pre> -->
            <form class="flex-column" @submit.prevent :disabled="state == 'processing'">
                <flex-column-header v-if="$vuetify.breakpoint.smAndUp">
                    <template v-if="state == 'error'">
                        <v-alert :value="true" type="error" style="margin:0;" @click.prevent.native="state = 'ready'">{{serverErrors}}</v-alert>
                    </template>
                </flex-column-header>
                <flex-column-header class="border-bottom">
                    <page-header :type="typeName">
                        <template v-slot:left>
                            <!-- <pre>{{clickTitleEdit}} -- {{typeName}}</pre> -->
                            <fluro-inline-edit :autofocus="autofocusTitle" :enabled="clickTitleEdit">
                                <template v-slot:default>
                                    <h3>
                                        {{title}}
                                        <span class="small text-muted">{{definitionTitle}}</span>
                                    </h3>
                                    <v-label v-if="summary">{{summary}}</v-label>
                                </template>
                                <template v-slot:edit="{props, blur, focus}">
                                    <input block @focus="focus($event)" placeholder="Enter a title for this content" v-model="model.title" @keyup.enter="blur" @blur="blur" />
                                </template>
                            </fluro-inline-edit>
                        </template>
                        <template v-slot:right>
                            <!-- <template v-if="isQuery"> -->
                            <!-- <v-btn class="mx-0 ml-2" v-if="jsonURL" :href="jsonURL" target="_blank">JSON</v-btn> -->
                            <!-- <v-btn class="mx-0 ml-2" v-if="model._id" @click="exportCSV()">CSV</v-btn> -->
                            <!-- <v-btn class="mx-0 ml-2" v-if="rssURL" :href="rssURL" target="_blank">RSS</v-btn> -->
                            <!--  -->
                            <!-- </template> -->
                            <template v-if="showDeveloperDocs">
                                <v-menu :nudge-width="250" offset-y left>
                                    <template v-slot:activator="{ on }">
                                        <!-- v-if="$help.available" -->
                                        <v-btn v-on="on" icon>
                                            <fluro-icon icon="question" library="fas" />
                                        </v-btn>
                                    </template>
                                    <v-card tile>
                                        <v-list dense>
                                            <v-list-tile href="https://fluro-developers.github.io/fluro-vue/" target="_blank">
                                                <v-list-tile-title> Fluro Vue Documentation</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile href="https://fluro-developers.github.io/fluro/" target="_blank">
                                                <v-list-tile-title>Javascript API Documentation</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile href="https://developers.fluro.io/" target="_blank">
                                                <v-list-tile-title>REST API Documentation</v-list-tile-title>
                                            </v-list-tile>
                                            <v-divider />
                                            <v-list-tile href="https://www.youtube.com/playlist?list=PLpML5U6BFHeFCFY23ed4ElSlXzydStw6l" target="_blank">
                                                <v-list-tile-title>Developer Tutorials</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-menu>
                            </template>
                            <template v-if="showPadlock">
                                <help title="Privacy Selector" body="Allows you to disable security for this content. By default websites apps and users need permission to access content in Fluro, clicking here can turn that off so that this content can be viewed on the web publicly without authentication" />
                                <fluro-quick-privacy v-model="model" />
                                <!-- <template v-if="model._id">
                                                                        <v-btn v-tippy content="Download" icon color="#eee" :href="$fluro.asset.downloadUrl(model)" target="_blank">
                                                                                <fluro-icon icon="cloud-download" />
                                                                        </v-btn>
                                                                </template> -->
                            </template>
                            <help title="Realm Selector" :body="`Everything in Fluro needs to be kept somewhere, choose one or more realms for this ${definitionTitle}. This will affect who has access to view and edit this ${definitionTitle}`" />
                            <!-- <pre>{{typeName}} - {{definitionName}}</pre> -->
                            <fluro-realm-select ref="realmSelector" v-tippy :content="`Select where this ${definitionTitle} should be stored`" v-if="realmSelectorRelevant" v-model="model.realms" :type="typeName" :definition="definitionName" />
                            <fluro-tag-select class="mx-0 ml-2" v-if="tagsAvailable" v-model="model.tags">
                                <help title="Tag Selector" :body="`Add tags to describe and make it easier to find this ${definitionTitle} when searching later`" />
                            </fluro-tag-select>
                            <!-- <pre>{{model.tags}}</pre> -->
                            <v-btn v-if="model._id" class="mx-0 ml-2" @click="$actions.open([model])">
                                <fluro-icon icon="ellipsis-h" />
                                <help title="More Actions" :body="`View more actions that are relevant to this ${definitionTitle}`" />
                            </v-btn>
                            <v-btn class="mx-0 ml-2" @click="cancel" v-if="!embedded">Close</v-btn>
                            <v-btn class="mx-0 ml-2" :loading="state == 'processing'" :disabled="hasErrors" @click="submit()" color="primary">{{saveText}}</v-btn>
                        </template>
                        <template v-slot:rightmobile>
                            <v-btn small icon v-if="model._id" class="ma-0" @click="$actions.open([model])">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn>
                            <v-btn class="mx-0 ml-2" @click="cancel" v-if="!embedded">Close</v-btn>
                            <v-btn class="mx-0 ml-2" :loading="state == 'processing'" :disabled="hasErrors" @click="submit()" color="primary">{{saveText}}</v-btn>
                        </template>
                    </page-header>
                </flex-column-header>
                <component @errorMessages="validate" ref="form" :context="context" @refresh="refresh" @input="updateModel" v-bind:is="component" :type="typeConfig" :config="config" v-model="model" @file="fileChanged" :definition="definition" v-if="component" :save="submit"></component>
                <template v-if="showFooter">
                    <template v-if="$vuetify.breakpoint.xsOnly">
                        <flex-column-footer>
                            <template v-if="state == 'error'">
                                <v-alert :value="true" type="error" style="margin:0;" @click.prevent.native="state = 'ready'">{{serverErrors}}</v-alert>
                            </template>
                        </flex-column-footer>
                        <flex-column-footer class="border-top">
                            <v-container py-0 px-1>
                                <fluro-realm-select ref="realmSelector" block v-model="model.realms" :type="typeName" :definition="definitionName" />
                            </v-container>
                        </flex-column-footer>
                        <flex-column-footer class="border-top">
                            <v-container py-0 px-1>
                                <v-layout>
                                    <v-flex>
                                        <v-btn block @click="cancel">Cancel</v-btn>
                                    </v-flex>
                                    <v-spacer />
                                    <v-flex>
                                        <v-btn class="mr-0" block :loading="state == 'processing'" :disabled="hasErrors" @click="submit()" color="primary">{{saveText}}</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </flex-column-footer>
                    </template>
                    <template v-else>
                        <flex-column-footer class="border-top">
                            <v-container fluid pa-1>
                                <v-layout row align-center>
                                    <template v-if="model._id" class="settings-popup">
                                        <v-flex shrink>
                                            <v-menu :close-on-content-click="false" @click.native.stop offset-y>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-tippy content="Metadata Options" class="my-0" small icon flat v-on="on">
                                                        <help title="Metadata Options" :body="`View system and database data for this  ${definitionTitle}`" />
                                                        <fluro-icon library="fas" icon="info" />
                                                    </v-btn>
                                                </template>
                                                <v-container pa-2 style="background:#fff;" grid-list-xl>
                                                    <fluro-content-form-field :field="extraFields.inheritable" v-model="model"></fluro-content-form-field>
                                                    <fluro-content-form-field :field="extraFields.slug" v-model="model"></fluro-content-form-field>
                                                </v-container>
                                                <v-container pa-2 class="white-background">
                                                    <template v-if="model._id">
                                                        <v-input class="no-flex" label="Fluro ID">
                                                            <v-btn small @click="copyToClipboard(model._id)" block v-tippy content="Click to copy to clipboard">{{model._id}}</v-btn>
                                                        </v-input>
                                                    </template>
                                                    <template v-if="model._external" class="white-background">
                                                        <v-input class="no-flex" label="External ID">
                                                            <v-btn small @click="copyToClipboard(model._external)" block v-tippy content="Click to copy to clipboard">{{model._external}}</v-btn>
                                                        </v-input>
                                                    </template>
                                                    <template>
                                                        <v-btn block small @click="$fluro.global.json(model)">
                                                            View JSON
                                                            <fluro-icon right icon="brackets-curly" />
                                                        </v-btn>
                                                    </template>
                                                    <input type="hidden" ref="clipboard" />
                                                </v-container>
                                            </v-menu>
                                        </v-flex>
                                    </template>
                                    <template v-if="enableAutomationDates">
                                        <v-flex shrink>
                                            <v-menu :close-on-content-click="false" @click.native.stop offset-y>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-tippy content="Publish/Archive Dates" class="my-0" small icon flat v-on="on">
                                                        <fluro-icon icon="clock" />
                                                        <help title="Date Automation" :body="`Set automatic publish and archiving dates`" />
                                                    </v-btn>
                                                </template>
                                                <v-container style="background:#fff;" grid-list-xl>
                                                    <v-layout>
                                                        <v-flex>
                                                            <v-input class="no-flex" label="Publish Date" :persistent-hint="true" :hint="publishDateHint">
                                                                <fluro-content-form-field :field="extraFields.publishDate" v-model="model"></fluro-content-form-field>
                                                            </v-input>
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-input class="no-flex" label="Archive Date" :persistent-hint="true" :hint="archiveDateHint">
                                                                <fluro-content-form-field :field="extraFields.archiveDate" v-model="model"></fluro-content-form-field>
                                                            </v-input>
                                                        </v-flex>
                                                        <v-flex>
                                                            <fluro-content-form-field :field="extraFields.createdDate" v-model="model"></fluro-content-form-field>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </v-menu>
                                        </v-flex>
                                    </template>
                                    <v-spacer />
                                    <v-flex shrink>
                                        <template v-if="model._id">
                                            <em class="muted sm" style="margin-right:10px">Last updated {{model.updated | timeago}}</em>
                                        </template>
                                        <help title="Status Selector" :body="`Update and change the status of this ${definitionTitle}`" />
                                        <fluro-status-select v-if="canChangeStatus" v-model="model.status" :type="model._type" />
                                    </v-flex>
                                    <v-flex shrink v-if="model._id">
                                        <!-- <template v-if="model._id">
                                        <v-btn small icon flat>
                                            <fluro-icon icon="cog" />
                                        </v-btn>
                    </template>-->
                                        <v-menu top :close-on-content-click="false" @click.native.stop offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-tippy content="History and Change log" class="my-0" small icon flat v-on="on">
                                                    <fluro-icon library="fas" icon="history" />
                                                    <help title="Change log" :body="`View the system change log for this ${definitionTitle}. And rollback to previous versions.`" />
                                                </v-btn>
                                            </template>
                                            <div style="min-width:320px;">
                                                <changelog :item="model" />
                                            </div>
                                        </v-menu>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </flex-column-footer>
                    </template>
                </template>
            </form>
        </template>
    </flex-column>
</template>
<script>
import Vue from "vue";
import _ from "lodash";

import FluroTagSelect from "../../form/tagselect/FluroTagSelect.vue";
import FluroQuickPrivacy from "../../form/FluroQuickPrivacy.vue";
import FluroRealmSelect from "../../form/realmselect/FluroRealmSelect.vue";
import FluroStatusSelect from "../../form/FluroStatusSelect.vue";
import FluroInlineEdit from "../../form/FluroInlineEdit.vue";
import FluroContentFormField from "../../form/FluroContentFormField.vue";
import Changelog from "./components/Changelog.vue";
// import EventTrackUpdateModal from "./panels/eventtrack/EventTrackUpdateModal.vue";



// import DynamicImportService from "../../../DynamicImportService.js";

export default {
    props: {
        embedded: {
            type: Boolean
        },
        disableCacheClearOnSave: {
            type: Boolean,
            default () {
                return true;
            }
        },
        context: {
            type: String,
            default: "create"
        },
        type: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            default: function() {
                return {
                    realms: [],
                    tags: []
                };
            }
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
            cacheClearRequired: false,
            file: null,
            model: JSON.parse(JSON.stringify(this.value)),
            serverErrors: "",
            errorMessages: [],
            result: null,
            state: "ready",
            tagSearch: "",
            loading: true,
        };
    },
    created() {
        // this.reset(true);
        var self = this;
        if (self.model && !self.model.data) {
            self.$set(self.model, "data", {});
        }
    },
    mounted() {
        // //console.log('MOUNTED');
        var self = this;
        self.addListeners();
    },
    activated() {
        // //console.log('ACTIVATED')
        var self = this;
        self.addListeners();
    },
    deactivated() {
        // //console.log('DEACTIVATED')
        var self = this;
        self.removeListeners();
    },
    beforeDestroy() {
        // //console.log('DESTROYED')
        var self = this;
        self.removeListeners();
    },
    methods: {


        showRealmsPopup() {
            var realmSelector = this.$refs.realmSelector;

            //console.log("Show Realms?", realmSelector);

            if (!realmSelector) {
                return;
            }
            if (realmSelector.showModal) {
                realmSelector.showModal();
            }
            // this.$refs.realmSelector.$emit('click');
        },
        copyToClipboard(string) {
            var self = this;

            let inputField = this.$refs.clipboard;
            if (!inputField) {
                return;
            }

            inputField.value = string;
            inputField.setAttribute("type", "text"); // 不是 hidden 才能複製
            inputField.select();

            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                // alert('Testing code was copied ' + msg);
                self.$fluro.notify("Copied to clipboard");
            } catch (err) {
                // alert('Oops, unable to copy');
                // self.$fluro.error({message:'Unable to copy to clipboard'});
            }

            /* unselect the range */
            inputField.setAttribute("type", "hidden");
            if (process.browser) {
                window.getSelection().removeAllRanges();
            }
        },
        addListeners() {
            // //console.log('ADD LISTENERS')
            var self = this;
            if (process.browser) {
                document.addEventListener("keydown", self.keypress, false);
            }
        },
        removeListeners() {
            // //console.log('REMOVE LISTENERS')
            var self = this;
            if (process.browser) {
                document.removeEventListener("keydown", self.keypress);
            }
        },
        keypress(e) {
            var self = this;
            if (
                e.keyCode == 83 &&
                (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
            ) {
                e.preventDefault();
                self.submit();
            }
        },
        editSuccess(result) {
            var self = this;
            console.log('Edit success!')

            //Reload the terminology!
            if (result.data._type == "definition") {
                //console.log("Reload glossary");
                self.$fluro.global.reloadTerminology();
            }

            self.state = "ready";

            //self.cacheClearRequired = true;
            // //console.log('CLEAR CACHE ON SAVE?', self.disableCacheClearOnSave)
            // if (!self.disableCacheClearOnSave) {
            //     self.$fluro.resetCache();
            // }

            // self.reset(true);
            self.$emit("success", result.data);

            // //console.log('RESULT WAS', result);
            //Print a success message to the screen
            self.$fluro.notify(`${result.data.title} was updated successfully`);
        },
        editFailed(err) {
            var self = this;

            if (!err) {
                return
            }

            console.log('ERROR MESSAGE HAPPENED', err)
            //Dispatch an error
            var humanMessage = self.$fluro.utils.errorMessage(err);
            self.$fluro.error(err);
            self.serverErrors = humanMessage;
            self.state = "error";
            self.$emit("error", err);
        },
        createSuccess(result) {
            var self = this;
            //console.log("CREATE SUCCESS", result);

            //Reload the terminology!
            if (result.data._type == "definition") {
                //console.log("Reload glossary");
                self.$fluro.global.reloadTerminology();
            }

            self.cacheClearRequired = true;

            if (!self.disableCacheClearOnSave) {
                self.$fluro.resetCache();
            }

            self.reset(true);
            self.$emit("success", result.data);

            // //console.log('RESULT WAS', result);
            //Print a success message to the screen
            self.$fluro.notify(`${result.data.title} was created successfully`);
        },
        createFailed(err) {
            var self = this;

            if (!err) {
                return;
            }

            //console.log("ERROR MESAGE HAPPEND");
            //Dispatch an error
            var humanMessage = self.$fluro.utils.errorMessage(err);
            self.$fluro.error(err);
            self.serverErrors = humanMessage;
            self.state = "error";
            self.$emit("error", err);
        },
        fileChanged(file) {
            //console.log("FILE CHANGE HEARD", file);
            this.file = file;
        },
        updateModel() {
            this.$emit("input", this.model);
        },
        cancel() {
            this.$emit("cancel");
        },
        refresh() {
            //Force a reload
            // this.$emit('cancel');

            this.$emit("success", this.model);
        },
        touch() {
            _.each(this.formFields, function(component) {
                component.touch();
            });
        },
        validate() {
            var form = this.$refs.form;
            if (!form) {
                return [];
            }
            this.errorMessages = form.errorMessages || [];
        },
        validateAllFields() {
            var form = this.$refs.form;
            form.touch();
            this.validate();
        },
        reset(suppressEvent) {
            //console.log("RESET");
            var self = this;

            /////////////////////////////////

            self.model = {
                realms: [],
                tags: []
            };

            /////////////////////////////////

            if (self.$refs.form) {
                self.$refs.form.reset();
            }

            self.result = null;
            self.state = "ready";

            if (!suppressEvent) {
                self.$emit("reset");
            }
        },
        preprocessCreateData(data) {
            var self = this;

            //////////////////////////////////

            switch (self.typeName) {
                case "process":
                    //If it's a card and the card has no title
                    if (!data.title || !data.title.length) {
                        //But the card refers to an item
                        if (data.item && data.item.title && data.item.title.length) {
                            //Use the items title for the card title
                            data.title = data.item.title;
                        }
                    }
                    break;
            }

            //////////////////////////////////

            return data;
        },
        isValidDate(d) {
            return d instanceof Date && !isNaN(d);
        },
        autosave() {
            var self = this;

            if (self.state == "processing") {
                return;
            }

            //console.log("AUTOSAVE");
            self.submitUpdate()
                .then(function(res) {
                    self.state = "ready";
                })
                .catch(function(err) {
                    self.state = "ready";
                });
        },
        submitUpdate() {
            var self = this;
            self.state = "processing";
            var requestData = Object.assign({}, self.model);
            delete requestData.__v;
            var definedType =
                requestData.definition || self.definitionName || self.typeName;

            // //console.log("SUBMIT UPDATE", self.model, requestData);

            // return new Promise(function(resolve, reject) {

            return new Promise(function(resolve, reject) {
                self.$fluro.api.put(`/content/${definedType}/${requestData._id}?replaceData=true`, requestData)
                    .then(function(res) {

                        //Object.assign(self.model, res.data);

                        var result = Object.assign({}, res.data);


                        switch (self.typeName) {
                            // case 'definition':
                            // case 'component':
                            // case 'product':
                            // //This screws with things. It's too dangerous to enable until we can rewrite the field editor to use correct data flow
                            // break;
                            case 'contact':
                                self.model = result;
                                break;
                            case 'integration':

                            case 'audio':
                            case 'video':
                            case 'image':
                            case 'asset':
                            case 'mailout':
                                self.model = result;
                                break;
                            default:
                                //Do nothing
                                break;
                        }

                        resolve(res);

                    }, reject);

            });
            // .then(function(res) {

            //     if (!res.data) {
            //         return reject(res);
            //     }

            //     resolve(res);

            //     //Emit an update
            //     // self.$emit('updateSuccess', res.data);

            //     // switch (res.data._type) {
            //     //     case 'eventtrack':



            //     //         self.$fluro.modal({
            //     //                 component: EventTrackUpdateModal,
            //     //                 options: {
            //     //                     model: res.data,
            //     //                     // fixed:true,
            //     //                     size: 'lg',
            //     //                     // template: options.template,
            //     //                     // top: true,
            //     //                     // definedType: typeName,
            //     //                 },
            //     //             })
            //     //             .then(function() {
            //     //                 resolve(res);
            //     //             }, function(err) {
            //     //                 resolve(res);
            //     //             })
            //     //         break;
            //     //     default:
            //     //         return resolve(res);
            //     //         break;
            //     // }

            // }, reject);
            // })
            // return self.$fluro.api.put(`/content/${definedType}/${requestData._id}?replaceData=true`, requestData)
        },
        submit(capture) {
            var self = this;

            /////////////////////////////////

            var requestData = Object.assign({}, self.model);
            delete requestData.__v;

            /////////////////////////////////

            var context = self.context;
            if (requestData._id) {
                context = "edit";
            }


            /////////////////////////////////

            var promise = new Promise(function(resolve, reject) {

                self.validateAllFields();

                /////////////////////////////////
                /////////////////////////////////

                if (self.hasErrors) {
                    console.log("WE HAVE ERRORS", self.errorMessages);
                    // self.$notify()
                    //Gotta finish the stuff first!
                    return reject();
                }


                if (self.realmSelectorRelevant) {
                    if (!self.model.realms || !self.model.realms.length) {
                        self.showRealmsPopup();
                        return reject();
                    }
                }

                self.state = "processing";

                /////////////////////////////////



                var definedType = requestData.definition || self.definitionName || self.typeName;
                // requestData.realms = self.realms;
                // requestData.tags = self.tags;

                /////////////////////////////////



                if (
                    self.typeName == "attendance" &&
                    (!requestData.title || !requestData.title.length)
                ) {
                    requestData.title = `${requestData.event.title} headcount`;
                }

                //console.log("SENDING TO SERVER", context, self.model);

                switch (context) {
                    case "edit":
                        self.submitUpdate().then(resolve, reject);
                        break;
                    default:
                        //Preprocess our create request
                        requestData = self.preprocessCreateData(requestData);

                        if (self.uploadForSave) {
                            var file = self.file;

                            if (!file) {
                                // //console.log('SELF UPDATE CREATE', requestData);
                                self.$fluro.notify(`Please select a file to upload`);
                                self.state = "ready";
                                return reject();
                            }

                            var REPLACEMENT_UPLOAD_URL = "/file/upload";

                            //If the file is uploaded with an external integration
                            if (requestData.externalIntegration) {
                                var externalIntegrationID = requestData.externalIntegration;
                                if (externalIntegrationID._id) {
                                    externalIntegrationID = externalIntegrationID._id;
                                }

                                REPLACEMENT_UPLOAD_URL = `/file/integration/upload/${externalIntegrationID}`;
                            }

                            /////////////////////////////////////////////

                            if (self.definitionName) {
                                requestData.definition = self.definitionName;
                            }

                            /////////////////////////////////////////////

                            //Change the state to uploading
                            file.state = "uploading";

                            //Create a new form object
                            var formData = new FormData();
                            formData.append("json", JSON.stringify(requestData));
                            formData.append("file", file.file, file.name);

                            var body = formData;
                            var requestConfig = {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                                // onUploadProgress: progressEvent => {

                                //     let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                                //     // do whatever you like with the percentage complete
                                //     // maybe dispatch an action that will update a progress bar or something
                                //     file.progress = percentCompleted;
                                //     file.bytesLoaded = progressEvent.loaded;
                                //     file.bytesTotal = progressEvent.total;

                                //     ///////////////////////////////////////////////////

                                //     //Update the bytes loaded from all the files in the array
                                //     self.bytesLoaded = _.reduce(self.files, function(set, file) {
                                //         if (file.state == 'complete') {
                                //             set += file.size || file.bytesTotal || 0;
                                //         } else {
                                //             set += file.bytesLoaded || 0;
                                //         }
                                //         return set;
                                //     }, 0)

                                //     ///////////////////////////////////////////////////

                                //     self.$forceUpdate();
                                // }
                            };

                            //////////////////////////////////////////////////////////////

                            //Create a new item
                            return self.$fluro.api
                                .post(REPLACEMENT_UPLOAD_URL, body, requestConfig)
                                .then(resolve, reject);
                        }

                        //////////////////////////////////////////////////////////////

                        if (definedType == "family") {
                            //Create a new item
                            self.$fluro.api
                                .post(`/family`, requestData)
                                .then(resolve, reject);

                        } else {
                            //Create a new item
                            self.$fluro.api
                                .post(`/content/${definedType}`, requestData)
                                .then(resolve, reject);
                        }

                        break;
                }

            })

            //////////////////////////////////////////////////////////////

            if (capture) {

                return new Promise(function(resolve, reject) {
                    promise.then(function(res) {

                        //Update with our new details
                        _.assign(self.model, res.data);
                        resolve(res.data);
                        self.state = "ready";
                    }, function(err) {
                        self.state = "ready";
                        reject(err);
                    })

                })

            }



            switch (context) {
                case "edit":
                    promise.then(self.editSuccess, self.editFailed);
                    break;
                default:
                    promise.then(self.createSuccess, self.createFailed);
                    break;
            }

            return promise;


            //////////////////////////////////////////////////////////////


        }
    },
    computed: {


        realmSelectorRelevant() {

            switch (this.typeName) {
                case 'realm':
                case 'account':
                    return;
                    break;
            }

            return true;
        },
        tagsAvailable() {
            if (this.typeName == 'tag') {
                return false;
            }

            return this.$fluro.access.can('view', 'tag');
        },
        isQuery() {


            switch (this.typeName) {
                case "query":
                    return true;
                    break;
            }
        },


        showDeveloperDocs() {
            return this.typeName == 'component';
        },
        showPadlock() {

            if (this.isAssetType) {
                return true;
            }

            if (this.isQuery) {
                return true;
            }

            switch (this.typeName) {
                case "event":
                    return true;
                    break;
            }
        },
        isAssetType() {
            switch (this.typeName) {
                case "asset":
                case "audio":
                case "video":
                case "image":
                    return true;
                    break;
            }
        },
        canChangeStatus() {
            switch (this.typeName) {
                case "persona":
                case "realm":
                case "transaction":
                    break;
                default:
                    return true;
                    break;
            }
        },
        // changeString() {
        //     return JSON.stringify(this.model);
        // },
        showFooter() {
            return !this.hideFooter;
        },
        hideFooter() {
            var self = this;
            return !self.$pro.enabled; //self.typeName == "definition";
        },
        autofocusTitle() {
            var self = this;

            switch (self.typeName) {
                case 'article':
                case 'plan':
                    return (!self.model._id || !self.model.title);
                    break;
            }

        },
        summary() {
            var self = this;
            switch (self.typeName) {
                case "event":
                    return self.$fluro.date.readableEventDate(self.model);
                    break;
                case "roster":
                case "checkin":
                case "ticket":
                    return self.model.event ?
                        `${self.model.event.title} ${self.$fluro.date.readableEventDate(
                self.model.event
              )}` :
                        "";
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
        clickTitleEdit() {
            var self = this;

            switch (self.typeName) {
                case "contact":
                    return false;
                    break;
                default:
                    return true;
                    break;
            }
        },
        uploadForSave() {
            var self = this;
            return !self.model._id && self.model.assetType == "upload";
        },
        saveText() {
            var self = this;

            if (self.uploadForSave) {
                return "Upload";
            } else {
                return "Save";
            }
        },
        enableAutomationDates() {
            switch (this.config.type.definitionName) {
                case "article":
                case "asset":
                case "audio":
                case "video":
                case "image":
                case "code":
                case "collection":
                case "team":
                case "post":
                case "product":
                case "event":
                    return true;
                    break;
            }
        },
        publishDateHint() {
            if (this.model.publishDate && this.isValidDate(this.model.publishDate)) {
                return `Change status to 'active' ${this.$filters.timeago(
          this.model.publishDate
        )}`;
            }
        },
        archiveDateHint() {
            if (this.model.archiveDate && this.isValidDate(this.model.archiveDate)) {
                return `Change status to 'archived' ${this.$filters.timeago(
          this.model.archiveDate
        )}`;
            }
        },
        extraFields() {
            var self = this;
            var fields = {};

            fields.inheritable = {
                title: "Inheritable",
                description: "Allow child accounts to reference and use this content",
                minimum: 0,
                maximum: 1,
                type: "boolean",
                key: "inheritable",
                expressions: {
                    hide() {
                        switch (self.typeName) {
                            case "contact":
                            case "family":
                                return true;
                                break;
                            default:
                                break;
                        }
                    }
                }
                // directive: 'datetimepicker',
            };

            fields.slug = {
                title: "Slug / Readable ID",
                description: "A readable id that can be used for website urls and paths",
                minimum: 0,
                maximum: 1,
                type: "string",
                key: "slug",
                expressions: {
                    hide() {
                        switch (self.typeName) {
                            case "contact":
                            case "family":
                                return true;
                                break;
                            default:
                                break;
                        }
                    }
                }
                // directive: 'datetimepicker',
            };

            fields.archiveDate = {
                // title: `Archive Date`,
                minimum: 0,
                maximum: 1,
                type: "date",
                key: "archiveDate",
                directive: "datetimepicker"
            };

            fields.publishDate = {
                // title: `Publish Date`,
                minimum: 0,
                maximum: 1,
                type: "date",
                key: "publishDate",
                directive: "datetimepicker"
            };

            fields.createdDate = {
                title: `Creation Date`,
                minimum: 0,
                maximum: 1,
                type: "date",
                key: "created",
                directive: "datetimepicker"
            };

            return fields;
        },
        showLoading() {
            return !this.config || this.loading || !this.component;
        },
        title() {
            if (this.model.title) {
                return this.model.title;
            }

            return "New";
        },
        definition() {
            return this.config.definition;
        },
        typeConfig() {
            if (!this.config) {
                return;
            }

            return this.config.type;
        },
        definitionTitle() {

            var definition = this.definition;

            if (definition) {
                return this.definition.title;
            }

            if (this.typeConfig.definitionName == 'definition') {
                if (this.model.parentType) {
                    return `${this.$fluro.types.readable(this.model.parentType)} Definition`;
                }
            }

            return this.typeConfig.title;
        },
        typeName() {
            if (!this.typeConfig) {
                return;
            }

            return this.typeConfig.definitionName;
        },
        definitionName() {
            return this.definition ? this.definition.definitionName : ""; //this.typeConfig.definitionName;
        },
        hasErrors() {
            return (this.errorMessages || []).length ? true : false;
        },
        component() {
            var self = this;
            if (!self.typeName) {
                return;
            }

            switch (self.definitionName) {
                case 'checkinStation':

                    if (self.uiMode == 'subsplash') {
                        return () => import(`./panels/${self.definitionName}.vue`);
                    }
                    break;
            }

            return () => import(`./panels/${self.typeName}.vue`)

        }
    },
    components: {
        // Contact,
        FluroQuickPrivacy,
        FluroTagSelect,
        FluroRealmSelect,
        FluroStatusSelect,
        FluroInlineEdit,
        FluroContentFormField,
        Changelog
    },
    asyncComputed: {
        /**
        component: {
            default: null,
            get() {
                var self = this;

                if (!self.typeName) {
                    return Promise.resolve();
                }

                switch (self.typeName) {
                    case "academic":
                        return DynamicImportService.load(
                            "./panels/academic.vue",
                            function() {
                                return import(
                                    "./panels/academic.vue"
                                );
                            }
                        );

                        break;
                    case "application":
                        return DynamicImportService.load(
                            "./panels/application.vue",
                            function() {
                                return import(
                                    "./panels/application.vue"
                                );
                            }
                        );
                        break;
                    case "article":
                        return DynamicImportService.load(
                            "./panels/article.vue",
                            function() {
                                return import("./panels/article.vue");
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
                        return DynamicImportService.load(
                            "./panels/attendance.vue",
                            function() {
                                return import(
                                    "./panels/attendance.vue"
                                );
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/capability.vue",
                            function() {
                                return import(
                                    "./panels/capability.vue"
                                );
                            }
                        );
                        break;
                    case "checkin":
                        return DynamicImportService.load(
                            "./panels/checkin.vue",
                            function() {
                                return import("./panels/checkin.vue");
                            }
                        );
                        break;
                    case "code":
                        return DynamicImportService.load(
                            "./panels/code.vue",
                            function() {
                                return import("./panels/code.vue");
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/component.vue",
                            function() {
                                return import(
                                    "./panels/component.vue"
                                );
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/definition.vue",
                            function() {
                                return import(
                                    "./panels/definition.vue"
                                );
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/eventtrack.vue",
                            function() {
                                return import(
                                    "./panels/eventtrack.vue"
                                );
                            }
                        );
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
                    case "resultset":
                        return DynamicImportService.load(
                            "./panels/resultset.vue",
                            function() {
                                return import("./panels/resultset.vue");
                            }
                        );
                        break;
                    case "integration":
                        return DynamicImportService.load(
                            "./panels/integration.vue",
                            function() {
                                return import(
                                    "./panels/integration.vue"
                                );
                            }
                        );
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
                    case "location":
                        return DynamicImportService.load(
                            "./panels/location.vue",
                            function() {
                                return import(
                                    "./panels/location.vue"
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
                        return DynamicImportService.load(
                            "./panels/persona.vue",
                            function() {
                                return import("./panels/persona.vue");
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/policy.vue",
                            function() {
                                return import("./panels/policy.vue");
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/process.vue",
                            function() {
                                return import("./panels/process.vue");
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/realm.vue",
                            function() {
                                return import("./panels/realm.vue");
                            }
                        );
                        break;
                    case "role":
                        return DynamicImportService.load(
                            "./panels/role.vue",
                            function() {
                                return import("./panels/role.vue");
                            }
                        );
                        break;
                    case "roster":
                        return DynamicImportService.load(
                            "./panels/roster.vue",
                            function() {
                                return import("./panels/roster.vue");
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/team.vue",
                            function() {
                                return import("./panels/team.vue");
                            }
                        );
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
                        return DynamicImportService.load(
                            "./panels/timetrigger.vue",
                            function() {
                                return import(
                                    "./panels/timetrigger.vue"
                                );
                            }
                        );
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

                return Promise.resolve();
            }
        },
        /**/
        config: {
            default: null,
            get() {
                var self = this;
                //console.log('TYPE IS', self.type);

                //////////////////////////////////////////////

                if (!self.type || !self.type.length) {
                    //console.log("NO CONFIG LOADED");
                    // self.loading = false;
                    return Promise.reject({});
                }

                self.loading = true;

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    var promise = self.$fluro.api.get(`/defined/type/${self.type}`);

                    promise.then(function(res) {
                        // //console.log('RESO', res);
                        resolve(res.data);
                        // //console.log('CONFIG LOADED', res.data);
                        self.loading = false;
                    });

                    promise.catch(function(err) {
                        if (err) {
                            self.$fluro.error(err);
                        }

                        // // //console.log('ERROR', err.response);
                        // if (err.response.status === 404) {
                        //     //console.log('RESOLVE THE 404')
                        //     return resolve(null);
                        // }

                        return reject(err);
                    });
                });
                // .then(function(res) {
                //     //console.log('RESI', res);
                // })
                // .catch(function(err) {
                //     //console.log('ERRESI', err);
                // })
            }
        }
    },
    watch: {
        // 'changeString': _.debounce(function(newModel, oldModel) {

        //     if (!oldModel) {
        //         //console.log('no old model')
        //         return;
        //     }

        //     //console.log('MODEL SAVED', oldModel)
        //     this.autosave();

        // }, 1000),

        value() {
            this.model = this.value; //JSON.parse(JSON.stringify(this.value));
        }
        // 'model': {
        //     handler: function(val, oldVal) {

        //         // //console.log('MODEL CHANGED', val);
        //         this.$emit('input', val);
        //     },
        //     deep: true,
        // }
    }
};

</script>
<style lang="scss">
.modal-inner {
    .content-edit {
        width: 100%;
        // max-width: 1200px;
        min-width: 80vw;
        min-height: 80vh;
    }
}


.file-drop-area {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;

    &.active {
        &:before {
            pointer-events: none !important;
            content: '';
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            background: rgba($primary, 0.1);
            border: 2px dashed $primary;
            z-index: 1;
        }


    }
}

</style>
<style scoped lang="scss">
.settings-popup {
    z-index: 100;
}

.white-background {
    background: white;
}

.content-edit {
    // @media(max-width: 768px) {
    //     min-width: 0;
    // }

    background: #fafafa;

    &>>>.tabset-menu {
        background: #fff;

        a.active {
            background: #fafafa;
        }
    }

    &>>>.v-text-field--outline {
        .v-input__control .v-input__slot {
            border-width: 1px !important;
            border-color: rgba(#000, 0.3);
            background: #fff !important;
            box-shadow: inset 0 1px 3px rgba(#000, 0.1) !important;
        }

        &.v-input--is-focused,
        &.success--text,
        &.error--text {
            .v-input__control .v-input__slot {
                border-color: currentColor;
            }
        }
    }

    &>>>.v-label {
        font-weight: 500;
    }
}

</style>
