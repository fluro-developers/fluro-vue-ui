<template>
    <div :data-field-key="key" class="fluro-content-form-field" v-if="isVisible" v-bind="attributes" :class="fieldClass">
        <!-- <pre>{{field.title}} DATA {{formModel}}</pre> -->
        <template v-if="officeUseOnly">
        </template>
        <template v-else-if="customComponent">
            <component v-model="fieldModel" v-bind:is="customComponent" />
        </template>
        <template v-else-if="renderer == 'dynamicdate'">
            <v-input :label="displayLabel" :persistent-hint="true" :hint="dynamicDateHint" class="no-flex">
                <!-- <pre>{{fieldModel}}</pre> -->
                <!-- <v-label>{{displayLabel}}</v-label> -->
                <!-- <v-select  :persistent-hint="true" :outline="showOutline" :label="displayLabel"  v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" /> -->
                <div style="margin: 10px 0 ;">
                    <v-btn-toggle v-model="fieldModel">
                        <v-btn flat :value="null">
                            None
                        </v-btn>
                        <v-btn flat value="DATE_NOW">
                            Dynamic Date
                        </v-btn>
                        <v-menu :fixed="true" v-model="modal" min-width="290px" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn flat :value="currentDateOrToday" v-on="on">
                                    Specific Date
                                </v-btn>
                            </template>
                            <v-card>
                                <v-date-picker attach @change="modal = false" v-model="fieldModel" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal = false">Done</v-btn>
                                </v-date-picker>
                            </v-card>
                        </v-menu>
                    </v-btn-toggle>
                </div>
            </v-input>
        </template>
        <template v-else-if="renderer == 'custom'">
            <fluro-compile-html :template="customTemplate" :context="customContext" />
        </template>
        <template v-else-if="renderer == 'embedded'">
            <template v-if="field.maximum == 1">
                <fluro-content-form :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel" @input="valueChange" :fields="fields"/>
            </template>
            <template v-if="field.maximum != 1">
                <template v-for="(object, index) in fieldModel">
                    <v-card>
                        <v-toolbar class="elevation-0">
                            <v-toolbar-title class="hidden-xs">{{groupTitle(object, index)}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn icon small flat color="error" @click="removeValue(index)" v-if="canRemoveValue">
                                    <fluro-icon icon="times" />
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        </v-toolbar>
                        <v-card-text>
                            <fluro-content-form :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"/>
                        </v-card-text>
                    </v-card>
                </template>
                <template v-if="!fieldModel.length">
                    <v-btn class="ml-0" block large color="primary" @click="addValue({})" v-if="canAddValue">
                        {{addLabel}}
                    </v-btn>
                </template>
                <template v-else>
                    <v-btn class="ml-0" color="primary" @click="addValue({})" v-if="canAddValue">
                        {{addLabel}}
                    </v-btn>
                </template>
            </template>
        </template>
        <template v-else-if="renderer == 'group'">
            <template v-if="asObject">
                <template v-if="field.maximum == 1">
                    <!-- FIELDS 1 -->
                    <fluro-content-form :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel" @input="valueChange" :fields="fields"/>
                </template>
                <template v-if="field.maximum != 1">
                    <template v-for="(object, index) in fieldModel">
                        <v-card>
                            <v-toolbar class="elevation-0">
                                <v-toolbar-title class="hidden-xs">{{groupTitle(object, index)}}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn small icon flat color="error" @click="removeValue(index)" v-if="canRemoveValue">
                                        <fluro-icon icon="times" />
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            </v-toolbar>
                            <v-card-text>
                                <fluro-content-form :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"/>
                            </v-card-text>
                        </v-card>
                    </template>
                    <template v-if="!fieldModel.length">
                        <v-btn class="ml-0" block large color="primary" @click="addValue({})" v-if="canAddValue">
                            {{addLabel}}
                        </v-btn>
                    </template>
                    <template v-else>
                        <v-btn class="ml-0" color="primary" @click="addValue({})" v-if="canAddValue">
                            {{addLabel}}
                        </v-btn>
                    </template>
                </template>
            </template>
            <template v-else>
                <template v-if="field.sameLine">
                    <v-layout row wrap>
                        <!-- <fluro-content-form :dynamic="dynamic" :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"/> -->
                        <template v-for="subfield in fields">
                            <!-- FIELDS 2 -->
                            <!-- <v-layout row wrap> -->
                            <!-- <pre>{{fields.length}}</pre> -->
                            <fluro-content-form-field :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" class="flex" :field="subfield" @input="valueChange" v-model="model"/>
                            <!-- </v-layout> -->
                        </template>
                    </v-layout>
                </template>
                <template v-else>
                    <!-- <fluro-content-form :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"/> -->
                    <template v-for="subfield in fields">
                        <!-- FIELDS 2 -->
                        <!-- <v-layout row wrap> -->
                        <!-- <pre>{{fields.length}}</pre> -->
                        <fluro-content-form-field :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" class="flex" :field="subfield" @input="valueChange" v-model="model"/>
                        <!-- </v-layout> -->
                    </template>
                </template>
            </template>
        </template>
        <template v-else-if="renderer == 'checkbox'">
            <div class="terms" :class="{'has-error':errorMessages.length}" v-if="savedTerms">
                <!--   -->
                <v-checkbox :outline="showOutline" :success="success" :mandatory="required" :persistent-hint="true" :label="displayLabel" v-model="fieldModel" @change="valueChange($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
                <div class="conditions">{{field.params.storeData}}</div>
            </div>
            <template v-else>
                <!-- -->
                <v-checkbox :outline="showOutline" :success="success" :mandatory="required" :persistent-hint="true" :label="displayLabel" v-model="fieldModel" @change="valueChange($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'number'">
            <v-text-field :persistent-hint="persistentDescription" :suffix="suffix" :prefix="prefix" :outline="showOutline" :success="success" :required="required" type="number" :label="displayLabel" v-model="fieldModel" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'realmselect'">
            <v-input class="no-flex" :persistent-hint="true" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
                <fluro-realm-select v-model="fieldModel" />
            </v-input>
        </template>
        <template v-else-if="renderer == 'datepicker'">
            <!--      <template v-slot:activator="{ on }">
                            <v-btn small v-on="on">
                                <fluro-icon library="far" icon="clock" />&nbsp;{{dateGroupFormat.title}}
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-list-tile @click="dateGroupFormat = option" v-for="option in dateGroupFormatOptions">
                                <v-list-tile-content>{{option.title}}</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-menu> -->
            <!-- <v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px"> -->
           <!-- <pre>{{typeof fieldModel}} {{fieldModel}}</pre> -->
            <v-menu :fixed="true" v-model="modal" min-width="290px" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                <template v-slot:activator="{ on }">
                    <!-- :value="computedDateFormattedMomentjs"  -->
                    <!-- @focus="modal = true" -->
                    <!-- v-model="fieldModel" -->
                    <!--   -->
                    <v-text-field :outline="showOutline" :success="success" :value="formattedDate" :persistent-hint="true" :hint="dateHint" :label="displayLabel" prepend-inner-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-card>

                    <v-date-picker attach @change="modal = false" v-model="fieldModel" no-title scrollable>
                        <v-spacer></v-spacer>
                        <!-- <v-btn flat color="primary" @click="modal = false">Cancel</v-btn> -->
                        <v-btn flat color="primary" @click="modal = false">Done</v-btn>
                    </v-date-picker>
                    <!-- <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{label}}</v-toolbar-title>
                    </v-toolbar>
                    <v-date-picker v-model="sudoModel" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(sudoModel)">OK</v-btn>
                    </v-date-picker> -->
                </v-card>
            </v-menu>
        </template>
        <template v-else-if="renderer == 'timepicker'">
            <v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field :outline="showOutline" :success="success" v-model="fieldModel" :label="displayLabel" prepend-inner-icon="access_time" readonly v-on="on" @focus="modal = true"></v-text-field>
                </template>
                <v-card v-if="modal">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{displayLabel}}</v-toolbar-title>
                    </v-toolbar>
                    <v-time-picker attach v-model="sudoModel" full-width>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(sudoModel)">OK</v-btn>
                    </v-time-picker>
                </v-card>
            </v-dialog>
        </template>
        <template v-else-if="renderer == 'datetimepicker'">
            <fluro-date-time-picker :outline="showOutline" :min="minDate" :max="maxDate" :success="success" format="ddd D MMM - h:mma " timePickerFormat="ampm" :label="displayLabel" :placeholder="field.placeholder" :hint="field.description" v-model="fieldModel" @focus="modal = true" />
        </template>
        <template v-else-if="renderer == 'timezoneselect'">
            <template v-if="mobile">
                <v-select :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="timezoneOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
            <template v-else>
                <v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="timezoneOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'countrycodeselect'">
            <template v-if="mobile">
                <v-select :persistent-hint="true" dense :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryCodeOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
            <template v-else>
                <v-autocomplete :persistent-hint="true" dense :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryCodeOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'countryselect'">
            <template v-if="mobile">
                <v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
            <template v-else>
                <v-select :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'textarea'">
            <v-textarea :outline="showOutline" :success="success" :required="required" :label="displayLabel" v-model="fieldModel" @blur="touch()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <!--  <template v-else-if="renderer == 'select'">
            <v-select  :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :return-object="type == 'reference'" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template> -->
        <template v-else-if="renderer == 'select'">
            <template v-if="mobile">
                <v-select :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :return-object="type == 'reference'" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
            <template v-else>
                <v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :return-object="type == 'reference'" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'content-select'">
            <!-- <pre>{{fieldModel}}</pre> -->
            <v-input class="no-flex" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
                <fluro-content-select :success="success" :required="required" :error-messages="errorMessages" :label="displayLabel" :outline="showOutline" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="field.placeholder" :minimum="minimum" @input="valueChange" :type="restrictType" :lockFilter="referenceFilter" :searchInheritable="searchInheritable" :maximum="maximum" v-model="model[field.key]" />
            </v-input>
        </template>
        <template v-else-if="renderer == 'search-select'">
            <v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :deletable-chips="true" :hide-selected="true" prepend-inner-icon="search" :error-messages="errorMessages" :cache-items="!defaultReferences.length" :chips="multipleInput" :clearable="!required" :return-object="true" item-text="title" v-model="fieldModel" @blur="touch()" @change="valueChange" :multiple="multipleInput" :loading="loading" :items="searchResults" :search-input.sync="keywords" flat hide-no-data :label="displayLabel">
                <!-- <template v-slot:selection="{ item, selected }">
                    <v-chip close @input="removeValue(index)" :selected="selected" color="blue-grey" class="white--text">
                       
                        <span v-text="item.title"></span>
                    </v-chip>
                </template>  -->
                <template v-slot:item="{ item }">
                    <fluro-avatar class="xs" :id="item._id" type="contact"></fluro-avatar>    
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </v-autocomplete>
        </template>
        <template v-else-if="renderer == 'signature'">
            <fluro-signature-field :outline="showOutline" :success="success" :label="displayLabel" v-model="fieldModel" :required="required" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" />
        </template>
        <template v-else-if="renderer == 'code'">
            <v-input class="no-flex" :hint="field.description" :persistent-hint="true">
                <v-label>{{displayLabel}}</v-label>
                <v-card class="no-flex">
                    <!-- <v-toolbar dark> -->
                    <!-- <v-toolbar-title>{{displayLabel}}</v-toolbar-title> -->
                    <!-- </v-toolbar> -->
                    <fluro-code-editor :outline="showOutline" :success="success" v-model="fieldModel" :lang="syntax" :height="200"></fluro-code-editor>
                </v-card>
            </v-input>
        </template>
        <template v-else-if="renderer == 'wysiwyg'">
            <v-input class="no-flex" :outline="showOutline" :success="success" :required="required" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description">
                <template v-if="multipleInput">
                    <template v-if="fieldModel.length">
                        <template v-for="(entry, index) in fieldModel">
                            <v-layout wrap row>
                                <v-flex class="vertical-center">
                                    <v-label>{{groupTitle(entry, index)}}</v-label>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-btn icon flat color="error" v-if="canRemoveValue" @click="removeValue(index, true)">
                                    <fluro-icon icon="times" />
                                </v-btn>
                            </v-layout>
                            <fluro-editor v-model="fieldModel[index]" :options="multiEditorOptions" @input="valueChange" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
                        </template>
                    </template>
                    <template v-if="canAddValue">
                        <v-btn color="primary" @click="addValue('')">
                            {{multiLabel}}
                            <fluro-icon icon="plus" />
                        </v-btn>
                    </template>
                </template>
                <template v-if="!multipleInput">
                    <v-label>{{displayLabel}}</v-label>
                    <fluro-editor v-model="fieldModel" :options="editorOptions" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
                </template>
            </v-input>
        </template>
        <template v-else-if="renderer == 'upload'">
            <!-- <pre>{{model}}</pre> -->
            <v-input class="no-flex" :outline="showOutline" :success="success" :label="displayLabel" :required="required" :error-messages="errorMessages" :persistent-hint="true" :hint="fileHint">
                <div class="file-items" v-if="files.length">
                    <div class="file-item" v-for="file in files">
                        <!-- <v-progress-linear v-model="file.progress"></v-progress-linear> -->
                        <v-layout row wrap>
                            <v-flex grow>
                                <strong>{{file.name}}</strong>
                                <div class="small"><span v-if="file.state == 'progress'">Uploaded {{file.progress}}% of </span><span class="muted">{{file.size | filesize}}</span></div>
                                <!-- <pre>{{file.state}}</pre> -->
                            </v-flex>
                            <v-flex shrink>
                                <template v-if="file.state == 'error'">
                                    <v-btn icon>
                                        <fluro-icon icon="exclamation" />
                                    </v-btn>
                                </template>
                                <template v-else-if="file.state == 'complete'">
                                    <v-hover>
                                        <v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
                                            <fluro-icon v-if="hover" icon="times" />
                                            <fluro-icon v-else icon="check" />
                                        </v-btn>
                                    </v-hover>
                                </template>
                                <template v-else-if="file.state == 'uploading'">
                                    <v-hover>
                                        <v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
                                            <v-progress-circular v-if="!hover" :value="file.progress"></v-progress-circular>
                                            <fluro-icon v-if="hover" icon="times" />
                                        </v-btn>
                                    </v-hover>
                                </template>
                                <template v-else>
                                    <v-btn icon @click="removeFile(file)">
                                        <fluro-icon icon="times" />
                                    </v-btn>
                                </template>
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
                <!-- <pre>{{files}}</pre> -->
                <!-- <v-progress-linear class="total-progress" color="primary" v-model="progress"></v-progress-linear> -->
                <!-- <div class="dropbox" v-show="!files.length"> -->
                <!-- accept="image/*" -->
                <label class="file-drop" v-if="canAddFile">
                    <input ref="file" type="file" :multiple="multipleInput" @change="filesSelected($event.target.files)">
                    Drag and drop or click here to select {{multipleInput ? 'files' : 'a file'}}
                </label>
            </v-input>
        </template>

        <template v-else-if="renderer == 'currency' && !multipleInput">
            <!--   CURRENCY
            <pre>{{fieldModel}}</pre> -->
            <fluro-currency-input :currency="params.currency" :label="displayLabel" :required="required" v-model="fieldModel" :autofocus="autofocus" :outline="showOutline" :success="success" @blur="touch()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'color' && !multipleInput">
            
           
            
            <v-menu :fixed="true" v-model="modal" min-width="290px" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                <template v-slot:activator="{ on }">
                    <v-text-field :outline="showOutline" :success="success" :value="colorModel.hex8" :persistent-hint="true" :hint="hint" :label="displayLabel" v-on="on"></v-text-field>
                </template>
                <div>
                    <color-picker v-model="colorModel" />
                   
                    
                    <!-- 
                    <v-date-picker attach @change="modal = false" v-model="fieldModel" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="modal = false">Done</v-btn>
                    </v-date-picker> -->
                    <!-- <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{label}}</v-toolbar-title>
                    </v-toolbar>
                    <v-date-picker v-model="sudoModel" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(sudoModel)">OK</v-btn>
                    </v-date-picker> -->
                </div>
            </v-menu>



            
            <!-- <v-text-field :autofocus="autofocus" :outline="showOutline" :success="success" browser-autocomplete="off" :required="required" :label="displayLabel" v-model="fieldModel" @blur="touch()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="field.placeholder" /> -->
            
        </template>


        <template v-else>
            <template v-if="multipleInput">
                <!--  -->
                <v-input :outline="showOutline" :label="displayLabel" :success="success" class="no-flex">
                    <template v-if="fieldModel.length">
                        <draggable v-model="fieldModel" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <div class="multi-input-row" :key="entry" v-for="(entry, index) in fieldModel">
                                    <v-flex style="padding:0 !important;">{{entry}}</v-flex>
                                    <span @click="removeValue(index, true)">Remove</span>
                                    <!--                             <fluro-icon icon="times" @click="removeValue(index, true)"/>
 -->
                                    <!-- <v-chip close @input="removeValue(index, true)">{{entry}}</v-chip> -->
                                </div>
                            </transition-group>
                        </draggable>
                    </template>
                    <template v-if="canAddValue">
                        <!-- :placeholder="field.placeholder" -->
                        <!-- <pre>{{required}}</pre> -->
                        <!-- <pre>{{proposedValue}}</pre> -->
                        <!-- <pre>{{fieldModel}}</pre> -->
                        <!--   -->
                        <v-text-field :autofocus="autofocus" class="faint" @input="valueChange" append-inner-icon="plus" :outline="showOutline" :success="success" browser-autocomplete="off" append-icon="plus" :required="required" :label="multiLabel" v-model="proposedValue" @keyup.enter.native.stop="addProposedValue()" @blur="addProposedValue()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="hint" :placeholder="field.placeholder" />
                    </template>
                </v-input>
            </template>
            <template v-if="!multipleInput">
                <v-text-field :autofocus="autofocus" :outline="showOutline" :success="success" browser-autocomplete="off" :required="required" :label="displayLabel" v-model="fieldModel" @blur="touch()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <!-- <pre><label>{{field.title}}</label><br/>{{model}}</pre> -->
    </div>
