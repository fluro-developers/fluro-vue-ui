<template>
    <div class="accordion">

        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Object
        },
        activePanel: {
            type: Number,
        }
    },
    provide() {
        return {
            panels: this.panels,
            activePanelIndex: this.activePanelIndex,
            selectPanel: this.selectPanel,
        }
    },
    data() {
        return {
            panels: [],
            activePanelIndex: this.activePanel || 0,
        }
    },
    watch: {
        activePanel: 'selectPanel',
    },
    methods: {
        selectPanel(index) {

            console.log('SELECT PANEL', index);

            var self = this;

            index = Math.max(index, 0);
            index = Math.min(index, self.panels.length - 1);

            self.activePanelIndex = index;
            // menuElement.scrollTo({
            //     // top: 100,
            //     left: target,
            //     behavior: 'smooth'
            // });

            _.each(self.panels, function(tab, index) {
                tab.active = (index == self.activePanelIndex);
            })
        }
    },
}
</script>
<style lang="scss">
.accordion {}
</style>