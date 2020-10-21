<template>
    <li class="field-editor-item" :class="classes">
        <!-- v-tippy="{placement:'right'}" :content="fieldPath" -->
        <div class="field-editor-item-field" @click="select(model)" @mouseover="mouseover(model)" @mouseleave="mouseleave(model)">
            <!--  -->
            <fluro-realm-bar :realm="targetRealms" v-if="targetRealms" />
            <v-layout align-center>
                <!-- :click="clickedRoute" -->
                <fluro-help absolute uid="field.editor.item.drag" title="Drag to reorder" body="Click and drag to move or reorder fields within your form" />
                <v-flex shrink class="handle grab">
                    <div class="icon">
                        <!-- <fluro-icon :icon="icon" /> -->
                        <fluro-icon icon="arrows" />
                    </div>
                </v-flex>
                <v-flex shrink v-if="ticketed" v-tippy content="Ticketing Enabled">
                    <fluro-help absolute uid="field.editor.item.ticket" title="Ticketed Contact" body="Contacts created here have ticketing enabled. This means that tickets will be created upon submission of this form" />
                    <div class="icon ticket">
                        <fluro-icon library="fas" icon="ticket" />
                    </div>
                </v-flex>
                <v-flex shrink v-if="hasExpressions">
                    <fluro-help absolute uid="field.editor.item.expressions" title="Expressions" body="This field has advanced logic and expressions that change how this field is displayed and behaves based on the input of the user" />
                    <div class="symbol expression" v-tippy content="Has Expressions">
                        <fluro-icon icon="brackets-curly" />
                    </div>
                </v-flex>
                <v-flex shrink v-if="officeUseOnly">
                    <fluro-help absolute uid="field.editor.item.officeuse" title="Office Use Only" body="This field is only visible for administrators" />
                    <div class="symbol" v-tippy content="Office Use Only">
                        <fluro-icon icon="eye-slash" />
                    </div>
                </v-flex>
                <v-flex class="handle">
                    {{model.title}}
                    <span v-if="summary" class="summary">{{summary}}</span>
                    <div v-if="readableIssues" class="issue-summary">
                        <fluro-icon library="fas" icon="exclamation" />
                        {{readableIssues}}
                    </div>
                </v-flex>
                <v-flex shrink v-if="hasSubFields" @click.stop.prevent="toggleCollapsed()">
                    <fluro-icon :icon="model.collapsed ? 'angle-down': 'angle-up'" />
                </v-flex>
                <v-flex shrink @click.stop.prevent>
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
                                        <fluro-icon :icon="action.icon" left />
                                        {{action.title}}
                                    </v-list-tile>
                                </v-list>
                            </div>
                        </v-menu>
                    </div>
                    <fluro-help absolute uid="field.editor.item.actions" title="More Options" body="More options for this field. Including deleting, duplicating and other useful actions." />
                </v-flex>
            </v-layout>
        </div>
        <!-- <div>{{depth}}</div> -->
        <template v-if="hasSubFields ">
            <draggable class="field-editor-children" v-if="showSubFields" v-model="model.fields" handle=".handle" element="ul" :options="treeOptions" :move="onPageMove">
                <!-- @click="select(leaf)" -->
                <!--  -->
                <!-- :parent="model.fields" :parentFields="model.type == 'group' && !model.asObject ? parentFields : model.fields" -->
                <fluro-field-editor-item :top="top" :selected="selected" :parent="model" :parentGroup="actualParentGroup" :leaf="model.fields[index]" :select="select" :mouseover="mouseover" :mouseleave="mouseleave" @duplicate="duplicate" @injected="injected" @copypath="copypath" @deleted="deleted" v-for="(leaf, index) in model.fields" :key="leaf.guid" />
            </draggable>
        </template>
        <!-- <pre>{{actualParentGroup ? actualParentGroup.title : '-'}}</pre> -->
    </li>
</template>
<script>
import draggable from "vuedraggable";
import _ from "lodash";

// import FluroFieldEditorItem from './FluroFieldEditorItem.vue';

import FluroHelp from "../FluroHelp.vue";