</template>
<script>
//Import validation options from vuelidate
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, email, url } from 'vuelidate/lib/validators';
import _ from 'lodash';
import Vue from 'vue';
import FluroCompileHtml from '../FluroCompileHtml.vue';
import FluroEditor from './FluroEditor.vue';
import FluroCurrencyInput from './FluroCurrencyInput.vue';
import FluroCodeEditor from './FluroCodeEditor.vue';
import FluroSignatureField from './FluroSignatureField.vue';
import FluroDateTimePicker from './FluroDateTimePicker.vue';
import FluroContentSelect from './FluroContentSelect.vue';


import { Chrome } from 'vue-color'



//Allow custom html to be injected at runtime

import Expressions from 'expression-eval';

////////////////////////////////////////////////////////

import moment from 'moment';
import draggable from 'vuedraggable'


////////////////////////////////////////////////////////

function mapDefaultDateValue(value) {
    if (String(value).toLowerCase() == 'now') {
        console.log('convert to now')
        return new Date();
    }

    return new Date(value);
}

////////////////////////////////////////////////////////

export default {
    components: {
        'color-picker': Chrome,
        draggable,
        FluroCurrencyInput,
        FluroEditor,
        FluroCompileHtml,
        FluroCodeEditor,
        FluroSignatureField,
        FluroDateTimePicker,
        FluroContentSelect,
    },
    data() {
        return {
            asyncOptionsLoading: false,
            drag: false,
            test: null,
            modal: false,
            model: this.value, //JSON.parse(JSON.stringify(this.value)),
            // model: this.value,
            proposedValue: null,
            sudoModel: null,
            color:null,

            //Async searching
            keywords: '',
            results: [],
            loading: false,

            //File Uploads
            files: [],
            cancelTokens: [],
            bytesLoaded: 0,
            bytesTotal: 0,
            uploadState: 'ready',

        }
    },
    watch: {
        'keywords': _.debounce(function() {

            var self = this;
            var field = this.field;
            var keywords = self.keywords;


            //No keywords or we already know
            if (!keywords || !keywords.length) {
                return;
                // && this.querySelections(val)
            }

            ////////////////////////////////////////////////////

            if (field.allowedReferences && field.allowedReferences.length) {
                return;
            }

            ////////////////////////////////////////////////////

            // var search = self.photographerSearch;
            self.loading = true;
            //////console.log('Searching', keywords);



            var options = {
                limit: 5,
                select: 'title',
            }

            //////////////////////////////

            var restrictToType = _.get(field, 'params.restrictType');

            if (restrictToType && restrictToType.length) {
                options.types = [restrictToType]
            }



            //////////////////////////////

            // self.$fluro.api.get(`/content/contact/search/${search}`, {
            self.$fluro.content.search(keywords, options)
                .then(function(results) {

                    self.results = results; //_.map(results, 'title');
                    self.loading = false;
                })
            // .catch(function(err) {

            //     self.photographers = [];
            //     self.photographerSearching = false;
            //     // self.photographerSearch = '';
            // })



        }, 500),
        expressionDefaultValue(v) {

            //If the user has entered data into here
            //Don't make any change
            if (this.$v.model.$dirty) {
                // console.log('Field is dirty')
                return;
            }

            //If there is a default value expression
            if (this.expressions && this.expressions.defaultValue) {
                this.fieldModel = v;
                // console.log('Updated default value according to expression!', this.expressions.defaultValue, v);
            }
        },
        expressionValue(v) {


            if (this.expressions && this.expressions.value) {
                this.fieldModel = v;
                // console.log('Expression Updated value', v)
            }


            // //Update this field to reconnect with the new model
            // this.model[this.key] = v[this.key];
        },
        value(val) {
            this.$set(this, 'model', val);
            return this.reset();
        }
    },
    computed: {
        customComponent() {
            return this.field.customComponent;
        },
        mobile() {
            return this.$vuetify.breakpoint.xsOnly;
        },
        dynamicDateHint() {

            var self = this;

            if (!self.fieldModel) {
                return;
            }

            if (self.fieldModel == 'DATE_NOW') {
                return 'The date will be stored at the time of action.';
            }


            return `Date will be set to ${self.$fluro.date.formatDate(self.fieldModel, 'dddd D MMM YYYY')}`;

        },
        currentDateOrToday() {

            function isDate(s) {
                if (isNaN(s) && !isNaN(Date.parse(s))) {
                    return true;
                } else {
                    return false;
                }
            }

            ////////////////////////////////

            if (isDate(this.fieldModel)) {
                return new Date(this.fieldModel);
            } else {
                return new Date();
            }
        },
        params() {
            return this.field.params || {};
        },
        persistentDescription() {
            var self = this;

            if (self.params.persistentDescription) {
                return true;
            }


            // switch(this.params) {

            // }
        },
        formModel() {
            return this.parent || this.model;
        },
        minValue() {
            return _.get(this, 'field.params.minValue');
        },
        maxValue() {
            return _.get(this, 'field.params.maxValue');
        },
        minDate() {
            return _.get(this, 'field.params.minDate');
        },
        maxDate() {
            return _.get(this, 'field.params.maxDate');
        },
        dateFormat() {
            return 'D MMM YYYY';
        },
        dateHint() {


            if (this.fieldModel) {
                switch (this.field.key) {
                    case 'dob':
                    case '_dob':
                        var years = parseInt(moment().format('YYYY')) - parseInt(moment(this.fieldModel).format('YYYY'))

                        if (this.model.dobVerified) {
                            return `${years} Years old`;
                        } else {
                            return `${years} Years old (estimated)`;
                        }

                        break;
                }
            }


            return this.dateFormat;


        },
        formattedDate() {
            if (this.fieldModel === undefined || this.fieldModel === null || this.fieldModel === '') {
                // console.log('UNDEFINED DATE', this.fieldModel)
                return;
            }

            return this.fieldModel ? moment(this.fieldModel).format(this.dateFormat) : ''


        },
        // formattedDate() {
        //     return this.$fluro.date.formatDate(this.fieldModel, 'dddd D MMM YYYY');
        // },
        asyncOptionsURL() {

            var self = this;

            switch (self.renderer) {
                case 'countryselect':
                case 'countrycodeselect':
                    return '/system/countries'
                    break;
            }
        },
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        params() {
            return this.field.params || {};
        },
        showOutline() {
            return this.outline || this.params.outline || this.options.outline;
        },

        searchInheritable() {
            if (this.field.params && this.field.params.searchInheritable) {
                return this.field.params.searchInheritable;
            }
        },
        referenceFilter() {
            if (this.field.params && this.field.params.referenceFilter) {
                return this.field.params.referenceFilter;
            }
        },
        restrictType() {

            if (this.field.params && this.field.params.restrictType) {
                return this.field.params.restrictType;
            }
        },
        fileHint() {
            switch (this.uploadState) {
                case 'uploading':
                    return `Uploading...`
                    break;
                default:
                    return this.field.description;
                    break;
            }
        },
        success() {

            //If we are wanting to validate success (Change to green)
            if (this.options.validateSuccess) {
                return (this.$v.$dirty && !this.$v.$invalid);
            }

        },
        editorOptions() {
            return this.options.editor;
        },
        multiEditorOptions() {
            return Object.assign({}, this.options.editor, { label: '' })
        },

        savedTerms() {
            return _.get(this.field, 'params.storeCopy');
        },
        syntax() {
            //Code entries
            return _.get(this.field, 'params.syntax');
        },
        multiLabel() {
            if (this.multipleInput) {
                if (!this.total) {
                    return `Add ${this.title}`;
                } else {
                    return `Add another ${this.title}`;
                }
            }
            return this.label

        },
        displayLabel() {

            if (this.overrideLabel && this.overrideLabel.length) {
                return this.overrideLabel;
            }

            if (!this.showLabel) {
                return;
            }

            var title = this.title || '';

            if (title.length) {
                if (this.required) {
                    return `${title} *`;
                } else {
                    return title;
                }
            }
        },

        hint() {

            if (this.maximum == 1) {
                return this.field.description;
            }

            if (this.minimum) {
                if (this.total < this.minimum) {
                    return `Type and press enter (${this.total} of ${this.minimum} required)`;
                }
            }

            if (this.maximum) {
                return `Type and press enter (Max ${this.maximum})`;
            }


            return `Type and press enter`;
        },
        customContext() {
            return this;
        },
        customTemplate() {
            return this.field.template;
        },
        searchResults() {

            if (this.allowedReferences && this.allowedReferences.length) {
                return this.allowedReferences;
            }

            if (this.allowedValues && this.allowedValues.length) {
                return this.allowedValues;
            }

            return this.results;
        },
        canAddFile() {
            if (this.canAddValue) {
                return true;
            }

            if (this.maximum == 1) {
                if (!this.files || !this.files.length) {
                    return true;
                }
            }
        },
        canAddValue() {

            //There is no maximum
            if (this.maximum == 0) {
                return true;
            }

            //We are under the maximum
            if (this.total < this.maximum) {
                // //////console.log(this.title, 'is under',this.total, this.maximum)
                return true;
            }

            return false;
        },
        canRemoveValue() {
            if (this.total > this.minimum) {
                return true;
            }
        },

        allowedValues() {
            return this.field.allowedValues;
        },
        allowedReferences() {
            return this.field.allowedReferences;
        },

        defaultValues() {
            return this.field.defaultValues;
        },
        defaultReferences() {
            return this.field.defaultReferences;
        },
        attributes() {
            return this.field.attributes
        },
        sameLine() {
            return this.field.sameLine
        },
        fieldClass() {

            var classes = [];

            //Add the renderer class
            classes.push(`fluro-content-form-field-${this.renderer}`);

            ////////////////////////////////////////////////

            switch (this.renderer) {
                case 'group':
                case 'embedded':
                    if (this.asObject || this.renderer == 'embedded') {
                        if (this.multipleInput) {
                            classes.push(`multiple-input`);
                            classes.push(`multiple-input-values-${this.fieldModel.length}`)
                        }
                    }
                    break;
            }

            ////////////////////////////////////////////////

            classes.push(this.className);

            ////////////////////////////////////////////////

            return classes.join(' ');
        },
        groupClass() {
            if (this.type == 'group' || this.type == 'embedded') {
                return `${this.className}`;
            }
        },
        colorModel: {
            get() {

                if(!this.color) {
                    this.color = {};
                }

                this.color.hex8 = this.fieldModel ? this.fieldModel : null;
                return this.color;
            },
            set(object) {
                this.color = object;
                this.fieldModel = object ? object.hex8 : '';
            }
        },
        fieldModel: {
            get() {
                var self = this;
                var value = self.model[self.key];

                if (self.expressions && self.expressions.transform && typeof self.expressions.transform.set == 'function') {
                    var transformed = self.expressions.transform.get(value);
                    console.log('Transforming value from', transformed);
                    return transformed;
                }

                if (self.dynamic && self.renderer == 'dynamicdate') {
                    if (value == 'DATE_NOW') {
                        return value;
                    }

                    if (!value) {
                        return;
                    }

                    return new Date(value).toISOString();
                }


                //////////////////////////////////

                switch (self.field.type) {
                    // case 'date':
                    // if(String(value).toLowerCase() == 'now') {
                        // return new Date(value).toISOString();
                    // }
                    // break;
                    case 'boolean':
                        if (self.field.inverse) {
                            return !value;
                        }
                        break;
                }

                //////////////////////////////////

                return value;
            },
            set(value) {

                var self = this;


                //////////////////////////////////
                //////////////////////////////////
                //////////////////////////////////

                if (self.expressions && self.expressions.transform) { 
                    if(typeof self.expressions.transform.set == 'function') {
                        var transformed = self.expressions.transform.set(value);
                        console.log('Transforming value to', transformed);
                        value = transformed;
                    }
                }

                //////////////////////////////////
                //////////////////////////////////
                //////////////////////////////////
                //////////////////////////////////
                //////////////////////////////////

                if (self.dynamic && self.renderer == 'dynamicdate') {
                    if (value == 'DATE_NOW') {
                        self.$set(self.model, self.key, value);
                        return self.valueChange();
                    }

                    if (!value) {
                        self.$set(self.model, self.key, null);
                        return self.valueChange();
                    }


                    self.$set(self.model, self.key, new Date(value).toISOString());
                    return self.valueChange();
                }

                //////////////////////////////////


                // /this.model[this.key] = value;
                switch (self.type) {
                    case 'date':
                        if (String(value).toLowerCase() == 'now') {
                            value = new Date();
                        }
                        break;
                    case 'integer':
                        if (value != undefined && value != null) {
                            if (String(value).length) {
                                value = parseInt(value);
                            } else {
                                value = null;
                            }
                        }
                        break;
                    case 'number':
                        if (value != undefined && value != null) {
                            if (String(value).length) {
                                value = parseInt(parseFloat(value).toFixed(2)) / 100;
                            } else {
                                value = null;
                            }
                        }
                        break;
                    case 'float':
                    case 'decimal':
                        if (value != undefined && value != null) {
                            if (String(value).length) {
                                value = parseInt(parseFloat(value).toFixed(2)) / 100;
                            } else {
                                value = null;
                            }
                        }
                        break;
                    case 'boolean':
                        if (self.field.inverse) {
                            value = !value;
                        }



                        if (!value) {
                            value = false;
                            return self.$nextTick(function() {
                                self.$set(self.model, self.key, value);
                                self.valueChange();
                            })
                        }
                        break;
                }


                self.$set(self.model, self.key, value);
                self.valueChange();
            }
        },
        addLabel() {
            if (this.total) {
                return `Add another ${this.title}`
            } else {
                return `Add ${this.title}`
            }
        },
        className() {

            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };



            return (this.field.className || '')
                .replaceAll('col-xs-', 'xs')
                .replaceAll('col-sm-', 'sm')
                .replaceAll('col-md-', 'md')
                .replaceAll('col-lg-', 'lg')
                .replaceAll('col-xl-', 'xl')
        },
        key() {
            return this.field.key;
        },

        asObject() {
            return this.field.asObject;
        },
        fields() {
            return this.field.fields;
        },
        officeUseOnly() {
            return _.get(this.field, 'params.disableWebform');
        },
        type() {
            return this.field.type;
        },
        expressions() {
            return this.field.expressions;
        },
        errorTitle() {
            return this.field.title;
        },
        title(force) {


            //Check if 
            if (this.options.labels && this.options.labels.hasOwnProperty(this.key)) {
                return this.options.labels[this.key];
            }



            return this.field.title;

        },
        multipleInput() {
            return this.maximum === 0 || this.maximum > 1;
        },
        countryCodeOptions() {
            var options = _.chain(this.asyncOptions)
                .map(function(country) {
                    return {
                        title: `${country.name} - ${country.alpha2} (${country.countryCallingCodes.join(', ')})`,
                        value: country.alpha2,
                    }
                })
                .orderBy(function(entry) {
                    return entry.title;
                })
                .value()



            options.unshift({
                title: `United Kingdom - GB (+44)`,
                value: 'GB',
            })

            options.unshift({
                title: `United States - USA (+1)`,
                value: 'US',
            })

            options.unshift({
                title: `Australia - AU (+61)`,
                value: 'AU',
            })




            return options;
        },
        countryOptions() {

            return _.map(this.asyncOptions, function(country) {
                return {
                    title: country.name,
                    value: country.name,
                }
            })
        },
        timezoneOptions() {

            var self = this;
            var timezones = _.map(self.$fluro.date.timezones(), function(title) {
                return { title, value: title }
            });

            timezones.unshift({ title: 'None / Default', value: null });

            return timezones;
        },
        selectOptions() {

            var self = this;

            ////////////////////////////////////////

            if (!self.field) {
                return [];
            }

            ////////////////////////////////////////

            if (self.field.options && self.field.options.length) {
                return _.map(self.field.options, function(option) {
                    option.title = option.title ? option.title : option.name;
                    return option;
                });
            }

            ////////////////////////////////////////

            if (self.allowedReferences) {
                return self.allowedReferences;
            }

            ////////////////////////////////////////

            if (self.allowedValues) {
                return self.allowedValues;
            }

            ////////////////////////////////////////

            if (self.asyncOptions && self.asyncOptions.length) {
                return self.asyncOptions;
            }

            ////////////////////////////////////////

            return [];
        },
        minimum() {
            return Math.max(parseInt(this.field.minimum), 0);
        },
        maximum() {
            return parseInt(this.field.maximum);
        },
        total() {
            if (this.multipleInput && this.fieldModel) {
                var total = _.get(this.fieldModel, 'length');
                // //////console.log('COUNT>', this.title, total);
                return total
            }
        },
        askCount() {
            return Math.max(this.minimum, this.field.askCount);
        },
        errorMessages() {

            // console.log('Compile errors', this.title, this.$v.model.$dirty);
            var self = this;
            const errors = []

            // return ['Errors on purpose'];


            if (!self.isVisible) {
                // console.log('No errors', this.field.title);
                return errors;
            } else {
                // return ['Errors on purpose'];
            }


            //Hasn't been touched yet
            if (!this.$v.model.$dirty) {
                // console.log('Not dirty', this.title)
                return errors;
            }



            if (!this.$v.uploading) {
                if (self.uploadState == 'uploading') {
                    errors.push('Waiting for files to upload');
                    return errors;
                }
            }

            ////////////////////////////////////////////

            //If the value requires a certain amount of answers
            if (!this.$v.model.validateInput) {



                if (this.proposedValue) {
                    _.each(checkValidInput(self, this.proposedValue), function(err) {
                        errors.push(err);
                    });
                }


                //Include any errors for invalid or bad input
                _.each(checkValidInput(this, self.fieldModel), function(err) {
                    errors.push(err);
                });

                ///////////////////////////////////////////

                var valueType = 'answer';

                if (self.directive == 'upload') {
                    valueType = 'file';
                }

                ///////////////////////////////////////////

                //If we require a set amount of answers
                if (this.minimum == this.maximum) {

                    //If there is a minimum
                    if (this.minimum) {

                        //If it's one
                        if (this.minimum == 1) {
                            errors.push('This field is required');
                        } else {
                            //If its more than 1
                            errors.push(`Please provide ${this.minimum} ${valueType}s`);
                        }
                    }

                } else {

                    //We require one ${valueType}
                    if (this.maximum == 1) {
                        errors.push('This field is required');
                    } else {

                        var isArray = Array.isArray(this.model[this.key])

                        if (!isArray) {
                            errors.push(`Requires at least ${this.minimum} ${valueType}s`)
                        }

                        //Get how many ${valueType}s were provided
                        var numberOfAnswersProvided = (this.model[this.key] || '').length;

                        //If not enough to meet the minimum were provided
                        if (numberOfAnswersProvided < this.minimum) {

                            //If the minimum required is 1
                            if (this.minimum == 1) {
                                errors.push(`Requires at least 1 ${valueType}`)
                            } else {
                                //Provide at least X ${valueType}s
                                //
                                console.log('ANSWERS IS', numberOfAnswersProvided, this.minimum, this.maximum)
                                errors.push(`Please provide at least ${this.minimum} ${valueType}s`)
                            }
                        }

                        //If we are over the maximum
                        if (numberOfAnswersProvided > this.maximum) {
                            errors.push(`Maximum ${this.maximum} ${valueType}s`);
                        }
                    }
                }
            }



            ///////////////////////////////////////////

            //If there is a custom error message
            if (this.field.errorMessage && this.field.errorMessage.length) {
                if (errors.length) {
                    return [this.field.errorMessage];
                }
            }

            ///////////////////////////////////////////

            return errors
        },
        prefix() {
            return this.field.prefix;
        },
        suffix() {
            return this.field.suffix;
        },
        renderer() {

            var self = this;

            //Get the widget defined on the data object
            var dataType = self.type;
            var directive = self.field.directive;

            /////////////////////////////////

            if (self.dynamic) {
                if (dataType == 'date') {
                    return 'dynamicdate';
                }
            }

            /////////////////////////////////

            switch (directive) {
                case 'color':
                    directive = 'color';
                    break;
                case 'currency':
                    directive = 'currency';
                    break;
                case 'realm-select':
                    directive = 'realmselect';
                    break;
                case 'dob-select':
                case 'date-select':
                case 'datepicker':
                    directive = 'datepicker';
                    break;

                case 'time-select':
                case 'timepicker':
                    directive = 'timepicker';
                    break;
                case 'datetime-select':
                case 'datetimepicker':
                    directive = 'datetimepicker';
                    break;
                case 'timezone-select':
                    directive = 'timezoneselect';
                    break;
                case 'country-codeselect':
                    directive = 'countrycodeselect';
                    break;
                case 'country-select':
                    directive = 'countryselect';
                    break;
                case 'textarea':
                case 'wysiwyg':
                case 'select':

                case 'embedded':
                    break;
                case 'upload':
                    if (self.context == 'admin') {
                        directive = 'content-select';
                    }
                    break;
                case 'button-select':

                case 'order-select':
                    directive = 'select';
                    break;
                default:
                    switch (dataType) {
                        case 'date':
                            directive = 'datepicker';
                            break;
                        case 'group':
                            directive = 'group';
                            break;
                        case 'boolean':
                            directive = 'checkbox';
                            break;
                        case 'number':
                        case 'integer':
                        case 'decimal':
                            directive = 'number';
                            break;
                        case 'reference':
                            directive = 'content-select';
                            break;
                            // default:
                            //     directive = 'input';
                            //     break;
                    }
                    break;


            }


            //Return the basic data type by default
            return directive;
        }
    },
    methods: {
        clear() {
            this.fieldModel = null;
            this.reset()
        },
        reset() {
            //Clear files
            this.files = [];
            this.$v.$reset();
        },
        removeFile(file) {

            var self = this;

            //If the file is halfway through uploading
            if (file.cancelToken) {
                //Cancel the file
                file.cancelToken.cancel('Operation canceled by the user.');
            }

            //////////////////////////////////

            //Remove it from the list
            self.files.splice(self.files.indexOf(file), 1);
            self.mapFilesToValues();


            //If it's currently uploading
            if (file.state == 'uploading') {
                self.uploadNextFile();
            }


        },
        filesSelected(list) {

            var self = this;

            //Mark that we've touched the field
            self.touch();

            if (!list.length) return;



            /////////////////////////////////////////

            //Update our files list
            var newFiles = _.map(list, function(file) {
                return {
                    file,
                    data: {},
                    name: file.name,
                    size: file.size,
                }
            })


            //Update the files
            self.files = _.chain(self.files.concat(newFiles))
                .compact()
                .uniqBy(function(file) {
                    return file.name;
                })
                .value();


            if (self.maximum) {
                self.files = self.files.slice(0, self.maximum);
                //console.log('Cropped to', self.files.length);
            }

            //Clear out the files
            this.$refs.file.value = null

            return self.uploadNextFile();
        },
        upload(file) {

            var self = this;

            switch (file.state) {
                case 'complete':
                case 'uploading':
                    //Stop here if it's already in uploading or complete
                    return;
                    break;
                default:
                    break;
            }

            /////////////////////////////////////////////

            //Change the state to uploading
            file.state = 'uploading';

            //Create a new form object
            var formData = new FormData();
            var jsonData = {};

            /////////////////////////////////////////////

            //Include the tags
            // jsonData.definition = 'photo';
            // jsonData.tags = file.tags;

            //Data
            // var data = file.data || {}

            //Link the photo to the event
            // data.event = self.$route.params.id
            // data.photographer = self.$fluro.utils.getStringID(data.photographer) || null;
            // jsonData.data = data;


            //Include the realms
            // jsonData.realms = this.realms;

            /////////////////////////////////////////////

            //Add the JSON data and the binary file data
            // formData.set('json', JSON.stringify(jsonData));
            formData.append('file', file.file, file.name)

            /////////////////////////////////////////////

            self.$forceUpdate();

            var body = formData;
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {

                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    // do whatever you like with the percentage complete
                    // maybe dispatch an action that will update a progress bar or something
                    file.progress = percentCompleted;
                    file.bytesLoaded = progressEvent.loaded;
                    file.bytesTotal = progressEvent.total;

                    ///////////////////////////////////////////////////

                    //Update the bytes loaded from all the files in the array
                    self.bytesLoaded = _.reduce(self.files, function(set, file) {
                        if (file.state == 'complete') {
                            set += file.size || file.bytesTotal || 0;
                        } else {
                            set += file.bytesLoaded || 0;
                        }
                        return set;
                    }, 0)

                    ///////////////////////////////////////////////////

                    self.$forceUpdate();
                }
            };

            ///////////////////////////////////////////////////

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            config.cancelToken = source.token;
            file.cancelToken = source;

            //Set headers to undefined content type
            config.headers = {
                'Content-Type': undefined
            }



            ///////////////////////////////////////////////////

            //console.log('Get the upload realm id', self.field);
            var uploadRealmID = _.chain(self.field)
                .get('params.realm')
                .first()
                .value();

            ///////////////////////////////////////////////////


            //If we can't upload to a realm
            if (!uploadRealmID) {
                //Then fail here
                file.state = 'error';
                self.uploadNextFile();
            }

            ///////////////////////////////////////////////////

            console.log('Uploading to ', self.field.params)
            return this.$fluro.api.post(`/file/attach/${uploadRealmID}`, body, config)
                .then(function(res) {
                    //console.log('UPLOAD RESPONSE', res);
                    file.state = 'complete';
                    file.result = res.data;
                    file.attachmentID = res.data._id;
                    file.cancelToken = null;
                    self.uploadNextFile();
                })
                .catch(function(err) {
                    //console.log('UPLOAD Error', err);
                    file.state = 'error';
                    file.cancelToken = null;
                    self.uploadNextFile();
                });

        },
        uploadNextFile() {

            var self = this;
            self.uploadState = 'uploading';

            ///////////////////////////////////////////

            //Find the next file that can be uploaded
            var nextFile = _.find(self.files, function(file) {
                switch (file.state) {
                    case 'complete':
                    case 'error':
                        return;
                        break;
                    default:
                        return true;
                        break;
                }
            })

            ///////////////////////////////////////////

            if (nextFile) {
                self.upload(nextFile);
            } else {
                self.uploadState = 'ready';
            }

            ///////////////////////////////////////////

            self.mapFilesToValues();


            ///////////////////////////////////////////

        },
        mapFilesToValues() {
            var self = this;

            var mapField = 'result'; //'attachmentID';

            if (self.multipleInput) {
                self.fieldModel = _.map(self.files, mapField);
            } else {
                self.fieldModel = _.chain(self.files)
                    .first()
                    .get(mapField)
                    .value();
            }

            self.$forceUpdate();
        },


        resolveExpression(expression) {

            var self = this;

            //Create a context model
            var context = {
                data: self.model,
                interaction: self.model,
                model: self.model,
                Math: Math,
                String: String,
                Array: Array,
                //Include helper function
                matchInArray: this.$fluro.matchInArray,

            }

            var ast;
            var result;

            try {
                ast = Expressions.parse(expression);
                result = Expressions.eval(ast, context);
            } catch (err) {
                // console.log(expression, result);
            } finally {
                return result;
            }




        },
        groupTitle(object, index) {
            if (object) {
                if (object.title && object.title.length) {
                    return object.title;
                }

                if (object.name && object.name.length) {
                    return object.name;
                }
            }

            return `${this.title} ${index+1}`
        },
        includesValue(value) {
            return _.includes(this.fieldModel, value);
        },
        addProposedValue() {

            var self = this;
            var proposedValue = this.proposedValue;

            //Touch the field
            self.touch();

            if (!self.canAddValue) {
                return;
            }

            if (!proposedValue || proposedValue == '') {
                return;
            }

            ////////////////////////////

            //Check to see if the input is valid
            var errors = checkValidInput(self, proposedValue)
            if (errors.length) {
                //////console.log('Bad Data!', errors)
                return;
            }

            ////////////////////////////

            if (!self.includesValue(proposedValue)) {
                self.addValue(proposedValue);
            }

            self.proposedValue = null;

        },
        addValue(value) {


            // this.fieldModel.push(value);
            // //////console.log('Add', this.fieldModel, this.maximum);
            // 
            //THIS WORKS BUT COMPUTED PROPERTIES BELOW DONT
            // if(this.fieldModel.length >= this.maximum) {
            //     return;
            // }
            // this.$set(this.model, this.field.key, [value]);


            // if (this.total < this.maximum) {
            if (this.canAddValue) {
                this.fieldModel.push(value);
                //////console.log('ADD VALUE NOW', this.fieldModel)
                // Vue.set(this.fieldModel, this.total, value);
                this.valueChange();
            }
        },
        removeValue(index, forceAllow) {
            if ((this.canRemoveValue || forceAllow) && this.fieldModel) {
                this.fieldModel.splice(index, 1);
                this.valueChange();
            }
        },
        touch() {
            this.$v.model.$touch()
        },
        valueChange(event, setTouched) {

            var self = this;

            if (setTouched) {
                self.touch()
            }


            // if(self.multipleInput) {
            //     //We need to update reactivity
            //     _.each(self.fieldModel, function(entry, index) {
            //         Vue.set(self.model, `${this.key}[${index}]`, entry);
            //     });
            // }

            // if(event) {
            //     self.fieldModel = event;
            // }

            // var clone = JSON.parse(JSON.stringify(self.model));
            // if(self.type == 'boolean') {

            //     clone[self.key] = self.fieldModel;
            //     console.log('tESITNG', self.type, clone[self.key], self.fieldModel);
            // }
            // console.log('VALUE CHANGED!', self.fieldModel)
            self.$emit('input', self.model, self.fieldModel); //JSON.parse(JSON.stringify(self.model))); //[self.key])
        }
    },
    beforeCreate() {
        if (!this.field) {
            console.log('NO FIELD ISSUE', this)
        }
    },
    created() {

        var self = this;

        ///////////////////////////////////////////////

        if (self.multipleInput) {
            switch (self.type) {
                case 'string':

                    //Clean up in case a string has been added instead of an array of strings
                    if (!_.isArray(self.fieldModel)) {
                        self.fieldModel = [self.fieldModel];
                        console.log(self.field.title, 'Transformed to multiple value')
                    }
                    //                    console.log('MULTIPLE INPUT', self.fieldModel, self.type, self.field);
                    break;
                case 'reference':
                    self.results = (self.defaultReferences || []).slice();
                    break;
                default:
                    self.results = (self.defaultValues || []).slice();
                    break;
            }

            // console.log('Setting results to ', self.results);
        } else {
            if (_.isArray(self.fieldModel)) {
                switch (self.type) {
                    
                    case 'string':
                        self.fieldModel = _.first(self.fieldModel);
                        console.log(self.field.title, 'Transformed array to single value')

                        break;
                }
            }
        }

        ////////////////////////////////////////////

        if (self.type == 'group' && !self.asObject) {
            //Do nothing
        } else {
            if (self.formFields) {
                self.$set(self.formFields, self.formFields.length, self);
            }
        }


        ////////////////////////////////////////////

        //Emit itself being created
        self.$emit('created', self);



    },
    beforeDestroy() {
        if (this.formFields) {
            this.formFields.splice(this.formFields.indexOf(this), 1);
        }
    },
    props: {
        'disableDefaults':{
            type:Boolean,
        },
        'context': {
            type: String,
            default () {
                //By default 
                return this.$fluro.global.defaultFormContext;
            },
        },
        'dynamic': {
            type: Boolean,
        },
        'parent': {
            type: Object,
        },
        'autofocus': {
            type: Boolean,
        },
        'outline': {
            type: Boolean,
        },
        'showLabel': {
            type: Boolean,
            default: true,
        },
        'overrideLabel': {
            type: String,
        },
        'formFields': {
            type: Array,
        },
        'field': {
            type: Object,
        },
        'value': {
            required: true,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
    },

    asyncComputed: {
        asyncOptions: {
            default: [],
            get() {

                var self = this;



                if (!self.asyncOptionsURL || !self.asyncOptionsURL.length) {
                    Promise.resolve([]);
                    self.asyncOptionsLoading = false;
                    return;
                }

                ///////////////////////////////////////////////

                self.asyncOptionsLoading = true;


                return new Promise(function(resolve, reject) {
                    self.$fluro.api.get(self.asyncOptionsURL).then(function(res) {
                            // console.log('RES', res)
                            resolve(res.data);
                            self.asyncOptionsLoading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.asyncOptionsLoading = false;
                        });

                    // return resolve([{
                    //     title:'Woot',
                    //     value:'something',
                    // }])
                })
            }
        },
        required: {
            default: false,
            get() {
                var self = this;
                var value = false;

                //If there is a minimum
                if (self.minimum) {
                    return Promise.resolve(true);
                }

                if (this.expressionRequired) {

                    return Promise.resolve(true);
                }

                return Promise.resolve(false);

            }
        },
        isVisible: {
            get() {
                var isHidden = this.expressionHideGroup || this.expressionHide;
                return Promise.resolve(!isHidden);
            }
        },
        expressionValue: {
            get() {
                var self = this;
                //There is no hidden expression
                if (!self.expressions || !self.expressions.value || !self.expressions.value.length) {
                    return Promise.resolve();
                }

                var value = this.resolveExpression(self.expressions.value);
                return Promise.resolve(value);
            }

        },

        expressionDefaultValue: {
            get() {
                var self = this;
                //There is no hidden expression
                if (!self.expressions || !self.expressions.defaultValue) {
                    return Promise.resolve();
                }

                if (typeof self.expressions.defaultValue == 'function') {
                    return self.expressions.defaultValue();
                } else {
                    if (!String(self.expressions.defaultValue).length) {
                        return Promise.resolve();
                    }
                }


                var value = this.resolveExpression(self.expressions.defaultValue);
                return Promise.resolve(value);
            }

        },
        expressionRequired: {
            default: false,
            get() {
                var self = this;
                var value = false;

                //There is no hidden expression
                if (!self.expressions || !self.expressions.required || !self.expressions.required.length) {
                    return Promise.resolve(false);
                }
                value = this.resolveExpression(self.expressions.required);
                return Promise.resolve(value);
            }

        },
        expressionHide: {
            default: false,
            get() {
                var self = this;
                var value = false;


                //There is no hidden expression
                if (!self.expressions || !self.expressions.hide) {
                    return Promise.resolve(false);
                }

                if (typeof self.expressions.hide == 'function') {
                    return self.expressions.hide();
                } else {
                    if (!String(self.expressions.hide).length) {
                        return Promise.resolve(false);
                    }
                }

                // //There is no hidden expression
                // if (!self.expressions || !self.expressions.hide || !self.expressions.hide.length) {
                //     return Promise.resolve(false);
                // }
                value = this.resolveExpression(self.expressions.hide);
                return Promise.resolve(value);
            }

        },
        expressionHideGroup: {
            default: false,
            get() {

                var self = this;
                var value = false;

                if (!self.field.hideExpression || !self.field.hideExpression.length) {
                    return value;
                }


                value = this.resolveExpression(self.field.hideExpression);


                // self.field.hideExpression, self.model) //err);

                return Promise.resolve(value);


            },
        },
    },

    mixins: [validationMixin],
    beforeCreate: function() {
        this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;
        this.$options.components.FluroContentFormField = require('./FluroContentFormField.vue').default;
    },
    validations: {
        model: {
            validateInput,
            uploading: function(source, vm) {

                if (vm.uploadState == 'uploading') {
                    return false;
                }

                //console.log('UPLOAD IS VALID', source, vm);
                return true;
            },
        }
    },

}


