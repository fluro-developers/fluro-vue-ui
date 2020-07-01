<template>
    <div class="assignment-list-item" :class="confirmationStatus">
        <v-layout align-center>
            <v-flex shrink class="face">
                <v-progress-circular indeterminate v-if="isLoading" />
                <fluro-avatar md :id="contact._id" v-else />
            </v-flex>
            <v-flex>
                <strong>{{contactName}}</strong>
                <div class="summary">{{summary}}</div>
            </v-flex>
            <v-flex shrink >
                <div class="btn-group" v-if="!model.sending">
                    <span class="btn" v-if="sendable" xs @click.stop.prevent="send()">
                        <fluro-icon icon="paper-plane" />
                    </span>
                    <span class="btn" v-else @click.stop.prevent="$actions.open([model])" xs>
                                <fluro-icon icon="ellipsis-h" />
                            </span>
                    <span class="btn" xs @click.stop.prevent="remove()">
                        <fluro-icon icon="times" />
                    </span>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    props: {
        value: {
            type: Object,
        }
    },
    data() {
        return {
            model: this.value,
        }
    },
    methods: {
        remove() {
            console.log('REMOVE')
            this.$emit('unassign', this.model);
        },
        send() {
            console.log('SEND')
            this.$emit('send', this.model);
        }
    },
    watch: {
        value(val) {
            this.model = val;
        },
    },
    computed: {
        contactName() {
            return this.model.contact && this.model.contact.title ? this.model.contact.title : this.model.contactName;
        },
        sendable() {
            return this.model.confirmationStatus == 'proposed';
        },
        isLoading() {
            var self = this;
            return self.model.sending;
        },
        summary() {
            switch (this.confirmationStatus) {
                case 'denied':

                    return this.model.description && this.model.description.length ? this.model.description : `Unavailable`;
                    break;
                case 'confirmed':
                    return 'Confirmed.'
                    break;
                case 'unknown':
                    return 'Notified. Awaiting response.'
                    break;
            }
        },
        contact() {
            return this.model.contact;
        },
        confirmationStatus() {
            return this.model.confirmationStatus;
        }
    }
}
</script>
<style lang="scss">
.assignment-list-item {
    // display: flex;
    position: relative;
    padding: 7px 10px;
    border: 1px solid rgba(#000, 0.1);
    border-bottom: none;

    line-height: 1.4;

    &:first-child {
        border-radius: 3px 3px 0 0;
    }


    &:last-child {
        border: 1px solid rgba(#000, 0.1);
        border-radius: 0 0 3px 3px;
    }

    .face {
        flex: none;
        padding-right: 10px;
    }

    .summary {
        font-size: 0.8em;
        opacity: 0.5;
    }


    &.denied {
        color: darken($danger, 10%);
        border-color: rgba(darken($danger, 10%), 0.3);
        background: lighten($danger, 41%);
    }

    &.confirmed {
        color: darken($success, 10%);
        border-color: rgba(darken($success, 10%), 0.3);
        background: lighten($success, 40%);
    }

    &.warning {
        background: desaturate(rgba($warning, 0.05), 15%);
        color: desaturate(darken($warning, 10%), 15%);
        border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);
        font-style: italic;
    }

    &.proposed {
        background: desaturate(lighten($primary, 45%), 5%);
        color: desaturate(darken($primary, 10%), 15%);
        border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);
    }

    &.unknown {
        color: rgba(#000, 0.7);
        background: #fff;
    }
}
</style>