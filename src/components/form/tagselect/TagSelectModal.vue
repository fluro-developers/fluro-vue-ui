<template>
    <div>
    </div>
</template>
<script>
import ModalMixin from 'src/mixins/ModalMixin';
import FluroTabset from 'src/components/ui/tabset/FluroTabset.vue';
import FluroTab from 'src/components/ui/tabset/FluroTab.vue';

export default {
    props: {
        options: {
            type: Object
        }
    },
    components: {
        FluroTabset,
        FluroTab,
    },
    mixins: [ModalMixin],
    data() {
        return {
            selector: this.options.selector,
        }
    },
    // methods: {
    //     isSelected(item) {
    //         return this.selector.isSelected(item);
    //     },
    //     toggleRealm(item) {
    //         return this.selector.toggleRealm(item);
    //     },
    // },
    // computed: {
    //     title() {
    //         var self = this;
    //         var plural = 'Realms';

    //         if(self.tree.length == 1) {
    //             plural  = self.tree[0].plural;
    //         } 
    //         return `Select ${plural}`;
    //     },
    //     selection() {
    //         return this.selector.selection;
    //     },
    //     tree() {
    //         return this.selector.tree;
    //     },
    //     loading() {
    //         return this.selector.loading;
    //     },
    //     ids() {
    //         return this.$fluro.utils.arrayIDs(this.options.items);
    //     },
    // },
}
</script>
<style lang="scss">

.tag-select-modal {
    
}
</style>