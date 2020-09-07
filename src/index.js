console.log('fluro-vue-ui 2.2.22')

/////////////////////////////////////////////////////



import FluroCalendar from './components/ui/FluroCalendar.vue';
import FluroButton from './components/ui/FluroButton.vue';
import FluroHelp from './components/FluroHelp.vue';
import FluroChatbox from './components/conversation/FluroChatbox.vue';
import FluroLiveVideo from './components/FluroLiveVideo.vue';
import FluroStreamPlayer from './components/FluroStreamPlayer.vue';
import FluroImage from './components/FluroImage.vue';
import FluroModalMixin from './mixins/ModalMixin';
import FluroAvatar from './components/FluroAvatar.vue';
import FluroAvatarUpdate from './components/FluroAvatarUpdate.vue';
import FluroFieldEditor from './components/fields/FluroFieldEditor.vue';
import FluroCompileHtml from './components/FluroCompileHtml.vue';
import FluroInfiniteScroll from './components/ui/FluroInfiniteScroll.vue';
import FluroPagedContent from './components/ui/FluroPagedContent.vue';
import FluroAudio from './components/FluroAudio.vue';
import FluroVideo from './components/FluroVideo.vue';
import FluroVideoThumbnail from './components/FluroVideoThumbnail.vue';
import FluroModal from './components/ui/modal/Modal.vue';
import FluroInlineEdit from './components/form/FluroInlineEdit.vue';
import FluroConfirmButton from './components/ui/FluroConfirmButton.vue';
import FluroTrendChart from './components/reporting/FluroTrendChart.vue';
import FluroTable from './components/table/FluroTable.vue';
import TableRowCheckbox from './components/table/TableRowCheckbox.vue';
import TableHeaderCheckbox from './components/table/TableHeaderCheckbox.vue';
import TableCell from './components/table/TableCell.vue';
import ProcessDots from './components/ui/ProcessDots.vue';
import SearchInput from './components/ui/SearchInput.vue';
import FluroDynamicTable from './components/table/FluroDynamicTable.vue';
import DefinitionCell from './components/table/cells/DefinitionCell.vue';
import TitleCell from './components/table/cells/TitleCell.vue';
import TypeImageCell from './components/table/cells/TypeImageCell.vue';
import FirstNameCell from './components/table/cells/FirstNameCell.vue';
import BooleanCell from './components/table/cells/BooleanCell.vue';
import LastNameCell from './components/table/cells/LastNameCell.vue';
import StatusCell from './components/table/cells/StatusCell.vue';
import DateCell from './components/table/cells/DateCell.vue';
import TimeCell from './components/table/cells/TimeCell.vue';
import ThumbnailCell from './components/table/cells/ThumbnailCell.vue';
import EventThumbnailCell from './components/table/cells/EventThumbnailCell.vue';
import NumberCell from './components/table/cells/NumberCell.vue';
import RealmDotCell from './components/table/cells/RealmDotCell.vue';
import PaymentStatusCell from './components/table/cells/PaymentStatusCell.vue';
import CurrencyCell from './components/table/cells/CurrencyCell.vue';
import TimeagoCell from './components/table/cells/TimeagoCell.vue';
import PhoneNumberCell from './components/table/cells/PhoneNumberCell.vue';
import EmailAddressCell from './components/table/cells/EmailAddressCell.vue';
import FilesizeCell from './components/table/cells/FilesizeCell.vue';
import DurationCell from './components/table/cells/DurationCell.vue';
import DimensionsCell from './components/table/cells/DimensionsCell.vue';
import AvatarCell from './components/table/cells/AvatarCell.vue';
import PersonaAvatarCell from './components/table/cells/PersonaAvatarCell.vue';
import ContactAvatarCell from './components/table/cells/ContactAvatarCell.vue';
import ContactTimeline from './components/content/contact/timeline/ContactTimeline.vue';
import ContactPostThread from './components/content/contact/timeline/ContactPostThread.vue';
import ContactDetailList from './components/content/contact/timeline/ContactDetailList.vue';
import ContactMessageList from './components/content/contact/timeline/ContactMessageList.vue';
import ContactTransactionList from './components/content/contact/timeline/ContactTransactionList.vue';
import ContactInteractionList from './components/content/contact/timeline/ContactInteractionList.vue';
import ContactCheckinList from './components/content/contact/timeline/ContactCheckinList.vue';
import ContactTeamList from './components/content/contact/timeline/ContactTeamList.vue';
import PrivacyCell from './components/table/cells/PrivacyCell.vue';
import JSONCell from './components/table/cells/JSONCell.vue';
import TicketCollectCell from './components/table/cells/TicketCollectCell.vue';
import FluroToggleItem from './components/ui/FluroToggleItem.vue';
import FluroItemImage from './components/ui/FluroItemImage.vue';
import FluroOptionsDialog from './components/ui/modal/OptionsDialog.vue';
import FluroPromptDialog from './components/ui/modal/PromptDialog.vue';
import FluroConfirmDialog from './components/ui/modal/ConfirmDialog.vue';
import FluroListItem from './components/FluroListItem.vue';
import FluroTimeline from './components/ui/FluroTimeline.vue';
import FluroContentEdit from './components/content/edit/FluroContentEdit.vue';
import FluroContentView from './components/content/view/FluroContentView.vue';
import FilterConditionGroup from './components/form/filters/FilterConditionGroup.vue';
import FilterConditionRow from './components/form/filters/FilterConditionRow.vue';
import FluroContentList from './components/FluroContentList.vue';
import FluroContentRender from './components/FluroContentRender.vue';
import FluroContentRenderField from './components/FluroContentRenderField.vue';
import FluroTaskList from './components/form/tasklist/FluroTaskList.vue';
import FluroPagePreloader from './components/ui/FluroPagePreloader.vue';
import FluroSearchBar from './components/ui/FluroSearchBar.vue';
import FluroIcon from './components/ui/FluroIcon.vue';
import FluroRealmDots from './components/ui/FluroRealmDots.vue';
import FluroRealmTags from './components/ui/FluroRealmTags.vue';
import FluroStatusLabel from './components/ui/FluroStatusLabel.vue';
import FluroStatusSelect from './components/form/FluroStatusSelect.vue';
import FluroWrapper from './components/ui/FluroWrapper.vue';
import FluroConstrain from './components/ui/FluroConstrain.vue';
import FluroRealmBar from './components/ui/FluroRealmBar.vue';
import FluroTabset from './components/ui/tabset/FluroTabset.vue';
import FluroTab from './components/ui/tabset/FluroTab.vue';
import FluroAccordion from './components/ui/accordion/FluroAccordion.vue';
import FluroAccordionPanel from './components/ui/accordion/FluroAccordionPanel.vue';
import FluroContentBrowser from './components/form/FluroContentBrowser.vue';
import FluroContentSelect from './components/form/FluroContentSelect.vue';
import FluroSelector from './components/form/contentselect/FluroSelector.vue';
import AddPostModal from './components/ui/modal/AddPost.vue';
import FluroContentSelectModal from './components/form/contentselect/FluroContentSelectModal.vue';
import FluroContentSelectButton from './components/form/contentselect/FluroContentSelectButton.vue';
import FluroRealmSelect from './components/form/realmselect/FluroRealmSelect.vue';
import FluroTagSelect from './components/form/tagselect/FluroTagSelect.vue';
import FluroEditor from './components/form/FluroEditor.vue';
import FluroCodeEditor from './components/form/FluroCodeEditor.vue';
import FluroExpressionEditor from './components/form/FluroExpressionEditor.vue';
import FluroCodeHighlight from './components/FluroCodeHighlight.vue';
import FluroContentForm from './components/form/FluroContentForm.vue';
import FluroContentFormField from './components/form/FluroContentFormField.vue';
import FluroDateTimePicker from './components/form/FluroDateTimePicker.vue';
import FluroSignatureField from './components/form/FluroSignatureField.vue';
import FluroAcademicSelect from './components/form/FluroAcademicSelect.vue';
import FluroPostForm from './components/form/FluroPostForm.vue';
import FluroBasicForm from './components/form/FluroBasicForm.vue';
import FluroInteractionForm from './components/form/FluroInteractionForm.vue';
import FluroPostThread from './components/form/FluroPostThread.vue';
import FluroStatToggle from './components/FluroStatToggle.vue';
import FluroStatTotal from './components/FluroStatTotal.vue';
import FluroCard from './components/ui/card/FluroCard.vue';
import FluroCardBody from './components/ui/card/FluroCardBody.vue';
import FluroCardTitle from './components/ui/card/FluroCardTitle.vue';
import FluroPanel from './components/ui/panel/FluroPanel.vue';
import FluroPanelBody from './components/ui/panel/FluroPanelBody.vue';
import FluroPanelTitle from './components/ui/panel/FluroPanelTitle.vue';
import FlexColumn from './components/ui/FlexColumn.vue';
import FlexRow from './components/ui/FlexRow.vue';
import FlexColumnHeader from './components/ui/FlexColumnHeader.vue';
import FlexColumnBody from './components/ui/FlexColumnBody.vue';
import FlexColumnFooter from './components/ui/FlexColumnFooter.vue';
import ListGroup from './components/ui/ListGroup.vue';
import ListGroupItem from './components/ui/ListGroupItem.vue';
import MailoutRenderPreview from './components/mailout/MailoutRenderPreview.vue';
import MailoutTestPanel from './components/mailout/MailoutTestPanel.vue';
import MailoutPreflightPanel from './components/mailout/MailoutPreflightPanel.vue';
import MailoutResultsPanel from './components/mailout/MailoutResultsPanel.vue';
import Layout from './mixins/Layout';
import DynamicListMixin from './mixins/DynamicListMixin';
import DynamicPageMixin from './mixins/DynamicPageMixin';
import FluroContactCommunicateMixin from './mixins/FluroContactCommunicateMixin';
import FluroSelectionMixin from './mixins/FluroSelectionMixin';
import FluroChart from './components/charts/FluroChart.vue';
import FluroLineChart from './components/charts/FluroLineChart.vue';
import FluroPieChart from './components/charts/FluroPieChart.vue';
import FluroSyncedChart from './components/charts/FluroSyncedChart.vue';

