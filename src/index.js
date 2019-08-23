

console.log('fluro-vue-ui v2.0.2')

/////////////////////////////////////////////////////

//Import Components
import FluroAvatar from './components/FluroAvatar.vue';
export { FluroAvatar as FluroAvatar };


import FluroAvatarUpdate from './components/FluroAvatarUpdate.vue';
export { FluroAvatarUpdate as FluroAvatarUpdate };

import FluroImage from './components/FluroImage.vue';


import FluroVideo from './components/FluroVideo.vue';
import FluroVideoThumbnail from './components/FluroVideoThumbnail.vue';

////////////////////////////////////////////////////////////////////

import FluroListItem from './components/FluroListItem.vue';
export { FluroListItem as FluroListItem };

import FluroHTML from './components/FluroHTML.vue';
export { FluroHTML as FluroHTML };

////////////////////////////////////////////////////////////////////

import FluroContentPanel from './components/content/FluroContentPanel.vue';
export { FluroContentPanel as FluroContentPanel };

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//Content Render Components
import FluroContentRender from './components/FluroContentRender.vue';
export { FluroContentRender as FluroContentRender };

import FluroContentRenderField from './components/FluroContentRenderField.vue';
export { FluroContentRenderField as FluroContentRenderField };

////////////////////////////////////////////////////////////////////////////////

//UI Nicieties
import FluroPagePreloader from './components/ui/FluroPagePreloader.vue';
export { FluroPagePreloader as FluroPagePreloader };

import FluroSearchBar from './components/ui/FluroSearchBar.vue';
export { FluroSearchBar as FluroSearchBar };

import FluroIcon from './components/ui/FluroIcon.vue';
import FluroRealmDots from './components/ui/FluroRealmDots.vue';
import FluroStatusLabel from './components/ui/FluroStatusLabel.vue';

import FluroWrapper from './components/ui/FluroWrapper.vue';
export { FluroWrapper as Wrapper };

import FluroConstrain from './components/ui/FluroConstrain.vue';
export { FluroConstrain as Constrain };

import FluroRealmBar from './components/ui/FluroRealmBar.vue';
export { FluroRealmBar as RealmBar };

////////////////////////////////////////////////////////////////////////////////

//Form Components
import FluroContentBrowser from './components/form/FluroContentBrowser.vue';
export { FluroContentBrowser as FluroContentBrowser };

import FluroContentSelect from './components/form/FluroContentSelect.vue';
export { FluroContentSelect as FluroContentSelect };

import FluroRealmSelect from './components/form/FluroRealmSelect.vue';
export { FluroRealmSelect as FluroRealmSelect };

import FluroEditor from './components/form/FluroEditor.vue';
export { FluroEditor as FluroEditor };

import FluroCodeEditor from './components/form/FluroCodeEditor.vue';
export { FluroCodeEditor as FluroCodeEditor };

import FluroCodeHighlight from './components/FluroCodeHighlight.vue';
export { FluroCodeHighlight as FluroCodeHighlight };

import FluroContentForm from './components/form/FluroContentForm.vue';
export { FluroContentForm as FluroContentForm };

import FluroContentFormField from './components/form/FluroContentFormField.vue';
export { FluroContentFormField as FluroContentFormField };

import FluroDateTimePicker from './components/form/FluroDateTimePicker.vue';
export { FluroDateTimePicker as FluroDateTimePicker };

import FluroSignatureField from './components/form/FluroSignatureField.vue';
export { FluroSignatureField as FluroSignatureField };

import FluroAcademicSelect from './components/form/FluroAcademicSelect.vue';
export { FluroAcademicSelect as FluroAcademicSelect };

import FluroPostForm from './components/form/FluroPostForm.vue';
export { FluroPostForm as FluroPostForm };

import FluroInteractionForm from './components/form/FluroInteractionForm.vue';
export { FluroInteractionForm as FluroInteractionForm };

import FluroPostThread from './components/form/FluroPostThread.vue';
export { FluroPostThread as FluroPostThread };

////////////////////////////////////////////////////////////////////////////////

import FluroStatToggle from './components/FluroStatToggle.vue';
export { FluroStatToggle as FluroStatToggle };

import FluroStatTotal from './components/FluroStatTotal.vue';
export { FluroStatTotal as FluroStatTotal };

//Flex Column
import FlexColumn from './components/ui/FlexColumn.vue';
export { FlexColumn as FlexColumn };

//Flex Column Header
import FlexColumnHeader from './components/ui/FlexColumnHeader.vue';
export { FlexColumnHeader as FlexColumnHeader };

//Flex Column Header
import FlexColumnBody from './components/ui/FlexColumnBody.vue';
export { FlexColumnBody as FlexColumnBody };


//Flex Column Footer
import FlexColumnFooter from './components/ui/FlexColumnFooter.vue';
export { FlexColumnFooter as FlexColumnFooter };

////////////////////////////////////////////////////////////////////

//Mixins
import Layout from './mixins/Layout';
export { Layout as Layout };


import FluroSelectionMixin from './mixins/FluroSelectionMixin';
export { FluroSelectionMixin as FluroSelectionMixin };

/////////////////////////////////////////////////////

const FluroVueUI = {
    install: function(Vue, options) {
        /////////////////////////////////////////////////////

        //Add Fluro Components Globally
        Vue.component('fluro-icon', FluroIcon);
        Vue.component('fluro-realm-dots', FluroRealmDots);
        Vue.component('fluro-status-label', FluroStatusLabel);
        Vue.component('fluro-avatar', FluroAvatar);
        Vue.component('fluro-image', FluroImage);
        Vue.component('fluro-list-item', FluroListItem);
        Vue.component('fluro-video', FluroVideo);
        Vue.component('fluro-video-thumbnail', FluroVideoThumbnail);
        Vue.component('fluro-page-preloader', FluroPagePreloader);
        Vue.component('fluro-html', FluroHTML);
        Vue.component('flex-column', FlexColumn);
        Vue.component('flex-column-body', FlexColumnBody);
        Vue.component('flex-column-header', FlexColumnHeader);
        Vue.component('flex-column-footer', FlexColumnFooter);
    }

}



////////////////////////////////////////////////////////////////////




export default FluroVueUI;