////////////////////////////////////////////////////////

/**
 * Check if a numeric input matches the required minimum/maximum values
 * @param  {String|Number} input        The Number to check
 * @param  {Number|Float|Integer} minimumValue The minimum to check
 * @param  {Number|Float|Integer} maximumValue The maximim to check
 * @param  {String} numberType   The type of number to check, 'number','float' or 'integer'
 * @return {String}              The error message (if the number is invalid)
 */
function checkNumericInputError(input, minimumValue, maximumValue, numberType) {

    var parseFunction = Number;

    switch (numberType) {
        case 'integer':
            parseFunction = parseInt;
            break;
        case 'float':
        case 'decimal':
            parseFunction = parseFloat;
            break;
    }

    if (typeof input != 'undefined') {
        input = parseFunction(input);
    }

    if (typeof minimumValue != 'undefined') {
        minimumValue = parseFunction(minimumValue);
        if (input < minimumValue) {
            return `Must be at least ${minimumValue}`
        }
    }

    if (typeof maximumValue != 'undefined') {
        maximumValue = parseFunction(maximumValue);
        if (input > maximumValue) {
            return `Must be less than ${maximumValue}`
        }
    }
}



////////////////////////////////////////////////////////


//Validate the amount of answers
function validateInput(source, vm) {

    var value = source[this.key];
    var minimum = vm.minimum; //Math.max(parseInt(this.field.minimum), 0);
    var maximum = vm.maximum; //parseInt(this.field.maximum);
    var isArray = Array.isArray(value);

    if (this.proposedValue) {
        var badDataErrors = checkValidInput(vm, this.proposedValue);
        if (badDataErrors.length) {
            return false;
        }
    }

    //////////////////////

    //There is no minimum
    if (!minimum && !value) {
        ////////console.log('No minimum!')
        return true;
    }

    //////////////////////

    //We require an answer from here on out

    //Maximum answer of 1
    if (maximum == 1) {

        if (value) {
            ////////console.log(`Required answer was provided`)
            return !checkValidInput(vm, value).length;
        } else {
            ////////console.log('Requires an answer but none provided');
            return false;
        }
    }

    //////////////////////

    //We need value to be an array at this point
    if (!isArray) {
        ////////console.log(`Requires ${minimum} answer but value is not an array`)
        return false;
    }

    //////////////////////
    var numberOfAnswersProvided = (value || '').length;

    if (numberOfAnswersProvided < minimum) {
        return false;
    }

    if (numberOfAnswersProvided > maximum) {
        return false;
    }


    var badData = _.some(value, function(input) {
        return checkValidInput(vm, input).length;
    });

    if (badData) {
        return false;
    }

    //////////////////////

    //If we get here then it's valid
    return true;

}




