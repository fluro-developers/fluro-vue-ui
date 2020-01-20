<template>
    <tr :class="type">
        <th class="handle">
            <v-btn class="ma-0" icon small>
                <fluro-icon class="dragger" icon="arrows" />
            </v-btn>
        </th>
        <td class=" duration-cell">
            <!-- <pre>{{teams}}</pre> -->
            <fluro-inline-edit :enabled="row.editDuration" v-if="type != 'breaker'">
                <template v-slot:default>
                    <div class="cell">
                        <div>{{rowTime(index)}}</div>
                        <div class="sm muted"><em>{{row.duration | mins}}</em></div>
                    </div>
                </template>
                <template v-slot:edit="{props, blur, focus}">
                    <duration-picker @focus="focus($event)" @keyup.enter="blur" @blur="blur" v-model="row.duration" />
                </template>
            </fluro-inline-edit>
        </td>
        <td>
            <v-layout>
                <v-flex>
                    <div class="row-title">
                        <fluro-inline-edit :enabled="row.editTitle">
                            <template v-slot:default>
                                <div class="cell">
                                    <strong class="row-title-text">{{row.title}}</strong>
                                </div>
                            </template>
                            <template v-slot:edit="{props, blur, focus}">
                                <input ref="title" @focus="focus($event)" @keyup.enter="blur" @blur="blur" v-model="row.title" />
                            </template>
                        </fluro-inline-edit>
                    </div>
                </v-flex>
                <div  v-if="type == 'song'">
                    <select  class="row-song-key cell" placeholder="Select a Key" v-model="row.key">
                        <option value="">(Select Key)</option>
                        <option :value="key" v-for="key in songKeys">{{key}}</option>
                    </select>
                    <!-- <fluro-inline-edit :enabled="row.editKey">
                        <template v-slot:default>
                            <div class="cell">({{row.key || 'Select a Key'}})</div>
                        </template>
                        <template v-slot:edit="{props, blur, focus}">
                            <select class="row-song-key" placeholder="Select a Key" v-model="row.key">
                                <option :value="key" v-for="key in songKeys">{{key}}</option>
                            </select>
                        </template>
                    </fluro-inline-edit> -->
                </div>
            </v-layout>
            <div class="row-detail" v-if="type != 'breaker'">
                <fluro-inline-edit :enabled="row.editDetail">
                    <template v-slot:default>
                        <div class="cell" v-if="row.detail">
                            <div v-html="row.detail"></div>
                        </div>
                        <div class="cell placeholder" v-else>Click here to add extra details</div>
                    </template>
                    <template v-slot:edit="{props, blur, focus}">
                        <fluro-editor @focus="focus" @blur="blur" v-model="row.detail" :options="detailBodyOptions" placeholder="Add extra detail and notes" />
                    </template>
                </fluro-inline-edit>
            </div>
        </td>
        <column-cell :column="column" :row="row" :key="column.key" v-model="row.notes[column.key]" v-for="column in columns" />
        <th style="padding:0;">
            <!-- style="padding:0;" -->
            <v-menu attach :nudge-left="10" offset-x left :bottom="index < plan.schedules.length/2" :top="index > plan.schedules.length/2" v-model="actionsOpen" transition="slide-x-transition">
                <template v-slot:activator="{ on }">
                    <!-- <div class="cell" v-on="on" > -->
                    <v-btn class="ma-0" v-on="on" icon>
                        <fluro-icon v-if="actionsOpen" icon="times" />
                        <fluro-icon v-else icon="ellipsis-v" />
                    </v-btn>
                    <!-- </div> -->
                </template>
                <div style="background: #fff; width:250px; text-align: left;">
                    <v-list dense>
                        <v-list-tile disabled>
                            <v-label style="overflow:hidden; text-overflow: ellipsis; white-space: nowrap;">
                                <fluro-icon type="plan" left />{{row.title}}
                            </v-label>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile @click="swap()" v-if="row.type =='song'">
                            <!-- <v-list-tile-content> -->
                            <fluro-icon icon="retweet" left />Replace song
                            <!-- '{{row.title}}' -->
                            <!-- </v-list-tile-content> -->
                        </v-list-tile>
                        <v-list-tile @click="action.click" v-for="action in availableActions">
                            <!-- <v-list-tile-content> -->
                            <fluro-icon :icon="action.icon" left />{{action.title}}
                            <!-- </v-list-tile-content> -->
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile @click="remove()">
                            <!-- <v-list-tile-content> -->
                            <fluro-icon icon="trash-alt" left />Delete
                            <!-- '{{row.title}}' -->
                            <!-- </v-list-tile-content> -->
                        </v-list-tile>
                    </v-list>
                </div>
            </v-menu>
        </th>
    </tr>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroInlineEdit from '../../../form/FluroInlineEdit.vue';
import FluroEditor from '../../../form/FluroEditor.vue';
import DurationPicker from './DurationPicker.vue';

// import draggable from 'vuedraggable';

// import FluroEditor from '../../../form/FluroEditor.vue';
// import FluroInlineEdit from '../../../form/FluroInlineEdit.vue';
// import FluroContentEditMixin from '../FluroContentEditMixin';


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////



