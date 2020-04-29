<template>
    <flex-column class="fluro-confirm-dialog">
        <flex-column-header class="border-bottom" v-if="title || description">
            <v-container>
                <constrain xs>
                    <h3 v-if="title">{{title}}</h3>
                    <div class="muted" v-if="description">{{description}}</div>
                </constrain>
            </v-container>
        </flex-column-header>
        <flex-column-footer class="border-top">
            <v-container class="pa-2">
                <constrain xs>
                    <v-layout>
                    	<template v-if="!options.noCancel">
                        <v-btn block @click="dismiss()">
                            Cancel
                        </v-btn>
                        <v-spacer />
                    </template>
                        <v-btn block :color="confirmColor" @click="close()">
                            {{confirmText}}
                        </v-btn>
                    </v-layout>
                </constrain>
            </v-container>
        </flex-column-footer>
    </flex-column>
</template>
<script>
import ModalMixin from 'src/mixins/ModalMixin';
import Layout from 'src/mixins/Layout';

export default {
    props: {
        options: {
            type: Object
        }
    },
    mixins: [ModalMixin, Layout],
    data() {
        return {}
    },
    computed: {
        confirmColor() {
            return this.options.confirmColor ? this.options.confirmColor : 'success';
        },
        confirmText() {
            return this.options.confirmText ? this.options.confirmText : 'Confirm';
        },
        title() {
            return this.options.title;
        },
        description() {
            return this.options.description;
        },
    },
}
</script>
<style lang="scss">
.fluro-confirm-dialog {
    text-align: center;

    @media(min-width: 768px) {
        width: 100%;
        min-width: 500px;
    }
}
</style>