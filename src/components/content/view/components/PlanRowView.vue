<template>
    <tr :class="type">
        <th class="duration-cell">
            <div class="cell">
                <div>{{row.time}}</div>
                <div class="sm muted"><em>{{row.duration | mins}}</em></div>
            </div>
        </th>
        <td>
            <v-layout>
                <v-flex>
                    <div class="row-title"><div class="cell"><strong class="row-title-text">{{row.title}}</strong></div></div>
                </v-flex>
                <div v-if="type == 'song'"><div class="row-song-key cell">{{row.key}}</div></div>
            </v-layout><div class="row-detail" v-if="row.detail && (type != 'breaker') && (type != 'start')"><div class="cell"><div v-html="row.detail"></div></div></div>
        </td>
        <td :key="column.key"  v-for="column in columns">
             <div class="cell" v-html="row.notes[column.key]">
                
             </div>
        </td>
    </tr>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

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
    data() {
        return {
            actionsOpen: false,
            row: this.value,
        }
    },
    created() {
        if (!this.row.notes) {
            this.row.notes = {};
        }
    },
    computed: {
        type() {
            return this.row.type;
           
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

.duration-cell {
    font-weight: normal;
}
</style>