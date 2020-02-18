<template>
    <flex-column class="expression-field-select">
        <flex-column-body>
            <!-- <pre>{{fields}}</pre> -->
            <!-- Expression Select -->
            <!-- <pre>{{model}}</pre> -->
            <div class="accordion">
                <div class="accordion-panel" :class="{expanded:field == selected}" v-for="field in fields">
                    <div class="accordion-panel-title" @click="toggle(field)">
                        <v-layout>
                            <v-flex>
                                {{field.absoluteTitle}}
                            </v-flex>
                            <v-flex shrink>
                                <fluro-icon :icon="field == selected ? `angle-up` : `angle-down`" />
                            </v-flex>
                        </v-layout>
                    </div>
                    <div class="accordion-panel-content" v-if="field == selected">
                        <!-- <pre>TESTING: {{field.isArray}} {{field.type}}</pre> -->
                        <!-- <v-container> -->
                        <!-- <pre>{{field.examples}}</pre> -->
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
export default {
    props: {
        value: {
            type: Array,
        },
        context: {
            type: Object,
        },
    },
    data() {
        return {
            contextField: this.context,
            model: this.value,
            fields: [],
            selected: null,
        }
    },
    created() {
        this.map();
    },
    watch: {
        value(v) {
            this.model = v;
        },
        model: 'map',
    },
    methods: {
        selectExample(example, field) {
            this.$emit('click', example, field);
        },
        toggle(panel) {

            var self = this;
            self.selected = panel;
            // self.$set(panel, '_expressionExpanded', !panel._expressionExpanded);

        },
        map() {
            var self = this;
            self.fields = getFieldDescriptions(self.contextField, self.model);

            // extractFieldsFromDefinitionFields(self.contextField, self.model, '0', true);
        }
    },
}

///////////////////////////////////////////////////////////////////////////////////////


