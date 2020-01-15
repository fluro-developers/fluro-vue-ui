<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true">
            <!-- <template v-slot:menuprefix v-if="model._id"> -->
            <!-- <div class="event-cover-image" :style="{backgroundImage:`url(${coverImage})`}"/> -->
            <!-- <fluro-image cover :spinner="true" :height="150" :item="coverImage"/> -->
            <!-- </template> -->
            <tab heading="Plan">
                <!-- <slot> -->
                <!-- <flex-column-body style="background: #fafafa;"> -->
                <!-- <v-container class="grid-list-xl"> -->
                <div id="table-scroll" class="plan-table table-scroll">
                    <table id="main-table" class="main-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th class="shrink">
                                    <fluro-icon icon="clock" />
                                </th>
                                <th class="detail">Detail</th>
                                <th v-for="column in columns">{{column.title}}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <!-- <tbody> -->
                        <draggable tag="tbody" v-model="model.schedules" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                            <tr v-for="(row, index) in model.schedules" :class="" :key="row.id">
                                <th>
                                    <!-- <v-btn class="ma-0" small icon> -->
                                    <fluro-icon icon="arrows" />
                                    <!-- </v-btn> -->
                                </th>
                                <td class="duration">
                                    <fluro-inline-edit :enabled="row.editDuration">
                                        <template v-slot:default>
                                            <div class="sm">{{rowTime(index)}}</div>
                                            <div class="sm muted"><em>{{row.duration | mins}}</em></div>
                                        </template>
                                        <template v-slot:edit="{props, blur, focus}">
                                            <duration-picker @focus="focus($event)" @keyup.enter="blur" @blur="blur" v-model="row.duration" />
                                            <!-- <input type="number" min="0" @focus="focus($event)" @keyup.enter="blur" @blur="blur" select-on-focus pattern="[0-9]*" placeholder="Duration (mins)" v-model="row.duration" inputmode="numeric"> -->
                                        </template>
                                    </fluro-inline-edit>
                                </td>
                                <td>
                                    <fluro-inline-edit :enabled="row.editTitle">
                                        <template v-slot:default>
                                            <strong>{{row.title}}</strong>
                                        </template>
                                        <template v-slot:edit="{props, blur, focus}">
                                            <input @focus="focus($event)" @keyup.enter="blur" @blur="blur" v-model="row.title" />
                                        </template>
                                    </fluro-inline-edit>
                                    <fluro-inline-edit :enabled="row.editDetail">
                                        <template v-slot:default>
                                            <div class="sm" v-html="row.detail"></div>
                                        </template>
                                        <template v-slot:edit="{props, blur, focus}">
                                            <fluro-editor @focus="focus($event)" @blur="blur" v-model="row.detail" :options="detailBodyOptions" placeholder="Add extra detail and notes" />
                                        </template>
                                    </fluro-inline-edit>
                                    <!-- <div class="wrap">
                                        <fluro-inline-edit>
                                            <template v-slot:default>
                                                <div class="sm" v-html="row.detail"></div>
                                            </template>
                                            <template v-slot:edit="{props, blur, focus}">
                                                <fluro-editor @focus="focus($event)" @blur="blur" v-model="row.detail" :options="detailBodyOptions" placeholder="Add extra detail and notes" />
                                                <input block @focus="focus($event)" @blur="blur" placeholder="Extra details and notes" @input="update" v-model="row.detail" @keyup.enter="blur" />
                                            </template>
                                        </fluro-inline-edit>
                                    </div> -->
                                </td>
                                <column-cell :column="column" :row="row" v-for="column in columns" />
                                <!-- <td v-for="column in columns">{{row.notes[column.key]}}</td> -->
                                <th>
                                    <!-- <v-btn class="ma-0" small icon> -->
                                    <fluro-icon icon="ellipsis-v" />
                                    <!-- </v-btn> -->
                                </th>
                            </tr>
                        </draggable>
                        <!-- </tbody> -->
                        <tfoot>
                            <tr>
                                <th></th>
                                <td></td>
                                <td></td>
                                <th v-for="column in columns"></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <flex-column-footer style="height:400px; overflow: auto;">
                    <pre>{{model.schedules}}</pre>
                </flex-column-footer>
                <!-- </v-container> -->
                <!-- </flex-column-body> -->
                <!-- </slot> -->
            </tab>
            <tab :heading="`${definition.title} details`" v-if="definition">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>{{definition.title}}</h3>
                                <!-- <pre>{{model.data}}</pre> -->
                                <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                </fluro-content-form>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import draggable from 'vuedraggable';

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroInlineEdit from '../../../form/FluroInlineEdit.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';





