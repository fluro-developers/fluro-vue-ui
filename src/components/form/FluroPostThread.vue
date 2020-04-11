<template>
    <div class="fluro-post-thread">
        <!-- <pre>{{model}}</pre> -->
        <template v-for="post in model">
            <!-- {{post._id}} POST -->
            <!-- <pre>{{post}}</pre> -->
            
            <slot name="post" :post="post"></slot>
        
        </template>
    </div>
</template>
<script>
import _ from 'lodash';
import { mapFields } from 'vuex-map-fields';

//////////////////////////////////////////////////

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
       
        ...mapFields('fluro', [
            'application', //The Fluro application and all of it's permissions and data
            'user', //The authenticated user if they log in
        ]),
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