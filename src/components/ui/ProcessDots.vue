<template>
    <div class="process-dots" v-if="linear">
        <!-- <pre>{{states}}</pre> -->
        <!-- <pre>{{mapped}}</pre> -->
        <!-- <v-layout> -->
            <!-- <v-flex > -->
                <span class="pill" v-tippy :content="state.title" :key="state.key" v-for="state in mapped" :style="{color:state.color}">
                    <fluro-icon :icon="state.icon" :library="state.library" />
                </span>
            <!-- </v-flex> -->
        <!-- </v-layout> -->
    </div>
</template>
<script>
export default {
    props: {
        card: {
            type: Object,
        },
        definition: {
            type: Object,
        }
    },
    data() {
        return {
            model: this.card,
            //JSON.parse(JSON.stringify(this.value)),
        }
    },
    // watch:{
    //     value(v) {
    //         this.model = JSON.parse(JSON.stringify(v));
    //     },
    // },
    computed: {
        linear() {

            // console.log('IS LINEAR?', this.definition.data);
            return _.get(this.definition, 'data.mode') != 'lanes';
        },
        mapped() {

            var self = this;

            return _.chain(self.states)
                .map(function(state) {

                    state = JSON.parse(JSON.stringify(state));

                    if (state.style == 'waiting') {
                        return;
                    }

                    state.result = self.results[state.key];

                    switch (state.result) {
                        case 'complete':
                            state.icon = 'check-circle';
                            state.library = 'fas';
                            state.color = 'green';
                            break;
                        case 'pending':
                            state.icon = 'minus-circle';
                            state.library = 'fas';
                            state.color = 'orange';
                            break;
                        case 'failed':
                            state.icon = 'exclamation-circle';
                            state.library = 'fas';
                            state.color = 'red';
                            break;
                        default:
                            if (self.model.state == state.key) {
                                state.icon = 'dot-circle';
                                state.library = 'far';
                            } else {
                                state.icon = 'circle';
                                state.library = 'far';
                                state.color = '#aaa';
                            }
                            break;
                    }
                    return state;

                })
                .compact()
                .value();
        },
        states() {
            return (_.get(this.definition, 'data.states') || []);
        },
        results() {
            return this.model.results;
        },
    },
}

</script>
<style lang="scss" scoped>
.process-dots {
    font-size: 12px;
}

</style>
