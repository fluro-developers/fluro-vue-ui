<template>
    <form @submit.prevent="save" :disabled="state == 'processing'">
        <pre>{{dataModel}}</pre>
        <fluro-content-form v-model="dataModel" ref="form" :fields="fields"></fluro-content-form>
        <fluro-realm-select v-model="dataModel.realms" type="event" :definition="dataModel.definition" />
        <div class="actions">
            <template v-if="state == 'processing'">
                <v-btn class="mx-0" :disabled="true">
                    Processing
                    <v-progress-circular indeterminate></v-progress-circular>
                </v-btn>
            </template>
            <template v-else-if="state == 'error'">
                <v-alert :value="true" type="error" outline>
                    {{serverErrors}}
                </v-alert>
                <v-btn class="mx-0" @click.prevent.native="state = 'ready'">
                    Try Again
                </v-btn>
            </template>
            <template v-else>
                <v-alert :value="true" type="error" outline v-if="hasErrors">
                    Please check the following issues before saving
                    <div v-for="error in errorMessages">
                        <strong>{{error.title}}</strong>: {{error.messages[0]}}
                    </div>
                </v-alert>
                <v-btn class="mx-0" :loading="state == 'processing'" :disabled="hasErrors" type="submit" color="primary">
                    Save
                </v-btn>
            </template>
        </div>
    </form>
</template>
<script>

import FluroContentForm from 'src/components/form/FluroContentForm.vue';
import FluroContentFormField from 'src/components/form/FluroContentFormField.vue';
import FluroRealmSelect from 'src/components/form/realmselect/FluroRealmSelect.vue';

////////////////////////////////////////////////

export default {
    props:{
        url:{
            type:String,
            required:true,
        },
    },
    computed: {
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
        formErrors() {

        },
        hasErrors() {
            return this.errorMessages.length ? true : false;
        },
        formOptions() {
            return this.definition.data;
        },
        fields() {
        }
    },
    methods: {
        save() {

            var self = this;
            var definedType = self.dataModel.definition || 'event';

            ///////////////////////////////

            var body = self.dataModel;

            ///////////////////////////////

            return self.$fluro.api.post(self.url, body)
                .then(function(res) {

                    var event = res.data;

                    self.dataModel = {};
                    self.$fluro.dispatch('cache.reset');

                    self.$router.replace({
                        name:'photos.upload.event',
                        params:{id:self.$fluro.utils.getStringID(event)},
                    })

                    var message = `'${event.title}' created successfully`;
                    self.$fluro.notify(message, {
                        type: 'success',
                    });
                })
                .catch(function(err) {
                    console.log('Error', err);

                    //Dispatch an error
                    var humanMessage = self.$fluro.utils.errorMessage(err);
                    self.$fluro.error(err);
                    self.serverErrors = humanMessage;
                    self.state = 'error';
                    self.$emit('error', err);

                    console.log('SWITCH STATE TO', err, self)
                });

            console.log('Save new event!', this.data);
        }
    },
    components: {
        FluroContentForm,
        FluroContentFormField,
        FluroRealmSelect,
    },
    data() {
        return {
            loading: true,
            serverErrors: '',
            errorMessages: [],
            result: null,
            state: 'ready',
            dataModel: {
                //title:'something'
            },
        }
    },
}
</script>