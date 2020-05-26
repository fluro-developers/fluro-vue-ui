<template>
				<flex-column class="chatbox">
								<div class="notconnected" v-if="notConnected">
												<slot name="notconnected">
												</slot>
								</div>
								<flex-column-header class="chatbox-header">
												<slot name="header"></slot>
								</flex-column-header>
								<flex-column center>
												<div class="spinner" v-if="initializing" style="text-align:center">
																<v-progress-circular indeterminate color="rgba(180,180,180,0.5)" />
												</div>
												<flex-column-body v-else class="chatbox-body" ref="body">
																<div class="message-container">
																				<div class="paragraph" :class="{self:paragraph.self}" :key="paragraph._id" v-for="paragraph in feed">
																								<!-- <pre>{{paragraph}}</pre> -->
																								<div class="avatar-column">
																												<div class="avatar">
																																<img :src="paragraph.author.avatarUrl" v-if="paragraph.author.avatarUrl" />
																																<span v-else class="placeholder" :style="{backgroundColor:paragraph.author.color}">{{paragraph.author.nickName[0]}}</span>
																												</div>
																								</div>
																								<div class="text">
																												<div class="chat-name">
																																<strong>{{paragraph.author.nickName}}</strong>
																																<div class="chat-time">{{paragraph.date | timeago}}</div>
																												</div>
																												<div class="messages">
																																<div class="message-entry" :key="message._id" v-for="message in paragraph.messages">
																																				<div class="message">{{message.message}}</div>
																																</div>
																												</div>
																								</div>
																				</div>
																</div>
												</flex-column-body>
								</flex-column>
								<flex-column-footer class="chatbox-footer" v-if="conversationID">
												<v-layout align-center>
																<v-flex>
																				<textarea ref="textarea" @input="updateTextAreaSize" @keyup.enter="sendMessage($event)" v-model="proposed.message" placeholder="Type your message and press enter..."></textarea>
																</v-flex>
																<v-flex shrink style="padding-left:10px">
																				<v-btn icon class="ma-0" @click="sendMessage($event)" style="margin-left:10px;">
																								<fluro-icon :icon="sending ?  'spinner-thirds' : `paper-plane`" :spin="sending" />
																				</v-btn>
																</v-flex>
												</v-layout>
												<slot name="footer">
												</slot>
								</flex-column-footer>
				</flex-column>
</template>
<script>
import _ from 'lodash';