//////////////////////////////////////////////

function checkValidInput(self, input) {

    var errors = [];


    //Now validate the input
    // var input = self.fieldModel;
    var dataType = self.type;

    //Numeric Validators
    var isNumberType;
    var minimumValue = _.get(self.field, 'params.minValue');
    var maximumValue = _.get(self.field, 'params.maxValue');

    ////////////////////////////////////////

    switch (dataType) {
        case 'email':

            if (self.multipleInput) {


                if (_.isArray(input)) {
                    var someInvalidEmails = _.some(input, function(str) {
                        return !email(str);
                    });

                    if (someInvalidEmails) {
                        console.log('Invalid Emails', input)
                        errors.push('All emails must be valid', input);
                    }
                } else {
                    if (!email(input) && String(input).length) {
                        errors.push('Must be a valid email', input);
                    }
                }
            } else {
                if (!email(input) && String(input).length) {
                    errors.push('Must be a valid email', input);
                }
            }

            break;
        case 'url':

            if (!url(input)) {
                errors.push(`Must be a valid url eg. https://...`);
            }

            break;
        case 'boolean':

            if (self.minimum) {
                if (!input) {
                    errors.push('This is required')
                }
            }
            break;
        case 'integer':
        case 'decimal':
        case 'float':
        case 'number':
            isNumberType = true;

            var numberised = Number(input);
            var isActualNumber = (_.isFinite(numberised) && !_.isNaN(numberised));
            if (!isActualNumber) {
                errors.push(`${input ? input : ''} is not a valid number!`)
            }

            var numberError = checkNumericInputError(input, minimumValue, maximumValue, dataType);
            if (numberError) {
                errors.push(numberError);
            }
            break;
    }

    ////////////////////////////////////////

    return errors;
}
</script>
<style lang="scss">

