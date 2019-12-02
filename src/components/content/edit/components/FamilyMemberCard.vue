<template>
    <v-container fluid grid-lines-sm class="card" :class="model.status" v-if="model">
        <fluro-content-form v-model="model" :fields="fields">
            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                <v-layout column>
                    <v-flex class="avatar-flex">
                        <fluro-avatar class="avatar-icon" :id="model._id" type="contact" />
                    </v-flex>
                    <v-flex class="text-centered less-padding">
                        <h4>{{contactName}}</h4>
                    </v-flex>
                    <v-flex class="text-centered less-padding">
                        <p class="muted" style="margin-bottom: 0px">{{contactGender}}</p>
                    </v-flex>
                    <v-flex class="less-padding">
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.householdRole" v-model="model">
                        </fluro-content-form-field>
                    </v-flex>
                    <v-flex class="less-padding status-flex">
                        <fluro-status-select v-model="model.status" />
                    </v-flex>
                    <v-flex class="less-padding">
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.definition" v-model="model">
                        </fluro-content-form-field>
                    </v-flex>
                </v-layout>
            </template>
        </fluro-content-form>
    </v-container>
</template>
<script>
/////////////////////////////////

import { FluroAvatar, Layout, FluroContentForm, FluroContentFormField, FluroStatusSelect } from 'fluro-vue-ui';

/////////////////////////////////

export default {
    props: {
        value: {
            type: Object,
            default: {},
        },
        contactDefinitions: {
            type: Array,
        }
    },
    components: {
        FluroContentForm,
        FluroContentFormField,
        FluroStatusSelect,
        FluroAvatar,
    },
    data() {
        return {
            model: this.value,
        }
    },
    created() {
    	var self = this;
    	if (!self.model.definition) {
    		self.model.definition = '';
    	}
      	if (!self.model.householdRole) {
    		self.model.householdRole = '';
    	}
    },
    methods: {
    },
    computed: {
        contactName() {
            return this.model.title;
        },
        contactGender() {
            if (this.model.gender) {
                return this.model.gender;
            }
        },
        fields() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('householdRole', {
                title: 'Family Role',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                default: '',
                options: [{
                        name: 'None / Other',
                        value: '',
                    },
                    {
                        name: 'Parent',
                        value: 'parent',
                    },
                    {
                        name: 'Guardian',
                        value: 'guardian',
                    },
                    {
                        name: 'Child',
                        value: 'child',
                    },
                ]
            });

            ///////////////////////////////////

            addField('definition', {
                title: 'Definition',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                options: self.contactDefinitions,
            });


            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
    },
}
</script>
<style>
.card {
    width: 100%;
    height: 100%;
}

.avatar-icon {
    width:80% !important;
    display:block;
}

.avatar-flex {
    display:flex;
    width:100%;
    justify-content: center;
}

.status-flex {
    display:flex;
    width:100%;
    justify-content: center;
}

.text-centered {
    text-align: center;
}

.less-padding {
    padding: 4px 8px !important;
}
</style>