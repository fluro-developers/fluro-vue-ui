<template>
				<div @click="clicked($event)" :data-field-key="key" class="fluro-content-form-field" v-if="isVisible" v-bind="attributes" :class="fieldClass">
								<pre v-if="!field">FATAL - NO FIELD SPECIFIED</pre>
								<template v-if="ready && model">
												<template v-if="officeUseOnly">
												</template>
												<template v-else-if="customComponent">
																<component v-model="model" v-bind:is="customComponent" />
												</template>
												<template v-else-if="renderer == 'dynamicdate'">
																<v-input :label="displayLabel" :persistent-hint="true" :hint="dynamicDateHint" class="no-flex">
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
																<template v-if="!multipleInput">
																				<fluro-content-form :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel" @input="elementValueChanged" :fields="fields" />
																</template>
																<template v-else>
																				<v-card :key="object.guid" v-for="(object, index) in fieldModel">
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
																												<fluro-content-form :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel[index]" @input="elementValueChanged" :fields="fields" />
																								</v-card-text>
																				</v-card>
																				<template v-if="!fieldModel || !fieldModel.length">
																								<template v-if="webMode">
																												<fluro-button block size="lg" @click="addValue({})" v-if="canAddValue">
																																{{addLabel}}
																												</fluro-button>
																								</template>
																								<template v-else>
																												<v-btn class="ml-0" block large color="primary" @click="addValue({})" v-if="canAddValue">
																																{{addLabel}}
																												</v-btn>
																								</template>
																				</template>
																				<template v-else>
																								<template v-if="webMode">
																												<fluro-button @click="addValue({})" v-if="canAddValue">
																																{{addLabel}}
																												</fluro-button>
																								</template>
																								<template v-else>
																												<v-btn class="ml-0" color="primary" @click="addValue({})" v-if="canAddValue">
																																{{addLabel}}
																												</v-btn>
																								</template>
																				</template>
																</template>
												</template>
												<template v-else-if="renderer == 'group'">
																<template v-if="asObject">
																				<template v-if="!multipleInput">
																								<fluro-content-form :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel" @input="elementValueChanged" :fields="fields" />
																				</template>
																				<template v-else>
																								<draggable v-model="fieldModel" handle=".handle" v-bind="dragOptions" @start="drag=true" @end="drag=false">
																												<v-card :key="object.guid" v-for="(object, index) in fieldModel">
																																<v-toolbar class="elevation-0">
																																				<v-btn small icon flat class="handle">
																																								<fluro-icon icon="arrows" />
																																				</v-btn>
																																				<v-toolbar-title class="hidden-xs" @click="toggleCollapsed(object)">
																																								{{groupTitle(object, index)}}
																																				</v-toolbar-title>
																																				<v-spacer />
																																				<v-toolbar-items>
																																								<v-btn small icon flat @click="toggleCollapsed(object)">
																																												<fluro-icon :icon=" object._collapsed ? `angle-down` : `angle-up` " />
																																								</v-btn>
																																								<v-btn small icon flat color="error" @click="removeValue(index)" v-if="canRemoveValue">
																																												<fluro-icon icon="times" />
																																								</v-btn>
																																				</v-toolbar-items>
																																</v-toolbar>
																																<v-card-text v-if="!object._collapsed">
																																				<fluro-content-form :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="fieldModel[index]" @input="elementValueChanged" :fields="fields" />
																																</v-card-text>
																												</v-card>
																								</draggable>
																								<template v-if="!fieldModel || !fieldModel.length">
																												<template v-if="webMode">
																																<fluro-button block size="lg" @click="addValue({})" v-if="canAddValue">
																																				{{addLabel}}
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn class="ml-0" block large color="primary" @click="addValue({})" v-if="canAddValue">
																																				{{addLabel}}
																																</v-btn>
																												</template>
																								</template>
																								<template v-else>
																												<template v-if="webMode">
																																<fluro-button @click="addValue({})" v-if="canAddValue">
																																				{{addLabel}}
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn class="ml-0" color="primary" @click="addValue({})" v-if="canAddValue">
																																				{{addLabel}}
																																</v-btn>
																												</template>
																								</template>
																				</template>
																</template>
																<template v-else>
																				<!-- <fluro-content-form :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" v-model="model" @input="elementValueChanged" :fields="fields" /> -->
																				<template v-if="field.sameLine">
																								<v-layout class="same-line" row>
																												<template v-for="subfield in fields">
																																<fluro-content-form-field :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" class="flex" :field="subfield" @input="subFieldChanged" v-model="model" />
																												</template>
																								</v-layout>
																				</template>
																				<template v-else>
																								<template v-for="subfield in fields">
																												<fluro-content-form-field :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" class="flex" :field="subfield" @input="subFieldChanged" v-model="model" />
																												<!-- <fluro-content-form-field :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :parent="formModel" :form-fields="formFields" :options="options" class="flex" :field="subfield" @input="elementValueChanged" v-model="fieldModel" /> -->
																								</template>
																				</template>
																</template>
												</template>
												<template v-else-if="renderer == 'checkbox'">
																<div class="terms" :class="{'has-error':errorMessages.length}" v-if="savedTerms">
																				<!--   -->
																				<v-checkbox :outline="showOutline" :success="success" :mandatory="required" :persistent-hint="true" :label="displayLabel" v-model="fieldModel" @change="elementValueChanged($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																				<div class="conditions">{{field.params.storeData}}</div>
																</div>
																<template v-else>
																				<!-- @change="elementValueChanged($event, true)" -->
																				<v-checkbox :outline="showOutline" :success="success" :mandatory="required" :persistent-hint="true" :label="displayLabel" v-model="fieldModel" @change="elementValueChanged($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
												</template>
												<template v-else-if="renderer == 'number'">
																<!-- type="number" -->
																<v-text-field :persistent-hint="persistentDescription" :suffix="suffix" :prefix="prefix" :outline="showOutline" :success="success" :required="required" :novalidate="true" pattern="^[+-]?[0-9]+(?:\.[0-9]+)?$" :label="displayLabel" v-model="fieldModel" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
												</template>
												<template v-else-if="renderer == 'realmselect'">
																<v-input class="no-flex" :persistent-hint="true" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
																				<fluro-realm-select block type="collection" v-model="fieldModel" />
																</v-input>
												</template>
												<template v-else-if="renderer == 'dob'">
																<v-input class="no-flex" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
																				<v-layout>
																								<v-flex>
																												<v-select label="Date" :error-messages="errorMessages" :outline="showOutline" :success="success" :required="required" v-model="dateModelDay" item-text="title" :items="dateDayOptions" @blur="touch()" @focus="focussed()" />
																								</v-flex>
																								<v-spacer />
																								<v-flex>
																												<v-select label="Month" :error-messages="errorMessages" :outline="showOutline" :success="success" :required="required" v-model="dateModelMonth" item-text="title" :items="dateMonthOptions" @blur="touch()" @focus="focussed()" />
																								</v-flex>
																								<v-spacer />
																								<v-flex>
																												<!-- <pre>{{dateYearOptions}}</pre> -->
																												<v-select label="Year" :error-messages="errorMessages" :outline="showOutline" :success="success" :required="required" v-model="dateModelYear" item-text="title" :items="dateYearOptions" @blur="touch()" @focus="focussed()" />
																								</v-flex>
																				</v-layout>
																</v-input>
												</template>
												<template v-else-if="renderer == 'button-select'">
																<v-input class="no-flex" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
																				<div class="button-select-buttons">
																								<template v-if="webMode">
																												<fluro-button :block="$vuetify.breakpoint.xsOnly" @click.native="toggleValue(button.value)" :class="{active:isSelectedValue(button.value), inactive:!isSelectedValue(button.value)}" :key="button.value" v-for="button in selectOptions">
																																{{button.name || button.title}}
																																<fluro-icon right icon="check" class="tick" />
																												</fluro-button>
																								</template>
																								<template v-else>
																												<v-btn :block="$vuetify.breakpoint.xsOnly" :color="isSelectedValue(button.value) ? `primary` : null" :class="{active:isSelectedValue(button.value)}" class="ml-0" @click.native="toggleValue(button.value)" v-for="button in selectOptions">
																																{{button.name || button.title}}
																																<fluro-icon right icon="check" class="tick" />
																												</v-btn>
																								</template>
																								<!-- <pre>{{selectOptions}}</pre> -->
																				</div>
																</v-input>
												</template>
												<template v-else-if="renderer == 'datepicker'">
																<!-- <pre>{{fieldModel}}</pre> -->
																<!-- DATE PICKER -->
																<v-menu :fixed="true" v-model="modal" min-width="290px" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																				<template v-slot:activator="{ on }">
																								<!-- :value="textDate"  -->
																								<v-text-field @blur="touch()" @focus="focussed()" @keyup.enter="checkTextDateImmediate" @input="checkTextDate" :outline="showOutline" :success="success" v-model="textDate" :persistent-hint="true" :hint="dateHint" :label="displayLabel" prepend-inner-icon="event" v-on="on" />
																								<!-- <pre>{{formattedDate}} -- {{textDate}}</pre> -->
																				</template>
																				<v-card>
																								<v-date-picker @blur="touch()" @focus="focussed()" attach @change="modal = false" v-model="dateStringModel" no-title scrollable>
																												<v-spacer></v-spacer>
																												<template v-if="!minimum">
																																<v-btn color="" flat @click.native="clear">Clear</v-btn>
																												</template>
																												<v-btn flat color="primary" @click="modal = false">Done</v-btn>
																								</v-date-picker>
																				</v-card>
																</v-menu>
												</template>
												<template v-else-if="renderer == 'timepicker'">
																<v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px">
																				<template v-slot:activator="{ on }">
																								<v-text-field :outline="showOutline" :success="success" v-model="fieldModel" :label="displayLabel" prepend-inner-icon="access_time" readonly v-on="on" @blur="touch()" @focus="modalFocussed();"></v-text-field>
																				</template>
																				<flex-column v-if="modal">
																								<v-card>
																												<v-toolbar color="primary" dark>
																																<v-toolbar-title>{{displayLabel}}</v-toolbar-title>
																												</v-toolbar>
																												<v-time-picker attach v-model="pseudoModel" full-width>
																																<v-spacer></v-spacer>
																																<v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
																																<v-btn flat color="primary" @click="$refs.dialog.save(pseudoModel)">OK</v-btn>
																												</v-time-picker>
																								</v-card>
																				</flex-column>
																</v-dialog>
												</template>
												<template v-else-if="renderer == 'datetimepicker'">
																<fluro-date-time-picker :outline="showOutline" :large="!params.small" :error-messages="errorMessages" :min="minDate" :max="maxDate" :success="success" :required="required" format="ddd D MMM - h:mma " timePickerFormat="ampm" :label="displayLabel" :placeholder="placeholder" :hint="field.description" v-model="fieldModel" @touched="touch()" />
																<!-- <pre>{{fieldModel}}</pre> -->
												</template>
												<template v-else-if="renderer == 'timezoneselect'">
																<template v-if="mobile">
																				<v-select :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="timezoneOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
																<template v-else>
																				<v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="timezoneOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
												</template>
												<template v-else-if="renderer == 'countrycodeselect'">
																<template v-if="mobile">
																				<v-select :persistent-hint="true" dense :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryCodeOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
																<template v-else>
																				<v-autocomplete :persistent-hint="true" dense :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryCodeOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
												</template>
												<template v-else-if="renderer == 'countryselect'">
																<template v-if="mobile">
																				<v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
																<template v-else>
																				<v-select :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="countryOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																</template>
												</template>
												<template v-else-if="renderer == 'definitionselect'">
																<v-select :persistent-hint="true" :outline="showOutline" :success="success" :required="required" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="definitionOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
												</template>
												<template v-else-if="renderer == 'select'">
																<!-- <pre>{{fieldModel}}</pre> -->
																<template v-if="useBasicDropdown">
																				<v-select :persistent-hint="true" :outline="showOutline" :success="success" :return-object="type == 'reference'" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder">
																								<template v-slot:item="{item}">
																												<v-layout align-center>
																																<v-flex shrink style="padding-right:8px;">
																																				<fluro-icon :icon="optionIsSelected(item) ? 'check-square' : 'square'" :library="optionIsSelected(item) ? 'fas' : 'far'" />
																																</v-flex>
																																<v-flex>
																																				<div class="border-bottom" v-if="item.description && item.description.length">
																																								<strong>{{item.title || item.name}}</strong><br />
																																								<div class="muted font-xs">{{item.description}}</div>
																																				</div>
																																				<template v-else>
																																								{{item.title || item.name}}
																																				</template>
																																</v-flex>
																												</v-layout>
																								</template>
																				</v-select>
																</template>
																<template v-else>
																				<v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :return-object="type == 'reference'" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder">
																								<template v-slot:item="{item}">
																												<v-layout align-center>
																																<v-flex shrink style="padding-right:8px;">
																																				<fluro-icon :icon="optionIsSelected(item) ? 'check-square' : 'square'" :library="optionIsSelected(item) ? 'fas' : 'far'" />
																																</v-flex>
																																<v-flex>
																																				<div class="border-bottom" v-if="item.description && item.description.length">
																																								<strong>{{item.title || item.name}}</strong><br />
																																								<div class="muted font-xs">{{item.description}}</div>
																																				</div>
																																				<template v-else>
																																								{{item.title || item.name}}
																																				</template>
																																</v-flex>
																												</v-layout>
																								</template>
																				</v-autocomplete>
																</template>
												</template>
												<template v-else-if="renderer == 'content-select-button'">
																<v-input class="no-flex" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
																				<fluro-content-select-button :context="context" :debugMode="debugMode" :contextField="contextField" block :recursiveClick="recursiveClick" :type="restrictType" :minimum="minimum" :maximum="maximum" :searchInheritable="searchInheritable" :allDefinitions="allDefinitions" v-model="fieldModel" />
																</v-input>
												</template>
												<template v-else-if="renderer == 'content-select'">
																<v-input class="no-flex" :label="displayLabel" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
																				<!--  -->
																				<!-- CONTENT SELECT -->
																				<fluro-content-select :options="params.contentSelect" :context="context" :template="params.template" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :success="success" :required="required" :error-messages="errorMessages" :label="displayLabel" :outline="showOutline" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="placeholder" :minimum="minimum" @blur="touch()" @focus="focussed();" :type="restrictType" :lockFilter="referenceFilter" @input="elementValueChanged" :searchInheritable="searchInheritable" :maximum="maximum" v-model="fieldModel" />
																</v-input>
												</template>
												<template v-else-if="renderer == 'search-select'">
																<v-autocomplete :persistent-hint="true" :outline="showOutline" :success="success" :deletable-chips="true" :hide-selected="true" prepend-inner-icon="search" :error-messages="errorMessages" :cache-items="!defaultReferences || !defaultReferences.length" :chips="multipleInput" :clearable="!required" :return-object="true" item-text="title" v-model="fieldModel" @blur="touch()" @focus="focussed()" @change="elementValueChanged($event, true)" :multiple="multipleInput" :loading="loading" :items="searchResults" :search-input.sync="keywords" flat hide-no-data :label="displayLabel">
																				<template v-slot:item="{ item }">
																								<fluro-avatar class="xs" :id="item._id" type="contact"></fluro-avatar>    
																								<v-list-tile-content>
																												<v-list-tile-title v-text="item.title"></v-list-tile-title>
																								</v-list-tile-content>
																				</template>
																</v-autocomplete>
												</template>
												<template v-else-if="renderer == 'signature'">
																<template v-if="multipleInput">
																				<template v-if="fieldModel && fieldModel.length">
																								<template v-for="(entry, index) in fieldModel">
																												<fluro-signature-field @blur="touch()" @focus="focussed();" :outline="showOutline" :success="success" :label="displayLabel" v-model="fieldModel[index]" :required="required" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" />
																								</template>
																				</template>
																				<template v-if="canAddValue">
																								<template v-if="webMode">
																												<fluro-button @click="addValue('')">
																																{{multiLabel}}
																																<fluro-icon icon="plus" right />
																												</fluro-button>
																								</template>
																								<template v-else>
																												<v-btn color="primary" class="ml-0" @click="addValue('')">
																																{{multiLabel}}
																																<fluro-icon icon="plus" right />
																												</v-btn>
																								</template>
																				</template>
																</template>
																<template v-else>
																				<fluro-signature-field @blur="touch()" @focus="focussed();" :outline="showOutline" :success="success" :label="displayLabel" v-model="fieldModel" :required="required" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" />
																</template>
												</template>
												<client-only v-else-if="renderer == 'code'" style="display:block">
																<v-input class="no-flex" :hint="field.description" :persistent-hint="true">
																				<template v-if="multipleInput">
																								<template v-if="fieldModel && fieldModel.length">
																												<template v-for="(entry, index) in fieldModel">
																																<fluro-code-editor :autoformat="autoformat" @blur="touch()" @focus="focussed();" :outline="showOutline" :success="success" v-model="fieldModel[index]" :lang="syntax" :height="200" />
																												</template>
																								</template>
																								<template v-if="canAddValue">
																												<template v-if="webMode">
																																<fluro-button @click="addValue('')">
																																				{{multiLabel}}
																																				<fluro-icon icon="plus" right />
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn color="primary" class="ml-0" @click="addValue('')">
																																				{{multiLabel}}
																																				<fluro-icon icon="plus" right />
																																</v-btn>
																												</template>
																								</template>
																				</template>
																				<template v-else>
																								<v-label>{{displayLabel}}</v-label>
																								<v-card class="no-flex">
																												<fluro-code-editor :autoformat="autoformat" @blur="touch()" @focus="focussed();" :outline="showOutline" :success="success" v-model="fieldModel" :lang="syntax" :height="200" />
																								</v-card>
																				</template>
																</v-input>
												</client-only>
												<template v-else-if="renderer == 'textarea'">
																<v-input class="no-flex" :outline="showOutline" :success="success" :required="required" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description">
																				<template v-if="multipleInput">
																								<template v-if="fieldModel && fieldModel.length">
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
																																<v-textarea :outline="showOutline" :success="success" :required="required" v-model="fieldModel[index]" @blur="touch()" @focus="focussed()" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="placeholder" />
																																<!-- <fluro-editor @blur="touch()" @focus="focussed();" v-model="fieldModel[index]" :options="multiEditorOptions" @input="elementValueChanged" :placeholder="placeholder" /> -->
																												</template>
																								</template>
																								<template v-if="canAddValue">
																												<template v-if="webMode">
																																<fluro-button @click="addValue('')">
																																				{{multiLabel}}
																																				<fluro-icon icon="plus" right />
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn color="primary" class="ml-0" @click="addValue('')">
																																				{{multiLabel}}
																																				<fluro-icon icon="plus" right />
																																</v-btn>
																												</template>
																								</template>
																				</template>
																				<template v-if="!multipleInput">
																								<v-textarea :outline="showOutline" :success="success" :required="required" :label="displayLabel" v-model="model[field.key]" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="placeholder" />
																				</template>
																</v-input>
												</template>
												<template v-else-if="renderer == 'wysiwyg'">
																<v-input class="no-flex" :outline="showOutline" :success="success" :required="required" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description">
																				<template v-if="multipleInput">
																								<template v-if="fieldModel && fieldModel.length">
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
																																<fluro-editor @blur="touch()" @focus="focussed();" v-model="fieldModel[index]" :options="multiEditorOptions" @input="elementValueChanged" :placeholder="placeholder" />
																												</template>
																								</template>
																								<template v-if="canAddValue">
																												<template v-if="webMode">
																																<fluro-button @click="addValue('')">
																																				{{multiLabel}}
																																				<fluro-icon icon="plus" right />
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn color="primary" class="ml-0" @click="addValue('')">
																																				{{multiLabel}}
																																				<fluro-icon icon="plus" right />
																																</v-btn>
																												</template>
																								</template>
																				</template>
																				<template v-if="!multipleInput">
																								<v-label>{{displayLabel}}</v-label>
																								<fluro-editor v-model="fieldModel" :options="editorOptions" @blur="touch()" @focus="focussed()" :placeholder="placeholder" />
																				</template>
																</v-input>
												</template>
												<template v-else-if="renderer == 'upload'">
																<!-- UPLOAD -->
																<v-input class="no-flex" :outline="showOutline" :success="success" :label="displayLabel" :required="required" :error-messages="errorMessages" :persistent-hint="true" :hint="fileHint">
																				<div class="file-items" v-if="files && files.length">
																								<div class="file-item" v-for="file in files">
																												<v-layout row>
																																<v-flex grow>
																																				<strong>{{file.name}}</strong>
																																				<div class="small"><span v-if="file.state == 'progress'">Uploaded {{file.progress}}% of </span><span class="muted">{{file.size | filesize}}</span></div>
																																</v-flex>
																																<v-flex shrink>
																																				<template v-if="file.state == 'error'">
																																								<v-hover>
																																												<v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
																																																<fluro-icon v-if="hover" icon="times" />
																																																<fluro-icon v-else icon="exclamation" />
																																												</v-btn>
																																								</v-hover>
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
																				<label class="file-drop" v-if="canAddFile" @dragover.prevent.stop="fileover" @drop.prevent.stop="filedrop">
																								<input ref="file" type="file" :multiple="multipleInput" @change="filesSelected($event.target.files)">
																								Drag and drop a file or click to select {{multipleInput ? 'files' : 'a file'}}
																				</label>
																</v-input>
												</template>
												<template v-else-if="renderer == 'academic-select'">
																<v-select :persistent-hint="true" :outline="showOutline" :success="success" :return-object="true" :label="displayLabel" no-data-text="No options available" :multiple="false" v-model="academicModel" item-text="title" :items="academicCalendarOptions" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :hint="field.description" :placeholder="placeholder" />
																<div v-if="gradeOptions && gradeOptions.length">
																				<v-select :outline="showOutline" :success="success" label="Grade" :multiple="false" v-model="model['academicGrade']" item-text="title" :items="gradeOptions" @blur="touch()" @focus="focussed()" />
																</div>
												</template>
												<template v-else-if="renderer == 'currency' && !multipleInput">
																<fluro-currency-input :currency="params.currency" :hideSuffix="params.hideSuffix" :min="minValue" :max="maxValue" :label="displayLabel" :required="required" v-model="fieldModel" :autofocus="shouldAutofocus" :outline="showOutline" :success="success" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="placeholder" />
												</template>
												<template v-else-if="renderer == 'app-menu-select'">
																<fluro-app-menu-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-type-select'">
																<fluro-app-type-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-block-select'">
																<fluro-app-block-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-font-select'">
																<fluro-app-font-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-page-select'">
																<fluro-app-page-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-size-select'">
																<fluro-app-size-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-field-select'">
																<fluro-app-field-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-field-key-select'">
																<fluro-app-field-key-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-theme-select'">
																<fluro-app-theme-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-font-select'">
																<fluro-app-font-select :field="field" v-model="fieldModel" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'app-filter-select'">
																<fluro-app-filter-select :field="field" v-model="fieldModel" :parentModel="model" :options="options" :label="displayLabel" />
												</template>
												<template v-else-if="renderer == 'color' && !multipleInput">
																<!-- COLOR COLOR -->
																<v-menu :fixed="true" v-model="modal" min-width="290px" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																				<template v-slot:activator="{ on }">
																								<v-input :label="displayLabel" :persistent-hint="true" class="no-flex">
																												<div class="color-swatch" v-on="on">
																																<div class="swatch" :style="{backgroundColor:colorModel.hex8}"><span>{{colorModel.hex8 ? colorModel.hex8 : 'transparent'}}</span></div>
																												</div>
																								</v-input>
																				</template>
																				<div>
																								<color-picker @blur="touch()" @focus="focussed();" v-model="colorModel" />
																				</div>
																</v-menu>
												</template>
												<template v-else>
																<template v-if="multipleInput">
																				<v-input :outline="showOutline" :label="displayLabel" :success="success" class="no-flex">
																								<div class="help-text" v-if="field.description">
																												{{field.description}}
																								</div>
																								<template v-if="fieldModel && fieldModel.length">
																												<draggable v-model="fieldModel" handle=".handle" v-bind="dragOptions" @start="drag=true" @end="drag=false">
																																<!-- <transition-group type="transition" :name="!drag ? 'flip-list' : null"> -->
																																<div class="multi-input-row" :key="entry" v-for="(entry, index) in fieldModel">
																																				<span class="handle">
																																								<fluro-icon icon="arrows" left />
																																				</span>
																																				<v-flex style="padding:0 !important;">{{entry}}</v-flex>
																																				<!-- v-if="type == 'email'"  -->
																																				<span v-tippy content="Click to copy" @click="copyToClipboard(entry)">
																																								<fluro-icon icon="copy" />
																																				</span>
																																				<span @click="removeValue(index, true)">
																																								<fluro-icon icon="trash-alt" right />
																																				</span>
																																</div>
																																<!-- </transition-group> -->
																												</draggable>
																								</template>
																								<template v-if="canAddValue">
																												<v-text-field :type="directive == 'password' ? 'password' : 'text'" @focus="focussed();" :mask="params.mask" :autofocus="shouldAutofocus" class="faint" @input="elementValueChanged" append-inner-icon="plus" :outline="showOutline" :success="success" browser-autocomplete="off" append-icon="plus" :required="required" :label="multiLabel" v-model="proposedValue" @keyup.enter.native.stop.prevent="addProposedValue()" @blur="addProposedValue()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="hint" :placeholder="placeholder" />
																								</template>
																				</v-input>
																</template>
																<template v-if="!multipleInput">
																				<v-text-field :type="directive == 'password' ? 'password' : 'text'" :mask="params.mask" :autofocus="shouldAutofocus" :outline="showOutline" :success="success" browser-autocomplete="off" :required="required" :label="displayLabel" @input="elementValueChanged" v-model="fieldModel" @blur="touch()" @focus="focussed()" :error-messages="errorMessages" :persistent-hint="persistentDescription" :hint="field.description" :placeholder="placeholder" />
																</template>
												</template>
								</template>
				</div>
