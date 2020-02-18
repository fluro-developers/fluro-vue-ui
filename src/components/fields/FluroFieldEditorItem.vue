<template>
    <li class="field-editor-item"  :class="classes">
        <div class="field-editor-item-field" @click="select(model)" @mouseover="mouseover(model)" @mouseleave="mouseleave(model)">
            <!--  -->
            <fluro-realm-bar :realm="targetRealms" v-if="targetRealms" />
            <v-layout align-center>
                <!-- :click="clickedRoute" -->
                <v-flex shrink class="handle grab">
                    <div class="icon">
                        <!-- <fluro-icon :icon="icon" /> -->
                        <fluro-icon icon="arrows" />
                    </div>
                </v-flex>
                <v-flex shrink v-if="ticketed" v-tippy content="Ticketing Enabled">
                    <div class="icon ticket">
                        <fluro-icon library="fas" icon="ticket" />
                    </div>
                </v-flex>
                <v-flex shrink v-if="hasExpressions">
                    <div class="symbol expression" v-tippy content="Has Expressions">
                        <fluro-icon icon="brackets-curly" />
                    </div>
                </v-flex>
                <v-flex shrink v-if="officeUseOnly">
                    <div class="symbol" v-tippy content="Office Use Only">
                        <fluro-icon icon="eye-slash" />
                    </div>
                </v-flex>
                <v-flex class="handle">
                    {{model.title}} <span v-if="summary" class="summary">{{summary}}</span>
                    <div v-if="readableIssues" class="issue-summary">
                        <fluro-icon library="fas" icon="exclamation" /> {{readableIssues}}</div>
                </v-flex>
                <v-flex shrink v-if="hasSubFields" @click.stop.prevent="toggleCollapsed()">
                    
                        <fluro-icon :icon="model.collapsed ? 'angle-up': 'angle-down'" />
                    
                </v-flex>
                <v-flex shrink @click.stop.prevent="">
                    <div class="actions" :class="{active:showActions}">
                        <v-menu v-model="showActions" :fixed="true" transition="slide-y-transition" offset-y>
                            <template v-slot:activator="{ on }">
                                <span v-on="on">
                                    <fluro-icon :icon="showActions ? `times` : `ellipsis-v`" />
                                </span>
                            </template>
                            <div class="text-left">
                                <v-list dense>
                                    <v-list-tile @click="action.click()" v-for="action in availableActions">
                                        <fluro-icon :icon="action.icon" left />{{action.title}}
                                    </v-list-tile>
                                </v-list>
                            </div>
                        </v-menu>
                    </div>
                </v-flex>
            </v-layout>
        </div>
        <!-- <div>{{depth}}</div> -->
        <template v-if="hasSubFields ">
            <draggable class="field-editor-children" v-if="showSubFields" v-model="model.fields" handle=".handle" element="ul" :options="treeOptions" :move="onPageMove">
                <!-- @click="select(leaf)" -->
                <fluro-field-editor-item :selected="selected" :parent="model.fields" :leaf="model.fields[index]" :select="select" :mouseover="mouseover" :mouseleave="mouseleave" @duplicate="duplicate" @injected="injected" @deleted="deleted" v-for="(leaf, index) in model.fields" :key="leaf.guid" />
            </draggable>
        </template>
    </li>
</template>
<script>
import { FluroInlineEdit } from 'fluro-vue-ui';
import draggable from 'vuedraggable';

