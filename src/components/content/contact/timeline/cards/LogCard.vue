<template>
    <div class="log-timeline-entry border-top" @click="viewDetail">
        <!-- <fluro-realm-bar :realm="item.realms" /> -->
        <!-- <fluro-icon type="log"/> -->

        <v-layout align-center>
            
           
            <v-flex >
                <template v-if="author">{{author.title}} -</template> {{item.message}} <em class="muted">- {{item.date | formatDate('h:mma')}} ({{item.date | timeago}})</em>
            </v-flex>
            <!--  <v-flex shrink v-if="author">
                
            </v-flex> -->

            <v-flex shrink v-if="author">
                <v-container pa-0 pl-2>
                <fluro-avatar v-tippy :content="author.title" :id="author._id" :type="author.type"/>
            </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>


    import FluroRealmBar from 'src/components/ui/FluroRealmBar.vue';

export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    components: {
       
        FluroRealmBar,
    },
    methods:{
    	viewDetail() {
    		if(this.$fluro.global.json) {
    			this.$fluro.global.json(this.item);
    		}
    	}
    },
    computed: {
        author() {

            var item = this.item;

            if(item.user && item.user._id) {
                return {
                    title:item.user.name,
                    type:'user',
                    ...item.user,
                }
            }

            if(item.managedUser && item.managedUser._id) {
                return {
                    type:'persona',
                    ...item.managedUser,
                }
            }
        }
    }
}
</script>
<style lang="scss">
.log-timeline-entry {
    padding: 10px;
    font-style: italic;
    font-size: 0.8em;
    color: rgba(#000, 0.5);
}
</style>