export default {
    name: "fluro-field-editor-item",
    components: {
        draggable,
        FluroHelp
    },
    props: {
        top: {
            type: Array
        },
        topKey: {
            type: String,
            default () {
                return "data";
            }
        },
        parent: {
            type: Object,
            required: true,
        },
        parentGroup: {
            type: Object,
        },
        // parentFields: {
        //     type: Array,
        //     required: true
        // },
        leaf: {
            type: Object,
            required: true
        },
        select: {
            type: Function
        },
        mouseover: {
            type: Function
        },
        mouseleave: {
            type: Function
        },
        selected: {
            type: Object
        }
    },
    data() {
        return {
            showActions: false,
            treeOptions: {
                animation: 1,
                group: "fields",
                // disabled: !this.editable,
                ghostClass: "ghost"
            },
            model: this.leaf
        };
    },
    computed: {
        actualParentGroup() {
            if (this.model.type == 'group' && this.model.asObject) {
                return this.model;
            }

            return this.parentGroup;
        },
        fieldPath() {
            var self = this;
            var needle = self.leaf;

            function getFieldPathTrail(array, target, trail, result) {
                //return $scope.getTrail($scope.model, field, []);

                for (var key in array) {
                    var field = array[key];

                    if (field == target) {
                        if (!field.asObject && field.directive != "embedded") {
                            trail.push(field.key);
                        } else {
                            if ((field.minimum == field.maximum) == 1) {
                                trail.push(field.key);
                            } else {
                                trail.push(field.key + "[i]");
                            }
                        }

                        //trail.push(field.key);
                        result.trail = trail.slice();
                        return;

                        //return callback(trail.slice());
                    }

                    if (field.fields && field.fields.length) {
                        if (field.asObject || field.directive == "embedded") {
                            if ((field.minimum == field.maximum) == 1) {
                                trail.push(field.key);
                            } else {
                                trail.push(field.key + "[i]");
                            }
                        }

                        getFieldPathTrail(field.fields, target, trail, result);

                        if (field.asObject || field.directive == "embedded") {
                            trail.pop();
                        }
                    }
                }
            }

            var trail = [];
            var result = {};

            getFieldPathTrail(self.top, needle, trail, result); // this.model.key;

            // console.log('RESULT', result);
            return `${self.topKey}.${result.trail.join(".")}`;
        },
        ticketed() {
            return (
                this.model &&
                this.model.params &&
                this.model.params.ticketing &&
                this.model.params.ticketing.enabled
            );
        },
        readableIssues() {
            if (!this.issues.length) {
                return;
            }
            return this.issues.join(", ");
        },
        issues() {
            var self = this;
            var array = [];

            if (!self.model.title) {
                array.push("This field does not have a title");
                return array;
            }

            if (!self.model.key) {
                array.push("This field does not have a database key");
            }

            //////////////////////////////////////////////////

            // console.log('PARENT IS?', self.parentFields)
            var parentFields = self.parentGroup ? self.parentGroup.fields : self.parent.fields;


            var conflict = parentFields.some(function(field) {
                if (field == self.model) {
                    return;
                }

                if(field.type == 'group' && !field.asObject) {
                    return;
                }

                return field.key == self.model.key;
            });

            if (conflict) {
                array.push(`Key '${self.model.key}' is already in use at this level`);
            }

            //////////////////////////////////////////////////

            //     )s = _.some(self.parentFields, function(field) {
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

            if (self.model.directive == "embedded") {
                if (self.model.params.targetHouseholdRole) {
                    return `${multiple ? "Multiple " : ""}${_.startCase(
            self.model.params.targetHouseholdRole
          )}`;
                }

                if (self.model.params.restrictType) {
                    return `${multiple ? "Multiple " : ""}${self.$fluro.types.readable(
            self.model.params.restrictType,
            multiple
          )}`;
                }
            }

            var modelType = self.model.type;
            switch (modelType) {
                case "void":
                case "value":
                    return "";
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
            return this.model.type == "group" || this.model.directive == "embedded";
        },
        availableActions() {
            var self = this;
            var type = self.model.type == "group" ? "Group" : "Field";

            var actions = [{
                title: `Duplicate ${type}`,
                icon: "copy",
                click() {
                    self.$emit("duplicate", self.model, self.parent.fields);
                }
            }];

            if (self.model.type == "group" || self.model.directive == "embedded") {
                actions.push({
                    title: `Add Field Inside`,
                    icon: "plus",
                    click() {
                        self.$emit("injected", self.model, self.model.fields);
                    }
                });
            }

            actions.push({
                title: `Add Field After`,
                icon: "plus",
                click() {
                    self.$emit("injected", self.model, self.parent.fields);
                }
            });

            actions.push({
                title: `Copy Field Path`,
                icon: "code",
                click() {
                    console.log("emit copy event");
                    self.$emit("copypath", self.fieldPath, self.model, self.parent.fields);
                }
            });

            actions.push({
                title: `Delete ${type}`,
                icon: "trash-alt",
                click() {
                    self.$emit("deleted", self.model, self.parent.fields);
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
            return (
                _.get(this.model, "hideExpression.length") ||
                _.get(this.model, "expressions.value") ||
                _.get(this.model, "expressions.defaultValue") ||
                _.get(this.model, "expressions.hide") ||
                _.get(this.model, "expressions.required")
            );
        },
        classes() {
            var array = [];

            // if (this.model.type == 'folder') {
            //     array.push('folder')
            // } else {
            //     array.push('leaf')
            // }

            if (this.issues.length) {
                array.push("issues");
            }

            if (this.isSelected) {
                array.push("active");
            }

            if (this.hasExpressions) {
                array.push("expressions");
            }

            if (this.model.type == "void") {
                array.push("void");
            }

            if (this.officeUseOnly) {
                array.push("office-use-only");
            }

            return array;
        }
    },

    watch: {
        hasSubFields(bol) {
            var self = this;

            if (bol && !self.model.fields) {
                self.$set(self.model, "fields", []);
            }
        }
    },
    mounted() {
        var self = this;

        if (self.model.isNew) {
            // console.log('SCROLL ITEM INTO VIEW')
            self.$nextTick(function() {
                self.$nextTick(function() {
                    if (self.$el && self.$el.scrollIntoView) {
                        self.$el.scrollIntoView({
                            behavior: "smooth"
                            // block: 'top',
                        });

                        //Remove the new tag

                        self.model.isNew = undefined;
                    }
                });
            });
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
            this.$set(this.model, "collapsed", !this.model.collapsed);
        },
        duplicate(field, parent) {
            this.$emit("duplicate", field, parent);
        },
        injected(field, parent) {
            this.$emit("injected", field, parent);
        },
        copypath(path, field, parent) {
            this.$emit("copypath", path, field, parent);
        },
        deleted(field, parent) {
            this.$emit("deleted", field, parent);
        },
        clicked($event, route) {
            console.log("EVENT", route.title);
            this.$emit("click", $event, route);
        },
        onPageMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        }
    }
};

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
    position: relative;

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
