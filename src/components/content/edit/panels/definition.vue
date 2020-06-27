<template>
				<flex-column>
								<template v-if="loading">
												<fluro-page-preloader contain />
								</template>
								<template v-else>
												<tabset v-model="tabIndex" :justified="true">
																<template v-if="isForm">
																				<tab heading="Form Fields">
																								<fluro-field-editor v-model="model.fields" :item="model">
																												<template v-slot:form>
																																<v-container>
																																				<constrain sm>
																																								<fluro-panel margin>
																																												<fluro-panel-title>
																																																<strong>Configuration</strong>
																																												</fluro-panel-title>
																																												<fluro-panel-body>
																																																<v-layout>
																																																				<v-flex xs12 sm6>
																																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
																																																				</v-flex>
																																																				<v-flex xs12 sm6>
																																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.plural" v-model="model" />
																																																				</v-flex>
																																																</v-layout>
																																																<template v-if="!model._id">
																																																				<div v-show="showDefinitionName">
																																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.definitionName" v-model="model" />
																																																				</div>
																																																</template>
																																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.privacy" v-model="model" />
																																												</fluro-panel-body>
																																								</fluro-panel>
																																								<!-- <pre>{{model.data}}</pre> -->
																																								<fluro-panel margin>
																																												<fluro-panel-title>
																																																<strong>Contact Creation</strong>
																																												</fluro-panel-title>
																																												<fluro-panel-body>
																																																<fluro-content-form v-model="model.data" :fields="dataFields">
																																																				<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																								<!-- <pre>{{model}}</pre> -->
																																																								<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allowAnonymous" v-model="model" />
																																																								<template v-if="!model.allowAnonymous && !model.disableDefaultFields">
																																																												<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.identifier" v-model="model" />
																																																								</template>
																																																				</template>
																																																</fluro-content-form>
																																												</fluro-panel-body>
																																								</fluro-panel>
																																								<fluro-panel margin>
																																												<fluro-panel-title>
																																																<strong>Optional Fields</strong>
																																												</fluro-panel-title>
																																												<fluro-content-form v-model="model.data" :fields="dataFields">
																																																<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																				<template v-if="model.allowAnonymous">
																																																								<div class="field-row">
																																																												<v-layout align-center>
																																																																<v-flex xs4>
																																																																				<v-label>First Name</v-label>
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askFirstName" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireFirstName" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</div>
																																																								<div class="field-row">
																																																												<v-layout align-center>
																																																																<v-flex xs4>
																																																																				<v-label>Last Name</v-label>
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askLastName" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireLastName" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</div>
																																																								<div class="field-row">
																																																												<v-layout align-center>
																																																																<v-flex xs4>
																																																																				<v-label>Email Address</v-label>
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askEmail" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireEmail" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</div>
																																																								<div class="field-row">
																																																												<v-layout align-center>
																																																																<v-flex xs4>
																																																																				<v-label>Phone Number</v-label>
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askPhone" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requirePhone" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</div>
																																																								<div class="field-row">
																																																												<v-layout align-center>
																																																																<v-flex xs4>
																																																																				<v-label>Gender</v-label>
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askGender" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs4>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireGender" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</div>
																																																				</template>
																																																				<div class="field-row">
																																																								<v-layout align-center>
																																																												<v-flex xs4>
																																																																<v-label>Date of Birth</v-label>
																																																												</v-flex>
																																																												<v-flex xs4>
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askDOB" v-model="model" />
																																																												</v-flex>
																																																												<v-flex xs4>
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireDOB" v-model="model" />
																																																												</v-flex>
																																																								</v-layout>
																																																				</div>
																																																				<fluro-panel-body class="border-top" v-if="model.allowAnonymous">
																																																								<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.disableBestGuess" v-model="model" />
																																																				</fluro-panel-body>
																																																</template>
																																												</fluro-content-form>
																																								</fluro-panel>
																																								<fluro-panel margin v-if="definition">
																																												<fluro-panel-title>
																																																<strong>{{definition.title}} Information</strong>
																																												</fluro-panel-title>
																																												<fluro-panel-body>
																																																<fluro-content-form :options="definitionFormOptions" v-model="model.data" :fields="definition.fields" />
																																												</fluro-panel-body>
																																								</fluro-panel>
																																								<v-container pa-0 grid-list-xl>
																																												<v-layout row wrap>
																																																<v-flex xs12 sm6>
																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.publishDate" v-model="model" />
																																																</v-flex>
																																																<v-flex xs12 sm6>
																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.archiveDate" v-model="model" />
																																																</v-flex>
																																												</v-layout>
																																								</v-container>
																																								<fluro-panel margin>
																																												<fluro-panel-title>
																																																<Strong>Automation and other settings</Strong>
																																												</fluro-panel-title>
																																												<tabset>
																																																<tab heading="Notifications">
																																																				<fluro-panel-body>
																																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.enableConfirmation" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.includeTickets" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.confirmationMessage" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.notifyContacts" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.enableReceipt" v-model="model" />
																																																												</template>
																																																								</fluro-content-form>
																																																				</fluro-panel-body>
																																																</tab>
																																																<tab heading="Processes">
																																																				<fluro-panel-body>
																																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.interactionProcesses" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contactProcesses" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contactProcessesAll" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.processAssignTo" v-model="model" />
																																																												</template>
																																																								</fluro-content-form>
																																																				</fluro-panel-body>
																																																</tab>
																																																<tab heading="Groups and Teams">
																																																				<fluro-panel-body>
																																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contactTeams" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contactTeamsAll" v-model="model" />
																																																												</template>
																																																								</fluro-content-form>
																																																				</fluro-panel-body>
																																																</tab>
																																																<tab heading="Capabilities">
																																																				<fluro-panel-body>
																																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contactCapabilities" v-model="model" />
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.capabilitiesAll" v-model="model" />
																																																												</template>
																																																								</fluro-content-form>
																																																				</fluro-panel-body>
																																																</tab>
																																																<tab heading="Reaction Pipelines">
																																																				<fluro-panel-body>
																																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.reactionPipelines" v-model="model" />
																																																												</template>
																																																								</fluro-content-form>
																																																				</fluro-panel-body>
																																																</tab>
																																																<tab heading="Other Options">
																																																				<fluro-panel-body>
																																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.blc" v-model="model" />
																																																												</template>
																																																								</fluro-content-form>
																																																				</fluro-panel-body>
																																																</tab>
																																												</tabset>
																																								</fluro-panel>
																																				</constrain>
																																</v-container>
																												</template>
																												<template v-slot:payment>
																																<v-container>
																																				<fluro-content-form v-model="model.paymentDetails" :fields="paymentFields">
																																								<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																												<fluro-panel margin>
																																																<fluro-panel-body>
																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.required" v-model="model" />
																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allow" v-model="model" />
																																																</fluro-panel-body>
																																																<template v-if="paymentIsEnabled">
																																																				<v-container pa-0>
																																																								<fluro-panel-body class="border-top" v-if="model.required">
																																																												<v-layout>
																																																																<v-flex xs9>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.amount" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs3>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.currency" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</fluro-panel-body>
																																																								<fluro-panel-body class="border-top" v-if="model.allow && !model.required">
																																																												<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.currency" v-model="model" />
																																																												<v-layout>
																																																																<v-flex xs12 sm6>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.minAmount" v-model="model" />
																																																																</v-flex>
																																																																<v-flex xs12 sm6>
																																																																				<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.maxAmount" v-model="model" />
																																																																</v-flex>
																																																												</v-layout>
																																																								</fluro-panel-body>
																																																				</v-container>
																																																</template>
																																												</fluro-panel>
																																								</template>
																																				</fluro-content-form>
																																				<template v-if="paymentIsEnabled">
																																								<v-input class="no-flex">
																																												<v-label>Payment Gateway</v-label>
																																												<p class="help-block">Select the integration that should be used to process these payments</p>
																																												<!-- <fluro-panel-body class="border-top"> -->
																																												<fluro-content-select-button block type="integration" v-model="model.data.publicData.paymentGateways" />
																																												<!-- </fluro-panel-body> -->
																																								</v-input>
																																								<fluro-panel margin>
																																												<fluro-panel-body>
																																																<v-input class="no-flex">
																																																				<v-label>Payment Modifiers</v-label>
																																																				<p class="help-block">Add payment modifiers to adjust the required payment amount depending on values entered by the user</p>
																																																				<payment-modifier-editor :form="model" v-model="model.paymentDetails.modifiers" />
																																																				<!-- <pre>{{model.paymentDetails.modifiers}}</pre> -->
																																																				<!-- <fluro-panel-body class="border-top"> -->
																																																				<!-- <fluro-content-select-button block type="integration" v-model="model.data.publicData.paymentGateways" /> -->
																																																				<!-- </fluro-panel-body> -->
																																																</v-input>
																																												</fluro-panel-body>
																																								</fluro-panel>
																																								<fluro-content-form v-model="model.data" :fields="dataFields">
																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.enableReceipt" v-model="model" />
																																												</template>
																																								</fluro-content-form>
																																								<fluro-content-form v-model="model.paymentDetails" :fields="paymentFields">
																																												<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																																<fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allowAlternativePayments" v-model="model" />
																																																<fluro-panel margin v-if="model.allowAlternativePayments">
																																																				<tabset v-model="alternativePaymentMethodIndex">
																																																								<tab :heading="method.title" v-for="(method, index) in alternativePaymentMethods">
																																																												<fluro-panel-body>
																																																																<fluro-content-form v-model="alternativePaymentMethods[index]" :fields="paymentMethodFields" />
																																																																<!-- <template v-slot:form="{formFields, fieldHash, model, update, options}"> -->
																																																																<!-- </template> -->
																																																																<!-- </fluro-content-form> -->
																																																																<v-layout>
																																																																				<v-spacer />
																																																																				<v-flex shrink>
																																																																								<v-btn class="ma-0" small color="error" @click="removeAlternativePaymentMethod(method, index)">
																																																																												Remove {{method.title}}
																																																																								</v-btn>
																																																																				</v-flex>
																																																																</v-layout>
																																																												</fluro-panel-body>
																																																								</tab>
																																																				</tabset>
																																																				<fluro-panel-body class="border-top">
																																																								<!-- {{alternativePaymentMethodIndex}} -->
																																																								<v-btn class="ma-0" @click="addAlternativePaymentMethod()" color="primary">Add additional payment method</v-btn>
																																																				</fluro-panel-body>
																																																</fluro-panel>
																																												</template>
																																								</fluro-content-form>
																																								<!-- <pre>{{alternativePaymentMethods}}</pre> -->
																																				</template>
																																</v-container>
																												</template>
																								</fluro-field-editor>
																				</tab>
																</template>
																<template v-else>
																				<tab heading="Configuration">
																								<flex-column-body style="background: #fafafa;">
																												<v-container grid-list-xl>
																																<constrain sm>
																																				<fluro-panel>
																																								<fluro-panel-body>
																																												<v-layout>
																																																<v-flex xs12 sm6>
																																																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
																																																</v-flex>
																																																<v-flex xs12 sm6>
																																																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.plural" v-model="model" />
																																																</v-flex>
																																												</v-layout>
																																												<template v-if="model._id">
																																																<fluro-panel>
																																																				<fluro-panel-body>
																																																								<v-layout>
																																																												<v-flex xs12 sm6>
																																																																<div class="form-group">
																																																																				<label>Definition Name</label>
																																																																				<div>{{model.definitionName}}</div>
																																																																</div>
																																																												</v-flex>
																																																												<v-flex xs12 sm6>
																																																																<div class="form-group">
																																																																				<label>Extends type</label>
																																																																				<div>{{model.parentType | definitionTitle}}</div>
																																																																</div>
																																																												</v-flex>
																																																								</v-layout>
																																																				</fluro-panel-body>
																																																</fluro-panel>
																																												</template>
																																												<template v-else>
																																																<div v-show="showDefinitionName">
																																																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.definitionName" v-model="model" />
																																																</div>
																																																<template v-if="lockedSubType">
																																																</template>
																																																<template v-else>
																																																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.parentType" v-model="model" />
																																																				<fluro-panel>
																																																								<fluro-panel-body>
																																																												<v-layout>
																																																																<v-flex xs12 sm6>
																																																																				<div class="form-group">
																																																																								<label>Definition Name</label>
																																																																								<div>{{model.definitionName}}</div>
																																																																				</div>
																																																																</v-flex>
																																																																<v-flex xs12 sm6>
																																																																				<div class="form-group">
																																																																								<label>Extends type</label>
																																																																								<div>{{model.parentType | definitionTitle}}</div>
																																																																				</div>
																																																																</v-flex>
																																																												</v-layout>
																																																								</fluro-panel-body>
																																																				</fluro-panel>
																																																</template>
																																												</template>
																																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.privacy" v-model="model" />
																																								</fluro-panel-body>
																																				</fluro-panel>
																																				<fluro-panel v-if="model.parentType == 'process'">
																																								<fluro-panel-body>
																																												<h4 margin>Process Board Options</h4>
																																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model" />
																																												<fluro-content-form v-model="model.data" :fields="processFields" />
																																								</fluro-panel-body>
																																				</fluro-panel>
																																				<fluro-panel v-if="model.parentType == 'roster'">
																																								<tabset justified>
																																												<tab heading="Roster Settings">
																																																<fluro-panel-body>
																																																				<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.weight" v-model="model" />
																																																				<fluro-content-form v-model="model.data" :fields="rosterFields" />
																																																</fluro-panel-body>
																																												</tab>
																																												<tab heading="Default Slots">
																																																<roster-slot-manager v-model="model.data.slots" />
																																												</tab>
																																												<tab heading="Reminders">
																																																<!-- <roster-slot-manager v-model="model.data.slots" /> -->
																																												</tab>
																																												<tab heading="Roster Restrictions">
																																																<fluro-panel-body>
																																																				<fluro-content-form v-model="model.data" :fields="restrictionFields" />
																																																</fluro-panel-body>
																																												</tab>
																																								</tabset>
																																								<!-- <fluro-panel-body> -->
																																								<!-- <h4 margin>Roster Options</h4> -->
																																								<!-- <div class="form-group">
																																																<label>Notifications</label>
																																																<p class="help-block">Select contacts who should be notified when volunteers decline/swap positions on rosters of this type </p>
																																																<content-select ng-params="{type:'contact'}" ng-model="item.data.notifyContacts"></content-select>
																																												</div> -->
																																								<!-- </fluro-panel-body> -->
																																				</fluro-panel>
																																				<!-- <roster-slot-manager v-model="slots" /> -->
																																</constrain>
																												</v-container>
																								</flex-column-body>
																				</tab>
																				<tab heading="Manage Fields" v-if="fieldsMakeSense">
																								<!-- <pre>MANAGE {{model.fields}}</pre> -->
																								<fluro-field-editor v-model="model.fields" :item="model" />
																				</tab>
																				<!-- <tab heading="Process Options" v-if="model.parentType == 'process'">
                        <flex-column-body style="background: #fafafa;">
                            <v-container>
                                <constrain sm>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model" />
                                    <fluro-content-form v-model="model.data" :fields="processFields" />
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab> -->
																				<tab :heading="`${definition.title} Information`" v-if="definition && definition.definitionName != 'form'">
																								<flex-column-body style="background: #fafafa;">
																												<v-container>
																																<constrain sm>
																																				<fluro-content-form :options="definitionFormOptions" v-model="model.data" :fields="definition.fields" />
																																</constrain>
																												</v-container>
																								</flex-column-body>
																				</tab>
																				<tab heading="Advanced">
																								<flex-column-body style="background: #fafafa;">
																												<v-container>
																																<constrain sm>
																																				<fluro-panel v-if="model.parentType != 'realm'">
																																								<fluro-panel-title>
																																												<h5>Restrict To Realms</h5>
																																												<div class="muted">Select which realms these {{model.parentType | definitionTitle(true)}} can be created in</div>
																																								</fluro-panel-title>
																																								<fluro-panel-body>
																																												<fluro-realm-select v-model="model.restrictRealms" />
																																								</fluro-panel-body>
																																				</fluro-panel>
																																				<!-- <fluro-panel>
																																								<fluro-panel-title>
																																												<h5>Display Columns</h5>
																																												<div class="muted">Select columns to show when listing these {{model.parentType | definitionTitle(true)}}</div>
																																								</fluro-panel-title>
																																								<fluro-panel-body>
																																												<fluro-column-select v-model="model.columns"/>
																																								</fluro-panel-body>
																																				</fluro-panel>

																																				<fluro-panel>
																																								<fluro-panel-title>
																																												<h5>Filters</h5>
																																												<div class="muted">Configure filters that can be used when listing these {{model.parentType | definitionTitle(true)}}</div>
																																								</fluro-panel-title>
																																								<fluro-panel-body>
																																												<fluro-column-select v-model="model.filters"/>
																																								</fluro-panel-body>
																																				</fluro-panel> -->
																																				<!-- <fluro-panel v-if="model.parentType == 'process'">
																																								<fluro-panel-title>
																																												<h5>Reference Item Filters</h5>
																																												<div class="muted">Add Keys for filtering cards based on their referenced item</div>
																																								</fluro-panel-title>
																																								<fluro-panel-body>
																																											
																																												<fluro-column-select v-model="model.data.processReferenceFilters"/>
																																								</fluro-panel-body>

																																								<pre>{{model.data.processReferenceFilters}}</pre>
																																				</fluro-panel> -->
																																</constrain>
																												</v-container>
																								</flex-column-body>
																				</tab>
																</template>
												</tabset>
								</template>
				</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';
