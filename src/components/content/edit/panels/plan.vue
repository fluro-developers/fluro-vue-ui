<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <!-- <template v-slot:menuprefix v-if="model._id"> -->
            <!-- <div class="event-cover-image" :style="{backgroundImage:`url(${coverImage})`}"/> -->
            <!-- <fluro-image cover :spinner="true" :height="150" :item="coverImage"/> -->
            <!-- </template> -->
            <tab heading="Plan">
                <!-- <slot> -->
                <!-- <flex-column-body style="background: #fafafa;"> -->
                <!-- <v-container class="grid-list-xl"> -->
                <!-- <flex-row> -->
                <!-- <flex-column-header>
                    <v-container pa-2>
                        <v-layout>
                            <v-flex xs12 sm3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.startDate" v-model="model" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </flex-column-header> -->
                <div class="plan-table-wrapper">
                    <!-- <v-menu attach :nudge-left="10" offset-x left :close-on-content-click="false" transition="slide-x-transition" @click.native.stop> -->
                    <v-menu style="position:relative" attach offset-x left :close-on-content-click="false" transition="slide-x-transition" @click.native.stop>
                        <template v-slot:activator="{ on }">
                            <div v-on="on" class="cog-btn">
                                <v-btn v-tippy content="Configure Columns" class="ma-0" small icon>
                                    <fluro-icon icon="cog" />
                                </v-btn>
                            </div>
                        </template>
                        <v-card tile>
                            <v-container pa-3 style="background: #f0f2f5;">
                                <!-- <v-list style="max-height: 50vh;" class="scroll-y" dense> -->
                                <!-- <v-list-tile> -->
                                <!-- <v-list-tile-content> -->
                                <fluro-content-form-field @input="updateColumns" :field="columnEditField" v-model="model" />
                                <!-- </v-list-tile-content> -->
                                <!-- </v-list-tile> -->
                                <!-- </v-list> -->
                            </v-container>
                        </v-card>
                    </v-menu>
                    <div class="plan-table" ref="container">
                        <table id="main-table" class="main-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th class="shrink center">
                                        <fluro-icon icon="clock" />
                                    </th>
                                    <th class="detail">Detail</th>
                                    <th v-for="(column, key) in columns" :key="key">{{column.title}}</th>
                                    <th>
                                        <div style="width:28px; height: 22px;">
                                        </div>
                                        <!-- <v-menu attach :nudge-left="10" offset-x left bottom v-model="actionsOpen" > -->
                                    </th>
                                </tr>
                            </thead>
                            <!-- <tbody> -->
                            <draggable tag="tbody" handle=".handle" v-model="model.schedules" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                                <!-- :teams="model.teams" -->
                                <plan-row @delete="remove(index)" @swap="swap(index)" @duplicate="duplicate(index)" @add="addFromRow" v-model="model.schedules[index]" :index="index" :plan="model" v-for="(row, index) in model.schedules" :key="row.guid" />
                            </draggable>
                            <tfoot>
                                <tr>
                                    <th colspan="2"></th>
                                    <td>
                                        <v-btn v-tippy content="Add Row" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('row')">
                                            <fluro-icon icon="plus" />
                                        </v-btn>
                                        <v-btn v-tippy content="Add Songs" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('song')">
                                            <fluro-icon icon="music" />
                                        </v-btn>
                                        <v-btn v-tippy content="Add Section" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('breaker')">
                                            <fluro-icon icon="megaphone" />
                                        </v-btn>
                                        <!-- <v-btn @click="add('song')" v-tippy content="Add songs">
                                        <fluro-icon icon="music" />
                                    </v-btn>
                                    <v-btn @click="add('breaker')" v-tippy content="Add section">
                                        <fluro-icon icon="megaphone" />
                                    </v-btn> -->
                                    </td>
                                    <td v-for="column in columns"></td>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <!-- <flex-column-footer> -->
                <!-- <v-container class="border-top pa-2 text-xs-center" fluid> -->
                <!-- <v-menu attach offset-y top v-model="actionsOpen" transition="slide-y-transition">
                            <template v-slot:activator="{ on }">
                              
                                    <v-btn color="primary" v-on="on">Add
                                        <fluro-icon right icon="plus" />
                                    </v-btn>
                                
                            </template>
                           
                                <div style="background: #fff; width:250px; text-align: left;">
                                    <v-list dense>
                                        <v-list-tile disabled>
                                            <v-label style="overflow:hidden; text-overflow: ellipsis; white-space: nowrap;">
                                                <fluro-icon left type="plan" />Add Plan Item
                                            </v-label>
                                        </v-list-tile>
                                        <v-divider />
                                        <v-list-tile @click="add('row')">
                                            <fluro-icon class="muted" left icon="plus" />Add Row
                                        </v-list-tile>
                                        <v-list-tile @click="add('song')">
                                            <fluro-icon class="muted" left icon="music" />Add Songs
                                        </v-list-tile>
                                        <v-list-tile @click="add('breaker')">
                                            <fluro-icon class="muted" left icon="megaphone" />Add Breaker
                                        </v-list-tile>
                                    </v-list>
                                </div>
                           
                        </v-menu> -->
                <!-- <v-layout>
                            <v-spacer />
                            <v-flex>
                                <v-btn block @click="add('row')">Add Row
                                    <fluro-icon right icon="plus" />
                                </v-btn>
                            </v-flex>
                            <v-spacer />
                            <v-flex>
                                <v-btn block @click="add('song')">Add Songs
                                    <fluro-icon right icon="music" />
                                </v-btn>
                            </v-flex>
                            <v-spacer />
                            <v-flex>
                                <v-btn block @click="add('breaker')">Add Section
                                    <fluro-icon right icon="megaphone" />
                                </v-btn>
                            </v-flex>
                            <v-spacer />
                        </v-layout>
                    </v-container> -->
                <!-- <pre>{{model.schedules}}</pre> -->
                <!-- </flex-column-footer> -->
                <!-- </flex-column> -->
                <!-- <div>Sidebar</div> -->
                <!-- </flex-row> -->
                <!-- </v-container> -->
                <!-- </flex-column-body> -->
                <!-- </slot> -->
            </tab>
            <tab :heading="`${definition.title} details`" v-if="definition">
                <!-- <tab heading="Info"> -->
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>{{definition.title}}</h3>
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

