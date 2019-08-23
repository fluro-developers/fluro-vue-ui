<template>
<div class="fluro-academic-select">
    <v-input class="no-flex" :label="label" :required="required" :error-messages="errorMessages" :hint="hint">
    <v-layout row wrap class="fluro-academic-field">
        <v-flex xs12 sm6>
            <v-select :outline="showOutline" :success="success" :required="required" label="School / Institution" no-data-text="No options available" v-model="model.academicCalendar" item-text="title" item-value="_id" :items="calendars" :error-messages="errorMessages" />
        </v-flex>
        <v-flex xs12 sm6 v-if="model.academicCalendar">
            <v-select :outline="showOutline" :success="success" :required="required" label="Grade / Year Level" :persistent-hint="true" :hint="gradeHint" no-data-text="No options available" v-model="model.academicGrade" item-text="title" item-value="key" :items="grades" :error-messages="errorMessages" />
        </v-flex>
    </v-layout>
</v-input>
</div>
</template>
<script>

/////////////////////////////////////////////////////

export default {
    // components:{
    // VueSignature,
    // },
    props: {
        'outline':{
            type:Boolean,
        },
        'hint': {
            type: String
        },
        'required': {
            type: [Boolean, Number],
        },
        'label': {
            type: String,
        },
        'value': {
            type: Object,
        },
        'success': {
            type: Boolean,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
        'formFields': {
            type: Array,
        },
    },
    data() {
        return {
            model: this.value,
            grades:[],
        }
    },
    watch:{
        'selectedCalendar':function() {
            var self = this;
            if(self.selectedCalendar) {
                self.grades = self.selectedCalendar.grades;
            }  else {
                self.grades = [];
            }
        }
    },
    computed:{
        errorMessages() {
            return [];
        },
        gradeHint() {

            return `(As of ${new Date().getFullYear()})`;
        },
        showOutline(){
            return this.outline || this.options.outline;
        },
        selectedCalendar() {
            var self = this;
            return _.find(self.calendars, {
                _id:self.model.academicCalendar,
            })
        },
    },
    created() {
        if (this.formFields) {
            this.$set(this.formFields, this.formFields.length, this);
        }
        
        ////////////////////////////////////////////

        //Emit itself being created
        this.$emit('created', this);
    },
    beforeDestroy() {
        if (this.formFields) {
            this.formFields.splice(this.formFields.indexOf(this), 1);
        }
    },
    methods:{
        reset() {
            this.model.academicGrade = null;
            this.model.academicCalendar = null;
        },
    },
    asyncComputed:{
        calendars:{
            default:[],
            get() {
                var self = this;
                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/schools`, {
                        searchInheritable:true,
                        allDefinitions:true,
                    }).then(function(res) {


                        var options = res.data;

                        options.unshift({
                            title:'None',
                            _id:'',
                        })
                        return resolve(options);
                    }, reject);
                })
            }
        },
    }
}
</script>
<style lang="scss">


.no-flex {
        &>.v-input__control>.v-input__slot {
            display: block;
            margin: 0;
        }
    }



</style>