/////////////////////////////////////////////////////


import _ from 'lodash';

/**
 * An install function.
 *
 * @param {any} Vue Vue API.
 */
function install(Vue, options) {
	var fluro = Vue.prototype.$fluro;

	//Setup a modals array
	fluro.global.modals = [];

	/////////////////////////////////////////////

	//Add a function to show modals
	fluro.modal = function(modal) {
		return new Promise(function(resolve, reject) {
			modal.modalID = fluro.global.modals.length;
			modal.resolve = resolve;
			modal.reject = reject;
			//Inject the modal into the stack
			fluro.global.modals.splice(modal.modalID, 0, modal);
		});

	}

	/////////////////////////////////////////////

	//Request the user to answer some questions
	fluro.options = function(options, title, description) {
		return fluro.modal({
			component: FluroOptionsDialog,
			options: {
				title,
				description,
				options,
			}
		})
	}

	/////////////////////////////////////////////

	//Request the user to answer some questions
	fluro.prompt = function(fields, title, model, description) {
		return fluro.modal({
			component: FluroPromptDialog,
			options: {
				title,
				fields,
				model,
				description,
			}
		})
	}



	/////////////////////////////////////////////

	fluro.confirm = function(title, description, options) {

		if (!options) {
			options = {};
		}

		options.title = title;
		options.description = description;

		return fluro.modal({
			component: FluroConfirmDialog,
			options,
		})
	}

	/////////////////////////////////////////////

	fluro.closeModal = function(modalID) {
		var modal = _.find(fluro.global.modals, { modalID });
		var index = _.findIndex(fluro.global.modals, modal);
		fluro.global.modals.splice(index, 1);
	}

	/////////////////////////////////////////////////////

	Vue.mixin(Layout);

	//Add Fluro Components Globally
	Vue.component('fluro-icon', FluroIcon);
	Vue.component('fluro-realm-dots', FluroRealmDots);
	Vue.component('fluro-realm-tags', FluroRealmTags);
	Vue.component('fluro-realm-bar', FluroRealmBar);
	Vue.component('fluro-status-label', FluroStatusLabel);
	Vue.component('fluro-avatar', FluroAvatar);
	Vue.component('fluro-image', FluroImage);
	Vue.component('fluro-audio', FluroAudio);
	Vue.component('fluro-list-item', FluroListItem);
	Vue.component('fluro-toggle-item', FluroToggleItem);
	Vue.component('fluro-video', FluroVideo);
	Vue.component('fluro-video-thumbnail', FluroVideoThumbnail);
	Vue.component('fluro-page-preloader', FluroPagePreloader);
	// Vue.component('fluro-html', FluroHTML);
	Vue.component('flex-row', FlexRow);
	Vue.component('flex-column', FlexColumn);
	Vue.component('flex-column-body', FlexColumnBody);
	Vue.component('flex-column-header', FlexColumnHeader);
	Vue.component('flex-column-footer', FlexColumnFooter);
}