</template>
<script>
//Import validation options from vuelidate
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, email, url } from 'vuelidate/lib/validators';
/**

import validators from 'vuelidate/lib/validators';
const { required, minLength, maxLength, email, url } = ;
/**/
import _ from 'lodash';
import Vue from 'vue';

import { Chrome } from 'vue-color';



//Allow custom html to be injected at runtime

// import Expressions from 'expression-eval';
import { parse as ExpressionParse } from "expression-eval";
import { eval as ExpressionEval } from "expression-eval";

////////////////////////////////////////////////////////


import draggable from 'vuedraggable';
// import FluroContentForm from './FluroContentForm.vue';
// import FluroContentFormField from './FluroContentFormField.vue';
import FluroCompileHtml from '../FluroCompileHtml.vue';
// import FluroEditor from './FluroEditor.vue';
import FluroCurrencyInput from './FluroCurrencyInput.vue';
// import FluroCodeEditor from './FluroCodeEditor.vue';
import FluroSignatureField from './FluroSignatureField.vue';
import FluroDateTimePicker from './FluroDateTimePicker.vue';
import FluroContentSelect from './FluroContentSelect.vue';
import FluroContentSelectButton from './contentselect/FluroContentSelectButton.vue';
import FluroRealmSelect from './realmselect/FluroRealmSelect.vue';
// import DynamicImportService from '../../DynamicImportService.js';


