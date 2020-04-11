<template>
    <flex-column class="content-edit">
        <fluro-page-preloader v-if="showLoading" contain />
        <template v-else>
            <!-- <pre>{{config}}</pre> -->
            <form class="flex-column" @submit.prevent="" :disabled="state == 'processing'">
                <flex-column-header v-if="$vuetify.breakpoint.smAndUp">
                    <template v-if="state == 'error'">
                        <v-alert :value="true" type="error" style="margin:0;" @click.prevent.native="state = 'ready'">
                            {{serverErrors}}
                        </v-alert>
                    </template>
                </flex-column-header>
                <flex-column-header class="border-bottom">
                    <page-header :type="typeName">
                        <template v-slot:left>
                            <!-- <pre>{{clickTitleEdit}} -- {{typeName}}</pre> -->
                            <fluro-inline-edit :enabled="clickTitleEdit">
                                <template v-slot:default>
                                    <h3>{{title}} <span class="small text-muted">{{definitionTitle}}</span></h3>
                                    <v-label v-if="summary">{{summary}}</v-label>
                                </template>
                                <template v-slot:edit="{props, blur, focus}">
                                    <input block @focus="focus($event)" v-model="model.title" @keyup.enter="blur" @blur="blur" />
                                </template>
                            </fluro-inline-edit>
                        </template>
                        <template v-slot:right>
                            <fluro-realm-select  v-tippy :content="`Select where this ${definitionTitle} should be stored`" v-if="typeName != 'realm'" v-model="model.realms" :type="typeName" :definition="definitionName" />
                            <fluro-tag-select class="mx-0 ml-2" v-if="typeName != 'tag'" v-model="model.tags" />
                            <!-- <pre>{{model.tags}}</pre> -->
                            <v-btn v-if="model._id" class="mx-0 ml-2" @click="$actions.open([model])">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn>
                            <v-btn class="mx-0 ml-2" @click="cancel" v-if="!embedded">
                                Close
                            </v-btn>
                            <v-btn class="mx-0 ml-2" :loading="state == 'processing'" :disabled="hasErrors" @click="submit" color="primary">
                                {{saveText}}
                            </v-btn>
                        </template>
                    </page-header>
                </flex-column-header>
                <component @errorMessages="validate" ref="form" :context="context" @input="updateModel" v-bind:is="component" :type="typeConfig" :config="config" v-model="model" @file="fileChanged" :definition="definition" v-if="component"></component>
                <template v-if="showFooter">
                    <template v-if="$vuetify.breakpoint.xsOnly">
                        <flex-column-footer>
                            <template v-if="state == 'error'">
                                <v-alert :value="true" type="error" style="margin:0;" @click.prevent.native="state = 'ready'">
                                    {{serverErrors}}
                                </v-alert>
                            </template>
                        </flex-column-footer>
                        <flex-column-footer class="border-top">
                            <v-container py-0 px-1>
                                <fluro-realm-select block v-model="model.realms" :type="typeName" :definition="definitionName" />
                            </v-container>
                        </flex-column-footer>
                        <flex-column-footer class="border-top">
                            <v-container py-0 px-1>
                                <v-layout>
                                    <v-flex>
                                        <v-btn block @click="cancel">
                                            Cancel
                                        </v-btn>
                                    </v-flex>
                                    <v-spacer />
                                    <v-flex>
                                        <v-btn class="mr-0" block :loading="state == 'processing'" :disabled="hasErrors" @click="submit" color="primary">
                                            {{saveText}}
                                        </v-btn>
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
                                                    <input type="hidden" ref="clipboard">
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
                                        <template v-if="model._id"><em class="muted sm">Last updated {{model.updated | timeago}}</em></template>
                                        <fluro-status-select v-model="model.status" :type="model._type" />


                                    </v-flex>
                                    <v-flex shrink v-if="model._id">
                                            <!-- <template v-if="model._id">
                                        <v-btn small icon flat>
                                            <fluro-icon icon="cog" />
                                        </v-btn>
                                    </template> -->
                                            <v-menu lazy :close-on-content-click="false" @click.native.stop offset-y>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn v-tippy content="History and Change log" class="my-0" small icon flat v-on="on">
                                                        <fluro-icon library="fas" icon="history" />
                                                    </v-btn>
                                                </template>
                                                <div style="min-width:320px;">
                                                <changelog :item="model"/>
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
import Vue from 'vue';