let DurationPicker = Vue.extend({
    props: {
        'value': {
            type: [Number, String],
        },
    },
    data() {
        return {
            model: parseInt(this.value || 0),
        }
    },
    computed: {

        number: {
            get() {
                return this.$fluro.utils.hhmmss(this.model);
            },
            set(input) {

                var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);
                if (matches) {
                    input = +matches[1] * (60 * 60) + +matches[2] * 60 + +matches[3];
                    this.model = input;

                    this.$emit('input', this.model);
                }
            }
        }
    },
    template: `<input @focus="$emit('focus')" @blur="$emit('blur')" @keyup.enter="$emit('blur')" pattern="[0-9]*" placeholder="Duration (mins)" inputmode="numeric" v-model="number"/>`,
});

//////////////////////////////////////////////////////


let ColumnCell = Vue.extend({
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
    },
    components: {
        FluroInlineEdit,
    },
    created() {
        if (!this.row.notes) {
            this.row.notes = {};
        }
    },
    computed: {

        notes() {
            return this.row.notes;
        },
        value() {
            var self = this;
            return self.notes[self.column.key];
        }
    },
    template: `
    <td>
    <fluro-inline-edit >
    </fluro-inline-edit>
    </td>`,
});

/////////////////////////////////

export default {
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
    components: {
        draggable,
        FluroInlineEdit,
        FluroEditor,
        DurationPicker,
        ColumnCell,
    },
    props: {

    },
    mixins: [FluroContentEditMixin],
    methods: {
        rowTime(index) {
            var self = this;
            var total = 0;
            var elapsed = _.reduce(self.model.schedules, function(memo, row, key) {

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
            var startDate = new Date(); //$scope.defaults.startDate);
            startDate.setTime(startDate.getTime() + elapsed);
            return self.$fluro.date.formatDate(startDate, 'h:mma');
        },
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
        startTime() {
            return
        },
        teams() {
            var self = this;
            return self.model.teams;
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
    data() {

        var array = []
        _.times(200, function() {
            array.push({
                id: array.length,
            })
        })


        return {
            drag: false,
            dragOptions: {},
            array,

        }
    },
}
</script>
<style lang="scss">
.plan-table {
    table td {
        .fluro-editor-textarea {
            min-height: 80px;

            &>div {
                border-radius: 3px;
                padding: 3px;
            }
        }
    }
}
</style>
<style scoped lang="scss">
.table-scroll {
    flex: 1;
    position: relative;
    width: 100%;
    z-index: 1;
    margin: auto;
    overflow: auto;


    table {
        width: 100%;
        min-width: 1280px;
        margin: auto;
        border-collapse: separate;
        border-spacing: 0;

        tr.sortable-ghost {
            opacity: 0.3;

            th,
            td {
                background: #ccc;
            }
        }
    }

    th,
    td {
        text-align: left;
        padding: 5px;
        border-bottom: 1px solid #000;
    }

    td {
        height: 100%;
        vertical-align: top;
        padding: 0;
        position: relative;


        &.duration {
            padding: 5px;

            input {
                width: 70px;
                font-size: 0.9em;
                padding: 0 5px;
                text-align: center;
                line-height: 30px;
            }

            // min-height: 50px;
        }

        .fluro-inline-edit {
            width: 100%;
            height: 100%;
            // position: absolute;
            // left:0;
            // bottom:0;
            // right:0;
            // top:0;
            // overflow: hidden;
            // border:10px solid #ff0066;
            display: block;

            input {
                margin: 0;
                max-width: 100%;
                display: block;
            }
        }

        // &.duration-cell {
        //     position: relative;



        //     left: 0;
        //     right: 0;
        //     bottom: 0;
        //     top: 0;
        //     width: 100%;
        //     height: 100%;

        //     

        //     // position: absolute;
        // }

        // }
    }

    thead th {
        background: #333;
        color: #fff;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 3;

        &.shrink {
            width: 1px;
        }

        &.detail {
            width: 40%;
        }
    }

    /* safari and ios need the tfoot itself to be position:sticky also */
    tfoot {

        th,
        td {
            position: -webkit-sticky;
            position: sticky;
            bottom: 0;
            background: #666;
            color: #fff;
            z-index: 4;
        }
    }

    /* testing links*/
    th:first-child,
    th:last-child {
        position: -webkit-sticky;
        position: sticky;
        z-index: 2;
        background: #ccc;
        vertical-align: center !important;
        text-align: center;

        &:first-child {
            left: 0;
            width: 1px;

        }

        &:last-child {
            right: 0;
            width: 1px;
        }
    }

    thead,
    tfoot {

        th:first-child,
        th:last-child {
            z-index: 5;
        }
    }


}

.table-wrap {
    position: relative;
}
</style>