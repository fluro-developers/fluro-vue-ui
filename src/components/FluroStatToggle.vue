<template>
    <span class="fluro-stat-toggle">
        <!-- {{statting ? 'statting' : ''}} -->
        <!-- {{statted ? 'statted' : ''}} -->
        <slot :statting="statting" :toggle="toggle" :increment="increment" :decrement="decrement" :statted="statted" :store="store">
            <!-- Default -->
            <a @click="toggle" :class="{active:statted}">{{readable}}</a>
        </slot>
    </span>
</template>
<script>
// import _ from 'lodash';




export default {
    props: {
        'target': {
            type: [String, Object],
            required: true,
        },
        'stat': {
            type: String,
            required: true,
        }
    },
    watch: {
        'target': 'reset',
        'stat': 'reset',
    },
    data() {

        var store = this.$fluro.stats.getUserStore(this.stat, true)

        return {
            store: store,
            statting: false,
            statted: false,
        }


    },
    created() {
        this.reset();
    },
    methods: {
        reset() {
            var self = this;

            if(self.store) {
                self.store.removeEventListener('change', self.update);
            }

            //Stat Store
            self.statted = self.store.isStatted(self.targetID);
            self.statting = self.store.isStatting(self.targetID);
            self.store.addEventListener('change', self.update);
            self.store.refresh();
        },
        update() {
            var self = this;

            //console.log('check', self.target, self.targetID);
            self.statting = self.store.isStatting(self.targetID);
            self.statted = self.store.isStatted(self.targetID)
            //console.log('Updated stats', self);//vm.stat, vm.target);//self.stat, self.targetID, self.statting, self.statted);
        },
        toggle() {
            var self = this;

            //Set statting to true
            self.statting = true;

            self.store.toggle(self.targetID).then(function(res) {
                    self.statted = self.store.isStatted(self.targetID);
                    self.statting = false;
                    self.$emit('statted', res.data);
                })
                .catch(function(err) {
                    self.statting = false;
                    self.statted = self.store.isStatted(self.targetID) || false;
                });
        },
        increment() {},
        decrement() {}
    },
    beforeDestroy() {

        this.store.removeEventListener('change', this.update);
    },
    computed: {
        pastTense() {

            var statString = this.stat;
            var lastCharacter = statString[statString.length];

            if (lastCharacter == 'e') {
                return `${statString}d`;
            } else {
                return `${statString}ed`;
            }
        },
        readable() {

            if (this.statting) {
                return `processing`;
            } else {
                if (this.statted) {
                    return this.pastTense;
                } else {
                    return this.stat;
                }
            }

        },
        targetID() {
            return this.$fluro.utils.getStringID(this.target);
        },
        // statted() {
        //     return this.store.isStatted(self.targetID)
        // },
        // statting() {
        //     return this.store.isStatting(self.targetID)
        // },
        // total() {
        //     return this.store.ids.length;
        // },
        // pinIcon() {
        //     if (!this.itemID) {
        //         return ['far', 'thumbtack'];
        //     }

        //     if (this.statting) {
        //         return ['far', 'spinner-third']
        //     }

        //     if (this.statted) {
        //         return ['fas', 'thumbtack']
        //     } else {
        //         return ['far', 'thumbtack']
        //     }
        // },
    },

}
</script>
<style scoped lang="scss">
</style>