export default {
				props: {
								value: {
												type: Object,
												default () {
																return {}
												}
								},
								nickName: {
												type: String,
												default () {
																var user = this.user;
																var nickName = '';
																if (user && user.firstName) {
																				return user.firstName;
																}
												}
								},
								conversation: {
												type: [String, Object],
												// default () {
												//     return '5e97a80ecd657984f8a37a62';
												// }
								}
				},
				mounted() {
								this.mount();
				},
				beforeDestroy() {
								this.unmount();
				},
				activated() {
								this.mount();
				},
				deactivated() {
								this.unmount();
				},
				data() {
								return {
												sending: false,
												empty: true,
												feed: [],
												chatCache: 0,
												cacheBuster: null,
												proposed: {},
												timer: null,
												loadingConversation: false,
												conversationJoined:false,
								}
				},
				watch: {
								chatCache: 'reloadConversation',
								conversationCheckString: 'init',
				},
				computed: {
								notConnected() {
												return !this.conversationJoined;
								},
								initializing() {
												return this.loadingConversation && !this.feed.length;
								},
								conversationCheckString() {
												return this.conversationID + this.nickName;
								},
								conversationUrl() {
												return `/chat/${this.conversationID}`;

								},
								conversationID() {
												return this.$fluro.utils.getStringID(this.conversation);
								}
				},
				methods: {
								mount() {
												this.init();
								},
								unmount() {
												this.unsubscribe();
								},
								init() {

												var id = this.conversationID;

												if (id) {
																this.joinConversation();
												} else {
																this.leaveConversation();
												}
								},
								reloadConversation() {

												var self = this;

												if (!self.conversationID) {
																return;
												}

												if (self.loadingConversation) {
																return;
												}

												self.loadingConversation = true;

												//////////////////////////////////////////////

												var promise = self.$fluro.api.get(`/chat/${self.conversationID}/feed?=${self.chatCache}`, {
																cache: false
												});

												promise.then(function(res) {
																				self.loadingConversation = false;
																				var thread = res.data;
																				if (!thread || !thread.users) {
																								return;
																				}

																				self.mapConversation(thread);
																})
																.catch(function(err) {
																				self.loadingConversation = false;
																				console.log('Error', err);
																})

												return promise;
								},
								poll() {
												this.reloadConversation();
								},

								subscribe() {
												if (this.timer) {
																return;
												}

												this.timer = setInterval(this.poll, 3000);
								},
								unsubscribe() {
												if (this.timer) {
																clearInterval(this.timer);
																this.timer = null;
												}
								},
								scrollToBottom(force) {
												var self = this;
												var element = self.$refs.body;

												if (!element) {
																return;
												}

												element = element.$el;

												//////////////////////////////////////

												if (force === true) {
																//Force scrolling to bottom
												} else {
																var currentScroll = element.scrollTop;
																var availableScroll = element.scrollHeight - element.clientHeight;
																if ((availableScroll - currentScroll) > 50) {
																				return;
																}
												}

												//////////////////////////////////////

												if (!self.feed || !self.feed.length) {
																return;
												}

												//////////////////////////////////////



												self.$nextTick(function() {


																if (!element) {
																				return;
																}



																if (self.empty || force === true) {
																				self.empty = false;
																				element.scrollTop = element.scrollHeight;
																				return
																}


																//Smooth animation
																element.scrollTo({
																				top: element.scrollHeight,
																				left: 0,
																				behavior: 'smooth'
																});
												})
								},
								mapConversation(thread) {

												var self = this;
												//Get the user lookup table
												var lookup = thread.users;
												var selfID = thread.authorID;

												var array = _.chain(thread.messages)
																.reduce(function(set, message) {
																				var authorID = message.authorID;

																				//Get the last item in the set
																				var previousParagraph = _.last(set);

																				if (previousParagraph) {
																								if (previousParagraph.authorID == authorID) {
																												previousParagraph.messages.push(message);
																												return set;
																								}
																				}

																				// console.log('SELF ID', selfID, authorID)
																				///////////////////////////////////

																				//Create a new paragraph
																				var paragraph = {
																								_id: message._id, //use the first message
																								authorID,
																								date: message.created,
																								author: lookup[authorID],
																								messages: [message],
																								self: (selfID == authorID),
																				}

																				//Insert the paragraph
																				set.push(paragraph);

																				return set;


																}, [])
																.value();

												///////////////////

												//console.log('Feed updated', array[array.length - 1]);
												self.feed = array;
												self.scrollToBottom();
								},
								leaveConversation() {
												this.unsubscribe();
												this.feed = [];
												this.conversationJoined = false;

								},
								joinConversation() {

												var self = this;

												//We're already joined the conversation
												if (self.conversationJoined) {
																console.log('Already joined')
																return;
												}



												//We're already joined the conversation
												if (!self.conversationID) {
																console.log('No conversation id specified')
																return;
												}


												if (!self.nickName) {
																console.log('No nickname')
																return;
												}

												///////////////////////////////////////

												return self.$fluro.api.post(`${self.conversationUrl}/join`, {
																				nickName: self.nickName,
																})
																.then(function(res) {
																				//console.log('Joined the conversation!', res);
																				self.conversationJoined = true;
																				self.subscribe();
																})

								},
								updateTextAreaSize($event) {

												var target = this.$refs.textarea;
												if (!target) {
																return;
												}

												if (target.value && target.value.length) {
																target.style.minHeight = 0;
																target.style.minHeight = Math.min(150, target.scrollHeight) + 'px';
												} else {
																target.style.minHeight = 0;
												}
								},
								sendMessage($event) {

												var self = this;

												console.log('Send MEssage!!!', $event);

												if ($event) {
																if ($event.shiftKey) {
																				return;
																}

																$event.preventDefault();
																$event.stopPropagation();
												}


												self.sending = true;


												var message = self.proposed.message;
												//console.log('Send Message!', message)

												self.proposed.message = ''
												self.updateTextAreaSize();

												self.$fluro.api.post(`${self.conversationUrl}`, {
																				message,
																}).then(function(res) {
																				console.log('Posted!', res.data);
																				self.chatCache++;
																				self.scrollToBottom();
																				self.proposed.message = ''
																				self.updateTextAreaSize();
																				self.sending = false;


																})
																.catch(function(err) {
																				self.sending = false;
																})
								},
				}
}

