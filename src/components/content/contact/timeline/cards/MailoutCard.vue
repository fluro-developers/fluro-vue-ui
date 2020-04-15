<template>
    <div class="timeline-entry" @click="$fluro.global.view(item.mailout, true)">
        <v-layout>
            <v-flex shrink>
                <v-container pa-2>
                	<div class="timeline-icon">
                    <fluro-icon icon="envelope" />
                </div>
                </v-container>
            </v-flex>
            <v-flex>
                <v-container pa-2>
                    <strong>{{item.mailout.subject || item.mailout.title}}</strong>
                    <div class="summary">{{summary}}</div>
                </v-container>
            </v-flex>
        </v-layout>
        <!-- <div>{{item.state}}</div> -->
        <!-- <pre>{{item}}</pre> -->
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
    computed: {
        summary() {

            switch (this.item.state) {
                case 'sent':
                    return `Sent to ${this.item.email} - ${this.$filters.formatDate(this.item.date, 'h:mma')}`;
                    break;
                case 'click':
                    return `Clicked`;
                    break;
                case 'open':
                    return `Read / Opened`;
                    break;
                case 'error':
                    return `Error sending to ${this.item.email}`;
                    break;
                default:
                    break;

            }
        }
    }
}
</script>
<style scoped>
    .timeline-entry {
        cursor: pointer;;
    }
</style>