import PaymentModifierEditor from 'src/components/content/edit/components/PaymentModifierEditor.vue';
import FluroColumnSelect from 'src/components/content/edit/components/FluroColumnSelect.vue';
import FluroFieldEditor from 'src/components/fields/FluroFieldEditor.vue';
import FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';
import FieldTemplates from 'src/components/fields/FieldEditorTemplates.js';
import _ from 'lodash';



/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
				components: {
								FluroFieldEditor,
								FluroContentSelectButton,
								PaymentModifierEditor,
								FluroColumnSelect,
								//RosterSlotManager,
								// FluroEditor,
				},
				mixins: [FluroContentEditMixin],
				methods: {

								setParentType(parentType) {
												var self = this;

												switch (parentType) {
																case 'interaction':


																				if (!self.model.privacy) {
																								self.$set(self.model, 'privacy', 'public');
																				}

																				if (!self.model.paymentDetails) {
																								self.$set(self.model, 'paymentDetails', {});
																								// console.log('SET THE PAYMENT DETAILS NOW!!')
																				}

																				if (!self.model.data) {
																								self.$set(self.model, 'data', {});
																				}


																				if (!self.model._id) {
																								//Start off with the basic fields
																								self.$set(self.model.data, 'allowAnonymous', true);
																				}

																				if (!self.model.fields || !self.model.fields.length) {
																								self.$set(self.model, 'fields', []);


																								var getPersonField = _.find(FieldTemplates, { key: 'person' });
																								var copy = JSON.parse(JSON.stringify(getPersonField.field))
																								copy.key = 'contact';
																								copy.title = 'Contact';
																								self.model.fields.push(copy);
																				}

																				if (!self.model.data.publicData) {
																								self.$set(self.model.data, 'publicData', {});
																				}

																				if (!self.model.data.publicData.paymentGateways) {
																								self.$set(self.model.data.publicData, 'paymentGateways', []);
																				}
																				break;
												}
								},
								removeAlternativePaymentMethod(method, index) {
												var self = this;
												// var index = self.model.paymentDetails.paymentMethods.indexOf(method);

												// if (index != -1) {
												self.$set(method, 'enabled', false);
												self.model.paymentDetails.paymentMethods.splice(index, 1);
												setTimeout(function() {


																self.alternativePaymentMethodIndex = 0;
												})
												// }
								},
								addAlternativePaymentMethod() {

												var self = this;

												var newMethod = {
																title: 'Other Method',
																key: '',
																description: '',
												}

												if (!self.model.paymentDetails.paymentMethods) {
																self.$set(self.model.paymentDetails, 'paymentMethods', []);
												}

												self.model.paymentDetails.paymentMethods.push(newMethod);
												setTimeout(function() {


																self.alternativePaymentMethodIndex = self.model.paymentDetails.paymentMethods.length - 1;
												})
								},
				},
				// watch:{
				//     'model.definitionName':function(value){

				//         // get() {
				//         //     return this.model.definitionName;
				//         // },
				//         // set(payload) {
				//             if (!value) {
				//                 value = '';
				//             }

				//             var regexp = /[^a-zA-Z0-9-_]+/g;
				//             var cleaned = value.replace(regexp, '');
				//             this.$set(this.model, 'definitionName', cleaned)
				//         // },
				//     },
				// },

				created() {

								var self = this;

								if (self.lockedSubType && self.lockedSubType.length) {
												self.$set(self.model, 'parentType', self.lockedSubType);
								}

								if (self.model.parentType) {
												self.setParentType(self.model.parentType);
								}

								if (self.fieldsMakeSense) {
												if (self.model._id && !self.isForm) {
																self.tabIndex = 1;
												}
								}

								if (!self.model.fields) {
												self.$set(self.model, 'fields', []);
								}

								if (!self.model.data) {
												self.$set(self.model, 'data', {});
								}

				},
				watch: {
								'model.parentType': 'setParentType',
				},
				asyncComputed: {
								parentTypeOptions: {
												default: [],
												get() {
																var self = this;
																return new Promise(function(resolve, reject) {


																				self.$fluro.types.basicTypes()
																								.then(function(values) {

																												// console.log('VALUES', values);

																												var cleaned = _.chain(values)
																																.compact()
																																.map(function(type) {
																																				return {
																																								title: type.title,
																																								value: type.definitionName,
																																				}
																																})
																																.orderBy('title')
																																.value();

																												resolve(cleaned);
																								});

																})
												}
								},
								eventTypeOptions: {
												default: [],
												get() {
																var self = this;
																return new Promise(function(resolve, reject) {




																				self.$fluro.types.subTypes('event', true)
																								.then(function(values) {
																												var cleaned = _.chain(values)
																																.compact()
																																.map(function(type) {
																																				return {
																																								title: type.title,
																																								value: type.definitionName,
																																				}
																																})
																																.orderBy('title')
																																.value();

																												console.log('TYPES LOADED', cleaned, values)

																												resolve(cleaned);
																								});

																})
												}
								},
								referenceOptions: {
												default: [],
												get() {
																var self = this;


																return new Promise(function(resolve, reject) {

																				self.$fluro.types.terms()
																								.then(function(terms) {

																												/////////////////////////
																												var mapped = _.chain(terms)
																																.values()
																																.map(function(term) {
																																				return {
																																								name: term.title,
																																								title: `${term.title} ${term.parentType ? term.parentType : ''}`,
																																								value: term.definitionName,
																																				}
																																})
																																.orderBy('title')
																																.value();

																												/////////////////////////
																												resolve(mapped);
																								})
																								.catch(reject);


																})
												}
								}
				},
				computed: {

								rosterFields() {
												var array = [];




												///////////////////////////////

												array.push({
																title: 'Notifications',
																key: 'notifyContacts',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																description: `Select contacts who should be notified when volunteers decline/swap positions on ${this.model.plural} rosters`,
																params: {
																				restrictType: 'contact',
																				allDefinitions: true,
																				persistentDescription: true,
																},
																//placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,
												})




												///////////////////////////////

												return array;
								},

								restrictionFields() {
												var array = [];

												var self = this;


												///////////////////////////////

												array.push({
																title: 'Relevant Definitions',
																key: 'rosterDefinitions',
																minimum: 0,
																maximum: 0,
																type: 'string',
																directive: 'select',
																options: self.eventTypeOptions,
																description: `Select event definitions that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for specific types of events then select them here, otherwise ${this.model.plural} will appear in the planner for events on any kind`,
																// params: {
																// 				restrictType: 'eventtrack',
																// 				allDefinitions: true,
																// 				persistentDescription: true,
																// },
												});

												array.push({
																title: 'Relevant Event Tracks',
																key: 'rosterEventTracks',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																description: `Select event tracks that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for specific tracks then select those tracks here, otherwise ${this.model.plural} will appear in the planner for events on any track`,
																params: {
																				restrictType: 'eventtrack',
																				allDefinitions: true,
																				persistentDescription: true,
																},
												});


												array.push({
																title: 'Relevant Realms',
																key: 'rosterRealms',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																description: `Select realms that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for realms then select those realms here`,
																params: {
																				restrictType: 'realm',
																				allDefinitions: true,
																				persistentDescription: true,
																},
												});





												///////////////////////////////

												return array;
								},


								fieldsMakeSense() {
												var self = this;
												switch (self.model.parentType) {
																case 'roster':
																case 'contact':
																case 'ticket':

																				return false;
																				break;
												}

												return true;
								},
								isForm() {
												return this.definition && this.definition.definitionName == 'form'
								},
								showDefinitionName() {
												return !this.model._id;
								},
								showFieldsFirst() {
												return this.model._id && this.model.definition == 'form'
								},
								paymentMethodFields() {
												return [{
																				title: 'Title',
																				key: 'title',
																				minimum: 1,
																				maximum: 1,
																				type: 'string',
																				description: '',

																				placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,
																},
																{
																				title: 'Key',
																				key: 'key',
																				minimum: 1,
																				maximum: 1,
																				type: 'string',
																				description: 'A unique key for this payment method',
																				placeholder: `Eg. 'bank', 'cash', 'cheque', 'plan'`,

																},
																{
																				title: 'Help / Description',
																				key: 'description',
																				minimum: 1,
																				maximum: 1,
																				type: 'string',
																				directive: 'wysiwyg',
																				description: 'Write a summary of how you want people to pay you if they are using alternative methods',
																				placeholder: 'Eg. Please transfer to Acc # with first name as description etc..'
																},

												]
								},
								alternativePaymentMethods: {
												get() {
																return this.model.paymentDetails.paymentMethods || [];
												},
												set(payload) {
																this.$set(this.model.paymentDetails, 'paymentMethods', payload);
												}
								},
								paymentIsEnabled() {
												return this.model.paymentDetails && (this.model.paymentDetails.required || this.model.paymentDetails.allow)
								},
								definitionFormOptions() {
												return {}
								},
								privacyDescription() {
												switch (this.model.privacy) {
																case 'public':
																				return `Anyone can submit this interaction form without needing explicit 'submit' or 'create' permissions`
																				break;
																case 'secure':
																				return `Only users and applications with the 'submit ${this.model.definitionName}' or 'create ${this.model.definitionName}' permission can submit these forms`
																				break;
												}


								},
								definitionData() {
												return this.definition ? this.definition.data : null;
								},
								lockedSubType() {
												if (this.definitionData && this.definitionData.definitionSubType) {
																return this.definitionData.definitionSubType
												}

												return;
								},
								paymentFields() {
												var self = this;
												var array = [];

												///////////////////////////////////

												addField('required', {
																title: 'Require Payment',
																minimum: 0,
																maximum: 1,
																type: 'boolean',

																description: `Require a payment for creating this content`,
																hide() {
																				return self.model.paymentDetails && self.model.paymentDetails.allow;
																},
												})

												addField('allow', {
																title: 'Allow Payment',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																expressions: {
																				hide() {
																								return self.model.paymentDetails && self.model.paymentDetails.required;
																				},
																},
																description: `Allow a payment to be made when creating this content`,
												})

												////////////////////////////////////////

												var paymentDetails = self.model.paymentDetails || {};

												////////////////////////////////////////

												addField('amount', {
																title: 'Base Amount',
																minimum: 0,
																maximum: 1,
																type: 'number',
																directive: 'currency',
																params: {
																				currency: paymentDetails.currency || '',
																				persistentDescription: true,
																				hideSuffix: true,
																},
																description: `The amount required to be paid to subit this form. You can leave this as 0 and calculate the cost with payment modifiers.`,
												})


												addField('allowAlternativePayments', {
																title: 'Allow payments to be made at a later time through other methods',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																description: `Checking this box will allow the user to create this content without paying the full required amount. Payments will need to be made manually via other arrangements that can be added below.`,
												})




												addField('currency', {
																title: 'Currency',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: [{
																								name: 'USD',
																								value: 'usd',
																				},
																				{
																								name: 'AUD',
																								value: 'aud',
																				},
																				{
																								name: 'CAD',
																								value: 'cad',
																				},
																				{
																								name: 'EUR',
																								value: 'eur',
																				},
																				{
																								name: 'GBP',
																								value: 'gbp',
																				},
																]
												})


												////////////////////////////////////////

												addField('minAmount', {
																title: 'Minimum Amount',
																minimum: 0,
																maximum: 1,
																type: 'number',
																params: {
																				persistentDescription: true,
																},
																// expressions:{
																//     transform(value) {
																//         value = Number(parseFloat(value).toFixed(2));
																//         return value * 100;
																//     }
																// },
																suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.minAmount, paymentDetails.currency)})`,
																description: `The minimum amount required for payment to create this type of content`,
												})

												addField('maxAmount', {
																title: 'Maximum Amount',
																minimum: 0,
																maximum: 1,
																type: 'number',
																params: {
																				persistentDescription: true,
																},
																// expressions:{
																//     transform(value) {
																//         value = Number(parseFloat(value).toFixed(2));
																//         return value * 100;
																//     }
																// },
																suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.maxAmount, paymentDetails.currency)})`,
																description: `The maximum amount that can be charged when creating this type of content`,
												})

												///////////////////////////////////

												function addField(key, details) {
																details.key = key;
																array.push(details)
												}

												// console.log('DO THE OUTPUT!!!');
												return array;


								},
								dataFields() {
												var self = this;
												var array = [];


												var defaultConfirmationCheckbox = self.model._id ? undefined : [true];
												var defaultQRCodeCheckbox = self.model._id ? undefined : [true];

												///////////////////////////////////

												addField('allowAnonymous', {
																title: 'Add default contact fields to form',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																inverse: true,
																description: `This will add the basic contact fields (First Name, Last Name, Email etc) to the top of the form and require a contact for the interaction. To do anonymous forms, customise your own field layout or do multi person forms it is recommended you turn this off`,
												})


												///////////////////////////////////


												addField('disableBestGuess', {
																title: 'Attempt contact link',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																inverse: true,
																description: `Attempt to link ${self.model.title} submissions to a contact if enough data is submitted. For example, if you have a few details above that match a contact in the database, Fluro will try and create a new contact or link to an existing contact. If you want these submissions to be anonymous you want to leave this unchecked.`,
												})


												addField('enableConfirmation', {
																title: 'Send Confirmation Email',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																defaultValues: defaultConfirmationCheckbox,
																description: `Send a confirmation email to the primary contact upon a new submission.`,
												})

												addField('confirmationMessage', {
																title: 'Confirmation Thank You Message',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'wysiwyg',
																description: `Add a customised thank you message to be shown in the confirmation email. \n Please note that event registrations will already contain key dates, locations and directions underneath this message`,
												})

												addField('includeTickets', {
																title: 'Include QR Code tickets',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																defaultValues: defaultQRCodeCheckbox,
																description: `Check this box if you want Fluro to send digital a QR for ticket collection.`,
												})

												addField('enableReceipt', {
																title: 'Send Fluro Transaction Receipt',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																description: `Send a transaction receipt from Fluro.`,
																expressions: {
																				hide() {
																								if (!self.model.paymentDetails) {
																												return true
																								}

																								if (self.paymentIsEnabled) {
																												return false
																								}

																								return true;
																				}
																}
												})




												addField('notifyContacts', {
																title: 'Send Notifications',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'contact',
																},
																description: `Send a basic notification to the following contacts when a new ${self.model.title} is submitted`,
												})


												addField('interactionProcesses', {
																title: 'Add submission to processes',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'definition',
																				referenceFilter: {
																								operator: 'and',
																								filters: [{
																												key: 'parentType',
																												comparator: '==',
																												value: 'process',
																								}, ]
																				},


																},
																description: `Select processes that the form submission will be added into`,
												})


												var contactProcessesTitle = self.model.data.contactProcessesAll ? 'Add all connected contacts to processes' : 'Add primary contact to processes';

												// Add {{item.data.contactProcessesAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes

												addField('contactProcesses', {
																title: contactProcessesTitle,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'definition',
																				referenceFilter: {
																								operator: 'and',
																								filters: [{
																												key: 'parentType',
																												comparator: '==',
																												value: 'process',
																								}, ]
																				},
																},
																description: `Select processes to add the primary (or first linked) contact to after form submission`,
												})

												addField('contactProcessesAll', {
																title: ' Include all connected contacts',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																description: `Include every contact referenced in the submission`,
												})

												addField('processAssignTo', {
																title: 'Assign to',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'contact',
																				allDefinitions: true,
																},
																description: `Assign the process card to specific contacts`,
												})

												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////

												var contactTeamsAllTitle = self.model.data.contactTeamsAll ? 'Add all connected contacts to groups/teams' : 'Add primary contact to groups/teams';

												// Add {{item.data.contactTeamsAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes

												addField('contactTeams', {
																title: contactTeamsAllTitle,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'team',
																				allDefinitions: true,
																},
																description: `Select groups/teams to add the primary (or first linked) contact to after form submission`,
												})

												addField('contactTeamsAll', {
																title: ' Include all connected contacts',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																description: `Include every contact referenced in the submission`,
												})


												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////

												var capabilitiesAllTitle = self.model.data.capabilitiesAll ? 'Add capabilities to all connected contacts' : 'Add capabilities to primary contact';

												// Add {{item.data.capabilitiesAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes

												addField('contactCapabilities', {
																title: capabilitiesAllTitle,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'capability',
																				allDefinitions: true,
																},
																description: `Select groups/teams to add the primary (or first linked) contact to after form submission`,
												})

												addField('capabilitiesAll', {
																title: ' Include all connected contacts',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
																description: `Include every contact referenced in the submission`,
												})






												addField('reactionPipelines', {
																title: 'Reaction Pipelines',
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'reaction',
																				allDefinitions: true,
																},
																description: `Select reaction pipelines to push submissions into when they are created`,
												})


												addField('blc', {
																title: 'Blacklist Country Codes',
																minimum: 0,
																maximum: 0,
																type: 'string',
																placeholder: 'Country Code eg(AU, BR, US)',
																description: `Block certain country codes from submitting this form`,
												})







												///////////////////////////////////

												//     <
												//     label > Contact ID Requirement < /label> <
												//     p class = "help-block" >
												//     Every contact requires either an email address or a phone number
												// for verification. < br / >
												//     Sometimes it makes more sense to ask / require one or both of these <
												//     /p> <
												//     select ng - model = "item.data.identifier"
												// class = "form-control" >
												//     <option value="email">Require an Email Address</option> <
												//     option value = "phone" > Require a Phone Number < /option> <
												//     option value = "either" > Require either Phone Number or Email Address < /option> <
												//     option value = "both" > Require both Phone Number and Email Address < /option> <
												//     /select>


												addField('identifier', {
																title: 'Contact ID Requirement',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'select',
																description: `Every contact requires either an email address or a phone number for verification.\n
                Sometimes it makes more sense to ask/require one or both of these`,
																options: [{
																								name: 'Require an Email Address',
																								value: 'email',
																				},
																				{
																								name: 'Require a Phone Number',
																								value: 'phone',
																				},
																				{
																								name: 'Require either Phone Number or Email Address',
																								value: 'either',
																				},
																				{
																								name: 'Require both Phone Number and Email Address',
																								value: 'both',
																				},
																]
												})

												///////////////////////////////////

												addField('askLastName', {
																title: 'Ask',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('requireLastName', {
																title: 'Require',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												///////////////////////////////////

												addField('askFirstName', {
																title: 'Ask',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('requireFirstName', {
																title: 'Require',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												///////////////////////////////////

												addField('askEmail', {
																title: 'Ask',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('requireEmail', {
																title: 'Require',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												///////////////////////////////////

												addField('askPhone', {
																title: 'Ask',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('requirePhone', {
																title: 'Require',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												///////////////////////////////////

												addField('askGender', {
																title: 'Ask',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('requireGender', {
																title: 'Require',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												///////////////////////////////////

												addField('askDOB', {
																title: 'Ask',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('requireDOB', {
																title: 'Require',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												///////////////////////////////////

												function addField(key, details) {
																details.key = key;
																array.push(details)
												}

												// console.log('DO THE OUTPUT!!!');
												return array;
								},
								processFields() {
												var self = this;
												var array = [];


												///////////////////////////////////

												array.push({
																title: 'Types that can be processed',
																minimum: 0,
																maximum: 0,
																key: 'processTypes',
																type: 'string',
																directive: 'select',
																options: self.referenceOptions,
																params: {
																				persistentDescription: true
																},
																description: `Restrict what kind of content types can be referenced and added to this process`,
												})



												// addField('referenceType', {
												//     key: 'restrictType',
												//     title: 'Reference Type',
												//     description: 'Restrict what kind of items can be referenced in this field',
												//     minimum: 0,
												//     maximum: 1,
												//     type: 'string',
												//     directive: 'select',
												//     options: self.referenceOptions,
												// })

												///////////////////////////////////

												array.push({
																title: 'Mode',
																minimum: 0,
																maximum: 1,
																key: 'mode',
																type: 'string',
																directive: 'select',
																options: [{
																								title: 'Linear Progression',
																								value: '',
																				},
																				{
																								title: 'Kanban / Lanes',
																								value: 'lanes',
																				},
																],
																params: {
																				persistentDescription: true
																},
												})

												///////////////////////////////////

												array.push({
																title: 'Disable Drag and Drop',
																minimum: 0,
																maximum: 1,
																key: 'dragLocked',
																type: 'boolean',
																description: 'Lock drag and drop functionality so that cards can not be dragged into other columns',
																params: {
																				persistentDescription: true
																},
												})


												return array;
								},
								fieldsOutput() {

												var self = this;
												var array = [];

												var exampleSingle;
												var examplePlural;

												switch (self.model.parentType) {
																case 'interaction':
																				exampleSingle = 'Volunteer Application Form';
																				examplePlural = 'Volunteer Application Forms';
																				break;
																case 'contactdetail':
																				exampleSingle = 'Medical Details';
																				examplePlural = 'Medical Details';
																				break;
																case 'event':
																				exampleSingle = 'Small Group Meeting';
																				examplePlural = 'Small Group Meetings';
																				break;
																case 'article':
																				exampleSingle = 'Blog';
																				examplePlural = 'Blogs';
																				break;
																case 'team':
																				exampleSingle = 'Connect Group';
																				examplePlural = 'Connect Groups';
																				break;
																default:
																				exampleSingle = 'Thing';
																				examplePlural = 'Things';
																				break;
												}

												///////////////////////////////////

												// console.log('AUTOFOCUS', self.model._id)
												addField('title', {
																title: 'Title',
																minimum: 1,
																maximum: 1,
																type: 'string',
																params: {
																				autofocus: !self.model._id,
																				persistentDescription: true
																},
																description: `What do you call this ${self.readableContentType}?. eg. '${exampleSingle}'`,
												})



												addField('plural', {
																title: 'Plural',
																minimum: 1,
																maximum: 1,
																type: 'string',
																params: {
																				persistentDescription: true
																},
																description: `How do you want us to refer to multiple ${self.readableContentType} items?. eg. '${examplePlural}'`,
																expressions: {
																				defaultValue() {


																								var existingTitle = self.model.title;

																								if (!existingTitle || !existingTitle.length) {
																												return '';
																								}

																								if (_.endsWith(existingTitle, 's') || _.endsWith(existingTitle, 'es')) {
																												return existingTitle;
																								}

																								return existingTitle = existingTitle + 's';
																				}
																}
												})


												///////////////////////////////////

												addField('firstLine', {
																title: 'Short Description',
																minimum: 0,
																maximum: 1,
																type: 'string',
																params: {
																				persistentDescription: true
																},
																description: `Optional short description describing this ${self.$fluro.types.readable(self.model.parentType)}`,
												})

												addField('definitionName', {
																title: 'Definition Name',
																minimum: 1,
																maximum: 1,
																type: 'string',
																description: `This is a unique key to store this field's data in the database. for this ${self.readableContentType}`,
																expressions: {
																				// transform(value) {

																				//     if (!value) {
																				//         return value;
																				//     }
																				//     var regexp = /[^a-zA-Z0-9-_]+/g;
																				//     var cleaned = _.camelCase(value).replace(regexp, '');
																				//     return cleaned;
																				// },
																				defaultValue() {

																								if (!self.model.title) {
																												return ''
																								}

																								var regexp = /[^a-zA-Z0-9-_]+/g;
																								var cleaned = _.camelCase(String(self.model.title).replace(regexp, ''));

																								return cleaned;
																				}
																},
												})



												array.push({
																title: 'Weight',
																key: 'weight',
																minimum: 0,
																maximum: 0,
																type: 'integer',
																description: 'Set the weight of this roster, this will determine the ordering when shown in the multi planner, (Lighter weight rosters will be shown at the top, Heavier weight rosters will be shown toward the bottom)',
																params: {
																				persistentDescription: true,
																},
																//placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,
												})






												//////////////////////////////////////////////////

												addField('publishDate', {
																title: 'Publish / Open Date',
																minimum: 0,
																maximum: 1,
																type: 'date',
																description: `When should this form open and change status to 'active'`,
																directive: 'datetimepicker',
												})

												addField('archiveDate', {
																title: 'Archive / Close Date',
																minimum: 0,
																maximum: 1,
																type: 'date',
																description: `When should this form closed and change status to 'archived'`,
																directive: 'datetimepicker',
												})

												//////////////////////////////////////////////////


												//////////////////////////////////////////////////

												addField('parentType', {
																title: 'Parent Type',
																minimum: 1,
																maximum: 1,
																type: 'string',
																description: `What basic type of content you are defining/extending`,
																directive: 'select',
																options: self.parentTypeOptions,
												})


												//////////////////////////////////////////////////

												addField('privacy', {
																title: 'Security / Privacy',
																minimum: 0,
																maximum: 1,
																type: 'string',
																description: self.privacyDescription,
																directive: 'select',
																expressions: {
																				hide() {

																								switch (self.model.parentType) {
																												case 'interaction':
																												case 'post':
																																break;
																												default:
																																return true;
																																break;
																								}
																				},
																},
																options: [{
																								name: `Secure (Only those with permissions can submit '${self.model.plural}')`,
																								value: 'secure',
																				},
																				{
																								name: `Public (Anyone can submit '${self.model.plural}')`,
																								value: 'public',
																				},
																],
												})

												///////////////////////////////////

												function addField(key, details) {
																details.key = key;
																array.push(details)
												}

												// console.log('DO THE OUTPUT!!!');
												return array;

								},
				},
				data() {
								return {
												tabIndex: 0,
												alternativePaymentMethodIndex: 0,
												expandedSettings: {
																_contacts: false,
																_teams: false,
																_events: false,
																_tickets: false,
												},
												editorOptions: {},
								}
				},
}

</script>
<style lang="scss" scoped>
.field-row {
				padding: 0 15px;
				border-bottom: 1px solid rgba(#000, 0.1);
}

</style>
