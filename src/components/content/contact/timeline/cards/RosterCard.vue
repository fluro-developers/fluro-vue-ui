<template>
    <div class="timeline-entry border-top" @click="$fluro.global.edit(item, true)">
        <fluro-realm-bar :realm="item.realms" />
        <v-layout>
            <v-flex shrink>
                <v-container pa-2>
                    <div class="timeline-icon" >
                        <fluro-icon library="fas" :icon="rosterIcon" />
                    </div>
                </v-container>
            </v-flex>
            <v-flex>
                <v-container pa-2>
                    <strong>{{title}}</strong>
                    <div class="summary" @click.prevent.stop="$fluro.global.edit(event, true)"><strong>{{event.title}}</strong> - {{datestring}}</div>
                </v-container>
              
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    components: {
       
       
        FluroRealmBar:() => import('../../../../ui/FluroRealmBar.vue'),
    },
    computed: {
        rosterIcon() {
            switch (this.item.confirmationStatus) {
                case 'unknown':
                    return 'question';
                break;
                case 'confirmed':
                    return 'check';
                break;
                case 'declined':
                    return 'times';
                break;
            }
        },
        summary() {
            return `${this.event.title} - ${this.datestring}`;
        },
        datestring() {
            return this.$fluro.date.readableEventDate(this.event);
        },
        roster() {
            return this.item.roster;
        },
        event() {
            return this.roster.event;
        },
        position() {
            return this.item.title;
        },
        title() {
            switch (this.item.confirmationStatus) {
                case 'unknown':
                    return `Rostered as ${this.position}`
                    break;
                case 'declined':
                    return `Marked unavailable for ${this.position}`
                    break;
                case 'confirmed':
                    return `Confirmed as ${this.position}`
                    break;
            }
        },
        // time() {
        //     return this.$filters.formatDate(this.event.startDate, 'h:mma');
        // },
    }
}
</script>
<style lang="scss">
.checkin-timeline-entry {
    padding: 10px;
    font-style: italic;
    font-size: 0.8em;
}
</style>