/////////////////////////////////////////////////////


if ((typeof window !== 'undefined') && window.Vue) {
	install(window.Vue);
}


export default {
	install,
}








export { FluroCalendar as FluroCalendar };
export { FluroImage as FluroImage };
export { FluroChatbox as FluroChatbox };
export { FluroStreamPlayer as FluroStreamPlayer };
export { FluroHelp as FluroHelp };
export { FluroButton as FluroButton };



export { FluroModalMixin as FluroModalMixin };
export { FluroAvatar as FluroAvatar };
export { FluroAvatarUpdate as FluroAvatarUpdate };
export { FluroFieldEditor as FluroFieldEditor };
export { FluroCompileHtml as FluroCompileHtml };
export { FluroInfiniteScroll as FluroInfiniteScroll };
export { FluroPagedContent as FluroPagedContent };
export { FluroAudio as FluroAudio };
export { FluroVideo as FluroVideo };
export { FluroVideoThumbnail as FluroVideoThumbnail };
export { FluroModal as FluroModal };
export { FluroInlineEdit as FluroInlineEdit };
export { FluroConfirmButton as FluroConfirmButton };
export { FluroTrendChart as FluroTrendChart };
export { FluroTable as FluroTable };

export { TableHeaderCheckbox as TableHeaderCheckbox };
export { TableRowCheckbox as TableRowCheckbox };