.vc-chrome {
    width:auto !important;
}

.fluro-content-form-field {



    .multi-input-row {
        display: flex;
        padding: 5px 10px;
        align-items: center;
        border-bottom: 1px solid rgba(#000, 0.1);
        background: #fff; // rgba(#000, 0.1);
        border-radius: 5px;
        margin-bottom: 4px;


        svg,
        span {
            opacity: 0;
            cursor: pointer;
        }

        &:hover {

            svg,
            span {
                opacity: 0.5;
            }
        }


        span {
            font-style: italic;
            font-size: 0.8em;
        }

        // align-items: center;
        // justify-content:center;
        // padding: 5px;
        // border-bottom: 1px solid rgba(#000, 0.05);

        // span {
        //     opacity: 0;
        //     float: right;
        //     font-style: italic;
        //     opacity: 0.5;
        //     font-size: 0.8em;
        //     cursor: pointer;
        // }

        // &:hover {
        //     span {

        //         opacity: 0.5;
        //     }
        // }
    }

    .file-drop {
        display: block;
        position: relative;
        border: 1px dashed rgba(#000, 0.2);
        background: rgba(#000, 0.05);
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        min-height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8;
        font-style: italic;
        color: rgba(#000, 0.5);
        margin-bottom: 5px;

        &:hover,
        &:focus,
        &:active {
            background: #fff;
        }


        input {
            display: block;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            opacity: 0; //.8; //.5;
            // background: #000;
            /* invisible but it's there! */
            width: 100%;
            height: 100%;
            // height: 200px;
            position: absolute;
            cursor: pointer;
        }

    }

    .file-items {

        margin-bottom: 15px;

        .file-item {
            position: relative;
            padding: 5px 5px 5px 15px;
            border: 1px solid rgba(#000, 0.2);
            border-bottom: none;
            background: #fff;
            font-size: 0.9em;

            &:first-child {
                border-radius: 5px 5px 0 0;
            }

            &:last-child {
                border-bottom: 1px solid rgba(#000, 0.2);
                border-radius: 0 0 5px 5px;
            }
        }
    }

    .vertical-center {
        display: flex;
        align-items: center;
        min-height: 36px;
    }


    &.fluro-content-form-field-embedded.multiple-input,
    &.fluro-content-form-field-group.multiple-input {
        margin: 25px 0;

        &.multiple-input-values-0 {
            margin: 0;
        }
    }

    // .wrap {
    //     display:flex;
    // } 

    // &.fluro-content-form-field-group.multiple-input {
    // margin-bottom: 50px;
    // }

    .no-flex {
        &>.v-input__control>.v-input__slot {
            display: block;
            margin: 0;
        }
    }

    .v-sheet {
        margin-bottom: 15px;
    }

    .v-toolbar__content {
        height: 40px !important;
        padding-right: 5px;
    }

    .v-toolbar__title {
        letter-spacing: -0.03em;
    }

    .fluro-editor .fluro-editor-textarea>div {
        min-height: 200px;
    }

    .faint {
        .v-label {
            font-weight: 400 !important;
            opacity: 0.5;
            font-style: italic;
        }
    }

    .terms {

        padding: 15px 15px;
        background: rgba(#000, 0.05);
        border-radius: 3px;
        margin-top: 16px;

        &.has-error {
            background: rgba(#ff5252, 0.05)
        }

        &>.v-input {
            margin-top: 0 !important;
        }

        .conditions {
            margin-top: 10px;
            font-size: 0.9em;
            opacity: 0.8;

            font-style: italic;
        }
    }



    &.right-messages /deep/ {
        .v-text-field__details {
            text-align: right;
        }
    }
}
</style>