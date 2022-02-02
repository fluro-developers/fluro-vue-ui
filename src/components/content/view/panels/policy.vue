<template>
    <flex-column-body>
        <v-container fluid>
            <constrain sm>
                <template v-if="inviteCodeEnabled">
                    <template v-if="inviteCode">

                     <h3>Invite Code</h3>
                     <p>Share this invitation code with new users, to allow them to collect this access pass</p>
                        <div class="invite-code" v-tippy content="Click to copy to clipboard" @click="copyCodeToClipboard">
                            <span>{{inviteCode}}</span>
                            <!-- <fluro-icon icon="copy" right /> -->
                        </div>
                        <input type="hidden" ref="input" :value="inviteCode">
                    </template>
                    <fluro-content-render :fields="definedFields" v-model="item.data" />
                </template>
            </constrain>
        </v-container>
    </flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';
// import FluroContentRender from '../../../FluroContentRender.vue';

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    // components: {
    //     FluroContentRender,
    // },
    mixins: [FluroContentViewMixin],
    methods: {

        copyCodeToClipboard() {



            var self = this;

            let testingCodeToCopy = this.$refs.input;
            testingCodeToCopy.setAttribute('type', 'text') // 不是 hidden 才能複製
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                // alert('Testing code was copied ' + msg);
                self.$fluro.notify('Invite Code Copied to clipboard');
            } catch (err) {
                // alert('Oops, unable to copy');
                // self.$fluro.error({message:'Unable to copy to clipboard'});
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            if (process.browser) {
                window.getSelection().removeAllRanges()
            }


        },


    },

    asyncComputed: {
        inviteCodeData: {
            default: null,
            get() {

             var self = this;

                return new Promise(function(resolve, reject) {

                   self.$fluro.api.get(`/policy/grantable/${self.item._id}`)
                   .then(function(res) {

                     resolve(res.data);
                   }, reject)
                });


            }
        },
    },
    computed: {
        model() {
            return this.item;
        },
        inviteCodeEnabled() {
            return this.model._id && this.model.inviteCodeEnabled;
        },
        policyCode() {
            var self = this;
            return _.get(this.model, 'privateDetails.inviteCode');
        },
        inviteCode() {
            var self = this;

             if (self.inviteCodeData) {
                return self.inviteCodeData.inviteCode;
            }

            if (!self.policyCode) {
                return
            }
            return `${self.user.account.prefix}-${self.policyCode }`.toUpperCase();
        },
        data() {
            return this.item.data || {}
        },
        definedFields() {
            return this.definition ? this.definition.fields : null;
        }
    },
    data() {
        return {}
    },
}

</script>
<style scoped lang="scss">

 .invite-code {
    line-height: 60px;
    height: 60px;
    padding: 0 5px;
    border: 1px solid rgba($primary, 0.5);
    background: rgba($primary, 0.1);
    text-align: center;
    font-weight: 100;
    font-size: 40px;
    // border-radius: 3px;
}
</style>
