<template>
    <!-- <div> -->
        <!-- {{type}} {{iconName}} -->
    <font-awesome-icon :spin="spin" fixed-width :icon="iconName" v-if="iconName"></font-awesome-icon>
<!-- </div> -->
</template>
<script>

export default {
    props:{
        'type':{
            type:String,
        },
        'icon':{
            type:String,
        },
        'library':{
            type:String,
            default() {
                return this.$fluro.global.defaultIconLibrary || 'fas';
            }
        },
        'spin':{
            type:Boolean,
        }
    },
    computed: {
        fontLibrary() {
            return this.library || this.$fluro.global.defaultIconLibrary || 'fas';
        },
        iconName() {
            if(this.icon) {
                return [this.fontLibrary, this.icon];
            } else {
                return this.$fluro.types.icon(this.type, this.fontLibrary) || [this.fontLibrary, this.type];
            }
        },
    }
}
</script>
<style scoped lang="scss">
* {
    [left] {
        margin-right:10px;
    }

    [right] {
        margin-left: 10px;
    }
}
</style>