</script>
<style scoped lang="scss">
.chatbox {
				position: relative;

				.notconnected {
								display: flex;
								align-items: center;
								justify-content: center;
								position: absolute;
								;
								left: 0;
								bottom: 0;
								right: 0;
								top: 0;
								backdrop-filter: blur(4px);
								z-index: 6;
				}
}

.paragraph {
				border-radius: 4px;
				padding: 5px 10px 10px;
				//font-size: 0.9em;
				//border-radius:5px;
				//margin:5px;
				//background: #eee;
				display: flex;

				.chat-name {
								display: flex;
								align-items: center;
				}

				strong {
								flex: 1;
								display: block;
				}

				.chat-time {
								opacity: 0;
								flex: none;
								// text-align: right;
								font-size: 10px;
				}

				&:nth-child(odd) {
								background: rgba(#000, 0.02);
				}

				&:hover {
								//background: rgba(#000, 0.04);

								.chat-time {
												opacity: 0.5;
								}
				}



				.avatar-column {
								flex: none;
								width: 40px;
								padding: 4px 10px 4px 0;

								overflow: hidden;

								.placeholder {
												display: block;
												height: 0;
												padding-bottom: 100%;
												background: rgba(#000, 0.1);
												border-radius: 5px;
												text-align: center;
												text-transform: uppercase;
												letter-spacing: 0.1em;
												line-height: 30px;
												color: #fff;
								}

								img {
												width: 100%;
												height: auto;
												border-radius: 5px;
								}
				}

				.text {
								flex: 1;
				}

				.messages {
								padding-right: 10px;
				}

				.message {
								// font-size: 0.9em;
								text-align: left;
								opacity: 0.9;
								white-space: pre-line;
								margin-bottom: 2px;
				}


}

$message-radius: 20px;

.casual {

				.avatar-column {
								padding-top: 0;
				}

				.avatar {
								border-radius: 100%;
								overflow: hidden;
								width: 34px;
								height: 34px;
								display: block;
								vertical-align: bottom;
								;
				}

				.paragraph {
								background: none !important;
				}

				.message {

								line-height: 24px;
								background: #e9ebee;
								color: #1c1e21;
								padding: 5px 15px;
								border-radius: 0.3em $message-radius $message-radius 0.3em;
								display: inline-block;
								// font-weight: 500;
				}

				.message-entry:last-child .message {
								border-bottom-left-radius: $message-radius;
				}

				.message-entry:first-child .message {
								border-top-left-radius: $message-radius;
				}

				.message-entry:only-child .message {
								border-radius: $message-radius;
				}

				.messages {
								padding-right: 10%;
				}

				.self {

								.avatar,
								.chat-name {
												display: none;
								}

								.messages {
												padding-left: 10%;
												padding-right: 10px;
								}

								.message-entry {
												text-align: right;

								}

								.message {
												background: #09f;
												color: #fff;

												border-radius: $message-radius 0.3em 0.3em $message-radius;
								}

								.message-entry:last-child .message {
												border-bottom-right-radius: $message-radius;
								}

								.message-entry:first-child .message {
												border-top-right-radius: $message-radius;
								}

								.message-entry:only-child .message {
												border-radius: $message-radius;
								}




				}


}

.chatbox-body {
	width:100%;
}


.chatbox-footer {
				border-top: 1px solid rgba(#000, 0.1);
				padding: 10px;



				textarea {
								max-height: 150px;
								overflow: auto;
								resize: none;
								outline: none;
								border: none;
								width: 100%;
								display: block;
								border-radius: 5px;
								background-color: rgba(#000, 0.05);
								color: inherit;
								padding: 0 5px;
								height: 30px;
								border: 1px solid rgba(#000, 0.1);
								line-height: 30px;

								&:focus {
												// background-color: rgba(#000, 0.05);
												border: 1px solid transparent;
								}


				}



}

</style>
