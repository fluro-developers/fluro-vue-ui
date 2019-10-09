<template>
    <div class="fluro-content-render-field">
        <!-- <pre>{{field.type}} {{renderer}}</pre> -->
        <template v-if="isEmpty">
        </template>
        <template v-else-if="type == 'reference'">
            <div class="field-group">
                <label>{{label}}</label>
                <template v-if="!multiple">
                    <fluro-list-item :item="fieldModel" :defaultActions="defaultActions(object)"></fluro-list-item>
                </template>
                <template v-if="multiple">
                    <template v-for="(object, index) in fieldModel">
                        <!-- <pre>{{object}}</pre> -->
                        <fluro-list-item :item="object" :defaultActions="defaultActions(object)"></fluro-list-item>
                    </template>
                </template>
            </div>
        </template>
        <template v-else-if="renderer == 'wysiwyg'">
            <template v-if="multiple">
                <div class="field-group">
                    <label>{{label}}</label>
                    <div v-for="(entry, key) in fieldModel" v-html="fieldModel[key]"></div>
                </div>
            </template>
            <template v-if="!multiple">
                <div class="field-group">
                    <label>{{label}}</label>
                    <!-- <pre>{{fieldModel}}</pre> -->
                    <div v-html="fieldModel"></div>
                </div>
            </template>
        </template>
        <template v-else-if="renderer == 'group'">
            <template v-if="asObject">
                <template v-if="!multiple">
                    <fluro-content-render :fields="fields" v-model="fieldModel"></fluro-content-render>
                </template>
                <template v-if="multiple">
                    <template v-for="(object, index) in fieldModel">
                        <v-card class="panel">
                            <div class="panel-title">
                                <h5 title>{{groupTitle(object, index)}}</h5>
                            </div>
                            <v-card-text class="panel-body">
                                <fluro-content-render :fields="fields" v-model="fieldModel[index]"></fluro-content-render>
                            </v-card-text>
                        </v-card>
                    </template>
                </template>
            </template>
            <template v-else>
                <template v-for="field in fields">
                    <fluro-content-render-field :field="field" v-model="model"></fluro-content-render-field>
                    <!-- <fluro-content-form-field class="flex" :field="field" @input="valueChange" v-model="model"></fluro-content-form-field> -->
                </template>
            </template>
        </template>
        <template v-else-if="renderer == 'code'">
            <template v-if="multiple">
                <div class="field-group">
                    <label>{{label}}</label>
                    <template v-for="(entry, key) in fieldModel">
                        <fluro-code-editor v-model="fieldModel[key]" :lang="syntax" :readonly="true" :height="200"></fluro-code-editor>
                    </template>
                </div>
            </template>
            <template v-if="!multiple">
                <div class="field-group">
                    <label>{{label}}</label>
                    <fluro-code-editor v-model="fieldModel" :lang="syntax" :readonly="true" :height="200"></fluro-code-editor>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-if="type == 'date'">
                <template v-if="multiple">
                    <div class="field-group">
                        <label>{{label}}</label>
                        <div v-for="(entry, key) in fieldModel">
                            {{entry | formatDate('h:mma dddd D MMM YYYY')}}
                        </div>
                    </div>
                </template>
                <template v-if="!multiple">
                    <div class="field-group">
                        <label>{{label}}</label>
                        <div>
                            {{fieldModel | formatDate('h:mma dddd D MMM YYYY')}}
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <template v-if="multiple">
                    <div class="field-group">
                        <label>{{label}}</label>
                        <div v-for="(entry, key) in fieldModel">
                            {{entry}}
                        </div>
                    </div>
                </template>
                <template v-if="!multiple">
                    <div class="field-group">
                        <label>{{label}}</label>
                        <div>
                            {{fieldModel}}
                        </div>
                    </div>
                </template>
            </template>
        </template>
    </div>