function getFieldDescriptions(contextField, fields) {

    var trail = [];
    var titles = [];
    var results = [];

    function recurMap(array, trail, titles) {
        _.each(array, function(field) {

            var output = {
                title: field.title,
                key: field.key,
                type: field.type,
            }; //JSON.parse(JSON.stringify(originalField));
            // field.originalField = originalField;

            /////////////////////////////////////////////

            //We need to add the field to our results
            output.trail = trail.slice();
            output.titles = titles.slice();
            output.context = contextField == field;

            /////////////////////////////////////////////

            output.absoluteTitle = output.titles.concat([field.title]).join(' > ');
            output.parentTitle = _.last(titles);
            output.parentTrail = trail.slice().join('.');
            output.path = output.trail.concat([field.key]).join('.');
            output.isArray = field.maximum != 1;

            /////////////////////////////////////////////

            if (field.allowedValues && field.allowedValues.length) {
                output.options = _.map(field.allowedValues, function(value) {
                    return {
                        name: value,
                        value: value,
                    }
                });
            } else {
                output.options = field.options || [];
            }

            /////////////////////////////////////////////

            results.push(output);

            /////////////////////////////////////////////

            if (field.asObject || field.directive == 'embedded') {
                if (field.maximum == 1) {
                    trail.push(field.key);
                    titles.push(field.title);
                } else {
                    trail.push(field.key + '[0]');
                    titles.push(field.title);
                }
            }

            if (field.fields && field.fields.length) {

                //Go down one level deeper
                recurMap(field.fields, trail, titles);
            }

            if (field.asObject || field.directive == 'embedded') {
                trail.pop();
                titles.pop();
            }
        });

    }


    // return {
    //     title: field.title,
    //     indentedTitle: indentedTitle,
    //     key: field.key,
    //     parentTitle: field.titles[field.titles.length - 2],
    //     parentPath: parentPath,
    //     childPath: childPath,
    //     path: fieldPath,
    //     type: field.type,
    //     isArray: isArray,
    //     titles: field.titles.join(' > '),
    //     options: field.options,
    //     firstTen: firstTen,
    //     originalField: field,
    // }


    recurMap(fields, trail, titles);

    ///////////////////////////////////////////

    var withDescriptions = true;

    if (withDescriptions) {

        var matchedContextTrail = _.chain(results)
            .find({ context: true })
            .get('parentTrail')
            .value();

        ///////////////////////////////////////////

        results = _.chain(results)
            .map(function(field) {



                if (field.parentTrail == matchedContextTrail) {
                    field.sameContext = true;
                }

                //Now we add our examples
                field.examples = [];

                //////////////////////////////////////////////////

                var exampleTitle;
                var exampleValue;

                //////////////////////////////////////////////////

                var sampleOptions = field.options ? field.options.slice(0, 5) : [];

                //////////////////////////////////////////////////

                switch (field.type) {
                    case 'group':
                        if (!field.asObject) {
                            return;
                        }
                        break;
                    case 'void':
                        return;
                        break;
                    case 'number':
                        exampleTitle = exampleValue = 18;
                        break;
                    case 'integer':
                        exampleTitle = exampleValue = 12;
                        break;
                    case 'decimal':
                    case 'float':
                        exampleTitle = exampleValue = 3.56;
                        break;
                    case 'boolean':
                        exampleTitle = exampleValue = 'true';
                        break;
                    case 'email':
                        exampleTitle = exampleValue = 'example@fluro.io';
                        break;
                    case 'url':
                        exampleTitle = exampleValue = 'https://www.fluro.io';
                        break;
                    case 'date':
                        exampleTitle = 'Date';
                        exampleValue = Date.now();
                        break;
                    case 'string':
                        if (field.isArray) {

                            //If there are options specified already
                            if (sampleOptions && sampleOptions.length) {
                                exampleTitle = `[${_.map(sampleOptions, function(value) {
                                return `'${value}'`;
                            }).join(', ')}]`;

                                exampleValue = _.map(sampleOptions, 'value');
                            } else {

                                exampleValue = ['Michael', 'Susan', 'Jerry'];
                                exampleTitle = exampleValue.join(', ')
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
                    case 'reference':
                        if (field.isArray) {
                            exampleTitle =
                                exampleValue = ['Object', 'Object', 'Object'];
                        } else {
                            exampleTitle =
                                exampleValue = {};
                        }
                        break;
                    default:
                        break;
                }

                //////////////////////////////////////////////////

                var examples = [];

                //////////////////////////////////////////////////

                var delimiter = '[0]';
                var fieldPath = field.path;
                var delimiterIndex = fieldPath.lastIndexOf(delimiter);
                var subFieldOfNested = (delimiterIndex != -1);
                

                var parentPath = fieldPath.slice(0, delimiterIndex);
                
                    var sliceIndex = delimiterIndex == -1 ? 0 : delimiterIndex;
                    var childPath = fieldPath.slice(sliceIndex);
                
                
                var sibling = field.sameContext;
                var isArray = field.isArray;

                //////////////////////////////////////////////////

                //If we are a subfield
                if (sibling) {

                    //If it's a multiple value
                    if (isArray) {
                        if (sampleOptions.length) {
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `model.${childPath}.includes('${option.value}')`,
                                    description: `Returns if '${option.name}' has been selected`,
                                })
                            });


                        } else {
                            _.each(exampleValue, function(option) {
                                examples.push({
                                    path: `model.${childPath}.includes('${option}')`,
                                    description: `Returns if '${option}' has been selected`,
                                })
                            })
                        }

                        ////////////////////////////////////////////////

                        examples.push({
                            path: `model.${childPath}.length`,
                            description: `Returns the number of '${field.title}' values that have been input`,
                        })

                        examples.push({
                            path: `model.${childPath}.length > 1`,
                            description: `Returns true if more than 1 '${field.title}' value has been input`,
                        })

                        examples.push({
                            path: `model.${childPath}.length < 4`,
                            description: `Returns true if less than 4 '${field.title}' values have been input`,
                        })
                    } else {
                        switch (field.type) {
                            case 'reference':
                                break;
                            case 'boolean':
                                // examples.push({
                                //     path: `model.${childPath}`,
                                //     description: `Returns if ${field.title} is true`,
                                // })
                                // examples.push({
                                //     path: `!model.${childPath}`,
                                //     description: `Returns if ${field.title} is false`,
                                // })

                                examples.push({
                                    path: `model.${childPath} == true`,
                                    description: `Returns if ${field.title} is true`,
                                })
                                examples.push({
                                    path: `model.${childPath} != true`,
                                    description: `Returns if ${field.title} is false`,
                                })
                                break;
                            default:

                                //If there are specified values to chose from
                                if (sampleOptions.length) {
                                    _.each(sampleOptions, function(option) {
                                        examples.push({
                                            path: `model.${childPath} == '${option.value}'`,
                                            description: `Returns if ${field.title} is equal to '${option.name}'`,
                                        })
                                    });
                                } else {

                                    examples.push({
                                        path: `model.${childPath}`,
                                        description: `Returns the value of ${field.title}`,
                                    })

                                    examples.push({
                                        path: `model.${childPath} == ${exampleValue}`,
                                        description: `Returns if ${field.title} is equal to '${exampleValue}'`,
                                    })

                                    switch (field.type) {
                                        case 'number':
                                        case 'integer':
                                            examples.push({
                                                path: `model.${childPath} >= ${exampleValue}`,
                                                description: `Returns if ${field.title} is greater than or equal to ${exampleValue}`,
                                            })
                                            examples.push({
                                                path: `model.${childPath} < ${exampleValue}`,
                                                description: `Returns if ${field.title} is less than ${exampleValue}`,
                                            })
                                            break;
                                    }
                                }
                                break;
                        }
                    }
                } else {

                    if (isArray) {

                        switch (field.type) {
                            case 'reference':
                            case 'group':
                                break;
                            case 'number':
                            case 'integer':
                            case 'decimal':
                            case 'float':
                                if (sampleOptions.length) {
                                    _.each(sampleOptions, function(option) {
                                        examples.push({
                                            path: `data.${field.path}.includes(${option.value})`,
                                            description: `Returns if '${option.name}' has been selected as a value`,
                                        })
                                    });


                                } else {
                                    _.each(exampleValue, function(option) {
                                        examples.push({
                                            path: `data.${field.path}.includes(${option})`,
                                            description: `Returns if '${field.path}' has been selected as a value`,
                                        })
                                    })
                                }
                                break;
                            default:
                                if (sampleOptions.length) {
                                    _.each(sampleOptions, function(option) {
                                        examples.push({
                                            path: `data.${field.path}.includes('${option.value}')`,
                                            description: `Returns if '${option.name}' has been selected`,
                                        })
                                    });


                                } else {
                                    _.each(exampleValue, function(option) {
                                        examples.push({
                                            path: `data.${field.path}.includes('${option}')`,
                                            description: `Returns if '${field.path}' has been selected`,
                                        })
                                    })
                                }
                                break;
                        }


                        ////////////////////////////////////////////////

                        examples.push({
                            path: `data.${field.path}.length`,
                            description: `Returns the number of '${field.title}' values that have been input`,
                        })

                        examples.push({
                            path: `data.${field.path}.length > 1`,
                            description: `Returns true if more than 1 '${field.title}' value has been input`,
                        })

                        examples.push({
                            path: `data.${field.path}.length < 4`,
                            description: `Returns true if less than 4 '${field.title}' values have been input`,
                        })
                    } else {


                        if (sampleOptions.length) {

                            switch (field.type) {
                                case 'reference':
                                case 'group':
                                    break;
                                case 'number':
                                case 'integer':
                                case 'decimal':
                                case 'float':
                                    _.each(sampleOptions, function(option) {
                                        examples.push({
                                            path: `data.${field.path} == ${option.value}`,
                                            description: `Returns if '${option.name}' has been selected`,
                                        });
                                    });
                                    break;
                                default:
                                    _.each(sampleOptions, function(option) {
                                        examples.push({
                                            path: `data.${field.path} == '${option.value}'`,
                                            description: `Returns if '${option.name}' has been selected`,
                                        });
                                    });

                                    break;
                            }


                        } else {

                            examples.push({
                                path: `data.${field.path}`,
                                description: `Returns the value of '${field.title}'`,
                            })
                        }
                    }
                }



                //////////////////////////////////////////////////

                //Now we add the absolute paths

                if (subFieldOfNested) {

                    if (field.isArray) {
                        if (sampleOptions.length) {
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `matchInArray(data.${parentPath}, '${childPath}', '${option.value}', 'in').length`,
                                    description: `Returns the total number of '${field.parentTitle}' where '${field.title}' includes'${option.name}'`,
                                })
                            });
                        } else {
                            examples.push({
                                path: `matchInArray(data.${parentPath}, '${childPath}', '${exampleValue}', 'in').length`,
                                description: `Returns the total number of '${field.parentTitle}' where '${field.title}' includes'${exampleTitle}'`,
                            })
                        }
                    } else {
                        if (sampleOptions.length) {
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `matchInArray(data.${parentPath}, '${childPath}', '${option.value}').length`,
                                    description: `Returns the total number of '${field.parentTitle}' where ${field.title} is equal to '${option.name}'`,
                                })
                            })
                        } else {

                            switch (field.type) {
                                case 'number':
                                case 'float':
                                case 'decimal':
                                case 'integer':
                                    examples.push({
                                        path: `matchInArray(data.${parentPath}, '${childPath}', ${exampleValue}).length`,
                                        description: `Returns the total number of '${field.parentTitle}' where ${field.title} is equal to ${exampleTitle}`,
                                    })

                                    examples.push({
                                        path: `matchInArray(data.${parentPath}, '${childPath}', ${exampleValue}, '>=').length`,
                                        description: `Returns the total number of '${field.parentTitle}' where ${field.title} is greater than or equal to ${exampleTitle}`,
                                    })

                                    examples.push({
                                        path: `matchInArray(data.${parentPath}, '${childPath}', ${exampleValue}, '<').length`,
                                        description: `Returns the total number of '${field.parentTitle}' where ${field.title} is less than ${exampleTitle}`,
                                    })

                                    break;
                                case 'boolean':
                                    break;
                                default:
                                    examples.push({
                                        path: `matchInArray(data.${parentPath}, '${childPath}', ${exampleValue}).length`,
                                        description: `Returns the total number of '${field.parentTitle}' where ${field.title} is equal to ${exampleTitle}`,
                                    })
                                    break;

                            }

                        }
                    }
                }

                /**
                //Check if this field is a child of a lower level multi group
                if (subFieldOfNested) {
                    var parentPath = field.path.slice(0, delimiterIndex);
                    var childPath = field.path.slice(delimiterIndex + delimiter.length + 1);

                    //////////////////////////////////////////////////

                    if (!sampleOptions || !sampleOptions.length) {
                        if (field.sameContext) {
                            examples.push({
                                path: `model.${childPath} == ${exampleValue}`,
                                description: `Returns if ${field.title} is equal to '${exampleValue}'`,
                            })
                        }
                        examples.push({
                            path: `matchInArray(data.${parentPath}, '${childPath}', ${exampleValue}).length`,
                            description: `Returns the total number of  ${field.parentTitle} values where ${field.title} is equal to ${exampleTitle}`,
                        })

                    }

                    //////////////////////////////////////////////////

                    if (field.isArray) {

                        if (field.sameContext) {
                            examples.push({
                                path: `model.${childPath}.includes(${exampleValue})`,
                                description: `Returns if ${field.title} includes '${exampleValue}'`,
                            })

                            examples.push({
                                path: `model.${childPath}.length > 3`,
                                description: `Returns if more than 3 values have been selected for ${field.title}`,
                            })

                            examples.push({
                                path: `matchInArray(data.${parentPath}, '${childPath}.length', 3).length`,
                                description: `Returns the total number of  '${field.parentTitle}' values where '${field.title}' has selected exactly 3 values`,
                            })

                            examples.push({
                                path: `matchInArray(data.${parentPath}, '${childPath}.length', 2, '>=').length`,
                                description: `Returns the total number of  '${field.parentTitle}' values where '${field.title}' has selected at least 2 values`,
                            })


                        }
                    }

                    //////////////////////////////////////////////////

                    _.each(sampleOptions, function(entry) {

                        if (field.isArray) {

                            if (field.sameContext) {
                                examples.push({
                                    path: `model.${childPath}.includes(${exampleValue})`,
                                    description: `Returns true if '${exampleValue}' is a selected value for '${field.title}'`,
                                })

                                examples.push({
                                    path: `!model.${childPath}.includes(${exampleValue})`,
                                    description: `Returns true if '${exampleValue}' is not a selected value for '${field.title}'`,
                                })

                                examples.push({
                                    path: `matchInArray(model.${parentPath}, '${childPath}', '${entry.value}').length`,
                                    description: `Returns the total number of  '${field.parentTitle}' values where '${field.title}' is equal to '${entry.name}'`,
                                })
                            }

                            examples.push({
                                path: "matchInArray(data." + parentPath + ", '" + childPath + "', '" + entry.value + "', 'in').length",
                                description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' has \'' + entry.name + '\' selected as one of it\'s values',
                            })



                        } else {

                            if (field.sameContext) {

                                examples.push({
                                    path: `model.${childPath} == ${entry.value}`,
                                    description: `Returns true if ${field.title} is '${entry.value}'`,
                                })

                                examples.push({
                                    path: `model.${childPath} != ${entry.value}`,
                                    description: `Returns true if ${field.title} is not '${entry.value}'`,
                                })
                            }

                            examples.push({
                                path: "matchInArray(data." + parentPath + ", '" + childPath + "', '" + entry.value + "').length",
                                description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' is equal to \'' + entry.name + '\'',
                            })

                        }

                    })


                } else {

                    if (field.sameContext) {
                        examples.push({
                            path: `model.${childPath} == ${exampleValue}`,
                            description: `Returns if ${field.title} is equal to ${exampleValue}`,
                        })
                    }


                    examples.push({
                        path: `data.${fieldPath}`,
                        description: `The literal value of '${field.title}' eg. ${exampleValue}`,
                    })

                    if (field.isArray) {

                        examples.push({
                            path: `data.${fieldPath}.length`,
                            description: `The number of '${field.title}' values`,
                        })

                        examples.push({
                            path: `data.${fieldPath}.length > 4`,
                            description: `Returns true if the number of  '${field.title}' values is greater than 4`,
                        })

                        if (sampleOptions && sampleOptions.length) {
                            _.each(sampleOptions, function(option) {
                                examples.push({
                                    path: `data.${fieldPath}.includes('${option.value}')`,
                                    description: 'Returns true if  \'' + option.name + '\' is selected',
                                })
                            })

                        } else {
                            if (exampleValue.length && field.type != 'reference') {

                                examples.push({
                                    path: `data.${fieldPath}.includes('${exampleValue[0]}')`,
                                    description: `Returns true if '${exampleValue[0]}' is selected`,
                                })
                            }
                        }
                    } else {
                        _.each(sampleOptions, function(option) {
                            examples.push({
                                path: `data.${fieldPath} == '${option.value}'`,
                                description: `Returns true if '${option.name}' has been selected`,
                            })
                        })

                        switch (field.type) {
                            case 'boolean':
                                examples.push({
                                    path: 'data.' + fieldPath + ' == ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is equal to ' + exampleValue,
                                })

                                examples.push({
                                    path: 'data.' + fieldPath + ' != ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is not equal to ' + exampleValue,
                                })
                                break;
                            case 'date':
                                examples.push({
                                    path: `getAge(data.${fieldPath}) >= 18`,
                                    description: `If  ${field.title} date is 18 years or older`,
                                })

                                break;
                            case 'string':

                                if (!sampleOptions || !sampleOptions.length) {
                                    examples.push({
                                        path: 'data.' + fieldPath + ' == ' + exampleValue,
                                        description: 'If \'' + field.title + '\' is equal to ' + exampleValue,
                                    })

                                    examples.push({
                                        path: 'data.' + fieldPath + ' && data.' + fieldPath + '.toUpperCase() == ' + String(exampleValue).toUpperCase(),
                                        description: 'If \'' + field.title + '\' converted to uppercase is equal to ' + String(exampleValue).toUpperCase(),
                                    })

                                    if (field.directive == 'wysiwyg' || field.directive == 'textarea') {
                                        examples.push({
                                            path: 'data.' + fieldPath + '.length > 200',
                                            description: 'If text is more than 200 letters',
                                        })
                                    }
                                }
                                break;
                            case 'number':
                            case 'integer':
                            case 'float':
                                examples.push({
                                    path: 'data.' + fieldPath + ' == ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is equal to ' + exampleValue,
                                })

                                examples.push({
                                    path: 'data.' + fieldPath + ' != ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is not equal to ' + exampleValue,
                                })

                                examples.push({
                                    path: 'data.' + fieldPath + ' > ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is greater than ' + exampleValue,
                                })

                                examples.push({
                                    path: 'data.' + fieldPath + ' >= ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is greater than or equal to ' + exampleValue,
                                })

                                examples.push({
                                    path: 'data.' + fieldPath + ' < ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is less than ' + exampleValue,
                                })

                                examples.push({
                                    path: 'data.' + fieldPath + ' <= ' + exampleValue,
                                    description: 'If \'' + field.title + '\' is less than or equal to ' + exampleValue,
                                })
                                break;
                        }

                    }

                }
                /**/

                //////////////////////////////////////////////////

                field.examples = examples;

                return field;
            })
            .compact()
            .value();
    }

    ///////////////////////////////////////////

    return results;

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
        }

        .example-description {
            font-size: 0.8em;
        }
    }

    .accordion {
        .accordion-panel {
            margin: 0;
            @extend .border-bottom;

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