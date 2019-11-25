<template>
    <flex-column class="contact-timeline">
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>

            <!-- @clicked="clicked"  -->



            <fluro-timeline v-model="array">
                <template v-slot:card="{entry}">
                    <template v-if="entry.grouped">

                        <grouped-card :item="entry"/>
                       
                    </template>
                    <template v-else-if="!entry._type">
                        <!-- <div class="timeline-card log-message"> -->
                            <log-card :item="entry"/>
                            <!-- <fluro-icon type="log"/> {{entry.message}} <em class="muted">- {{entry.date | formatDate('hh:mma')}} ({{entry.date | timeago}})</em> -->
                        <!-- </div> -->
                         <!-- <pre>{{entry}}</pre> -->
                    </template>
                    <template v-else>
                        <!-- <div class="timeline-card"> -->
                            <template v-if="entry._type == 'mailout'">
                                <mailout-card :item="entry"/>
                            </template>
                            <template v-else-if="entry._type == 'post'">
                                <post-card :item="entry"/>
                            </template>
                            <template v-else-if="entry._type == 'interaction'">
                                <interaction-card :item="entry"/>
                            </template>
                            <template v-else-if="entry._type == 'checkin'">
                                <checkin-card :item="entry"/>
                            </template>
                            <template v-else-if="entry._type == 'assignment'">
                                <roster-card :item="entry"/>
                            </template>
                            <template v-else-if="entry._type == 'sms'">
                                <text-message-card :item="entry"/>
                            </template>
                            <template v-else>
                                <div class="timeline-card">
                                <pre>{{entry}}</pre>
                            </div>
                            </template>
                            <!-- <fluro-realm-bar :realm="entry.realms"/> -->
                            <!-- <label>{{entry.title}}</label> -->
                           
                            <!-- } -->
                        <!-- </div> -->
                    </template>
                </template>
            </fluro-timeline>
        </template>
    </flex-column>
    <!-- <div class="process-state-card" :class="card.processStatus">
        <fluro-card>
            <div class="color-block" />
            <fluro-card-body>
                <div class="due-date" v-if="card.dueDate">
                    <fluro-icon icon="clock" /> {{dueText}}</div>
                <h5>{{card.title}}</h5>
                <div><strong>{{currentState.title}}</strong> <template v-if="mode == 'linear'"> - {{percent}}</template></div>
                <div>{{taskSummary}}</div>
                <div class="process-dots">
                    <span class="process-dot" v-tippy :content="state.title" :class="state.result" v-for="state in renderStates">
                        <fluro-icon :library="state.iconLibrary" :icon="state.icon" />
                       
                    </span>
                </div>
                
            </fluro-card-body>
        </fluro-card>
    </div> -->
</template>
<script>
import FluroTimeline from '../../../ui/FluroTimeline.vue';
import MailoutCard from './cards/MailoutCard.vue';
import PostCard from './cards/PostCard.vue';
import InteractionCard from './cards/InteractionCard.vue';
import CheckinCard from './cards/CheckinCard.vue';
import LogCard from './cards/LogCard.vue';
import RosterCard from './cards/RosterCard.vue';
import TextMessageCard from './cards/TextMessageCard.vue';
import GroupedCard from './cards/GroupedCard.vue';

export default {
    props: {
        items:{
            type:Array,
        },
        value: {
            type: Object,
        }
    },
    components: {
        FluroTimeline,
        GroupedCard,
        MailoutCard,
        PostCard,
        InteractionCard,
        CheckinCard,
        LogCard,
        RosterCard,
        TextMessageCard,
    },
    data() {
        return {
            loading: false,
            model: this.value,
        }
    },
    asyncComputed: {
        array: {
            default: [],
            get() {

                var self = this;
                self.loading = true;

                var contactID = self.$fluro.utils.getStringID(self.model);
                if (!contactID) {
                    Promise.resolve([])
                    self.loading = false;
                }

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${contactID}/timeline`).then(function(res) {

                            resolve(res.data);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;

                        });
                    // https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
                })
            }
        }
    }
}
</script>
<style lang="scss">

.contact-timeline {
    .timeline-wrapper {
        max-width: 960px;
        margin:auto;
    }
}

.log-message {
    font-size: 0.8em;
    opacity: 0.5;
    padding: 5px;
    font-style: italic;
}

.timeline-entry {
    @extend .border-top;
    padding:5px;
    position: relative;

    .summary {
        font-size: 0.8em;
        opacity: 0.5;
    }
}


.timeline-icon {
    text-align:center;
    width:34px;
    line-height: 34px;
    height:34px;
    background: rgba(#000, 0.1);
    border-radius: 100%;
    display: block;
}
</style>