export default {
    components: {
        FluroInlineEdit,
        draggable,
    },
    props: {
        parent: {
            type: Array,
            required: true,
        },
        leaf: {
            type: Object,
            required: true,
        },
        select: {
            type: Function,
        },
        mouseover: {
            type: Function,
        },
        mouseleave: {
            type: Function,
        },
        selected: {
            type: Object,
        },
    },
    beforeCreate: function() {
        this.$options.components.FluroFieldEditorItem = require('./FluroFieldEditorItem.vue').default;
    },


    data() {
        return {
            showActions: false,
            treeOptions: {
                animation: 1,
                group: 'fields',
                // disabled: !this.editable,
                ghostClass: 'ghost'
            },
            model: this.leaf,
        }
    },
    computed: {
        ticketed() {
            return this.model && this.model.params && this.model.params.ticketing && this.model.params.ticketing.enabled;
        },
        readableIssues() {
            if (!this.issues.length) {
                return;
            }
            return this.issues.join(', ');
        },
        issues() {
            var self = this;
            var array = [];

            if (!self.model.title) {
                array.push('This field does not have a title')
                return array;
            }

            if (!self.model.key) {
                array.push('This field does not have a key')
            }

            //////////////////////////////////////////////////

            var conflict = self.parent.some(function(field) {
                if (field == self.model) {
                    return;
                }

                return field.key == self.model.key;

            });

            if (conflict) {
                array.push(`Key '${self.model.key}' is already in use`)
            }

            //////////////////////////////////////////////////

            //     )s = _.some(self.parent, function(field) {
            //     // console.log('check match', field.key == self.model.key )
            //     return field.key == self.model.key;
            // })

            // if(conflicts && conflicts.length) {
            // }

            return array;
        },
        targetRealms() {
            return this.model.params ? this.model.params.targetRealms : null;
        },
        summary() {
            var self = this;

            var multiple = self.model.maximum != 1;
            if (!self.model.params) {
                self.model.params = {};
            }

            if (self.model.directive == 'embedded') {
                if (self.model.params.targetHouseholdRole) {
                    return `${multiple ? 'Multiple ' : ''}${_.startCase(self.model.params.targetHouseholdRole)}`;
                }

                if (self.model.params.restrictType) {
                    return `${multiple ? 'Multiple ' : ''}${self.$fluro.types.readable(self.model.params.restrictType, multiple)}`;
                }
            }

            var modelType = self.model.type;
            switch (modelType) {
                case 'void':
                case 'value':
                    return '';
                    break;
            }
            return `${_.startCase(modelType)}`;
        },
        showSubFields() {
            return this.hasSubFields && this.expanded;
            //Allow collapsed later
            // model.fields && !model.collapsed
        },
        expanded() {
            return !this.collapsed;
        },
        collapsed() {
            return this.model.collapsed;
        },
        hasSubFields() {
            return this.model.type == 'group' || this.model.directive == 'embedded';
        },
        availableActions() {
            var self = this;
            var type = self.model.type == 'group' ? 'Group' : 'Field';

            var actions = [{
                title: `Duplicate ${type}`,
                icon: 'copy',
                click() {
                    self.$emit('duplicate', self.model, self.parent);
                }
            }, ];

            if (type == 'group' || self.model.directive == 'embedded') {
                actions.push({
                    title: `Add Field Inside`,
                    icon: 'plus',
                    click() {
                        self.$emit('injected', self.model, self.model);
                    }
                })
            }

            actions.push({
                title: `Add Field After`,
                icon: 'plus',
                click() {

                    self.$emit('injected', self.model, self.parent);
                }
            })

            actions.push({
                title: `Delete ${type}`,
                icon: 'trash-alt',
                click() {

                    self.$emit('deleted', self.model, self.parent);
                }
            });

            return actions;


        },
        // icon() {
        //     return this.model.type == 'folder' ? (this.model.collapsed ? `folder` : `folder-open`) : `file`;
        //     // return this.model.type == 'folder' ? (this.model.collapsed ? `folder` : `folder-open`) : `dot`;
        // },
        isSelected() {
            return this.selected == this.model;
        },
        officeUseOnly() {
            return this.model.params && this.model.params.disableWebform;
        },
        hasExpressions() {
            return _.get(this.model, 'hideExpression.length') || _.get(this.model, 'expressions.value') || _.get(this.model, 'expressions.defaultValue') || _.get(this.model, 'expressions.hide') || _.get(this.model, 'expressions.required')
        },
        classes() {
            var array = [];

            // if (this.model.type == 'folder') {
            //     array.push('folder')
            // } else {
            //     array.push('leaf')
            // }

            if (this.issues.length) {
                array.push('issues');
            }

            if (this.isSelected) {
                array.push('active');
            }

            if (this.hasExpressions) {
                array.push('expressions');
            }

            if (this.model.type == 'void') {
                array.push('void');
            }

            if (this.officeUseOnly) {
                array.push('office-use-only');
            }

            return array;
        }
    },

    watch: {
        hasSubFields(bol) {
            var self = this;

            if (bol && !self.model.fields) {
                self.$set(self.model, 'fields', []);
            }
        }
    },
    mounted() {

        var self = this;

        if (self.model.isNew) {
            console.log('SCROLL ITEM INTO VIEW')
            self.$nextTick(function() {

                self.$nextTick(function() {
                    if (self.$el && self.$el.scrollIntoView) {
                        self.$el.scrollIntoView({
                            behavior: 'smooth',
                            // block: 'top',
                        });

                        //Remove the new tag

                        self.model.isNew = undefined;

                    }
                });
            })
        }


        // self.$nextTick(function() {


        //     // if (self.leaf.autoselect) {
        //     //     self.$set(self.leaf, 'autoselect', null);
        //     //     if (self.$refs.input) {
        //     //         console.log('Auto select!')
        //     //         self.$refs.input.enableEdit();
        //     //     }
        //     // }

        // })
    },
    methods: {
        // mouseover() {
        //     this.hovered(this.model)
        // },
        // mouseleave() {
        //     this.hovered(null)
        // },
        toggleCollapsed() {
            this.$set(this.model, 'collapsed', !this.model.collapsed)
        },
        duplicate(field, parent) {
            this.$emit('duplicate', field, parent);
        },
        injected(field, parent) {

            this.$emit('injected', field, parent);
        },
        deleted(field, parent) {
            this.$emit('deleted', field, parent);
        },
        clicked($event, route) {
            console.log('EVENT', route.title)
            this.$emit('click', $event, route);
        },
        onPageMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
        },
    }
}
</script>
<style lang="scss">
.field-editor-children {
    margin: 0;
    list-style-type: none;
    padding: 0;
    display: block;

    .field-editor-children {
        padding: 3px 3px 3px 20px;
        background: #eee;

        //         .field-editor-item {
        //             position: relative;



        //             &:before {
        //                 content: '';
        //                 position: absolute;
        //                 left: 0;
        //                 top: -13px;
        //                 display: block;
        //                 height: 28px;
        //                 border-left: 1px dotted rgba(#000, 0.5);
        //             }

        //             &:after {
        //                 content: '';
        //                 position: absolute;
        //                 left: 0;
        //                 top: 50%;
        //                 display: block;
        //                 width: 10px;
        //                 border-top: 1px dotted rgba(#000, 0.5);
        //             }
        //         }
    }


}

