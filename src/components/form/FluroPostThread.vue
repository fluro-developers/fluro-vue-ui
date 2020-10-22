<template>
    <div class="fluro-post-thread">
        <!-- <pre>{{model}}</pre> -->
        <template v-for="post in model">
            <!-- {{post._id}`} POST -->
            <!-- <pre>{{post}}</pre> -->
            <slot name="post" :post="post"></slot>
        </template>
    </div>
</template>
<script>
import _ from 'lodash';
import { mapFields } from 'vuex-map-fields';

//////////////////////////////////////////////////
``
export default {
    props: {
        'value': {
            type: Array,
        },
    },
    data() {
        return {
            model: this.value,
        }
    },
    computed: {
        webMode() {

            var self = this;
            if (!self.mounted) {
                return;
            }

            if (!self.$fluro.app) {
                console.log('NO APP');
                return;
            }
            var element = self.$el;
            if (!element) {
                console.log('NO ELEMENT');
                return;
            }

            if (!element.ownerDocument) {
                console.log('NO DOCUMENT');
                return;
            }

            if (!element.ownerDocument.defaultView) {
                console.log('NO DEFAULT VIEW');
                return;
            }

            // console.log('ADMIN?', element.ownerDocument.defaultView.adminPanelMode);

            return !element.ownerDocument.defaultView.adminPanelMode;
        },
        user() {
            if (this.webMode) {
                if (this.$fluro.app) {
                    return this.$fluro.app.user;
                } else {
                    return;
                }
            } else {

                return this.$fluro.auth.getCurrentUser();
                // return this.$fluro.auth.getCurrentUser();
            }
        },
        ...mapFields('fluro', [
            'application', //The Fluro application and all of it's permissions and data
            // 'user', //The authenticated user if they log in
        ]),

        // ...mapFields('fluro', [
        //     'application', //The Fluro application and all of it's permissions and data
        //     'user', //The authenticated user if they log in
        // ]),
    },
    watch: {
        value(value) {
            this.model = value;
        },
        model() {
            this.$emit('input', this.model)
        }
    }
}

</script>
<style scoped lang="scss">
.fluro-post-thread {}

</style>
