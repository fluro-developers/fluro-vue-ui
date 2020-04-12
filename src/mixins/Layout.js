

// import FluroWrapper from '../components/ui/FluroWrapper.vue';
// import FluroConstrain from '../components/ui/FluroConstrain.vue';
// import FluroRealmBar from '../components/ui/FluroRealmBar.vue';

export default {
    components: {
    	'wrapper': () => import('../components/ui/FluroWrapper.vue'),
    	'constrain': () => import('../components/ui/FluroConstrain.vue'),
    	'fluro-realm-bar': () => import('../components/ui/FluroRealmBar.vue'),
    	

        // 'wrapper':FluroWrapper,
        // 'constrain':FluroConstrain,
        // 'realmBar':FluroRealmBar,
    }
}