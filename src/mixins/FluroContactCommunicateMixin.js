import AddPost from '../components/ui/modal/AddPost.vue';
import _ from 'lodash';

export default {
	asyncComputed: {
		postable: {
			default: [],
			get() {
				var self = this;

				/////////////////////////////////////////////////////////////////

				return new Promise(function (resolve, reject) {
					return self.$fluro.types
						.subTypes('post')
						.then(function (res) {
							var filtered = _.filter(res, function (postType) {
								var canSubmit = self.$fluro.access.can('submit', postType.definitionName, 'post');
								var canCreate = self.$fluro.access.can('create', postType.definitionName, 'post');
								return canSubmit || canCreate;
							});

							resolve(filtered);
						})
						.catch(reject);
				});
			},
		},
	},

	computed: {
		phoneNumbers() {
			var self = this;
			var contact = self.model || self.item;

			var array = [];

			if (contact.phoneNumbers && contact.phoneNumbers.length) {
				array = array.concat(contact.phoneNumbers);
			}

			if (contact.family && contact.family.phoneNumbers && contact.family.phoneNumbers.length) {
				array = array.concat(contact.family.phoneNumbers);
			}

			return array;
		},
		canPost() {
			return this.postable.length;
		},
		canEmail() {
			var self = this;
			var contact = self.model || self.item;

			return contact.emails && contact.emails.length;
		},
		canCall() {
			var self = this;

			return self.phoneNumbers && self.phoneNumbers.length;
		},
		canSMS() {
			var self = this;

			var canAccessTextMessages =
				self.$fluro.access.can('create', 'smscorrespondence') || self.$fluro.access.can('sms');
			return canAccessTextMessages;
		},
	},
	methods: {
		addPost() {
			console.log('ADD NEW POST');
			var self = this;

			var target = self.model || self.item;

			//Load all the types of posts we can create
			return self.$fluro.types.subTypes('post').then(function (definitions) {
				var mapped = _.chain(definitions)
					.map(function (def) {
						// console.log('DEF', def);
						if (def.status == 'archived') {
							return null;
						}

						if (def.systemOnly) {
							return null;
						}

						return {
							title: `New ${def.title}`,
							definition: def,
						};
					})
					.compact()
					.value();

				/////////////////////////////

				self.$fluro.options(mapped).then(function (answer) {
					var options = {
						definition: answer.definition,
						items: [target],
					};

					///////////////////////////

					self.$fluro.modal({
						component: AddPost,
						options,
					});
				});
			});
		},
		communicate(channel) {
			var self = this;
			var contact = self.model || self.item;
			var contactID = self.$fluro.utils.getStringID(contact);

			switch (channel) {
				case 'vcard':
					var token = self.$fluro.auth.getCurrentToken();
					if (process.browser) {
						window.open(
							`${self.$fluro.apiURL}/contact/${contactID}/vcard.vcf?access_token=${token}`,
							'_blank'
						);
					}
					break;
				case 'phone':
					// console.log('CALL NOW?', self.model.phoneNumbers)

					var phoneNumbers = contact.international || self.phoneNumbers;

					self.$communications.call(phoneNumbers);
					break;

				case 'email':
					// console.log('EMAIL NOW?', contact.emails)
					var canAccessSimpleEmail = self.$fluro.access.can('create', 'simpleemail');
					if (!canAccessSimpleEmail) {
						return window.open(`mailto:${contact.emails[0]}`);
					}

					self.$communications.email([contact]);
					break;
				case 'sms':
					// console.log('SMS NOW?', contact.emails)
					// var canAccessTextMessages = self.$fluro.access.can('create', 'smscorrespondence') || self.$fluro.access.can('sms');
					// if(!canAccessTextMessages) {
					// 	return window.open(`sms:${contact.phoneNumbers[0]}`);
					// }

					self.$communications.sms([contact]);
					break;
				default:
				// pass
			}
		},
	},
};