</template>
<script>
import _ from 'lodash';
// import FluroCompileHtml from '../FluroCompileHtml.vue';
// import FluroEditor from './FluroEditor.vue';
import FluroCodeEditor from './form/FluroCodeEditor.vue';
import FluroListItem from './FluroListItem.vue';
// import FluroSignatureField from './FluroSignatureField.vue';
// import FluroDateTimePicker from './FluroDateTimePicker.vue';
//Allow custom html to be injected at runtime


////////////////////////////////////////////////////////

export default {
    components: {
        // FluroEditor,
        // FluroCompileHtml,
        FluroCodeEditor,
        FluroListItem,
        // FluroSignatureField,
        // FluroDateTimePicker,
    },
    data() {
        return {
            model: this.value,
        }
    },
    computed: {

        isEmpty() {
            if (this.multiple) {
                return !this.fieldModel || !this.fieldModel.length
            } else {
                return !this.fieldModel;
            }
        },
        fieldModel: {
            get() {
                if (!this.model) {
                    return;
                }

                return this.model[this.key]
            },
            set() {

            }
        },
        key() {
            return this.field.key;
        },
        label() {
            return this.field.title;
        },
        asObject() {
            return this.field.asObject;
        },
        fields() {
            return this.field.fields;
        },
        type() {
            return this.field.type;
        },
        multiple() {
            return this.maximum === 0 || this.maximum > 1;
        },
        minimum() {
            return Math.max(parseInt(this.field.minimum), 0);
        },
        maximum() {
            return parseInt(this.field.maximum);
        },
        total() {
            return _.get(this.fieldModel, 'length');
        },
        renderer() {

            //Get the widget defined on the data object
            var dataType = this.type;
            var directive = this.field.directive;


            switch (directive) {
                case 'date-select':
                    directive = 'datepicker';
                    break;

                case 'time-select':
                    directive = 'timepicker';
                    break;
                case 'datetime-select':
                    directive = 'datetimepicker';
                    break;
                case 'textarea':
                    directive = 'textarea';
                    break;
                default:
                    switch (dataType) {
                        case 'group':
                            directive = 'group';
                            break;
                        case 'boolean':
                            directive = 'checkbox';
                            break;
                        case 'number':
                        case 'integer':
                        case 'decimal':
                            directive = 'number';
                            break;
                    }
                    break;
            }


            //Return the basic data type by default
            return directive;
        },
        syntax() {
            return _.get(this, 'field.params.syntax');
        }
    },
    methods: {
        defaultActions(object) {

            if(!object) {
                return;
            }
            
            switch (object._type) {
                case 'asset':
                case 'video':
                case 'image':
                case 'audio':
                    return true;
                    break;
            }
        },
        groupTitle(object, index) {
            if (object) {
                if (object.title && object.title.length) {
                    return object.title;
                }

                if (object.name && object.name.length) {
                    return object.name;
                }
            }

            return `${this.label} ${index+1}`
        },
    },
    created() {
        // if (this.multipleInput) {
        //     switch (this.type) {
        //         case 'reference':
        //             this.results = (this.defaultReferences || []).slice();
        //             break;
        //         default:
        //             this.results = (this.defaultValues || []).slice();
        //             break;
        //     }
        // }
    },
    props: {
        'field': {
            type: Object,
        },
        'value': {
            required: true,
        }
    },
    beforeCreate: function() {
        this.$options.components.FluroContentRender = require('./FluroContentRender.vue').default;
        this.$options.components.FluroContentRenderField = require('./FluroContentRenderField.vue').default;
    },
}
</script>
<style lang="scss">
.fluro-content-render-field {


    .field-group {
        display: block;
        margin-bottom: 1.5em;

        label {
            display: block;
            font-weight: 700;
            margin-bottom: 0.3em;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.8em;
            // opacity:0.5;
        }
    }

    .panel {
        margin-bottom: 1em;
        border: 1px solid rgba(#000, 0.15) !important;
        border-radius: 4px;
        box-shadow: none !important;

        .panel-title {
            padding: 1em;
            background: rgba(#000, 0.03);
            border-bottom: 1px solid rgba(#000, 0.05);
        }
    }
}
</style>