let ColumnCell = Vue.extend({
    props: {
        'value': {
            type: String,
        },
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'index':{
            type:Number,
        }
    },
    data() {
        return {
            model: this.value,

        }
    },
    components: {
        FluroInlineEdit,
        FluroEditor,
    },

    computed: {

        detailBodyOptions() {
            return {
                disable: {
                    bubble: false,
                    bar: true,
                }
            };
        },
        placeholder() {
            return `${this.column.title} Notes`;
        },
        input: {
            get() {
                var self = this;
                return self.model
            },
            set(input) {
                var self = this;
                self.model = input;
                self.$emit('input', self.model)
            }
        }
    },
    template: `
    <td>
    <fluro-inline-edit v-if="row.type != 'breaker'">
        <template v-slot:default>
            <div class="cell " v-html="model"></div>
        </template>
        <template v-slot:edit="{props, blur, focus}">
            <fluro-editor @focus="focus" @blur="blur" v-model="input" :options="detailBodyOptions" :placeholder="placeholder" />
        </template>
    </fluro-inline-edit>
    </td>`,
});


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////



export default {
    props: {
        'value': {
            type: Object,
        },
        'index': {
            type: Number,
        },
        'plan': {
            type: Object,
        },
        // 'teams': {
        //     type:Array,
        // }
    },
    components: {
        ColumnCell,
        FluroInlineEdit,
        FluroEditor,
        DurationPicker,
    },
    watch: {
        value(val) {
            this.row = val;
        },
    },
    mounted() {

        var self = this;
        self.$nextTick(function() {
            console.log('MOUNTED', self.row.isNew, self.$refs.title)
            if (self.row.isNew) {
                // delete self.row.isNew;
                if (self.$refs.title) {
                    self.$refs.title.focus()
                    self.$refs.title.select();
                    console.log('ADDED')
                }
            }

        })




    },
    data() {
        return {
            actionsOpen: false,
            row: this.value,
            added: false,
        }
    },
    created() {
        if (!this.row.notes) {
            this.row.notes = {};
        }
    },
    methods: {
        swap() {
            if(this.row.type != 'song') {
                return;
            }
            this.$emit('swap');

        },
        remove() {
            this.$emit('delete');
        },
        rowTime(index) {
            var self = this;
            var total = 0;
            var elapsed = _.reduce(self.plan.schedules, function(memo, row, key) {

                if (key >= index) {
                    return memo;
                }

                if (row.duration) {
                    memo += (parseInt(row.duration) * 1000);
                }

                return memo;
            }, 0)

            // var previousRow = self.model.schedules[index - 1];
            // if (previousRow && !previousRow.duration) {
            //     return '';
            // }

            //When the plan starts
            var eventStartDate = _.get(self.plan, 'event.startDate');
            var planStartDate = _.get(self.plan, 'startDate');
            
            var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); 
            startDate.setTime(startDate.getTime() + elapsed);
            return self.$fluro.date.formatDate(startDate, 'h:mma');
        },
    },
    computed: {
        songKeys() {
            return [
                "C",
                "Db",
                "D",
                "Eb",
                "E",
                "F",
                "Gb",
                "G",
                "Ab",
                "A",
                "Bb",
                "B",
            ]
        },
        availableActions() {

            var self = this;

            return [{
                    title: 'Add Row',
                    icon: 'plus',
                    click() {
                        self.$emit('add', { index: self.index, type: 'item' })
                    }
                },
                {
                    title: 'Add Songs',
                    icon: 'music',
                    click() {
                        self.$emit('add', { index: self.index, type: 'song' })
                    }
                },
                {
                    title: 'Add Section',
                    icon: 'megaphone',
                    click() {
                        self.$emit('add', { index: self.index, type: 'breaker' })
                    }
                },
                {
                    title: 'Duplicate this row',
                    icon: 'copy',
                    click() {
                        self.$emit('duplicate')
                    }
                },
            ]
        },
        type() {
            return this.row.type;
            // switch(this.row.type) {
            //     case 'breaker':
            //     break;
            // }
        },
        detailBodyOptions() {
            return {
                disable: {
                    bubble: false,
                    bar: true,
                }
            };
        },
        teams() {
            return this.plan.teams;
        },
        columns() {
            var self = this;
            return _.map(self.teams, function(team) {
                return {
                    title: team,
                    key: team,
                }
            });
        },
    },
    filters: {
        mins(sec_num) {
            if (!sec_num) {
                return '';
            }
            /////////////////////////////////////

            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            /////////////////////////////////////

            //Clear string if 0
            hours = (hours ? hours : '');
            minutes = (minutes ? minutes : '');
            seconds = (seconds ? seconds : '');

            /////////////////////////////////////

            function pad(str) {
                return ("0" + str).slice(-2);
            }


            /////////////////////////////////////
            /////////////////////////////////////

            if (hours) {
                return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            }

            // if (minutes && seconds) {
            //     return `${pad(minutes)}:${pad(seconds)}`;
            // }
            if (minutes && seconds) {
                return `${minutes}m ${seconds}s `;
            }

            if (minutes) {
                return `${minutes} mins`;
            }

            return `${seconds}s`;

        },
    },

}
</script>
<style lang="scss">


</style>