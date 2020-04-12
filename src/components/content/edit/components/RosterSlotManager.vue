<template>
    <v-layout row @click.native="$emit('selectcell')">
        <v-flex class="slot-title sm4" :class="{dynamic: model.dynamic}" shrink>
                <div class="slot-attributes">
                    <span class="h4 position-title">{{model.title}}</span>
                    <fluro-icon v-tippy content="Opt out is disabled" icon="times-square" class="brand-danger" v-if="model.optOutBehaviour == 'disabled'" />
                    <fluro-icon v-tippy content="Autoconfirm" icon="check-square" class="brand-success" v-if="model.confirmationBehaviour == 'confirm'" />
                    <fluro-icon v-tippy content="Requires Capabilities" icon="exclamation-square" class="brand-warning" v-if="model.requireCapabilities && model.requireCapabilities.length" />
                </div>
            </span>
            <roster-slot-placeholder-cell v-model="model" />
        </v-flex>
        <v-flex class="sm8">
            <roster-slot-cell :position="model" :definition="definition.data" :roster="roster" @click.native="$emit('selectcell')" :selected="selected" />
        </v-flex>
    </v-layout>
</template>
<script>
import RosterSlotPlaceholderCell from './RosterSlotPlaceholderCell.vue';
import RosterSlotCell from './RosterSlotCell.vue';
export default {
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        definition: {
            required: false,
        },
        value: {
            type: Object,
            required: true
        },
        roster: {
            type: Object,
            required: true
        },
    },
    components: {
        RosterSlotPlaceholderCell,
        RosterSlotCell
    },
    methods: {},
    data() {
        return {
            model: this.value
        }
    }
}
</script>
<style lang="scss">
.slot-attributes {
    line-height: inherit;

    .brand-success {
        color: $success;
    }

    .brand-danger {
        color: $danger;
    }

    .brand-warning {
        color: $warning;
    }
}

.position-title {
    text-transform: none;
    margin-right: 10px;
}
</style>