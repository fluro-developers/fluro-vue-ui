<template>
    <div>
        <fluro-page-preloader v-if="loading" contain />
        <fluro-panel>
            <fluro-panel-title>
                <h5>Guest List</h5>
            </fluro-panel-title>
            <fluro-panel-body class="border-bottom">
                <v-layout>
                    <v-flex>
                        <search-input v-model="search" />
                    </v-flex>
                    <!-- <div> -->
                        <!-- <v-btn @click="push()" color="primary" class="ma-0 ml-2">Push -->
                            <!-- <fluro-icon icon="plus" right /> -->
                        <!-- </v-btn> -->
                    <!-- </div> -->
                </v-layout>
            </fluro-panel-body>
            <tabset :justified="true">
                <tab :heading="`${segment.contacts.length} ${segment.title}`" v-for="segment in segments">
                    <v-container pa2 class="border-bottom" v-if="segments.length <= 1">
                        <h3 margin>{{segment.contacts.length}} {{segment.title}}</h3>
                    </v-container>
                    <fluro-table trackingKey="_id" defaultSort="firstName" :pageSize="35" style="max-height:50vh;" :items="segment.contacts" :columns="columns" />
                </tab>
            </tabset>
        </fluro-panel>
    </div>
</template>
<script>
import SearchInput from '../../ui/SearchInput.vue';
import AvatarCell from '../../table/cells/AvatarCell.vue';
import FluroTable from '../../table/FluroTable.vue';

export default {
    components: {
        SearchInput,
        AvatarCell,
        FluroTable,
    },
    props: {
        event: {
            type: [Object, String],
        }
    },
    watch:{
    	search:_.debounce(function(v) {
    		this.debouncedSearch = v;
    	}, 300),
    },
    data() {
        return {
        	search:'',
        	debouncedSearch:'',
            loading: true,
            columns: [{
                    title: '',
                    key: '_id',
                    renderer: AvatarCell,
                    align: 'center',
                },
                {
                    title: 'First Name',
                    key: 'firstName',
                },
                {
                    title: 'Last Name',
                    key: 'lastName',
                },
                {
                    title: 'Age',
                    key: 'age',
                },
                {
                    title: 'Gender',
                    key: 'gender',
                },
                // {
                //     title: 'State',
                //     key: 'state',
                //     renderer: StatusCell,
                // },
                // {
                //     title: 'Info',
                //     key: 'correspondenceID',
                //     renderer: InfoCell,
                // },
            ],
        }
    },
    computed: {
    	filtered() {
    		var self = this;
    		var filtered = self.guests;

    		if(self.debouncedSearch && self.debouncedSearch.length) {
    			filtered = _.filter(filtered, function(item) {
    				return _.includes(item.searchString, self.debouncedSearch);
    			})
    		}

    		return filtered;
    	},
        segments() {
            return _.chain(this.filtered)
                .reduce(function(set, guest) {

                    if (guest.attendance.guestExpected) {
                        set['expected'].contacts.push(guest);
                    }

                    if (guest.attendance.guestConfirmed) {
                        set['confirmed'].contacts.push(guest);
                    }

                    if (guest.attendance.guestDeclined) {
                        set['declined'].contacts.push(guest);
                    }

                    if (guest.attendance.ticket) {
                        set['ticket'].contacts.push(guest);
                    }

                    if (guest.attendance.checkin) {
                        set['checkin'].contacts.push(guest);
                    } else {
                        set['absent'].contacts.push(guest);
                    }

                    return set;
                }, {

                  
                    expected: {
                        title: 'Expected',
                        contacts: []
                    },
                    confirmed: {
                        title: 'RSVP Yes',
                        contacts: []
                    },
                    declined: {
                        title: 'RSVP No',
                        contacts: []
                    },
                    ticket: {
                        title: 'Tickets',
                        contacts: []
                    },
                    checkin: {
                        title: 'Checked In',
                        contacts: []
                    },
                    absent: {
                        title: 'Not Checked In',
                        contacts: []
                    },
                })
                .values()
                .filter(function(segment) {
                	return segment.contacts.length;
                })
                .value();
        },
        eventID() {
            return this.$fluro.utils.getStringID(this.event);
        },
    },
    asyncComputed: {
        guests: {
            default: [],
            get() {
                var self = this;
                self.loading = true;

                return new Promise(function(resolve, reject) {

                    return self.$fluro.api.get(`/event/${self.eventID}/guestlist`).then(function(res) {

                            var results = _.map(res.data, function(item) {
                            	item.searchString = String(`${item.title} ${item.firstName} ${item.lastName} ${item.preferredName} ${item.lastName} ${item.age} ${item.gender}`).toLowerCase()	
                            	return item;
                            });

                            resolve(results);
                            self.loading = false;

                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;
                        });
                })
            },
        },
    },
}
</script>
<style lang="scss">
</style>