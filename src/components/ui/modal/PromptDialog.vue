<template>

    <flex-column class="fluro-prompt-dialog">
        <form style="flex:1; display:flex; " @submit.prevent.stop="done">
        <flex-column-header class="border-bottom" v-if="title">
            <v-container pa-2>
                <h3 v-if="title">{{title}}</h3>
                <div v-if="description" class="font-sm muted">{{description}}</div>
            </v-container>
        </flex-column-header>
        <flex-column-body>
            <v-container pa-2>
                <fluro-content-form v-model="model" :fields="options.fields"/>
            </v-container>
        </flex-column-body>
        <flex-column-footer class="border-top">
            <v-container pa-2>
                <constrain xs>
                    <v-layout>
                        <v-btn block @click="dismiss()">
                            {{cancelText}}
                            <!-- Cancel -->
                        </v-btn>
                        <v-spacer />
                        <v-btn block type="submit" color="primary">
                            {{confirmText}}
                            <!-- Continue -->
                        </v-btn>
                    </v-layout>
                </constrain>
            </v-container>
        </flex-column-footer>
    </form>
    </flex-column>
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';
import FluroContentForm from '../../form/FluroContentForm.vue';

export default {
    components:{
        FluroContentForm,
    },
    props: {
        options: {
            type: Object
        }
    },
    mixins: [ModalMixin],
    data() {
        return {
            model:this.options.model || {},
        }
    },
    computed: {
        cancelText() {
            return this.options.cancelText || 'Cancel';
        },
        confirmText() {
            return this.options.confirmText || 'Continue';
        },
        description() {
            return this.options.description;
        },
        title() {
            return this.options.title;
        },
    },
    methods: {
        done() {
            return this.close(this.model);
        }
    }
}
</script>
<style lang="scss">
.fluro-prompt-dialog {
    min-width: 300px;
    // max-width: 500px;
    text-align: center;


    form {
    	display:flex;
    	flex:1;
    	overflow: hidden;
    	flex-direction: column;
    }

    .v-list__tile__title {
        font-size: 0.9em;
        font-weight: 500;
    }

}
</style>