export { ProcessDots as ProcessDots };
export { TableCell as TableCell };
export { SearchInput as SearchInput };
export { FluroDynamicTable as FluroDynamicTable };
export { DefinitionCell as DefinitionCell };
export { TitleCell as TitleCell };
export { TypeImageCell as TypeImageCell };
export { FirstNameCell as FirstNameCell };
export { BooleanCell as BooleanCell };
export { LastNameCell as LastNameCell };
export { StatusCell as StatusCell };
export { DateCell as DateCell };
export { TimeCell as TimeCell };
export { ThumbnailCell as ThumbnailCell };
export { EventThumbnailCell as EventThumbnailCell };
export { NumberCell as NumberCell };
export { RealmDotCell as RealmDotCell };
export { PaymentStatusCell as PaymentStatusCell };
export { CurrencyCell as CurrencyCell };
export { TimeagoCell as TimeagoCell };
export { PhoneNumberCell as PhoneNumberCell };
export { EmailAddressCell as EmailAddressCell };
export { FilesizeCell as FilesizeCell };
export { DurationCell as DurationCell };
export { DimensionsCell as DimensionsCell };
export { AvatarCell as AvatarCell };
export { PersonaAvatarCell as PersonaAvatarCell };
export { ContactAvatarCell as ContactAvatarCell };
export { ContactTimeline as ContactTimeline };
export { ContactPostThread as ContactPostThread };
export { ContactDetailList as ContactDetailList };
export { ContactMessageList as ContactMessageList };
export { ContactTransactionList as ContactTransactionList };
export { ContactInteractionList as ContactInteractionList };
export { ContactCheckinList as ContactCheckinList };
export { ContactTeamList as ContactTeamList };
export { PrivacyCell as PrivacyCell };
export { JSONCell as JSONCell };
export { TicketCollectCell as TicketCollectCell };
export { FluroToggleItem as FluroToggleItem };
export { FluroItemImage as FluroItemImage };
export { FluroOptionsDialog as FluroOptionsDialog };
export { FluroPromptDialog as FluroPromptDialog };
export { FluroConfirmDialog as FluroConfirmDialog };
export { FluroListItem as FluroListItem };
export { FluroTimeline as FluroTimeline };
export { FluroContentEdit as FluroContentEdit };
export { FluroContentView as FluroContentView };
export { FilterConditionGroup as FilterConditionGroup };
export { FilterConditionRow as FilterConditionRow };
export { FluroContentList as FluroContentList };
export { FluroContentRender as FluroContentRender };
export { FluroContentRenderField as FluroContentRenderField };
export { FluroTaskList as FluroTaskList };
export { FluroPagePreloader as FluroPagePreloader };
export { FluroSearchBar as FluroSearchBar };
export { FluroIcon as FluroIcon };
export { FluroRealmDots as FluroRealmDots };
export { FluroRealmTags as FluroRealmTags };
export { FluroStatusLabel as FluroStatusLabel };
export { FluroStatusSelect as FluroStatusSelect };
export { FluroWrapper as FluroWrapper };
export { FluroConstrain as FluroConstrain };
export { FluroRealmBar as FluroRealmBar };
export { FluroTabset as FluroTabset };
export { FluroTab as FluroTab };
export { FluroAccordion as FluroAccordion };
export { FluroAccordionPanel as FluroAccordionPanel };
export { FluroContentBrowser as FluroContentBrowser };
export { FluroContentSelect as FluroContentSelect };
export { FluroSelector as FluroSelector };
export { AddPostModal as AddPostModal };
export { FluroContentSelectModal as FluroContentSelectModal };
export { FluroContentSelectButton as FluroContentSelectButton };
export { FluroRealmSelect as FluroRealmSelect };
export { FluroTagSelect as FluroTagSelect };
export { FluroEditor as FluroEditor };
export { FluroCodeEditor as FluroCodeEditor };
export { FluroExpressionEditor as FluroExpressionEditor };
export { FluroCodeHighlight as FluroCodeHighlight };
export { FluroContentForm as FluroContentForm };
export { FluroContentFormField as FluroContentFormField };
export { FluroDateTimePicker as FluroDateTimePicker };
export { FluroSignatureField as FluroSignatureField };
export { FluroAcademicSelect as FluroAcademicSelect };
export { FluroPostForm as FluroPostForm };
export { FluroBasicForm as FluroBasicForm };
export { FluroInteractionForm as FluroInteractionForm };
export { FluroPostThread as FluroPostThread };
export { FluroStatToggle as FluroStatToggle };
export { FluroStatTotal as FluroStatTotal };
export { FluroCard as FluroCard };
export { FluroCardBody as FluroCardBody };
export { FluroCardTitle as FluroCardTitle };
export { FluroPanel as FluroPanel };
export { FluroPanelBody as FluroPanelBody };
export { FluroPanelTitle as FluroPanelTitle };
export { FlexColumn as FlexColumn };
export { FlexRow as FlexRow };
export { FlexColumnHeader as FlexColumnHeader };
export { FlexColumnBody as FlexColumnBody };
export { FlexColumnFooter as FlexColumnFooter };
export { ListGroup as ListGroup };
export { ListGroupItem as ListGroupItem };
export { MailoutRenderPreview as MailoutRenderPreview };
export { MailoutTestPanel as MailoutTestPanel };
export { MailoutPreflightPanel as MailoutPreflightPanel };
export { MailoutResultsPanel as MailoutResultsPanel };
export { Layout as Layout };
export { DynamicListMixin as DynamicListMixin };
export { DynamicPageMixin as DynamicPageMixin };
export { FluroContactCommunicateMixin as FluroContactCommunicateMixin };
export { FluroSelectionMixin as FluroSelectionMixin };
export { FluroChart as FluroChart}
export { FluroLineChart as FluroLineChart}
export { FluroPieChart as FluroPieChart}
export { FluroSyncedChart as FluroSyncedChart}