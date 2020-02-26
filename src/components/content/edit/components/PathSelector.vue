<template>
    <div>
        <v-layout row>
            <v-flex pr-0>
                <v-select v-model="model" :items="options" label="Key Value" item-value="key" item-text="title" :loading="loading ? 'primary' : false" style="overflow: hidden;white-space:nowrap">
                    <template v-slot:selection="{ item }" style="overflow: hidden;white-space:nowrap">
                        <span style="overflow: hidden;white-space:nowrap">{{ item.title }}</span>
                    </template>
                </v-select>
            </v-flex>
            <v-flex shrink px-0>
                <v-btn @click="toggle" flat block style="height: 44px">
                    <fluro-icon :icon="expanded ? 'chevron-down' : 'chevron-left'" />
                </v-btn>
            </v-flex>
        </v-layout>
        <div class="dropdown-box py-0" v-if="expanded">
            <v-text-field single-line v-model="model"></v-text-field>
        </div>
        <div class="muted mb-0" :style="expanded ? 'margin-top: -18px' : 'margin-top: -30px'">
        	{{model}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            model: this.value,
            expanded: false,
        }
    },
    watch: {
    	'model': function(val) {
    		return this.$emit('pathupdated', val)
    	},
    	'value': function(val) {
    		this.model = val;
    	}
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
}
</script>
<style scoped lang="scss">
.dropdown-box {
    width: 100%;
    margin-top: -44px
}

.hint-box {
	
}
</style>