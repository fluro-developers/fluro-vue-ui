<template>
    <!-- <v-checkbox v-model="model" :label="label" @click="$emit('click')"></v-checkbox> -->
        <span class="display-inline" @click="$emit('click')">
        <fluro-icon icon="check-square" library="fas" class="checked" v-if="isChecked" />
        <fluro-icon icon="square" class="unchecked" v-else />
        {{label}}
    </span>
</template>
<script>
import { Layout, FluroIcon } from 'fluro-vue-ui';

/////////////////////////////////

export default {
    props: {
        isChecked: {
            type: Boolean,
        },
        label: {
            type: String,
            default: '',
        }
    },
    components: {
    },
    data() {
        return {
        }
    },
    created() {

    },
    watch: {

    },
    methods: {

    },
    computed: {

    },
}
</script>
<style>
.display-inline {
    display: inline-block;
    cursor: pointer;
}
</style>