<template>
    <div class="timeline-entry border-top">
        <fluro-realm-bar :realm="realms" />
        <pre>{{item}}</pre>
       <!--  <v-layout>
            <v-flex shrink>
                <v-container pa-2>
                    <div class="timeline-icon">

                        <fluro-icon v-if="icon" library="far" :icon="icon" />
                    </div>
                </v-container>
            </v-flex>
            <v-flex>
                <v-container pa-2 v-if="type == 'assignment'">
                   
                    <strong>{{title}}</strong>
                    <div class="inline-tags">
                        <span class="inline-tag" @click="$fluro.global.edit(link, true)" v-for="link in links">{{link.startDate | formatDate('h:mma')}} {{link.title}}</span>
                    </div>
                    <!-- <div class="summary">{{eventTitles}}</div> -->
                </v-container>
            </v-flex>
        </v-layout> -->
    </div>
</template>
<script>
// import FluroContentRender from '../../../../FluroContentRender.vue';
// import FluroAvatar from '../../../../FluroAvatar.vue';

export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    components: {
        // FluroContentRender,
        // FluroAvatar,
        FluroRealmBar:() => import("../../../../ui/FluroRealmBar.vue"),
    },
    computed: {
        links() {
            var self = this;
            switch (self.type) {
                case 'assignment':
                    return _.chain(self.item.entries)
                        .map(function(entry) {
                            return _.get(entry, 'roster.event');
                        })
                        .compact()
                        .uniqBy(function(event) {
                            return event._id
                        })
                        .value()
                    break;
            }
        },
        type() {
            return this.item.type
        },
        realms() {
            return _.chain(this.item.entries)
                .map('realms')
                .flatten()
                .uniq()
                .compact()
                .value();
        },

        title() {
            var self = this;
            switch (self.item.type) {
                case 'assignment':
                    var assignments = _.chain(self.item.entries)
                        .map(function(entry) {
                            return entry.title
                        })
                        .compact()
                        .uniq()
                        .value()
                        .join(', ');

                    return `Rostered as ${assignments}`;
                    break;
            }
        },
        icon() {
            var self = this;
            switch (self.item.type) {
                case 'assignment':

                    return 'calendar';
                    break;
                default:
                    return self.$fluro.types.icon(self.item.type);
                    
                    break;
            }
        }
    }
}
</script>
<style lang="scss">
</style>