.field-editor-item {
    border: 1px solid rgba(#000, 0.1);

    border-radius: 3px;
    overflow: hidden;
    margin: 0 0 4px;
    list-style-type: none;
    list-style: none;

    .summary {
        font-size: 0.8em;
        font-weight: normal;
        opacity: 0.5;
    }

    .issue-summary {
        clear: both;
        font-size: 0.8em;
        font-weight: normal;
        color: #fff;
        background: $danger;
        border-radius: 4px;
        padding: 5px;
    }

    &.expressions {
        border: 1px dashed $warning;
    }


    &.issues,
    &.issues>.field-editor-item-field,
    &.issues>.field-editor-children {
        background: rgba($danger, 0.5) !important;
        border: 1px solid $danger;
    }



    &.ghost {
        border: 1px dashed rgba(#000, 0.1);
        opacity: 0.5;
    }


    &:hover {
        border-color: $primary;
    }



    .field-editor-item-field {
        position: relative;
        padding: 5px;
        background: #fff;
        font-weight: 500;
        cursor: pointer;
        ;

        .grab {
            cursor: grab;
            opacity: 0;

            svg {
                opacity: 0.5;
            }
        }

        .actions {
            opacity: 0.3;
            cursor: pointer;

            &.active {
                opacity: 0.5;
            }
        }

        &:hover {
            

            .grab,
            .actions {
                opacity: 1;
            }
        }
    }


    &.office-use-only {
        .field-editor-item-field {
            background: #eee;
            color: #888;
        }
    }

    &.void {
        border: 1px solid transparent;

        .field-editor-item-field {
            background: none;
            color: #888;
            border: none;
        }
    }

    &.active {
        border: 1px solid $primary;

        &>.field-editor-item-field {
            background: $primary;
            color: #fff;
        }
    }


    .symbol {
        width: 15px;
        height: 20px;
        line-height: 20px;
        margin-right: 2px;
        font-size: 10px;

        &.expression {
            color: $warning;
        }
    }

    .icon {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 100%;
        text-align: center;
        margin-right: 2px;
        font-size: 12px;

        &.ticket {
            color: $success;
        }
    }
}
</style>