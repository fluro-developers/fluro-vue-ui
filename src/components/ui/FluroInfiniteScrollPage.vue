<template>
    <div class="infinite-page" :id="`page-${index}`">
        <slot v-bind:page="page" />
    </div>
</template>
<script>
export default {
    props: {
        page: {
            required: true,
        },
        index: {
            required: true,
        },
    },
    data() {
        return {
            
            //THIS IS IF YOU WANT TO HIDE PAGES NOT ON THE SCREEN FOR PERFORMANCE}
            active:true,
            // active: false,//true,//false,
        }
    },
    computed: {
        pageID() {
            return `page-${this.index}`;
        },
    },
}
</script>
<style scoped lang="scss">
</style>