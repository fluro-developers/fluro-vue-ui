<template>
    <li class="field-editor-item" :class="classes">
        <div class="field-editor-item-field" @click="select(model)">
            <v-layout align-center>
                <!-- :click="clickedRoute" -->
                <v-flex shrink class="handle">
                    <div class="icon">
                        <!-- <fluro-icon :icon="icon" /> -->
                        <fluro-icon icon="arrows" />
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
                <v-flex>
                    {{model.title}}
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
        <template v-if="hasSubFields">
            <draggable class="field-editor-children" v-if="model.fields && !model.collapsed" v-model="model.fields" handle=".handle" element="ul" :options="treeOptions" :move="onPageMove">
                <!-- @click="select(leaf)" -->
                <fluro-field-editor-item :selected="selected" :parent="model.fields" :leaf="model.fields[index]" :select="select" @duplicate="duplicate" @injected="injected" @deleted="deleted" v-for="(leaf, index) in model.fields" :key="leaf.guid" />
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
        hasSubFields() {
            return this.model.type == 'group' || this.model.directive == 'embedded';
        },
        availableActions() {
            var self = this;
            var type = self.model.type == 'group' ? 'Group' : 'Field';

            return [{
                    title: `Duplicate ${type}`,
                    icon: 'copy',
                    click() {
                        self.$emit('duplicate', self.model, self.parent);
                    }
                },
                {
                    title: `Add Field After`,
                    icon: 'plus',
                    click() {

                        self.$emit('injected', self.model, self.parent);
                    }
                },
                {
                    title: `Delete ${type}`,
                    icon: 'trash-alt',
                    click() {

                        self.$emit('deleted', self.model, self.parent);
                    }
                },

            ]
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

    watch:{
        hasSubFields(bol) {
            var self = this;

            if(bol && !self.model.fields) {
                self.$set(self.model, 'fields', []);
            }
        }
    },
    mounted() {

        var self = this;
        if(self.model._activate) {
            self.$el.scrollIntoView({
                behavior:'smooth',
                block:'center',
            });
            console.log('Scroll into view')
            self.model._activate = undefined;
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
        toggleCollapsed(route) {
            this.$set(route, 'collapsed', !route.collapsed);
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


    &.expressions {
        border: 1px dashed $warning;
    }



    &.ghost {
        border: 1px dashed rgba(#000, 0.1);
        opacity: 0.5;
    }



    .field-editor-item-field {
        padding: 5px;
        background: #fff;
        font-weight: 500;

        .handle {
            cursor: grab;
            opacity: 0;
        }

        .actions {
            opacity: 0;
            cursor: pointer;

            &.active {
                opacity: 0.5;
            }
        }

        &:hover {

            .handle,
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
        border:none;
    }
    }

    &.active {
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
    }
}
</style>