// let FluroEditor = import('./FluroEditor.vue');
// let FluroCodeEditor = import('./FluroCodeEditor.vue');


////////////////////////////////////////////////////////

function mapDefaultDateValue(value) {
				if (String(value).toLowerCase() == 'now') {
								////console.log('convert to now')
								return new Date();
				}

				return new Date(value);
}

////////////////////////////////////////////////////////

const RANGE = (x, y) => Array.from((function*() {
				while (x <= y) yield x++;
})());



function getBooleanValue(value) {
				switch (String(value).toLowerCase()) {
								case 'true':
								case 'y':
								case 'yes':
								case '1':
								case 't':
												// //console.log('convert boolean to true > ', value)
												value = true;
												break;
								case 'false':
								case 'n':
								case 'no':
								case '0':
								case 'f':
								case 'undefined':
								case 'null':
								case '':
												// //console.log('convert boolean to false > ', value)
												value = false;
												break;
				}

				return value;
}

////////////////////////////////////////////////////////

export default {
				name: 'fluro-content-form-field',
				components: {
								'color-picker': Chrome,
								draggable,
								// FluroContentForm,
								// FluroContentFormField,
								FluroCompileHtml,
								FluroCurrencyInput,
								// FluroEditor,
								// FluroCodeEditor,
								FluroSignatureField,
								FluroDateTimePicker,
								FluroContentSelect,
								FluroContentSelectButton,
								FluroRealmSelect,
				},
				data() {






								return {
												actualDateModelDay: null,
												actualDateModelMonth: null,
												actualDateModelYear: null,
												ready: true,
												hasInitialValue: false,
												asyncOptionsLoading: false,
												drag: false,
												test: null,
												modal: false,
												model: this.value, // this.value, // this.value, // Vue.observable(this.value), //JSON.parse(JSON.stringify(this.value)),
												// model: this.value,
												textDate: '',
												proposedValue: null,
												pseudoModel: null,
												color: null,

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
								formattedDate(dateString) {

												var self = this;
												self.textDate = dateString;
								},
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
												//////////console.log('Searching', keywords);



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


												//If there is a default value expression
												if (!this.expressions || !this.expressions.defaultValue) {
																return;
												}


												// ////console.log('Set from default expression', this.$v.model.$dirty, this.hasInitialValue, this.field.title, v);

												//If the user has entered data into here
												//Don't make any change
												if (this.$v.model.$dirty || this.hasInitialValue) {
																////console.log(this.field.title, 'is dirty', this.$v.model.$dirty, this.hasInitialValue)
																return;
												} else {
																////console.log(this.field.title, 'Is not dirty', this.$v.model.$dirty, this.hasInitialValue)
												}

												v = this.cleanInput(v);

												this.$set(this.model, this.field.key, v);
												// this.model[this.field.key] = v;
												this.$emit('input', this.model);
												// this.fieldModel = v;

								},
								expressionValue(v) {


												if (this.expressions && this.expressions.value) {

																v = this.cleanInput(v);

																// this.fieldModel = v;
																// this.model[this.field.key] = v;
																this.$set(this.model, this.field.key, v);
																this.$emit('input', this.model);
																// ////console.log('Expression Updated value', v)
												}


												// //Update this field to reconnect with the new model
												// this.model[this.key] = v[this.key];
								},
								value(val) {



												if (this.model != val) {


													console.log('new model coming in', this.field.key);
																
																//Set the new model
																this.model = val;

																if (this.model) {
																				//Clean up any bad input
																				this.model[this.field.key] = this.fixCorruptedData(this.model[this.field.key]);

																				//Set the defaults
																				this.createDefaults();


																				// this.$set(this, 'model', val);
																				//And reset
																				// ////console.log('RESET INSIDE VALUE()', this.model != val, this.model, val)
																				this.reset();
																				this.checkInitialValue();
																}
												} else {
													console.log('model is already the same')
												}

												this.$forceUpdate();



								},
								// 'isNew':'checkNew',
				},
				computed: {
								// textDate: {
								// 				get() {

								// 								var self = this;
								// 								if (self.field.type != 'date') {
								// 												//console.log('TEXTDATE > IS NOT A DATE')
								// 												return;
								// 								}

								// 								if (self.multipleInput) {
								// 												//console.log('TEXTDATE > IS MULTIPLE')
								// 												return;
								// 								}

								// 								return self.textualDate;
								// 								// self.textualDate;
								// 								// var dateString = self.fieldModel;
								// 								// var d = new Date(dateString);
								// 								// var isValid = d instanceof Date && !isNaN(d);
								// 								// return d;
								// 				},
								// 				set(dateString) {
								// 								var self = this;
								// 								if (self.field.type != 'date') {
								// 												self.textualDate = null;
								// 												return;
								// 								}

								// 								//////////////////////////////////////

								// 								self.textualDate = dateString;

								// 								//////////////////////////////////////

								// 								//See if we can make sense of the date
								// 								var d = new Date(dateString);
								// 								var isValid = d instanceof Date && !isNaN(d);
								// 								if (isValid) {
								// 												self.fieldModel = d;
								// 								}
								// 				}
								// },
								academicModel: {
												get() {
																return this.fieldModel;
												},
												set(s) {
																this.fieldModel = s;

																//Just in case they name it something different
																if (this.field.key != 'academicCalendar') {
																				//Fill in the gap and ensure we save the academic calendar also
																				this.$set(this.model, 'academicCalendar', s);
																}
												}
								},
								gradeOptions() {
												var self = this;

												var fieldModel = self.fieldModel;
												if (fieldModel && fieldModel.grades && fieldModel.grades.length) {
																return _.map(fieldModel.grades, function(grade) {
																				return {
																								title: grade.title,
																								text: grade.title,
																								name: grade.title,
																								value: grade.key,
																				}
																})
												}
								},
								dateModelDay: {
												get() {

																return this.actualDateModelDay
																// if (!this.dateStringModel) {
																// 				return;
																// }

																// return this.dateStringModel.split('-')[2];
												},
												set(v) {

																if (v == undefined || v == null) {
																				this.actualDateModelMonth = null;
																				return;
																}

																this.actualDateModelDay = v;
																if (!this.actualDateModelYear || !this.actualDateModelMonth) {
																				return;
																}

																this.dateStringModel = `${this.actualDateModelYear}-${this.actualDateModelMonth}-${this.actualDateModelDay}`;
												}
								},
								dateModelMonth: {
												get() {
																return this.actualDateModelMonth
																// if (!this.dateStringModel) {
																// 				return;
																// }

																// return this.dateStringModel.split('-')[1];
												},
												set(v) {

																if (v == undefined || v == null) {
																				this.actualDateModelMonth = null;
																				return;
																}
																this.actualDateModelMonth = v;
																if (!this.actualDateModelDay || !this.actualDateModelYear) {
																				return;
																}

																this.dateStringModel = `${this.actualDateModelYear}-${this.actualDateModelMonth}-${this.actualDateModelDay}`;
												}
								},
								dateModelYear: {
												get() {
																return this.actualDateModelYear;
																// if (!this.dateStringModel) {
																// 				return;
																// }

																// return this.dateStringModel.split('-')[0];
												},
												set(v) {

																if (v == undefined || v == null) {
																				this.actualDateModelMonth = null;
																				return;
																}

																this.actualDateModelYear = v;
																if (!this.actualDateModelDay || !this.actualDateModelMonth) {
																				return;
																}

																this.dateStringModel = `${this.actualDateModelYear}-${this.actualDateModelMonth}-${this.actualDateModelDay}`;
												}
								},
								dateDayOptions() {
												return RANGE(1, 31).map(function(v) {
																return {
																				title: v,
																				value: v,
																}
												})
								},
								dateMonthOptions() {
												var array = [];

												array.push({
																title: 'January',
																value: '01',
												})

												array.push({
																title: 'February',
																value: '02',
												})

												array.push({
																title: 'March',
																value: '03',
												})

												array.push({
																title: 'April',
																value: '04',
												})

												array.push({
																title: 'May',
																value: '05',
												})

												array.push({
																title: 'June',
																value: '06',
												})

												array.push({
																title: 'July',
																value: '07',
												})

												array.push({
																title: 'August',
																value: '08',
												})

												array.push({
																title: 'September',
																value: '09',
												})

												array.push({
																title: 'October',
																value: '10',
												})

												array.push({
																title: 'November',
																value: '11',
												})

												array.push({
																title: 'December',
																value: '12',
												})

												return array;
								},
								dateYearOptions() {

												var year = new Date().getFullYear();
												return RANGE(year - 110, year)
																.reverse()
																.map(function(v) {
																				return {
																								title: v,
																								value: String(v),
																				}
																})
								},
								webMode() {

												var self = this;



												if (!self.$fluro.app) {
																return;
												}

												var element = self.$el;
												if (!element) {
																return;
												}

												if (!element.ownerDocument) {
																return;
												}

												if (!element.ownerDocument.defaultView) {
																return;
												}

												return !element.ownerDocument.defaultView.adminPanelMode;
								},
								useBasicDropdown() {
												return this.selectOptions.length < 5 || this.mobile || this.params.dropdown;
								},
								placeholder() {
												var placeholder = this.field.placeholder;
												if (placeholder == undefined || placeholder == null || placeholder == '') {
																return;
												}

												return String(placeholder);
								},
								autoformat() {
												return this.params.autoformat != false;
								},
								isContext() {
												return this.contextField == this.field;
								},
								isNew() {
												return this.field.isNew;
								},
								shouldAutofocus() {
												return this.autofocus || this.params.autofocus;
								},
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
												var integer = _.get(this, 'field.params.maxValue');
												if (!integer || !parseFloat(integer) || isNaN(integer)) {
																return;
												}

												return integer;
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

												var self = this;


												if (this.fieldModel) {
																switch (this.field.key) {
																				case 'dob':
																				case '_dob':
																								var years = this.$fluro.date.moment().diff(this.fieldModel, 'years');

																								// parseInt(self.$fluro.date.moment().format('YYYY')) - parseInt(self.$fluro.date.moment(this.fieldModel).format('YYYY'))

																								if (this.model.dobVerified) {
																												return `${years} Years old`;
																								} else {
																												return `${years} Years old`;
																								}

																								break;
																}
												}


												return this.dateFormat;


								},

								dateStringModel: {
												get() {

																if (!this.fieldModel) {
																				return null;
																}

																return this.$fluro.date.formatDate(this.fieldModel, 'YYYY-MM-DD');
												},
												set(dateString) {


																if (!dateString) {
																				this.fieldModel = null;
																				return;
																}

																this.fieldModel = new Date(dateString);

																////console.log('SET', dateString, this.fieldModel)
																// new Date(dateString);
												},
								},

								formattedDate() {

												var self = this;

												if (self.fieldModel === undefined || self.fieldModel === null || self.fieldModel === '') {
																return;
												}

												return self.fieldModel ? self.$fluro.date.moment(self.fieldModel).format(self.dateFormat) : ''


								},
								// formattedDate() {
								//     return this.$fluro.date.formatDate(this.fieldModel, 'dddd D MMM YYYY');
								// },
								asyncOptionsURL() {

												var self = this;

												switch (self.directive) {
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
								allDefinitions() {
												if (this.field.params && this.field.params.allDefinitions) {
																return this.field.params.allDefinitions;
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

												var editorOptions = this.options.editor || this.params.editor || {}

												if (this.params.tokens && this.params.tokens.length) {
																editorOptions.tokens = this.params.tokens;
												}
												return editorOptions;
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
												var self = this;

												return JSON.parse(JSON.stringify({
																field: self.field,
																model: self.fieldModel,
																data: self.model,

												}))
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
												if (!this.canAddValue) {
																//console.log('Cant add file')
																return;
												}

												if (this.maximum == 1) {
																if (this.files && this.files.length) {
																				//console.log('already full', this.files)
																				return;
																}
												}

												return true;
								},
								canAddValue() {

												//There is no maximum
												if (this.maximum == 0) {
																return true;
												}

												//We are under the maximum
												if (this.total < this.maximum) {
																// //////////console.log(this.title, 'is under',this.total, this.maximum)
																return true;
												}

												//console.log('Cant add value', this.total, this.maximum)
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
												return _.map(this.field.allowedReferences, function(reference) {
																reference.value = reference._id;
																return reference;
												});
								},

								defaultValues() {

												if (this.disableDefaults) {
																return [];
												}


												return _.filter(this.field.type == 'reference' ? this.defaultReferences : this.field.defaultValues, function(value) {

																switch (value) {
																				case 'null':
																				case 'undefined':
																				case null:
																				case undefined:
																								return;
																								break;
																				default:
																								return value;
																								break;
																}
																// return value != null 
												});


												// .filter(function(entry) {

												// 	if(!entry) {
												// 		return;
												// 	}

												// 	if(_.isObject(entry) && !Object.keys(entry).length ) {
												// 		return;
												// 	}

												// 	return true;
												// })
												// .value();
								},
								defaultReferences() {

												if (this.disableDefaults) {
																return [];
												}


												return _.compact(this.field.defaultReferences);
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

												if (this.isContext) {
																classes.push('is-context')
												}

												////////////////////////////////////////////////

												switch (this.renderer) {
																case 'group':
																case 'embedded':
																				if (this.asObject || this.renderer == 'embedded') {
																								if (this.multipleInput) {
																												classes.push(`multiple-input`);
																												classes.push(`multiple-input-values-${this.fieldModel ? this.fieldModel.length : null}`)
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

																if (!this.color) {
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

																if (self.field.type == 'void') {
																				// //console.log('Void get nothing')
																				return false;
																}

																if (!self.field.key || !self.field.key.length) {
																				//	//console.log('Field not ready yet')
																				return;
																}



																//Get the value for this field
																var value = self.model[self.field.key];
																// //console.log('GET clean going in', self.field.title, value);
																var cleaned = self.cleanOutput(value);
																// //console.log('GET clean going out', self.field.title, cleaned);

																return cleaned;

												},
												set(value) {

																var self = this;

																if (self.field.type == 'void') {
																				// ////console.log('Void set nothing')
																				self.$emit('input', self.model);
																				return;
																}


																//Clean the input
																// //console.log('Before clean', value)
																// //console.log('SET clean going in', self.field.title, value);
																value = self.cleanInput(value);

																// //console.log('SET clean going out', self.field.title, value);


																//////////////////////////////////
																//If there is a change
																if (self.model[self.field.key] != value) {

																				// //console.log('SET VALUE TO', value)
																				self.$set(self.model, self.field.key, value);

																				self.$emit('input', self.model);
																				// //console.log('Emit', value, self.model[self.field.key])
																				//
																				// } else {

																				// //console.log('SAME VALUE', self.model[self.field.key], value)
																				// if(self.field.type == 'boolean') {
																				// 	self.$set(self.model, self.field.key, value);
																				// 				self.$emit('input', self.model);
																				// 				//console.log('change', self.field.key, self.model[self.field.key], value);
																				// }



																				// self.$forceUpdate();
																				// //console.log('EMIT CHANGE')
																}


															console.log('checkit', self.field.key, self.model, self.fieldModel, self.model[self.field.key]);

																//  else {
																// 	////console.log('Value is already same thing!')
																// 	self.$emit('input', self.model);
																// }
																//////////////////////////////////

																return;
																//////////////////////////////////



																// //////////////////////////////////

																// // self.model[self.field.key] = value;
																// self.$set(self.model, self.field.key, value);

																// ////console.log('VALUE TEST CHANGED', self.field.key, self.fieldModel == value, self.model[self.field.key] == value, self.fieldModel)

																// self.valueChange();

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

												var isWebForm = _.get(this.field, 'params.disableWebform');
												var isNotAdminContext = this.context != 'admin';

												if (this.context == 'raw') {
																return;
												}

												if (isWebForm && isNotAdminContext) {
																return true;
												}


								},
								type() {

												if (!this.field) {
																console.error('Field not defined!!', this);
												}
												return this.field.type;
								},
								expressions() {
												return this.field ? this.field.expressions || {} : {};
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

												switch (this.renderer) {
																case 'group':
																case 'embedded':
																				//If we are an embedded we are multiple if minimum OR maximum is not 1
																				if (this.minimum === 0) {
																								return true;
																				}
																				break;
												}

												//////////////////////////////

												return this.maximum !== 1;

												// return this.maximum === 0 || this.maximum > 1;
								},
								countryCodeOptions() {
												var options = _.chain(this.asyncOptions)
																.map(function(country) {

																				var countryName = country.name;
																				var countryAlpha2 = country.alpha2;
																				var countryCallingCodes = country.countryCallingCodes;

																				var title = `${countryName} - ${countryAlpha2} (${countryCallingCodes.join(', ')})`;

																				return {
																								title,
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

								academicCalendarOptions() {

												var self = this;

												var allOptions = self.selectOptions.slice();
												return allOptions;
								},
								selectOptions() {

												var self = this;

												////////////////////////////////////////

												if (!self.field) {
																return [];
												}

												////////////////////////////////////////

												var actualOptions = [];





												if (self.field.options && self.field.options.length) {
																actualOptions = _.chain(self.field.options)
																				.map(function(option) {

																								if (!option) {
																												return;
																								}

																								if (_.isString(option)) {
																												return {
																																title: option,
																																name: option,
																																text: option,
																																value: option,
																												}
																								}

																								option.title = option.title ? option.title : (option.name || option.text || String(option));

																								return option;
																				})
																				.compact()
																				.value();
												} else {
																if (self.allowedValues && self.allowedValues.length) {
																				actualOptions = _.chain(self.allowedValues)
																								.compact()
																								.map(function(option) {
																												return {
																																name: option,
																																value: option,
																																title: option,
																																text: option,
																												}
																								})
																								.value();
																}
												}

												////////////////////////////////////////

												if (self.field.type == 'reference' && self.allowedReferences && self.allowedReferences.length) {
																actualOptions = self.allowedReferences;
												}



												////////////////////////////////////////

												if (self.asyncOptions && self.asyncOptions.length) {
																actualOptions = self.asyncOptions;
												}


												var options = actualOptions.slice();
												if (!self.field.minimum && self.field.maximum == 1) {

																var match

																switch (self.field.type) {
																				case 'boolean':
																								match = _.find(actualOptions, function(option) {
																												return option.value == '' || getBooleanValue(option.value) == false;
																								});

																								break;
																				default:
																								match = _.find(actualOptions, { value: '' });
																								break;
																}

																////////////////////////////////////////


																if (!match && (self.directive == 'select')) {
																				options.unshift({
																								name: 'None',
																								title: 'None',
																								text: 'None',
																								value: '',
																				})
																}
												}

												////////////////////////////////////////

												return options;
								},
								minimum() {
												return Math.max(parseInt(this.field.minimum), 0);
								},
								maximum() {
												return parseInt(this.field.maximum);
								},
								total() {

												var v = 0;

												if (this.multipleInput && this.fieldModel) {
																v = _.get(this.fieldModel, 'length') || 0;
												}

												return v;

								},
								askCount() {
												return Math.max(this.minimum, this.field.askCount);
								},
								errorMessages() {

												// ////console.log('Compile errors', this.title, this.$v.model.$dirty);
												var self = this;
												const errors = []

												// return ['Errors on purpose'];



												if (self.type == 'void') {
																return errors;
												}




												if (self.type == 'group' && !self.asObject) {
																return errors;
												}

												if (!self.isVisible) {
																// ////console.log('No errors', this.field.title);
																return errors;
												} else {
																// return ['Errors on purpose'];
												}


												//Hasn't been touched yet
												if (!this.$v.model.$dirty) {
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

																																////console.log('ANSWERS IS', numberOfAnswersProvided, this.minimum, this.maximum)
																																errors.push(`Please provide at least ${this.minimum} ${valueType}s`)
																												}
																								}

																								//If we are over the maximum
																								if (this.maximum && numberOfAnswersProvided > this.maximum) {
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
								directive() {
												switch (this.field.directive) {
																default:
																				return this.field.directive;
																				break;
												}

												//console.log('DIRECTIVE', this.field.directive)
								},
								renderer() {

												var self = this;

												//Get the widget defined on the data object
												var dataType = self.type;
												var directive = self.directive;

												// //console.log(this.field.title, directive);
												/////////////////////////////////

												if (self.dynamic) {
																if (dataType == 'date') {
																				return 'dynamicdate';
																}
												}




												/////////////////////////////////


												if (self.context == 'admin' || self.context == 'definition') {
																// If we are in the admin panel
																//And we are a reference field
																if (dataType == 'reference') {
																				switch (directive) {
																								case 'academic-select':
																												return directive;
																												break;
																								case 'realmselect':
																								case 'realm-select':
																												return 'realmselect';
																												break;
																								case 'content-select-button':
																												return directive;
																												break;
																								case 'reference-select':
																												if (self.asyncOptionsURL || (self.allowedReferences && self.allowedReferences.length)) {
																																return 'select';
																												} else {
																																return 'content-select';
																												}
																												break;
																								default:
																												return 'content-select';
																												break;

																				}

																}
												} else {
																if (directive == 'custom') {
																				return directive;
																}
												}

												/////////////////////////////////
												/////////////////////////////////
												/////////////////////////////////

												switch (directive) {
																case 'app-menu-select':
																case 'app-page-select':
																case 'app-theme-select':
																case 'app-block-select':
																case 'app-font-select':
																case 'app-filter-select':
																case 'app-size-select':
																case 'app-style-select':
																case 'academic-select':
																				break;
																case 'value':
																				directive = 'value';
																				break;
																case 'color':
																				directive = 'color';
																				break;
																case 'currency':
																				directive = 'currency';
																				break;
																case 'realm-select':
																case 'realmselect':
																				directive = 'realmselect';
																				break;
																case 'content-select-button':
																				directive = 'content-select-button';
																				break;
																case 'dobselect':
																case 'dob-select':
																				directive = 'dob';
																				break;
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

																				switch (self.context) {
																								case 'admin':
																								case 'definition':
																												directive = 'content-select';
																												break;

																								case 'publicForm':
																								case 'builder':
																												break;
																								default:
																												if (!self.webMode && window.adminPanelMode) {
																																directive = 'content-select';
																												}
																												break;

																				}
																				break;


																case 'button-select':
																				directive = 'button-select';
																				break;
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
																								case 'float':
																												directive = 'number';
																												break;
																								case 'reference':
																												switch (self.context) {
																																case 'raw':
																																case 'admin':
																																case 'definition':
																																				// case 'builder':
																																				directive = 'content-select';
																																				break;
																																				// case 'builder':
																																default:

																																				//console.log('CONTEXT IS', self.context)
																																				directive = 'select';
																																				break;

																												}


																												break;

																				}
																				break;


												}

												////////////////////////////////
												if (!directive) {
																directive = 'input';
												}
												////////////////////////////////

												//Return the basic data type by default
												return directive;
								}
				},
				methods: {
								optionIsSelected(item) {
												if (!this.fieldModel) {
																return;
												}

												var value = this.getActualValue(item);

												//If the item is selected
												if (this.getActualValue(this.fieldModel) == value) {
																return true;
												}

												if (_.isArray(this.fieldModel)) {
																return this.fieldModel.includes(value);
												}

								},
								checkTextDateImmediate() {
												var self = this;
												var dateString = this.textDate;

												if (self.field.type != 'date') {
																return;
												}


												if (!dateString) {
																self.fieldModel = null;
																return;
												}

												//////////////////////////////////////

												//See if we can make sense of the date
												var d = new Date(dateString);
												var isValid = d instanceof Date && !isNaN(d);
												if (isValid) {
																self.fieldModel = d;
												}
								},
								checkTextDate: _.debounce(function() {
												this.checkTextDateImmediate();
								}, 2000),
								// checkboxInput(bool) {


								// 				var self = this;

								// 				// if (setTouched) {
								// 				self.touch()
								// 				self.fieldModel = bool;

								// 				// }
								// },
								toggleCollapsed(object) {

												if (!object._collapsed) {
																this.$set(object, '_collapsed', true);
												} else {
																this.$set(object, '_collapsed', false);
												}


												//console.log(object._collapsed);
								},

								// fieldManualUpdate(data) {
								// 	// ////console.log('FIELD UPDATED', this.field.title, data);
								// 	this.$emit('input', this.model);
								// },

								copyToClipboard(value) {
												if (this.$fluro.global.copyToClipBoard) {
																this.$fluro.global.copyToClipBoard(value);
												}
								},
								createDefaults() {

												var self = this;

												///////////////////////////////////////////////

												var value = self.model[self.field.key];
												// ////console.log('Create defaults for', self.field.title, value);
												var hasExistingValue = (value !== undefined && value !== null && value !== '');

												if (self.field.type == 'group' && value == {}) {
																hasExistingValue = false;
																// //console.log('CREATE DEFAULTS FOR GROUP')
												}

												//We already have a value
												if (hasExistingValue) {
																return;
												}

												///////////////////////////////////////////////

												var multipleInput = self.multipleInput;
												var singleInput = !multipleInput;

												////////////////////////////////////////////

												//If we are a group then the fixCorruptedData function
												//will already have created our defaults
												if (self.type == 'group') {
																return;
												}

												///////////////////////////////////////////////
												///////////////////////////////////////////////
												///////////////////////////////////////////////
												///////////////////////////////////////////////

												//There are no defaults set for this field



												////////////////////////////////////////////

												// ////console.log('Update defaults', self.field.title, self.defaultValues);

												////////////////////////////////////////////

												if (singleInput) {

																//Get the first default value
																var defaultValue = _.first(self.defaultValues);

																if (defaultValue) {
																				//Set our field model default value
																				// ////console.log('GET DEFAULT VALUE', self.field.key, defaultValue);
																				self.$set(self.model, self.field.key, self.cleanInput(defaultValue));
																}
												} else {

																var defaultArray = _.map(self.defaultValues, self.cleanInput);
																// //console.log('CREATE DEFAULTS', defaultArray);

																//Add all our default values
																self.$set(self.model, self.field.key, defaultArray);
												}
								},
								cleanOutput(value) {

												var self = this;



												/////////////////////////////////////

												//If there are transform expressions
												if (self.expressions && self.expressions.transform && typeof self.expressions.transform.get == 'function') {
																var transformed = self.expressions.transform.get(value);
																value = transformed;
												}

												/////////////////////////////////////

												if (self.field.directive == 'timepicker') {
																value = self.$fluro.date.militaryTimestamp(value, true)
																// //console.log('TIMEPICKER OUT >', value)
												}

												/////////////////////////////////////

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

												//If we have started with a negative number
												//don't transform until we have the actual number
												if (String(value) == '-') {
																switch (self.field.type) {
																				case 'number':
																				case 'decimal':
																				case 'float':
																				case 'integer':
																								return value;
																								break;

																}
												}

												/////////////////////////////////////

												switch (self.field.type) {
																case 'date':
																				if (value) {
																								if (String(value).toLowerCase() == 'now') {
																												return new Date().toISOString();
																								} else {

																												// console.log('DATE VALUE', value)
																												return new Date(value);
																								}
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
																				if (value != undefined && value != null && !isNaN(value)) {

																								var changeValue;

																								if (String(value).length) {
																												changeValue = Number(parseFloat(value).toFixed(2));
																												// changeValue = Number(value); //parseInt(parseFloat(value).toFixed(2)) / 100;
																								} else {
																												changeValue = 0;
																								}

																								// //console.log('VALUE BEFORE FLOAT', value)
																								//If we have to transform the data
																								// if (parseFloat(value).toFixed(2) != parseFloat(changeValue).toFixed(2)) {
																								value = changeValue;
																								// }
																								// //console.log('VALUE AFTER FLOAT', value)


																				}
																				break;
																case 'float':
																case 'decimal':
																				if (value != undefined && value != null) {
																								if (String(value).length) {
																												if (self.params.disableRounding) {
																																value = Number(parseFloat(value));
																												} else {
																																value = Number(parseFloat(value).toFixed(2));
																												}
																								} else {
																												value = null;
																								}
																				}
																				break;
																case 'boolean':

																				//If there is a value of some sort
																				if (value) {
																								value = getBooleanValue(value);
																								// console.log('Boolean value is', value)
																				} else {
																								// //console.log('boolean false', value);
																								value = false;
																				}

																				/////////////////////////////////////

																				//If we need to inverse
																				if (self.field.inverse) {
																								value = !value;
																				}

																				// ////console.log('BOOLEAN', this.field.title, self.field.inverse ? 'invert to' : 'normal', value);

																				/////////////////////////////////////

																				switch (self.directive) {
																								case 'select':
																								case 'button-select':

																												var matchAgainstValue = value;

																												///////////////////////////////////////////////////////

																												if (self.selectOptions && self.selectOptions.length) {

																																var firstMatch = self.selectOptions.find(function(v) {

																																				var stringValue = String(v.value || v.key || v).toLowerCase();

																																				switch (stringValue) {
																																								case 'true':
																																								case 'y':
																																								case 'yes':
																																								case '1':
																																								case 't':
																																												return matchAgainstValue;
																																												break;
																																								default:
																																												return !matchAgainstValue;
																																												break;
																																				}



																																});

																																if (firstMatch) {
																																				value = firstMatch.value || firstMatch.key || firstMatch;
																																}

																												}

																												///////////////////////////////////////////////////////

																												break;
																				}

																				/////////////////////////////////////

																				break;
												}

												/////////////////////////////////////

												// ////console.log('CLEANED OUTPUT', self.field.title, value)
												return value;
								},
								cleanInput(value) {

												var self = this;

												//////////////////////////////////


												if (value && value.value === '') {
																value = null;
												}

												//////////////////////////////////

												if (self.expressions && self.expressions.transform) {
																if (typeof self.expressions.transform.set == 'function') {
																				var transformed = self.expressions.transform.set(value);
																				value = transformed;
																}
												}


												/////////////////////////////////////

												if (self.field.directive == 'timepicker') {
																value = self.$fluro.date.militaryTimestamp(value)
																// //console.log('TIMEPICKER IN >', value)
												}

												//////////////////////////////////

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

												//If we have started with a negative number
												//don't transform until we have the actual number
												if (String(value) == '-') {
																switch (self.field.type) {
																				case 'number':
																				case 'decimal':
																				case 'float':
																				case 'integer':
																								return value;
																								break;

																}
												}

												//////////////////////////////////

												switch (self.field.type) {
																case 'reference':

																				if (!value) {
																								if (self.multipleInput) {
																												value = [];
																								} else {
																												value = null;
																								}
																				}

																				break;
																case 'date':
																				if (value) {
																								if (String(value).toLowerCase() == 'now') {
																												value = new Date();
																								} else {
																												value = new Date(value); //.toISOString();
																								}
																				}



																				break;
																case 'integer':
																				if (value != undefined && value != null) {
																								if (String(value).length) {

																												// var changeValue = Number(parseFloat(value).toFixed(2));
																												value = parseInt(value);
																								} else {
																												value = 0;
																								}
																				}
																				break;
																case 'number':
																				if (value != undefined && value != null && !isNaN(value)) {

																								var changeValue;

																								if (String(value).length) {
																												changeValue = Number(parseFloat(value).toFixed(2));
																												//parseInt(parseFloat(value).toFixed(2)) / 100;
																												//Number(value); //
																								} else {
																												changeValue = 0;
																								}

																								// //console.log('TRANSFORM FLOAT BEFORE', value, changeValue)
																								// //If we have to transform the data
																								// if (parseFloat(value).toFixed(2) != parseFloat(changeValue).toFixed(2)) {
																								// 				value = changeValue;
																								// }

																								// //console.log('TRANSFORM FLOAT AFTER', value, changeValue)
																								value = changeValue;


																				}
																				break;
																case 'float':
																case 'decimal':
																				if (value != undefined && value != null) {
																								if (String(value).length) {
																												if (self.params.disableRounding) {
																																value = Number(parseFloat(value));
																												} else {
																																value = Number(parseFloat(value).toFixed(2));
																												}

																												// value = Number(value); //parseInt(parseFloat(value).toFixed(2)) / 100;
																								} else {
																												value = 0;
																								}
																				}
																				break;
																case 'boolean':

																				////console.log('BOOLEAN CHECK IN', value)
																				if (value) {
																								value = getBooleanValue(value);
																				} else {
																								// //console.log('boolean false', value)
																								value = false;
																				}

																				if (self.field.inverse) {
																								value = !value;
																				}

																				// ////console.log('BOOLEAN', this.field.title, self.field.inverse ? 'invert to' : 'normal', value);
																				break;
												}

												// ////console.log('CLEANED INPUT', self.field.title, value)
												return value;
								},
								fixCorruptedData(input) {
												var self = this;

												var output;


												////////////////////////////////////////////

												function getPlaceholders() {
																//We need to create an empty array
																var array = [];

																//Find out our minimum
																var minimumToAsk = Math.max(self.field.minimum || 0, self.field.askCount || 0);
																for (var i = 0; i < minimumToAsk; i++) {
																				////console.log('PUSH EMPTY', self.field.title, self.field.type, self.field.directive);
																				array.push({})
																}

																/////////////////////

																//Restrict the maximum limit
																if (self.field.maximum && array.length > self.field.maximum) {
																				array.length = self.field.maximum;
																}

																/////////////////////

																return array;
												}

												////////////////////////////////////////////

												var multipleInput = self.multipleInput;
												var singleInput = !multipleInput;
												var isArray = _.isArray(input);



												//We're expecting multiple answers
												if (multipleInput) {

																// //console.log('IS A GROUP OBJECT', self.field.title, self.field.key, input);

																//But the existing value is not an array
																if (!isArray) {
																				switch (self.field.type) {
																								case 'reference':
																												if (input) {
																																//We are an object so insert the object into the array
																																output = [input];
																												} else {
																																if (self.renderer == 'embedded') {
																																				output = getPlaceholders();
																																}
																												}
																												break;
																								case 'group':
																												//We aren't an array but we should be
																												if (self.field.asObject) {
																																if (input) {

																																				//console.log('WERE NOT AN ARRAY BUT WE SHOULD BE!!', isArray, input)
																																				//We are an object so insert the object into the array
																																				output = [input];
																																} else {
																																				//console.log('GET PLACEHOLDERS')
																																				output = getPlaceholders();
																																}
																												}
																												break;
																								case 'void':
																												break;
																								case 'date':
																												// if (input) {
																												// 	output = input;
																												// } else {
																												// 	return;
																												// }
																												break;
																								case 'email':
																								case 'url':
																								case 'string':

																								default:
																												//Clean up in case a string has been added instead of an array of strings
																												if (input) {
																																output = [input];
																												} else {
																																output = [];
																												}
																												break;
																				}
																}
												} else {

																/////////////////////////////////////////////

																//If it's a date field
																if (self.field.type == 'date') {

																				//And we have a value
																				if (input) {

																								if (_.isDate(input)) {
																												output = input;
																								} else {
																												//Convert the value to a date

																												output = new Date(input);
																												////console.log('convert to date', typeof input, input)
																								}
																				}


																				return output || input;

																}

																/////////////////////////////////////////////

																//If this field is a group and it's set to be
																//an object literal

																var fieldIsAGroupObject = (self.renderer == 'group' && self.field.asObject);
																var fieldIsAReferenceObject = self.renderer == 'embedded';

																/////////////////////////////////////////////


																if (fieldIsAGroupObject || fieldIsAReferenceObject) {

																				//Create an object
																				//If we are an array of objects
																				if (isArray && input[0] && _.isObject(input[0])) {
																								//Return the first object in the array
																								output = input[0]
																				} else if (!input) {
																								//Create an empty object
																								output = {};
																				} else {
																								//Data is already an object
																				}

																				// if (fieldIsAGroupObject || fieldIsAReferenceObject) {

																				// 	//Create an object
																				// 	if (self.minimum == 1 && self.maximum == 1) {
																				// 		//If we are an array of objects
																				// 		if (isArray && input[0] && _.isObject(input[0])) {
																				// 			//Return the first object in the array
																				// 			output = input[0]
																				// 		} else if (!input) {
																				// 			//Create an empty object
																				// 			output = {};
																				// 		} else {
																				// 			//Data is already an object
																				// 		}
																				// 	} else {
																				// 		//Create an array for our single item

																				// 		if (isArray) {
																				// 			//All good
																				// 		} else {
																				// 			if (input) {
																				// 				output = [input];
																				// 			} else {
																				// 				output = [];
																				// 			}
																				// 		}
																				// 	}



																} else {

																				//We're expecting a single answer but the current value is an array
																				if (isArray) {
																								switch (self.field.type) {


																												case 'date':
																																output = new Date(_.first(input));
																																break;
																												case 'void':
																																break;
																												case 'string':
																												case 'url':
																												case 'email':
																												default:
																																output = _.chain(input)
																																				.compact()
																																				.first()
																																				.value();
																																break;

																								}
																				}
																}
												}

												//////////////////////////
												//If we had to make adjustments
												if (output) {
																////console.log('fixed corrupted data set', self.field.title, 'from', input, 'to', output);
																//return the cleaned up value
																return output;
												}

												//////////////////////////

												//Otherwise return the original input
												return input;
								},
								debugSelect($event) {
												var self = this;

												if ((self.context == 'builder' || self.context == 'definition') && self.recursiveClick) {
																if ($event) {
																				$event.preventDefault()
																				$event.stopPropagation();
																}
																self.recursiveClick(self);
												}
								},
								checkInitialValue() {

												var self = this;

												if (typeof self.fieldModel == 'undefined' || self.fieldModel == null || self.fieldModel == '') {
																self.hasInitialValue = false;
												} else {
																self.hasInitialValue = true;
																// //console.log('HAS INITIAL VALUE', self.fieldModel)
												}

												// ////console.log('')
								},
								clear() {
												this.fieldModel = null;
												this.modal = false;

												this.reset()
								},
								reset() {
												////console.log('reset field', this.field.title)
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
								filedrop(e) {




												var self = this;






												if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
																e.preventDefault();
																e.stopPropagation();
																self.filesSelected(e.dataTransfer.files);
												}
								},
								fileover(e) {
												//console.log('FILEOVER AT FIELD LEVEL')
												if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
																// //console.log('FILE OVER', e.dataTransfer);
																e.preventDefault();
																e.stopPropagation();
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
																//////console.log('Cropped to', self.files.length);
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

												const CancelToken = self.$fluro.api.CancelToken;
												const source = CancelToken.source();
												config.cancelToken = source.token;
												file.cancelToken = source;

												//Set headers to undefined content type
												config.headers = {
																'Content-Type': undefined
												}



												///////////////////////////////////////////////////

												//////console.log('Get the upload realm id', self.field);
												var uploadRealmID;
												var uploadRealmIDs = _.chain(self.field)
																.get('params.realm')
																// .first()
																.value();

												if (_.isArray(uploadRealmIDs)) {
																if (uploadRealmIDs.length) {
																				uploadRealmID = uploadRealmIDs[0];
																}
												} else if (_.isString(uploadRealmIDs)) {
																uploadRealmID = uploadRealmIDs;
												} else if (_.isObject(uploadRealmIDs)) {
																uploadRealmID = self.$fluro.utils.getStringID(uploadRealmIDs);
												}

												///////////////////////////////////////////////////

												//If there is no Realm
												if (!uploadRealmID) {
																// if there is no realm id, grab the form's realm
																var defaultRealmID = _.get(self.options, 'backupUploadRealm');
																if (defaultRealmID) {
																				uploadRealmID = defaultRealmID
																} else {
																				//Then there is no backup realm id, so fail here
																				file.state = 'error';
																				self.uploadNextFile();
																}
												}

												///////////////////////////////////////////////////

												////console.log('Uploading to ', uploadRealmID)
												return this.$fluro.api.post(`/file/attach/${self.$fluro.utils.getStringID(uploadRealmID)}`, body, config)
																.then(function(res) {
																				//////console.log('UPLOAD RESPONSE', res);
																				file.state = 'complete';
																				file.result = res.data;
																				file.attachmentID = res.data._id;
																				file.cancelToken = null;
																				self.uploadNextFile();
																})
																.catch(function(err) {
																				//////console.log('UPLOAD Error', err);
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

												////console.log('MAP FILES TO VALUES', self.field.key, self.field.type);

												self.$forceUpdate();
								},


								resolveExpression(expression) {

												var self = this;


												//Create a context model
												var context = {
																data: self.parent, //self.model,
																interaction: self.parent, //self.model,
																model: self.model,
																Math: Math,
																String: String,
																Array: Array,
																Date: Date,
																Boolean: Boolean,
																parseInt: parseInt,
																parseFloat: parseFloat,
																moment: self.$fluro.date.moment,
																//Include helper function
																matchInArray: this.$fluro.utils.matchInArray,
																create(Class, ...rest) {
																				return new Class(...rest)
																}
												}

												var ast;
												var result;

												try {
																ast = ExpressionParse(expression);
																result = ExpressionEval(ast, context);
												} catch (err) {
																// ////console.log('EXPRESSION', expression, err);
												} finally {

																// ////console.log('EXPRESSION RESULT', result, ast, expression, context)
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

																if (object.firstName) {
																				if (object.lastName) {
																								return `${object.firstName} ${object.lastName}`;
																				}

																				return object.firstName;
																}
												}

												return `${this.title} ${index+1}`
								},

								getActualValue(value) {
												if (value == undefined || value == null) {
																return;
												}
												return value._id || value.id || value.value || value.title || value;
								},
								toggleValue(value) {
												var self = this;

	console.log('toggle value', value)
												if (value == undefined || value == null) {
																return;
												}

												if (!self.isSelectedValue(value)) {
																self.selectValue(value);
												} else {
																self.deselectValue(value);
												}
								},
								selectValue(value) {
												var self = this;

												if (self.multipleInput && !self.canAddValue) {
																console.log('reached limit')
																return;
												}
												if (!self.isSelectedValue(value)) {

																if (self.multipleInput) {
																				self.fieldModel.push(value);
																} else {
																				self.fieldModel = value;
																}
												}

												self.elementValueChanged(null, true);

								},
								deselectValue(value) {
												var self = this;
												if (self.isSelectedValue(value)) {
																if (self.multipleInput) {
																				var index = self.fieldModel.indexOf(value);
																				if (index != -1) {

																								self.fieldModel.splice(index, 1);
																				}
																} else {
																				self.fieldModel = null;
																}
												}

												self.elementValueChanged(null, true);

								},
								isSelectedValue(value) {
												var self = this;

												if (value == undefined || value == null) {
																return;
												}

												var stringValue = self.getActualValue(value);
												

												if (self.multipleInput) {
																return self.fieldModel.some(function(val) {
																				return self.getActualValue(val) == stringValue
																});
												} else {

													console.log('check string value', stringValue, self.fieldModel, self.getActualValue(self.fieldModel) == stringValue, self.fieldModel);
																return self.getActualValue(self.fieldModel) == stringValue;
												}

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
																//////////console.log('Bad Data!', errors)
																return;
												}

												////////////////////////////

												if (!self.includesValue(proposedValue)) {
																self.addValue(proposedValue);
												}

												self.proposedValue = null;

								},
								addValue(value) {

												var self = this;

												//console.log('ADD VALUE!!!', value)

												//If we have defaults disabled
												if (self.disableDefaults) {

																//If it's a group with sub fields
																if (self.type == 'group' || self.renderer == 'embedded') {

																				_.each(self.field.fields, function(field) {
																								createDefaultValueForField(field, value);
																				});
																}

																function createDefaultValueForField(field, source) {

																				// self.$set(value, field.key, newDefaultValue);
																				switch (field.type) {
																								case 'group':

																												//If it's purely a visual group
																												if (!field.asObject) {
																																//Loop through each field and add the defaults to the original source
																																_.each(field.fields, function(subfield) {
																																				createDefaultValueForField(subfield, source);
																																});
																												} else {

																																//If it's a sub object group
																																if (field.maximum == 1) {
																																				var defaultValue = {};
																																				_.each(field.fields, function(subfield) {
																																								createDefaultValueForField(subfield, defaultValue);
																																				});

																																				//Apply it
																																				self.$set(source, field.key, defaultValue);
																																} else {

																																				var numberOfValues = Math.max(field.askCount, field.minimum);

																																				var multipleValues = [];

																																				_.times(numberOfValues, function(i) {
																																								var defaultValue = {};
																																								_.each(field.fields, function(subfield) {
																																												createDefaultValueForField(subfield, defaultValue);
																																								});
																																								multipleValues.push(defaultValue)
																																				})

																																				//Apply it
																																				self.$set(source, field.key, multipleValues);
																																}
																												}

																												break;
																								default:
																												var defaults = field.type == 'reference' ? field.defaultReferences : field.defaultValues;
																												if (defaults && defaults.length) {
																																if (field.maximum == 1) {
																																				self.$set(source, field.key, JSON.parse(JSON.stringify(defaults[0])));
																																} else {
																																				self.$set(source, field.key, JSON.parse(JSON.stringify(defaults)));
																																}
																												}
																												break;
																				}

																				// //So loop through all the child fields and create them
																				// _.each(parentField.fields, function(field) {


																				// 				if (field.type == 'group') {


																				// 								var defaultObject = createDefaultValueForGroup(field, {});

																				// 								//console.log('Create default object', field.key, field.title, defaultObject);
																				// 								self.$set(value, field.key, defaultObject);
																				// 								return;
																				// 				}

																				// 				// //If it's a group
																				// 				// if(field.type == 'group') {
																				// 				// 	 var groupModel = {};
																				// 				// 	 createDefaultValueForGroup()
																				// 				// }

																				// 				//Get our default values
																				// 				


																				// 				//If there are default values set them on the value
																				// 				if (defaults && defaults.length) {
																				// 								if (field.maximum == 1) {
																				// 												self.$set(value, field.key, JSON.parse(JSON.stringify(defaults[0])));
																				// 								} else {
																				// 												self.$set(value, field.key, JSON.parse(JSON.stringify(defaults)));
																				// 								}
																				// 				}
																				// })

																}
												}

												if (!self.fieldModel) {
																self.fieldModel = [];
												}

												if (self.canAddValue) {


																self.fieldModel.push(value);
																self.valueChange();
												}
								},
								removeValue(index, forceAllow) {

												////console.log('REMOVE VALUE', index, this.fieldModel)
												if ((this.canRemoveValue || forceAllow) && this.fieldModel) {
																this.fieldModel.splice(index, 1);
																this.valueChange();
												}
								},
								// touchDate() {
								// 	this.checkTextDate();
								// 	this.touch();
								// },
								touch() {

												var self = this;


												self.$v.model.$touch()

								},
								clicked($event) {
												this.debugSelect($event);
												// this.touch();
								},
								focussed() {
												this.debugSelect();
												// this.touch();
								},
								modalFocussed() {
												this.focussed();
												this.modal = true;
												this.touch();
								},
								//CADESEARCHBACKHERE

								elementValueChanged(event, setTouched) {
												var self = this;

												if (setTouched) {
																self.touch()
												}

												// //console.log('ELEMENT VALUE CHANGED', self.field.title, self.field.key, self.fieldModel)
								},

								subFieldChanged(event, setTouched) {
												var self = this;

												if (setTouched) {
																self.touch()
												}

												//console.log('SUB FIELD CHANGED!');
												self.$emit('input', self.model);
								},

								valueChange(event, setTouched) {

												var self = this;

												if (setTouched) {
																self.touch()
												}

												return;


												// // self.model= Object.assign({}, self.model);

												// //If it's a group and not an object then end here so we don't have a recurring loop
												// // if(self.field.type == 'group' && !self.field.asObject) {
												// // 	////console.log('No change', event)
												// // 	return;
												// // }

												// ////////////////////////////////////////////

												// // if (self.field.type == 'reference') {
												// // 	////console.log('EMIT REFERENCE CHANGE', event, self.field.maximum, self.field.directive, self.field.key);
												// // 	//return;
												// // }


												// // ////console.log('FIELD VALUE CHANGED', self.field.title, self.field.key, '>>', self.model[self.field.key], self.fieldModel);
												// ////console.log('valueChange()', self.field.title, self.model[self.field.key]);
												// self.$emit('input', self.model, self.fieldModel);
												// self.$forceUpdate();


								}
				},


				mounted() {
								var self = this;
								if (self.debugMode && self.field.isNew) {
												// ////console.log('SCROLL FIELD INTO VIEW', self.$el);
												self.$nextTick(function() {

																self.$nextTick(function() {

																				if (self.$el && self.$el.scrollIntoView) {
																								self.$el.scrollIntoView({
																												behavior: 'smooth',
																												block: 'center',
																								});

																								//Remove the new tag

																								self.field.isNew = undefined;

																				}
																});
												});
								}
				},
				created() {


								var self = this;



								if (!self.model) {
												// //console.log('NO MODEL BIG ISSUE', self.model, self.field.key);
								}


								// //console.log('FIX CORRUPED', self.model[self.field.key], JSON.parse(JSON.stringify(self.model)));

								if (self.field.key == 'logo') {
												//console.log('CREATED KEY NOW', self.field.title, self.field.maximum, self.model[self.field.key]);
								}

								var cleaned = self.fixCorruptedData(self.model[self.field.key]);
								if (typeof cleaned != typeof self.model[self.field.key] || cleaned != self.model[self.field.key]) {
												self.$set(self.model, self.field.key, cleaned);
												//console.log('CLEANED', self.field.key)
								}






								////////////////////////////////////////////

								//If we are contained inside a fluro-content-form then
								//add this component to the array
								if (self.formFields) {
												//Add to the form fields
												self.$set(self.formFields, self.formFields.length, self);
								}

								///////////////////////////////////////////////



								///////////////////////////////////////////////

								self.textDate = self.formattedDate;
								self.createDefaults();
								self.checkInitialValue();



								////////////////////////////////////////////


								// 		//If there is form fields
								// 		if (self.formFields) {
								// 			//Add to the form fields
								// 			self.$set(self.formFields, self.formFields.length, self);
								// 		}
								// 		break;
								// }


								// if (self.type == 'group' && !self.asObject) {
								//     //Do nothing
								// } else {

								//     //If there is no model
								//     if (!self.fieldModel) {
								//         ////console.log('Create a Model')
								//         self.fieldModel = {};
								//     }

								//     if (self.formFields) {
								//         self.$set(self.formFields, self.formFields.length, self);
								//     }
								// }
								/**/


								// self.ready = true;
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
								'debugMode': {
												type: Boolean
								},
								'contextField': {
												type: Object
								},
								'recursiveClick': {
												type: Function,
								},
								'disableDefaults': {
												type: Boolean,
												default: false,
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
												required: true,
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
																												// ////console.log('RES', res)
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
																if (self.minimum == 1) {
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

																if (!this.field) {
																				return true;
																}

																var isHidden = this.renderer == 'value' || this.expressionHideGroup || this.expressionHide;
																return Promise.resolve(!isHidden);
												}
								},
								expressionValue: {
												get() {
																var self = this;
																//There is no hidden expression
																if (!self.expressions || !self.expressions.value) {
																				return Promise.resolve();
																}

																if (typeof self.expressions.value == 'function') {
																				return self.expressions.value();
																} else {
																				if (!String(self.expressions.value).length) {
																								return Promise.resolve();
																				}
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

																//There is a show expression
																if (self.expressions && self.expressions.show) {

																				//If its a function
																				if (typeof self.expressions.show == 'function') {
																								//Return the opposite of the show function
																								return !self.expressions.show();
																				} else {
																								var shouldShow = self.resolveExpression(self.expressions.show);
																								return Promise.resolve(!shouldShow);
																				}
																}

																///////////////////////////////////////////////////
																///////////////////////////////////////////////////
																///////////////////////////////////////////////////

																//There is no hidden expression
																if (!self.expressions || !self.expressions.hide) {
																				return Promise.resolve(false);
																}

																if (typeof self.expressions.hide == 'function') {


																				var shouldHide = self.expressions.hide();

																				// ////console.log('SHOULD WE HIDE?', self.field.title, shouldHide)

																				return Promise.resolve(shouldHide);
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

																// ////console.log('RESOLVE', value, self.expressions.hide)
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
				beforeCreate() {
								this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;
								this.$options.components.FluroContentFormField = require('./FluroContentFormField.vue').default;
								this.$options.components.FluroEditor = require('./FluroEditor.vue').default;
								this.$options.components.FluroCodeEditor = require('./FluroCodeEditor.vue').default;
								//this.ready = true;
				},
				/**
				beforeCreate: function() {


						var self = this;




						Promise.all([
														DynamicImportService.load('./FluroContentForm.vue', function() {
																		return import('./FluroContentForm.vue')
														}),
														DynamicImportService.load('./FluroContentFormField.vue', function() {
																		return import('./FluroContentFormField.vue')
														}),
														DynamicImportService.load('./FluroEditor.vue', function() {
																		return import('./FluroEditor.vue')
														}),
														DynamicImportService.load('./FluroCodeEditor.vue', function() {
																		return import('./FluroCodeEditor.vue')
														}),
										])
										.then(function(results) {

														// ////console.log('Set Components', results);
														self.$options.components.FluroContentForm = results[0];
														self.$options.components.FluroContentFormField = results[1];
														self.$options.components.FluroEditor = results[2];
														self.$options.components.FluroCodeEditor = results[3];
														self.ready = true;
										})
				},
				/**/
				validations: {
								model: {
												validateInput,
												uploading: function(source, vm) {

																if (vm.uploadState == 'uploading') {
																				return false;
																}

																//////console.log('UPLOAD IS VALID', source, vm);
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
function checkNumericInputError(input, minimumValue, maximumValue, numberType, currency, self) {

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
												////console.log('MINIMUM', minimumValue, input, input < minimumValue)
												return `Must be at least ${currency && self ? self.$fluro.utils.formatCurrency(minimumValue, currency) : minimumValue}`
								}
				}

				if (typeof maximumValue != 'undefined' && parseInt(maximumValue) != 0) {
								maximumValue = parseFunction(maximumValue);
								if (input > maximumValue) {
												return `Must be less than ${currency && self ? self.$fluro.utils.formatCurrency(maximumValue, currency) : maximumValue}`
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
								////////////console.log('No minimum!')
								return true;
				}

				//////////////////////

				//We require an answer from here on out

				//Maximum answer of 1
				if (maximum == 1) {

								if (value) {
												////////////console.log(`Required answer was provided`)
												return !checkValidInput(vm, value).length;
								} else {
												////////////console.log('Requires an answer but none provided');
												return false;
								}
				}

				//////////////////////

				//We need value to be an array at this point
				if (!isArray) {
								////////////console.log(`Requires ${minimum} answer but value is not an array`)
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

				var currency = self.field.directive == 'currency' ? _.get(self.field, 'params.currency') : null;

				////////////////////////////////////////

				switch (dataType) {
								case 'email':

												if (self.multipleInput) {


																if (_.isArray(input)) {
																				var someInvalidEmails = _.some(input, function(str) {

																								//Trim the string
																								str = str ? String(str).toLowerCase().trim() : '';
																								return !email(str) && str.length;
																				});

																				if (someInvalidEmails) {
																								////console.log('Invalid Emails', input)
																								errors.push('All emails must be valid', input);
																				}
																} else {

																				//Ensure that we lowercase and trim the string before we test it
																				input = input ? String(input).toLowerCase().trim() : '';
																				if (!email(input) && input.length) {
																								errors.push('Must be a valid email', input);
																				}

																}
												} else {

																//Ensure that we lowercase and trim the string before we test it
																input = input ? String(input).toLowerCase().trim() : '';
																if (!email(input) && input.length) {
																				errors.push(`'${input}' is not a valid email address`, input);
																}
												}

												break;
								case 'url':


												//////////////////////////////////////////////

												function checkIsURL(string) {

																if (!string || !string.length) {
																				return;
																}

																string = string ? String(string).toLowerCase().trim() : '';

																// var relativeURL = _.startsWith(input, '#') || _.startsWith(input, '/');
																var specialURL = _.includes(string, '://') ||
																				_.startsWith(input, '/') ||
																				_.startsWith(input, '#') ||
																				_.startsWith(input, 'mailto:') ||
																				_.startsWith(input, 'tel:') ||
																				_.startsWith(input, 'sms:');


																if (!specialURL && !url(string)) {
																				return false;
																}

																return true;
												}

												//////////////////////////////////////////////

												if (self.multipleInput) {

																//If an array was provided
																if (_.isArray(input)) {

																				//Check to see if any of the urls are invalid
																				var someInvalidURLs = _.some(input, function(str) {
																								return !checkIsURL(str) && str.length;
																				});

																				if (!someInvalidURLs) {
																								errors.push('All URLs must be valid eg. (https://...)', input);
																				}
																} else {
																				if (!checkIsURL(input) && input.length) {
																								errors.push('All URLs must be valid eg. (https://...)', input);
																				}
																}

												} else {
																//If they have entered some data, and it's not a url
																if ((input && input.length) && !checkIsURL(input)) {
																				errors.push('Must be a valid URL eg. (https://...)', input);
																}
												}




												break;
								case 'boolean':

												if (self.minimum) {
																if (!input) {
																				// if (input === false) {

																				// } else {
																				errors.push('This is required')
																				// }

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
																////console.log('Is not a valid number??', input, numberised)
																errors.push(`${input ? input : ''} is not a valid number!`)
												}

												var numberError = checkNumericInputError(input, minimumValue, maximumValue, dataType, currency, self);
												if (numberError) {
																errors.push(numberError);
												}
												break;
								case 'void':
												break;
				}

				////////////////////////////////////////

				return errors;
}

</script>
<style lang="scss">
.vc-chrome {
				width: auto !important;
}


.help-text {
				opacity: 0.5;
				font-size: 0.8em;
}

.color-swatch {
				cursor: pointer;
				border: 1px solid #ccc;
				border-radius: 5px;
				overflow: hidden;
				background:
								conic-gradient(#fafafa 0deg, #fafafa 90deg,
								#ccc 90deg, #ccc 180deg,
								#fafafa 180deg, #fafafa 270deg,
								#ccc 270deg, #ccc 360deg) 0 0/25% 25%;

				.swatch {
								display: block;
								width: 100%;
								padding: 10px;
								color: #fff;
								font-weight: 500;
								text-align: center;

								span {
												background: rgba(#000, 0.2);
												border-radius: 5px;
												padding: 3px 10px;
												line-height: 20px;
												font-size: 14px;
												display: inline-block;

								}


				}
}

.fluro-content-form-field {

				.same-line {
								padding-top: 0 !important;
								padding-bottom: 0 !important;
				}

				&.is-context {
								border-radius: 5px;
								outline: 1px dashed rgba($primary, 0.5);
								background: rgba($primary, 0.1);
				}

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

								.handle {
												opacity: 0.5;
								}

								@media(max-width:600px) {

												svg,
												span {
																opacity: 0.5 !important;
												}
								}

								&:hover {

												svg,
												span {
																opacity: 1;
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
								margin: 16px 0;

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



				&.right-messages>>> {
								.v-text-field__details {
												text-align: right;
								}
				}
}


.button-select-buttons {

				.v-btn,
				.btn {

								.tick {
												opacity: 0;
								}

								&.active {
												.tick {
																opacity: 1;
												}
								}

								&:hover {
												.tick {
																opacity: 0.5;
												}
								}

				}

				.btn.inactive {
								background: rgba(#000, 0.1);
								color: inherit !important;
				}
}

</style>
