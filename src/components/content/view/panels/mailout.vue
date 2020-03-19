<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- <pre>{{activeTabIndex}} {{item.state}} {{resultsEnabled}}</pre> -->
            <tabset v-model="activeTabIndex" :justified="true">
                <tab heading="Results" v-if="item.state == 'sent'">
                     <mailout-results-panel v-model="item"/>
                    
                </tab>
                <tab heading="Rendered Preview">
                    <mailout-render-preview :mailout="item._id" :definition="item.definition" />
                </tab>
                <tab heading="Test" v-if="item.state != 'sent'">
                    <mailout-test-panel v-model="item"/>
                </tab>
                <tab :heading="sendHeading" v-if="item.state != 'sent'">
                    <mailout-preflight-panel v-model="item"/>
                    
                </tab>
                <tab heading="Results" v-if="item.state != 'sent' && resultsEnabled">
                     <mailout-results-panel v-model="item"/>
                    
                </tab>
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

// import CorrespondenceInfoModal from '../components/CorrespondenceInfoModal.vue';
// import MailoutPushModal from '../components/MailoutPushModal.vue';
import FluroContentViewMixin from '../FluroContentViewMixin';
import { SearchInput, StatusCell, AvatarCell, FluroTable, MailoutResultsPanel, MailoutPreflightPanel, MailoutRenderPreview, MailoutTestPanel, FluroContentFormField, FluroContentSelectButton } from 'fluro-vue-ui';

//////////////////////////////////////////////////////

let InfoCell = Vue.extend({
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'data': {
            // type: Object,
        },
    },
    methods: {
        info() {
            this.$fluro.modal({
                component: CorrespondenceInfoModal,
                options: {
                    item: this.row,
                }
            })
        }
    },
    template: `<v-btn class="ma-0" small @click="info">
   Info
    </v-btn>`,
});


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
    mounted() {
        console.log('RECREATED')
    },
    components: {
        SearchInput,
        FluroTable,
        FluroContentFormField,
        FluroContentSelectButton,
        MailoutRenderPreview,
        MailoutTestPanel,
        MailoutResultsPanel,
        MailoutPreflightPanel,
    },
    mixins: [FluroContentViewMixin],
    methods: {
        
        
        
        
        
        
        
        
        
        
    },
    
    
    computed: {
        
        
        
        
        
        
        definitionName() {
            return this.item.definition;
        },
        resultsEnabled() {

            var self = this;

            if (self.item.state == 'sent') {
                return true;
            }

            if (self.item.stats && self.item.stats.mailoutSent) {
                return true;
            }
        },
        sendHeading() {
            var self = this;
            switch (self.item.state) {
                case 'scheduled':

                    if (!this.duration) {
                        return 'Scheduled';
                    }

                    return 'Scheduled';
                    // return `Sending in ${self.countdown}`;

                    break;
                default:
                    return 'Publish'
                    break;
            }
        },
        data() {
            return this.item.data || {}
        },
        definedFields() {
            return this.config.definition.fields;
        },
    },
    data() {

        return {
            activeTabIndex:0,
            search: '',
            
        }
    },
}
</script>
<style scoped lang="scss">
.row-item {
    display: block;
    padding: 10px;
    @extend .border-bottom !optional;
    color: inherit;
    text-decoration: none;

    &:hover {
        background: #fafafa;
    }
}

.search {}

.stat-box {
    padding: 10px;
    border: 1px solid rgba(#000, 0.1);
    border-radius: 3px;
    text-align: center;
    margin: 2px;
    background: linear-gradient(#fff, #fafafa);


    label {
        text-transform: uppercase;
        ;
        font-weight: 500;
        font-size: 10px;
        opacity: 0.5;
        letter-spacing: 0.05em;
    }

    h3 {
        font-size: 40px;
        display: block;
        line-height: 50px;
    }
}
</style>