import FluroTagSelect from '../../form/tagselect/FluroTagSelect.vue';
import FluroRealmSelect from '../../form/realmselect/FluroRealmSelect.vue';
import FluroStatusSelect from '../../form/FluroStatusSelect.vue';
import FluroInlineEdit from '../../form/FluroInlineEdit.vue';
import FluroContentFormField from '../../form/FluroContentFormField.vue';
import Changelog from './components/Changelog.vue';
// console.log('PRIBACY', FluroPrivacySelect)
// import Contact from './panels/Contact.vue';
// import Event from './panels/Event.vue';

export default {
    props: {
        embedded: {
            type: Boolean,
        },
        disableCacheClearOnSave: {
            type: Boolean,
            default() {
                return true;
            }
        },
        context: {
            type: String,
            default: 'create',
        },
        'type': {
            type: String,
            required: true,
        },
        'value': {
            type: Object,
            default: function() {
                return {
                    realms: [],
                    tags: [],
                };

            }
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
            cacheClearRequired:false,
            file: null,
            model: JSON.parse(JSON.stringify(this.value)),
            serverErrors: '',
            errorMessages: [],
            result: null,
            state: 'ready',
            tagSearch: '',
            loading: true,
        }
    },
    created() {
        // this.reset(true);
        var self = this;
        if (self.model && !self.model.data) {
            self.$set(self.model, 'data', {});
        }



    },
    mounted() {
        // console.log('MOUNTED');
        var self = this;
        self.addListeners();
    },
    activated() {
        // console.log('ACTIVATED')
        var self = this;
        self.addListeners();
    },
    deactivated() {
        // console.log('DEACTIVATED')
        var self = this;
        self.removeListeners();
    },
    beforeDestroy() {
        // console.log('DESTROYED')
        var self = this;
        self.removeListeners();
    },
    methods: {
        copyToClipboard(string) {

            var self = this;

            let inputField = this.$refs.clipboard;
            inputField.value = string;
            inputField.setAttribute('type', 'text') // 不是 hidden 才能複製
            inputField.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                // alert('Testing code was copied ' + msg);
                self.$fluro.notify('Copied to clipboard');
            } catch (err) {
                // alert('Oops, unable to copy');
                // self.$fluro.error({message:'Unable to copy to clipboard'});
            }

            /* unselect the range */
            inputField.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        addListeners() {
            // console.log('ADD LISTENERS')
            var self = this;
            if (document) {
                document.addEventListener("keydown", self.keypress, false);
            }
        },
        removeListeners() {
            // console.log('REMOVE LISTENERS')
            var self = this;
            if (document) {
                document.removeEventListener("keydown", self.keypress);
            }
        },
        keypress(e) {
            var self = this;
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                self.submit();
            }
        },
        editSuccess(result) {
            var self = this;

            //Reload the terminology!
            if (result.data._type == 'definition') {
                console.log('Reload glossary')
                self.$fluro.global.reloadTerminology();
            }



            self.state = 'ready'

            self.cacheClearRequired = true;
            if (!self.disableCacheClearOnSave) {
                self.$fluro.resetCache();
            }

            // self.reset(true);
            self.$emit('success', result.data);

            // console.log('RESULT WAS', result);
            //Print a success message to the screen
            self.$fluro.notify(`${result.data.title} was updated successfully`);
        },
        editFailed(err) {
            var self = this;

            // console.log('ERROR MESSAGE HAPPENED')
            //Dispatch an error
            var humanMessage = self.$fluro.utils.errorMessage(err);
            self.$fluro.error(err);
            self.serverErrors = humanMessage;
            self.state = 'error';
            self.$emit('error', err);
        },
        createSuccess(result) {




            var self = this;
            console.log('CREATE SUCCESS', result)
            

            //Reload the terminology!
            if (result.data._type == 'definition') {
                console.log('Reload glossary')
                self.$fluro.global.reloadTerminology();
            }

            
            self.cacheClearRequired = true;
            console.log('CREATE CLEAR?', self.cacheClearRequired, self.disableCacheClearOnSave)
            if (!self.disableCacheClearOnSave) {
                self.$fluro.resetCache();
            }

            self.reset(true);
            self.$emit('success', result.data);

            // console.log('RESULT WAS', result);
            //Print a success message to the screen
            self.$fluro.notify(`${result.data.title} was created successfully`);


        },
        createFailed(err) {
            var self = this;
            console.log('ERROR MESAGE HAPPEND')
            //Dispatch an error
            var humanMessage = self.$fluro.utils.errorMessage(err);
            self.$fluro.error(err);
            self.serverErrors = humanMessage;
            self.state = 'error';
            self.$emit('error', err);
        },
        fileChanged(file) {
            console.log('FILE CHANGE HEARD', file);
            this.file = file;
        },
        updateModel() {
            this.$emit('input', this.model);
        },
        cancel() {
            this.$emit('cancel');
        },
        touch() {
            _.each(this.formFields, function(component) {
                component.touch();
            })
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
            console.log('RESET')
            var self = this;

            /////////////////////////////////

            self.model = {
                realms: [],
                tags: [],
            }

            /////////////////////////////////

            if (self.$refs.form) {
                self.$refs.form.reset();
            }

            self.result = null;
            self.state = 'ready';

            if (!suppressEvent) {
                self.$emit('reset');
            }
        },
        preprocessCreateData(data) {

            var self = this;

            //////////////////////////////////

            switch (self.typeName) {
                case 'process':

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


            if (self.state == 'processing') {
                return;
            }

            console.log('AUTOSAVE')
            self.submitUpdate()
                .then(function(res) {
                    self.state = 'ready';
                })
                .catch(function(err) {
                    self.state = 'ready';
                })
        },
        submitUpdate() {
            var self = this;
            self.state = 'processing';
            var requestData = Object.assign({}, self.model);
            delete requestData.__v;
            var definedType = requestData.definition || self.definitionName || self.typeName;

            return self.$fluro.api.put(`/content/${definedType}/${requestData._id}`, requestData);
        },
        submit() {
            var self = this;
            self.validateAllFields();

            if (self.hasErrors) {
                console.log('WE HAVE ERRORS', self.errorMessages);
                //Gotta finish the stuff first!
                return;
            }

            self.state = 'processing';

            /////////////////////////////////

            var requestData = Object.assign({}, self.model);
            delete requestData.__v;


            var definedType = requestData.definition || self.definitionName || self.typeName;
            // requestData.realms = self.realms;
            // requestData.tags = self.tags;

            /////////////////////////////////

            var context = self.context;
            if (requestData._id) {
                context = 'edit';
            }


            if ((self.typeName == 'attendance') && (!requestData.title || !requestData.title.length)) {
                requestData.title = `${requestData.event.title} headcount`;
            }

            console.log('SENDING TO SERVER', context, self.model);

            switch (context) {
                case 'edit':
                    self.submitUpdate()
                        .then(self.editSuccess)
                        .catch(self.editFailed)

                    break;
                default:

                    //Preprocess our create request
                    requestData = self.preprocessCreateData(requestData);


                    if (self.uploadForSave) {

                        var file = self.file;

                        if (!file) {
                            // console.log('SELF UPDATE CREATE', requestData);
                            self.$fluro.notify(`Please select a file to upload`);
                            self.state = 'ready';
                            return;
                        }


                        var REPLACEMENT_UPLOAD_URL = '/file/upload';

                        //If the file is uploaded with an external integration
                        if (requestData.externalIntegration) {

                            var externalIntegrationID = requestData.externalIntegration;
                            if (externalIntegrationID._id) {
                                externalIntegrationID = externalIntegrationID._id;
                            }

                            REPLACEMENT_UPLOAD_URL = `/file/integration/upload/${externalIntegrationID}`;


                        }

                        /////////////////////////////////////////////


                        //Change the state to uploading
                        file.state = 'uploading';

                        //Create a new form object
                        var formData = new FormData();
                        formData.append('json', JSON.stringify(requestData));
                        formData.append('file', file.file, file.name)

                        var body = formData;
                        var requestConfig = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
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
                        return self.$fluro.api.post(REPLACEMENT_UPLOAD_URL, body, requestConfig)
                            .then(self.createSuccess)
                            .catch(self.createFailed)


                    }

                    //////////////////////////////////////////////////////////////

                    if (definedType == 'family') {
                        //Create a new item
                        self.$fluro.api.post(`/family`, requestData)
                            .then(self.createSuccess)
                            .catch(self.createFailed)

                    } else {
                        //Create a new item
                        self.$fluro.api.post(`/content/${definedType}`, requestData)
                            .then(self.createSuccess)
                            .catch(self.createFailed)
                    }

                    break;
            }



        }
    },
    computed: {
        // changeString() {
        //     return JSON.stringify(this.model);
        // },
        showFooter() {
            return !this.hideFooter;
        },
        hideFooter() {
            var self = this;
            return self.typeName == 'definition';
        },
        summary() {
            var self = this;
            switch (self.typeName) {
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
        clickTitleEdit() {
            var self = this;


            switch (self.typeName) {
                case 'contact':
                    return false;
                    break;
                default:
                    return true;
                    break;
            }
        },
        uploadForSave() {
            var self = this;
            return !self.model._id && self.model.assetType == 'upload';
        },
        saveText() {

            var self = this;

            if (self.uploadForSave) {
                return 'Upload';
            } else {
                return 'Save';
            }
        },
        enableAutomationDates() {
            switch (this.config.type.definitionName) {
                case 'article':
                case 'asset':
                case 'audio':
                case 'video':
                case 'image':
                case 'code':
                case 'collection':
                case 'team':
                case 'post':
                case 'product':
                case 'event':
                    return true;
                    break;
            }
        },
        publishDateHint() {
            if (this.model.publishDate && this.isValidDate(this.model.publishDate)) {
                return `Change status to 'active' ${this.$filters.timeago(this.model.publishDate)}`;
            }
        },
        archiveDateHint() {
            if (this.model.archiveDate && this.isValidDate(this.model.archiveDate)) {
                return `Change status to 'archived' ${this.$filters.timeago(this.model.archiveDate)}`;
            }
        },
        extraFields() {

            var fields = {};

            fields.inheritable = {
                title: 'Inheritable',
                description: 'Allow child accounts to reference and use this content',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                key: 'inheritable',
                expressions: {
                    hide() {
                        switch (this.typeName) {
                            case 'contact':
                            case 'family':
                                return true;
                                break;
                            default:
                                break;
                        }
                    }
                }
                // directive: 'datetimepicker',
            }

            fields.slug = {
                title: 'Slug / Readable ID',
                description: 'A readable id that can be used for website urls and paths',
                minimum: 0,
                maximum: 1,
                type: 'string',
                key: 'slug',
                expressions: {
                    hide() {
                        switch (this.typeName) {
                            case 'contact':
                            case 'family':
                                return true;
                                break;
                            default:
                                break;
                        }
                    }
                }
                // directive: 'datetimepicker',
            }

            fields.archiveDate = {
                // title: `Archive Date`,
                minimum: 0,
                maximum: 1,
                type: 'date',
                key: 'archiveDate',
                directive: 'datetimepicker',
            }

            fields.publishDate = {
                // title: `Publish Date`,
                minimum: 0,
                maximum: 1,
                type: 'date',
                key: 'publishDate',
                directive: 'datetimepicker',
            }

            fields.createdDate = {
                title: `Creation Date`,
                minimum: 0,
                maximum: 1,
                type: 'date',
                key: 'created',
                directive: 'datetimepicker',
            }

            return fields;
        },
        showLoading() {

            return !this.config || this.loading || !this.component;
        },
        title() {

            if (this.model.title) {
                return this.model.title
            }

            return 'New';
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
            return this.definition ? this.definition.title : this.typeConfig.title;
        },
        typeName() {
            if (!this.typeConfig) {
                return;
            }

            return this.typeConfig.definitionName;
        },
        definitionName() {
            return this.definition ? this.definition.definitionName : ''; //this.typeConfig.definitionName;
        },
        hasErrors() {
            return this.errorMessages.length ? true : false;
        },
        component() {
            var self = this;

            if (!self.typeName) {
                return;
            }

            var load = () => import(`./panels/${this.typeName}.vue`)

            // console.log('GET LOADED', load);
            return load;



            // switch (self.typeName) {
            //     case 'contact':
            //     case 'mailout':
            //         return 'contact';
            //         break;
            //     default:
            //         return self.typeName;
            //         break;
            // }

        }
    },
    components: {
        // Contact,
        FluroTagSelect,
        FluroRealmSelect,
        FluroStatusSelect,
        FluroInlineEdit,
        FluroContentFormField,
        Changelog,
    },
    asyncComputed: {
        config: {
            default: null,
            get() {

                var self = this;
                // console.log('TYPE IS', self.type);

                //////////////////////////////////////////////

                if (!self.type || !self.type.length) {

                    console.log('NO CONFIG LOADED');
                    // self.loading = false;
                    return Promise.reject({});;

                }

                self.loading = true;

                //////////////////////////////////////////////

                return new Promise(function(resolve, reject) {

                    
                    var promise = self.$fluro.api.get(`/defined/type/${self.type}`);

                    promise.then(function(res) {

                        // console.log('RESO', res);
                        resolve(res.data);
                        // console.log('CONFIG LOADED', res.data);
                        self.loading = false;
                    });

                    promise.catch(function(err) {
                       
                        self.$fluro.error(err);
                        // // console.log('ERROR', err.response);
                        // if (err.response.status === 404) {
                        //     console.log('RESOLVE THE 404')
                        //     return resolve(null);
                        // }

                        return reject(err);
                    });
                })
                // .then(function(res) {
                //     console.log('RESI', res);
                // })
                // .catch(function(err) {
                //     console.log('ERRESI', err);
                // })
            },
        }
    },
    watch: {
        // 'changeString': _.debounce(function(newModel, oldModel) {

        //     if (!oldModel) {
        //         console.log('no old model')
        //         return;
        //     }

        //     console.log('MODEL SAVED', oldModel)
        //     this.autosave();

        // }, 1000),

        value() {
            this.model = this.value; //JSON.parse(JSON.stringify(this.value));
        },
        // 'model': {
        //     handler: function(val, oldVal) {

        //         // console.log('MODEL CHANGED', val);
        //         this.$emit('input', val);
        //     },
        //     deep: true,
        // }
    },
}
</script>
<style lang="scss">
.modal-inner {
    .content-edit {
        width: 100%;
        // max-width: 1200px;
        min-width: 80vw;
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

    & /deep/ .tabset-menu {
        background: #fff;

        a.active {
            background: #fafafa;
        }
    }

    & /deep/ .v-text-field--outline {
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

    & /deep/ .v-label {
        font-weight: 500;
    }

}
</style>