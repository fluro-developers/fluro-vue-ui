<template>
    <flex-column class="expression-field-select">
        <flex-column-body>
            <!-- <pre>{{contextField.contextual}}</pre> -->
            <!-- <pre>{{fields.length}}</pre> -->
            <!-- Expression Select -->
            <!-- <pre>{{model}}</pre> -->
            <div class="accordion">
                <div class="accordion-panel" :class="{expanded:field == selected}" v-for="field in fields">
                    <div class="accordion-panel-title" @click="toggle(field)">
                        <v-layout>
                            <v-flex>{{field.absoluteTitle}}</v-flex>
                            <v-flex shrink>
                                <fluro-icon :icon="field == selected ? `angle-up` : `angle-down`" />
                            </v-flex>
                        </v-layout>
                    </div>
                    <div class="accordion-panel-content" v-if="field == selected">
                        <!-- <pre>TESTING: {{field.isArray}} {{field.type}}</pre> -->
                        <!-- <v-container> -->
                        <!-- <pre>{{field}}</pre> -->
                        <div class="example" @click="selectExample(example, field)" v-for="example in field.examples">
                            <div class="example-code">{{example.path}}</div>
                            <div class="example-description">{{example.description}}</div>
                        </div>
                        <!-- <pre>{{field.indentedTitle}} - {{field.path}}</pre> -->
                        <!-- <pre>{{field}}</pre> -->
                        <!-- </v-container> -->
                    </div>
                </div>
            </div>
        </flex-column-body>
    </flex-column>
</template>
<script>
import _ from "lodash";

export default {
    props: {
        value: {
            type: Array
        },
        context: {
            type: Object
        },
        conditional: {
            type: Boolean,
        }
    },
    data() {
        return {
            contextField: this.context,
            model: this.value,
            fields: [],
            selected: null
        };
    },

    watch: {
        value(v) {
            this.model = v;
        },
        contextField: "map",
        model: "map"
    },
    created() {
        this.map();
    },
    computed: {
        currentTrail() {
            var self = this;

            var context = self.contextField;

            if (!context) {
                return;
            }

            var field = _.find(self.trails, { guid: context.guid });

            return simplify(field);
        },
        trails() {
            return _.map(this.fields, simplify);
        }
    },
    methods: {
        selectExample(example, field) {
            this.$emit("click", example, field);
        },
        toggle(panel) {
            var self = this;
            self.selected = panel;
            // self.$set(panel, '_expressionExpanded', !panel._expressionExpanded);
        },

        map() {
            var self = this;

            if (!self.contextField) {
                return;
            }

            self.fields = getFieldDescriptions(self.contextField, self.model, self.conditional);

            // extractFieldsFromDefinitionFields(self.contextField, self.model, '0', true);
        }
    }
};

function simplify(f) {
    if (!f) {
        return;
    }
    return {
        title: f.title,
        path: f.path,
        guid: f.guid || "nope"
    };
}

///////////////////////////////////////////////////////////////////////////////////////

