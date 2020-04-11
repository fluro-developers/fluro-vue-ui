export default {
    asyncComputed: {
        postable: {
            default: [],
            get() {
                var self = this;

                /////////////////////////////////////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.types.subTypes('post')
                        .then(function(res) {

                            var filtered = _.filter(res, function(postType) {
                                var canSubmit = self.$fluro.access.can('submit', postType.definitionName, 'post');
                                var canCreate = self.$fluro.access.can('create', postType.definitionName, 'post');
                                return (canSubmit || canCreate);
                            })

                            resolve(filtered);
                        })
                        .catch(reject);

                });
            }
        },
    },

    computed: {
        canPost() {

        	var self = this;


            return this.postable.length;
        },
        canEmail() {

        	var self = this
        	var contact = self.model || self.item;

            return contact.emails && contact.emails.length;
        },
        canCall() {

        	var self = this;
        	var contact = self.model || self.item;

            return contact.phoneNumbers && contact.phoneNumbers.length;
        },
        canSMS() {

        	var self = this;
        	var contact = self.model || self.item;

            return contact.phoneNumbers && contact.phoneNumbers.length;
        },
    },
    methods: {

    	addPost() {

            console.log('ADD NEW POST')
            var self = this;

            //Load all the types of posts we can create
            return self.$fluro.types.subTypes('post')
                .then(function(definitions) {


                    var mapped = _.chain(definitions)
                        .map(function(def) {

                            // console.log('DEF', def);
                            if (def.status == 'archived') {
                                return;
                            }

                            if (def.systemOnly) {
                                return;
                            }

                            return {
                                title: `New ${def.title}`,
                                definition: def,
                            };
                        })
                        .compact()
                        .value();

                    /////////////////////////////

                    self.$fluro.options(mapped)
                        .then(function(answer) {

                            var options = {
                                definition: answer.definition,
                                items: [self.model],
                            }

                            ///////////////////////////

                            var promise = self.$fluro.modal({
                                component:() => import('../components/ui/modal/AddPost.vue'),
                                options,
                            });



                        })

                });
        },
        communicate(channel) {

            var self = this;
            var contact = self.model || self.item;
            var contactID = self.$fluro.utils.getStringID(contact);


            switch (channel) {
                case 'vcard':


                    var token = self.$fluro.auth.getCurrentToken();

                    window.open(`${self.$fluro.apiURL}/contact/${contactID}/vcard.vcf?access_token=${token}`, '_blank');
                    break;
                case 'phone':
                    // console.log('CALL NOW?', self.model.phoneNumbers)

                    var phoneNumbers = contact.international || contact.phoneNumbers;

                    self.$communications.call(phoneNumbers);
                    break;

                case 'email':
                    // console.log('EMAIL NOW?', contact.emails)


                    self.$communications.email([contact]);
                    break;
                case 'sms':
                    // console.log('SMS NOW?', contact.emails)


                    self.$communications.sms([contact]);
                    break;
            }

        },
    },
}