import draggable from 'vuedraggable';
import PlanRow from '../components/PlanRow.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';


//////////////////////////////////////////////////////


/////////////////////////////////

export default {

    components: {
        draggable,
        // FluroEditor,
        PlanRow,
    },
    props: {

    },
    mixins: [FluroContentEditMixin],
    created() {
        var self = this;
        _.each(self.model.schedules, function(row) {
            row.guid = self.$fluro.utils.guid();
        })
    },
    methods: {
        updateColumns() {
            this.$set(this.model, 'teams', this.model.teams.slice());
        },
        selectSongs() {
            var self = this;
            return self.$fluro.global.select('song', { minimum: 0, maximum: 0 }, true)
        },
        injectSongs(index) {

            var self = this;

            return self.selectSongs()
                .then(function(songs) {
                    // console.log('Selection', songs);

                    var rows = _.map(songs, function(song) {

                        var duration = self.getDuration(song);
                        var key = self.getDefaultKey(song);

                        return {
                            title: song.title,
                            type: 'song',
                            links: [song._id],
                            _id: song._id,
                            duration,
                            key,
                            notes: {},
                            isNew: true,
                            guid: self.$fluro.utils.guid(),
                        }
                    })

                    /////////////////////////////////////////

                    _.each(rows, function(row, i) {

                        //Mark that we want to scroll to this row
                        if (index || index == 0) {
                            var targetIndex = (index + 1) + i;
                            self.model.schedules.splice(targetIndex, 0, row)
                        } else {
                            self.model.schedules.push(row)
                        }
                    })



                });
        },
        createRows(type) {

            var self = this;

            switch (type) {
                case 'breaker':
                    return [{
                        title: 'Section',
                        type: 'breaker',
                        duration: 0,
                        links: [],
                        notes: {},
                        isNew: true,
                        guid: self.$fluro.utils.guid(),
                    }]
                    break;
                default:
                    return [{
                        title: 'New item',
                        duration: 300,
                        links: [],
                        notes: {},
                        isNew: true,
                        guid: self.$fluro.utils.guid(),
                    }]
                    break;
            }
        },
        remove(index) {
            this.model.schedules.splice(index, 1);
            console.log('Removed item');
        },
        addFromRow(details) {
            var self = this;

            if (details.type == 'song') {
                return self.injectSongs(details.index);
            }

            //Create the rows
            var rows = self.createRows(details.type);

            _.each(rows, function(row, i) {
                //Mark that we want to scroll to this row

                self.model.schedules.splice((details.index + 1) + i, 0, row)
            })
        },
        duplicate(index) {
            var row = JSON.parse(JSON.stringify(this.model.schedules[index]));
            this.model.schedules.splice(index + 1, 0, row);
        },

        getDuration(song) {
            return 300;
        },
        getDefaultKey(song) {
            return '';
        },
        swap(index) {

            var self = this;
            return self.selectSongs()
                .then(function(songs) {

                    var rows = _.map(songs, function(song) {
                        var duration = self.getDuration(song);
                        var key = self.getDefaultKey(song);
                        return {
                            title: song.title,
                            type: 'song',
                            links: [song._id],
                            _id: song._id,
                            duration,
                            key,
                            notes: {},
                            isNew: true,
                            guid: self.$fluro.utils.guid(),
                        }
                    })

                    /////////////////////////////////////////

                    _.each(rows, function(row, i) {

                        self.model.schedules.splice(index, i === 0 ? 1 : 0, row);

                        // //Mark that we want to scroll to this row
                        // if (index || index == 0) {
                        //     var targetIndex = (index + 1) + i;
                        //     self.model.schedules.splice(targetIndex, 0, row)
                        // } else {
                        //     self.model.schedules.push(row)
                        // }
                    })



                });



            var newRow
            this.model.schedules.splice(index, 1, newRow);
        },
        add(type) {

            var self = this;

            if (!self.model.schedules) {
                self.$set(self.model, 'schedules', []);
            }

            if (type == 'song') {
                return self.injectSongs();
            }

            var rows = self.createRows(type);
            _.each(rows, function(row) {

                //Mark that we want to scroll to this row


                self.model.schedules.push(row)
            })


            var container = self.$refs.container;
            container.scrollTo({
                top: container.scrollHeight + container.offsetHeight,
                left: 0,
                behavior: 'smooth'
            });

            ///////////////////////////////////////


        }
    },
    computed: {
        fieldsOutput() {
            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('startDate', {
                title: 'Plan Starts',
                minimum: 0,
                maximum: 1,
                type: 'date',
                directive: 'datetimepicker',
            });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
        columnEditField() {
            return {
                key: 'teams',
                minimum: 0,
                maximum: 0,
                title: 'Extra Column',
                type: 'string',
                placeholder: 'Eg. Lighting, MC, Band',
            }
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
            return _.chain(self.teams)
            .compact()
            .map(function(team) {
                return {
                    title: team,
                    key: team,
                }
            })
            .value();
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
            actionsOpen: false,
            drag: false,
            dragOptions: {},
            array,

        }
    },
}
</script>
<style lang="scss">
.plan-table-wrapper {
    position: relative;
    flex:1;
    display: flex;
    overflow: hidden;


    .cog-btn {
        // width: 36px;
        // height: 36px;
        // text-align: center;
        // position: absolute;
        // top: 0;
        // right: 0;
        // z-index: 3;

        position: absolute;
        top: 0px;
        right: 0px;
        width: 38px;
        z-index: 3;
        text-align: center;


    }
}

.plan-table {
    flex: 1;
    position: relative;
    width: 100%;
    z-index: 1;
    margin: auto;
    overflow: auto;
    background: #f0f2f5;
    height: 100%;

    $cell-padding: 4px 8px;

    p {
        margin-bottom: 5px !important;
    }


    mention {
        font-size: 0.8em;
        font-weight: 500;
        background: rgba(#000, 0.1);
        border-radius: 100px;
        padding: 2px 4px;
        display: inline-block;
        margin: 0 4px;
    }



    .cell {
        padding: $cell-padding;
        word-wrap: break-word;
        white-space: pre-wrap;
    }

    .placeholder {
        padding-bottom: 2px;
        padding-top: 2px;
        opacity: 0;
        font-size: 0.8em;
        font-style: italic;
        ;
    }

    .row-song-key {
        min-width: 30px;
        display: block;
        text-align-last: center;
        appearance: none;
        border: none;
        outline: none;
        font-weight: 500;

    }

    .row-song-key,
    .row-title {
        font-size: 1.1em;

        .cell {
            padding-bottom: 0;
        }
    }

    .row-detail {
        .cell {
            padding-top: 0;
        }
    }



    table {

        width: 100%;
        min-width: 600px;
        margin: auto;
        border-collapse: separate;
        border-spacing: 0;

        th,
        td {
            text-align: left;
            padding: 5px;
            // border-bottom: 1px solid #000;
            border-bottom: 1px solid #e8edf1;
            border-right: 1px solid #e8edf1;
            height: inherit;
            white-space: nowrap;
        }

        /////////////////////////////////////

        tr {
            height: 1px;
            background: #fff;

            .dragger {
                opacity: 0;
            }

            &:hover {
                .placeholder {
                    opacity: 0.5;
                }

                .dragger {
                    opacity: 0.5;
                }
            }


            th:first-child,
            th:last-child {
                background: #fff;
            }

            &:nth-child(odd) {

                th:first-child,
                th:last-child {
                    background: #fcfcfc;
                }

                background: #fcfcfc;
            }

            &.song {
                background: #fffbdd;
                color: #6b5f31;


                th,
                td {

                    // border-top: 1px solid #e8edf1;
                    // border-bottom: 1px solid #e8edf1;
                }

                th:first-child,
                th:last-child {
                    background: #fffbdd;
                }
            }




            &.breaker {
                background: #f0f2f5;


                th,
                td {
                    border-right: none;
                    border-top: 1px solid #e8edf1;
                    border-bottom: 1px solid #e8edf1;

                    .cell {
                        padding: 15px;
                    }

                    &.row-title {
                        .cell {
                            padding-top: inherit;
                        }
                    }
                }

                th:first-child,
                th:last-child {
                    background: #f0f2f5;
                }

                .row-title-text {
                    opacity: 0.7;
                    text-transform: uppercase;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    font-size: 0.8em;
                }


            }
        }





        td {

            vertical-align: top;
            padding: 0;
            position: relative;

            &.duration-cell {
                text-align: center;
            }


            &:hover {
                background: rgba($primary, 0.05);
            }

            p:last-child,
            .fluro-editor {
                margin-bottom: 0 !important;
            }

            .fluro-inline-edit {
                min-height: 100%;
                min-width: 100%;
                display: block;
                width: 100%;
                position: relative;
                float: left;
                // position: absolute;
            }


            // &.duration {
            //     text-align: center;

            //     input {
            //         width: 70px;
            //         font-size: 0.9em;
            //         padding: 0 5px;
            //         text-align: center;
            //         line-height: 30px;
            //     }

            //     // min-height: 50px;
            // }

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

                .inline-edit-default {
                    height: auto !important;
                    width: auto !important;


                }

                // .inline-hide {
                //     height: 0 !important;
                //     width: 0 !important;
                //     overflow: hidden !important;
                //     display: block !important;
                //     // visibility: hidden;
                // }

                .inline-edit-input {
                    background: #fff;
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;


                    &.inline-show {
                        border-radius: 3px;
                        border: 3px solid $primary;
                        box-shadow: 0 4px 10px rgba(#000, 0.3);
                        z-index: 3;
                        //width:0 !important;
                    }
                }

                input,
                select {
                    margin: 0;
                    max-width: 100%;
                    width: 100%;
                    display: block;
                    padding: $cell-padding;
                    line-height: 1;
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
            background: #fff;
            font-size: 0.8em;
            // color: #fff;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 3;

            &.center {
                text-align: center;
            }

            &.shrink {
                width: 1px;
            }

            &.detail {
                // width: 40%;
                max-width: 300px;
            }

            border-bottom: 3px solid rgba(#000, 0.1);
        }

        /* safari and ios need the tfoot itself to be position:sticky also */
        tfoot {

            th,
            td {
                position: -webkit-sticky;
                position: sticky;
                bottom: 0;
                z-index: 4;
                background: #f0f2f5 !important;
                border: none !important;
                border-top: 1px solid rgba(#000, 0.1) !important;
            }
        }

        /* testing links*/
        th:first-child,
        th:last-child {
            position: -webkit-sticky;
            position: sticky;
            z-index: 2;

            vertical-align: center !important;
            text-align: center;

            &:first-child {
                left: 0;
                width: 1px;
                border-right: 1px solid #e8edf1;

            }

            &:last-child {
                right: 0;
                width: 1px;
                border-left: 1px solid #e8edf1;
            }
        }

        thead,
        tfoot {

            th:first-child,
            th:last-child {
                z-index: 5;
            }
        }



        /////////////////////////////////

        tr.sortable-ghost {
            opacity: 0.3;
            // background:darken(#e8edf1, 30%) !important;

            th,
            td {
                border-color: greyscale(darken(#e8edf1, 30%), 1%) !important;
                background: greyscale(darken(#e8edf1, 30%), 1%) !important;
            }
        }

        td .fluro-editor-textarea {
            min-height: 0;

            &>div {
                // font-size: 11px;
                border-radius: 0 !important;
                padding: $cell-padding !important;
                border: none !important;
            }
        }
    }
}
</style>