function getFieldDescriptions(contextField, fields, conditional) {
    var trail = [];
    var titles = [];
    var results = [];

    ///////////////////////////////////////////

    function recurMap(array, trail, titles) {
        _.each(array, function(field) {
            var output = {
                title: field.title,
                key: field.key,
                type: field.type,
                guid: field.guid
            }; //JSON.parse(JSON.stringify(originalField));
            // field.originalField = originalField;

            /////////////////////////////////////////////

            //We need to add the field to our results
            output.trail = trail.slice();
            output.titles = titles.slice();
            output.context = contextField == field;

            /////////////////////////////////////////////

            output.absoluteTitle = output.titles.concat([field.title]).join(" > ");
            output.parentTitle = _.last(titles);
            output.parentTrail = trail.slice().join(".");
            output.path = output.trail.concat([field.key]).join(".");
            output.isArray = field.maximum != 1;

            /////////////////////////////////////////////

            if (field.allowedValues && field.allowedValues.length) {
                output.options = _.map(field.allowedValues, function(value) {
                    return {
                        name: value,
                        value: value
                    };
                });
            } else {
                output.options = field.options || [];
            }

            /////////////////////////////////////////////

            results.push(output);

            /////////////////////////////////////////////

            if (field.asObject || field.directive == "embedded") {
                if (field.maximum == 1) {
                    trail.push(field.key);
                    titles.push(field.title);
                } else {
                    trail.push(field.key + "[0]");
                    titles.push(field.title);
                }
            }

            if (field.fields && field.fields.length) {
                //Go down one level deeper
                recurMap(field.fields, trail, titles);
            }

            if (field.asObject || field.directive == "embedded") {
                trail.pop();
                titles.pop();
            }
        });
    }
    //Loop through and get a flat list of all our fields and their paths
    recurMap(fields, trail, titles);
    ///////////////////////////////////////////
    var withDescriptions = true;
    if (!withDescriptions) {
        return results;
    }
    ///////////////////////////////////////////
    //Find the current
    var thisField = _.find(results, { guid: contextField.guid });
    var currentTrail = thisField ? thisField.parentTrail : thisField.trail; //"";

    ///////////////////////////////////////////
    return _.chain(results)
        .map(function(field) {
            //Find the contextual path to this field
            field.contextualPath = currentTrail.length ?
                field.path.replace(currentTrail, "model") :
                field.path;


            if (field.contextualPath == field.path) {
                field.contextualPath = `data.${field.path}`;
            }
            // console.log('CONTEXT', field.title, field.trail, field.parentTrail);//, field.contextualPath, field.path)
            //Now we add our examples
            field.examples = [];
            //////////////////////////////////////////////////

            var exampleTitle;
            var exampleValue;

            //////////////////////////////////////////////////

            var sampleOptions = field.options ? field.options.slice(0, 5) : [];

            //////////////////////////////////////////////////

            switch (field.type) {
                case "group":
                    if (!field.asObject) {
                        return;
                    }
                    break;
                case "void":
                    return;
                    break;
                case "number":
                    exampleTitle = exampleValue = 18;
                    break;
                case "integer":
                    exampleTitle = exampleValue = 12;
                    break;
                case "decimal":
                case "float":
                    exampleTitle = exampleValue = 3.56;
                    break;
                case "boolean":
                    exampleTitle = exampleValue = "true";
                    break;
                case "email":
                    exampleTitle = exampleValue = "example@fluro.io";
                    break;
                case "url":
                    exampleTitle = exampleValue = "https://www.fluro.io";
                    break;
                case "date":
                    exampleTitle = "Date";
                    exampleValue = Date.now();
                    break;
                case "string":
                    if (field.isArray) {
                        //If there are options specified already
                        if (sampleOptions && sampleOptions.length) {
                            exampleTitle = `[${_.map(sampleOptions, function(value) {
                return `'${value}'`;
              }).join(", ")}]`;

                            exampleValue = _.map(sampleOptions, "value");
                        } else {
                            exampleValue = ["Michael", "Susan", "Jerry"];
                            exampleTitle = exampleValue.join(", ");
                        }
                    } else {
                        //It's a single value
                        if (sampleOptions && sampleOptions.length) {
                            exampleTitle = _.first(sampleOptions).name;
                            exampleValue = `'${_.first(sampleOptions).value}'`;
                        } else {
                            exampleTitle = exampleValue = `'Michael'`;
                        }
                    }
                    break;
                case "reference":
                    if (field.isArray) {
                        exampleTitle = exampleValue = ["Object", "Object", "Object"];
                    } else {
                        exampleTitle = exampleValue = {};
                    }
                    break;
                default:
                    break;
            }

            //////////////////////////////////////////////////

            var examples = [];

            //////////////////////////////////////////////////

            var delimiter = "[0]";
            var fieldPath = field.contextualPath;
            var delimiterIndex = fieldPath.lastIndexOf(delimiter);

            var subFieldOfNested = delimiterIndex != -1;
            var parentPath = fieldPath.slice(0, delimiterIndex);
            var sliceIndex = delimiterIndex == -1 ? 0 : delimiterIndex;
            var childPath = fieldPath.slice(sliceIndex + delimiter.length + 1);
            var isArray = field.isArray;

            //////////////////////////////////////////////////

            if (isArray) {
                switch (field.type) {
                    case "reference":
                    case "group":
                    case "object":
                        // examples.push({
                        //        path: `${field.contextualPath}.length`,
                        //        description: `Returns the number of '${field.title}' values that have been input`,
                        // })

                        examples.push({
                            path: `matchInArray(${field.contextualPath}, '_id', '12345').length`,
                            description: `Returns the total number of '${field.path}' items where the '_id' field is '12345'`
                        });

                        examples.push({
                            path: `matchInArray(${field.contextualPath}, 'title', 'Example Title').length`,
                            description: `Returns the total number of '${field.path}' items where the 'title' field is equal to 'Example Title'`
                        });

                        examples.push({
                            path: `matchInArray(${field.contextualPath}, '_id', '12345', '!=').length`,
                            description: `Returns the total number of '${field.path}' items where the '_id' field is not equal to '12345'`
                        });

                        examples.push({
                            path: `matchInArray(${field.contextualPath}, 'title', 'Example Title', '!=').length`,
                            description: `Returns the total number of '${field.path}' items where the 'title' field is not equal to 'Example Title'`
                        });

                        break;
                    case "number":
                    case "integer":
                    case "decimal":
                    case "float":
                        if (sampleOptions.length) {
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `${field.contextualPath}.includes(${option.value})`,
                                    description: `Returns if '${option.name}' has been selected as a value`
                                });
                            });
                        } else {
                            _.each(exampleValue, function(option) {
                                examples.push({
                                    path: `${field.contextualPath}.includes(${option})`,
                                    description: `Returns if '${field.path}' has been selected as a value`
                                });
                            });
                        }
                        break;
                    default:
                        if (sampleOptions.length) {
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `${field.contextualPath}.includes('${option.value}')`,
                                    description: `Returns if '${option.name}' has been selected`
                                });
                            });
                        } else {
                            _.each(exampleValue, function(option) {
                                examples.push({
                                    path: `${field.contextualPath}.includes('${option}')`,
                                    description: `Returns if '${field.path}' has been selected`
                                });
                            });
                        }
                        break;
                }

                ////////////////////////////////////////////////

                examples.push({
                    path: `${field.contextualPath}.length`,
                    description: `Returns the number of '${field.title}' values that have been input`
                });

                examples.push({
                    path: `${field.contextualPath}.length > 1`,
                    description: `Returns true if more than 1 '${field.title}' value has been input`
                });

                examples.push({
                    path: `${field.contextualPath}.length < 4`,
                    description: `Returns true if less than 4 '${field.title}' values have been input`
                });
            } else {
                if (sampleOptions.length) {
                    switch (field.type) {
                        case "reference":
                        case "group":
                            break;
                        case "number":
                        case "integer":
                        case "decimal":
                        case "float":
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `${field.contextualPath} == ${option.value}`,
                                    description: `Returns if '${option.name}' has been selected`
                                });
                            });
                            break;
                        default:
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `${field.contextualPath} == '${option.value}'`,
                                    description: `Returns if '${option.name}' has been selected`
                                });
                            });

                            break;
                    }
                } else {



                    if (conditional) {
                        switch (field.type) {
                            case 'boolean':
                                examples.push({
                                    path: `${field.contextualPath}`,
                                    description: `Returns true '${field.title}' has been ticked`
                                });

                                examples.push({
                                    path: `!${field.contextualPath}`,
                                    description: `Returns true '${field.title}' has not been ticked`
                                });
                                break;
                            case 'date':

                                examples.push({
                                    path: `${field.contextualPath}`,
                                    description: `Returns the value of '${field.title}'`
                                });
                                examples.push({
                                    path: `new Date(${field.contextualPath}) <= Date.now()`,
                                    description: `Returns true if the date value of '${field.title}' is in the past`
                                });

                                examples.push({
                                    path: `new Date(${field.contextualPath}) > Date.now()`,
                                    description: `Returns true if the date value of '${field.title}' is in the future`
                                });


                                break;
                            case 'number':
                            case 'integer':
                            case "decimal":
                            case "float":

                                examples.push({
                                    path: `${field.contextualPath}`,
                                    description: `Returns the value of '${field.title}'`
                                });

                                examples.push({
                                    path: `${field.contextualPath} <= 10`,
                                    description: `Returns true if the value of '${field.title}' is less than or equal to 10`
                                });

                                examples.push({
                                    path: `${field.contextualPath} == 6`,
                                    description: `Returns true if the value of '${field.title}' is exactly 6`
                                });



                                break;
                            case 'reference':
                            case 'group':
                                examples.push({
                                    path: `${field.contextualPath}`,
                                    description: `Returns the literal value of the object '${field.title}'`
                                });
                            break;

                            default:

                                examples.push({
                                    path: `${field.contextualPath}`,
                                    description: `Returns the value of '${field.title}'`
                                });

                                examples.push({
                                    path: `${field.contextualPath} == '${exampleValue}'`,
                                    description: `Returns true if the value is exactly equal to ${exampleValue}`
                                });
                                examples.push({
                                    path: `${field.contextualPath} == String('${exampleValue}').toLowerCase()`,
                                    description: `Returns true if the value is exactly equal to ${exampleValue} (Case insensitive)`
                                });

                                examples.push({
                                    path: `String(${field.contextualPath}).toLowerCase().includes('abc') `,
                                    description: `Returns true if ${field.title} contains the characters 'abc' (Case insensitive)`
                                });
                                break;


                        }
                    }
                }
            }

            //////////////////////////////////////////////////

            //Now we add the absolute paths

            if (subFieldOfNested) {
                // console.log('CONTEXTUAL', field.contextualPath, '--', currentTrail, '--', field.path)

                // console.log('SUBFIELD',subFieldOfNested, field.contextualPath, '--', currentTrail, '--', field.path )
                if (field.isArray) {
                    if (sampleOptions.length) {
                        _.each(sampleOptions, function(option) {
                            examples.push({
                                path: `matchInArray(${field.contextualPath}, '${childPath}', '${option.value}', 'in').length`,
                                description: `Returns the total number of '${field.parentTitle}' where '${field.title}' includes'${option.name}'`
                            });
                        });
                    } else {
                        examples.push({
                            path: `matchInArray(data.${parentPath}, '${childPath}', '${exampleValue}', 'in').length`,
                            description: `Returns the total number of '${field.parentTitle}' where '${field.title}' includes'${exampleTitle}'`
                        });
                    }
                } else {
                    if (sampleOptions.length) {
                        _.each(sampleOptions, function(option) {
                            examples.push({
                                path: `matchInArray(${parentPath}, '${childPath}', '${option.value}').length`,
                                description: `Returns the total number of '${field.parentTitle}' where ${field.title} is equal to '${option.name}'`
                            });
                        });
                    } else {
                        switch (field.type) {
                            case "number":
                            case "float":
                            case "decimal":
                            case "integer":
                                examples.push({
                                    path: `matchInArray(${parentPath}, '${childPath}', ${exampleValue}).length`,
                                    description: `Returns the total number of '${field.parentTitle}' where ${field.title} is equal to ${exampleTitle}`
                                });

                                examples.push({
                                    path: `matchInArray(${parentPath}, '${childPath}', ${exampleValue}, '>=').length`,
                                    description: `Returns the total number of '${field.parentTitle}' where ${field.title} is greater than or equal to ${exampleTitle}`
                                });

                                examples.push({
                                    path: `matchInArray(${parentPath}, '${childPath}', ${exampleValue}, '<').length`,
                                    description: `Returns the total number of '${field.parentTitle}' where ${field.title} is less than ${exampleTitle}`
                                });

                                break;
                            case "boolean":
                                break;
                            default:
                                examples.push({
                                    path: `matchInArray(${parentPath}, '${childPath}', ${exampleValue}).length`,
                                    description: `Returns the total number of '${field.parentTitle}' where ${field.title} is equal to ${exampleTitle}`
                                });
                                break;
                        }
                    }
                }
            }

            //////////////////////////////////////////////////

            field.examples = examples;

            return field;
        })
        .compact()
        .value();

    ///////////////////////////////////////////
}

</script>
<style lang="scss" scoped>
.expression-field-select {
    width: 400px;
    height: 100%;
    max-height: 50vh;
    background: #fff;

    .example {
        font-size: 12px;
        margin-bottom: 5px;

        .example-code {
            font-weight: bold;
            background: rgba($primary, 0.3);
            color: darken($primary, 50%);
            display: inline-block;
            padding: 3px;
            border-radius: 3px;
            cursor:pointer;
        }

        .example-description {
            font-size: 0.8em;
        }
    }

    .accordion {
        .accordion-panel {
            margin: 0;
            @extend .border-bottom !optional;

            .accordion-panel-title {
                padding: 5px;
                font-weight: 600;
                font-weight: 500;
                background: #eee;
            }

            &.expanded {
                .accordion-panel-title {
                    background: #fff;
                }
            }

            .accordion-panel-content {
                background: #fff;
                padding: 5px;
            }
        }
    }
}

</style>
