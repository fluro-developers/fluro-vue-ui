<template>
    <!-- <div class="process-card" @click.stop.prevent="clicked" :class="statusClass">
        <fluro-card>
            <div class="color-block" :style="{backgroundColor:firstColor}" />
            <fluro-card-body>
                <v-layout>
                    <v-flex shrink>
                        <div class="process-icon" @click.stop.prevent="toggle">
                            <fluro-icon icon="spinner-third" spin v-if="card.processing" />
                            <template v-else>
                                <fluro-avatar md :id="contactID" v-if="contactID" type="contact"></fluro-avatar>    
                                <fluro-avatar md :id="personaID" v-if="personaID" type="persona"></fluro-avatar>    
                            </template>
                        </div>
                    </v-flex>
                    <v-flex>
                        <h5 class="text-capitalize">{{title}}</h5>
                        <div class="sm muted" v-if="definitionTitle">{{definitionTitle}}</div>
                        <div class="sm">{{taskSummary}}</div>
                        <em class="sm">{{message}}</em>
                        </v-flex>
                    <v-flex shrink class="hover">
                        <v-btn class="ma-0" @click.stop.prevent="showActions" icon small>
                            <fluro-icon icon="ellipsis-h" />
                        </v-btn>
                    </v-flex>
                </v-layout>
                <face-stack right :contacts="card.assignedTo"></face-stack>
            </fluro-card-body>
        </fluro-card>
    </div>
 -->
    <div class="process-state-card" :class="card.processStatus">
        <fluro-card>
            <div class="color-block" />
            <fluro-card-body>
                <div class="due-date" v-if="card.dueDate">
                    <fluro-icon icon="clock" /> {{dueText}}</div>
                <h5>{{card.title}}</h5>
                <div><strong>{{currentState.title}}</strong> <template v-if="mode == 'linear'"> - {{percent}}</template></div>
                <div>{{taskSummary}}</div>
                <div class="process-dots">
                    <span class="process-dot" v-tippy :content="state.title" :class="state.result" v-for="state in renderStates">
                        <fluro-icon :library="state.iconLibrary" :icon="state.icon" />
                        <!-- {{state.result}} -->
                    </span>
                </div>

                <!-- <pre>{{card}}</pre> -->
            </fluro-card-body>
        </fluro-card>
    </div>
</template>
<script>

import _ from 'lodash';

export default {

    props: {
        card: {
            type: Object,
            required: true,
        }
    },
    computed: {
    	taskSummary() {
            if (this.formsPending) {
                return `Awaiting ${this.formsPending} form response${this.formsPending == 1 ? '' : 's'}`
            }

            if (this.tasksIncomplete) {
                return `${this.tasksIncomplete} task${this.tasksIncomplete == 1 ? '' : 's'}`
            }

        },
        tasksIncomplete() {
            return parseInt(this.card.taskCount.incomplete);
        },
        formsPending() {
            return parseInt(this.card.taskCount.formsRequested) - parseInt(this.card.taskCount.formsCompleted);
        },
        processStatus() {
            return this.card.processStatus;
        },
        dueDate() {
            return this.card.dueDate;
        },
        dueText() {

            var self = this;

            if (!self.dueDate) {
                return;
            }

            switch (this.processStatus) {
                case 'complete':
                    return `Will progress ${self.$fluro.date.timeago(self.card.dueDate)}`;
                    break;

                default:
                    return `Due ${self.$fluro.date.timeago(self.card.dueDate)}`;
                    break;
            }

        },
        renderStates() {
            var self = this;
            return _.chain(self.states)
                .filter(function(state) {
                    return state.style != 'waiting';
                })
                .map(function(state) {

                    state.iconLibrary = 'fas';
                    var isActiveState = (state.key == self.state);
                    if (isActiveState) {
                        state.iconLibrary = 'far';
                        state.icon = 'dot-circle';
                        return state;
                    }

                    switch (state.result) {
                        case 'failed':
                            state.icon = 'exclamation-circle';
                            break;
                        case 'complete':
                            state.icon = 'check-circle';
                            break;
                        default:
                            state.icon = 'circle';
                            state.iconLibrary = 'far';
                            break;
                    }

                    return state;
                    // var match = self.stateLookup[state.key];
                    // return 
                })
                .value();
        },
        currentStep() {
        	return _.findIndex(this.states, { key: this.state });
        	// var currentIndex = _.findIndex(this.states, { key: this.state });
        	// var currentRenderIndex = _.findIndex(this.renderStates, { key: this.state });

         //    if(currentRenderIndex == -1) {
         //    	return _.finst
         //    }

         //    return currentRenderIndex;
        },
        totalSteps() {
            return this.states.length;
        },
        percent() {



            // console.log('Get percentage', currentStep, total)
            return Math.ceil((this.currentStep / this.totalSteps) * 100) + '%';
        },
        currentIndex() {
            return _.findIndex(this.states, { key: this.state });
        },
        state() {
            return this.card.state;
        },
        states() {
            return this.card.states;
        },
        mode() {
            return this.card.mode;
        },
        stateLookup() {
            return _.reduce(this.card.states, function(set, state) {

                set[state.key] = state;

                return set;
            }, {});
        },
        currentState() {

            var self = this;
            var matchingState = _.find(self.states, { key: self.state })

            if (!matchingState) {
                return {
                    title: 'Stuck / Limbo',
                    key: '_limbo',
                }
            }

            return matchingState;
        }
    }
}
</script>
<style lang="scss">
.process-state-card {
    // padding: 10px;
    // border-radius: 4px;
    // background: #fff;
    // border: 1px solid rgba(#000, 0.1);
    // margin-bottom: 5px;

    // @extend .no-select;

    .fluro-card {
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 3px rgba(#000, 0.1);
        // padding-left: 50px;
        // max-width: 280px;
    }


    .due-date {
        font-style: italic;
        float: right;
    }

    .color-block {
        width: 3px;
        top: 0;
        left: 0;
        bottom: 0;
        position: absolute;
    }

    .fluro-card-body {
        padding: 10px;
    }


    &.archived {
        .fluro-card {
            opacity: 0.5;
            background: none;
        }
    }

    &.complete {
        .fluro-card {
            color: darken($success, 10%);
            background: lighten($success, 40%);
            border-color: rgba($success, 0.1);

            .color-block {
                background: linear-gradient(#89e10c, #16d3ad) !important;
            }
        }
    }



    &.pending {
        .fluro-card {
            color: darken($warning, 10%);
            background: lighten($warning, 30%);
            border-color: rgba($warning, 0.1);

            .color-block {
                background: linear-gradient($warning, $warning) !important;
            }
        }
    }

    &.failed,
    &.overdue {
        .fluro-card {
            color: darken($danger, 10%);
            background: lighten($danger, 41%);
            border-color: rgba($danger, 0.1);


            &:before {
                display: block;
                background: linear-gradient(#ff4d83, #ff003c);
                animation-name: pulse_opacity;
                animation-duration: 3s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }



            .color-block {
                background: linear-gradient(#ff4d83, #ff003c) !important;
            }
        }
    }
}

.process-dots {
    display: block;
    white-space: nowrap;

    &.process-dots-flex {
        display: flex;
    }

    .process-dot {
        // border-radius: 100px;
        // display: inline-block;
        // background: rgba(#000, 0.1);
        // color: #fff;
        // padding:5px;
        // flex:1;
        // margin-right:1px;
        color: rgba(#000, 0.3);

        &.failed {
            color: $danger;
        }

        &.pending {
            color: $warning;
        }

        &.complete {
            color: $success;
        }
    }
}
</style>