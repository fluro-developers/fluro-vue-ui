<template>
  <flex-column class="chatbox">
	<div v-if="notConnected" class="notconnected">
	  <v-progress-circular v-if="joining" indeterminate color="rgba(180,180,180,0.5)" />
	  <slot name="notconnected" v-else />
	</div>
	<flex-column-header class="chatbox-header">
	  <slot name="header" />
	</flex-column-header>
	<flex-column center>
	  <div class="spinner" v-if="initializing" style="text-align:center">
		<v-progress-circular indeterminate color="rgba(180,180,180,0.5)" />
	  </div>
	  <flex-column-body v-else class="chatbox-body" ref="body">
		<div class="message-container">
		  <div
			class="paragraph"
			:class="[{self:paragraph.self}, paragraph.context]"
			:key="paragraph._id"
			v-for="paragraph in feed"
		  >
			<!-- <pre>{{paragraph}}</pre> -->
			<div class="avatar-column">
			  <div class="avatar">
				<img :src="paragraph.author.avatarUrl" v-if="paragraph.author.avatarUrl" />
				<span
				  v-else
				  class="placeholder"
				  :style="{backgroundColor:paragraph.author.color}"
				>{{paragraph.author.nickName[0]}}</span>
			  </div>
			</div>
			<div class="text">
			  <div class="chat-name">
				<strong>{{paragraph.author.nickName}}</strong>
				<div class="chat-time">{{paragraph.date | timeago}}</div>
			  </div>
			  <div class="messages">
				<div
				  class="message-entry"
				  :class="{deleted:message.deleted, approved:message.approved, highlight:message.highlight, internal:message.internal}"
				  :key="message._id"
				  v-for="message in paragraph.messages"
				>
				  <v-layout align-center v-if="options.moderator">
					<v-flex>
					  <div class="message">{{message.message}}</div>
					</v-flex>
					<v-flex shrink>
					  <div class="buttons">
						<a
						  class="message-link"
						  :class="{active:message.approved}"
						  @click="toggleApproval(message)"
						>
						  <fluro-icon
							:library="message.approved ? 'fas' : 'far'"
							icon="check-circle"
						  />
						</a>
						<a
						  class="message-link"
						  :class="{active:message.highlight}"
						  @click="toggleAttribute(message, 'highlight')"
						>
						  <fluro-icon :library="message.highlight ? 'fas' : 'far'" icon="star" />
						</a>
						<a class="message-link" @click="deleteMessage(message)">
						  <fluro-icon icon="trash-alt" />
						</a>
					  </div>
					</v-flex>
				  </v-layout>
				  <div class="message" v-else>{{message.message}}</div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </flex-column-body>
	</flex-column>
	<template v-if="conversationID">
	  <!-- <flex-column-footer class="chatbox-footer" v-if="options.moderator">
<tabset>
<tab></tab>
</tabset>
	  </flex-column-footer>-->
	  <flex-column-footer class="chatbox-footer" :class="mode">
		<div class="mode-links" v-if="options.moderator">
		  <a @click="mode = 'message'" :class="{active:mode == 'message'}">Reply</a>
		  <a @click="mode = 'internal'" :class="{active:mode == 'internal'}">Note</a>
		</div>
		<v-layout align-center>
		  <v-flex>
			<textarea
			  ref="textarea"
			  @input="updateTextAreaSize"
			  @keyup.enter="sendMessage($event)"
			  v-model="proposed.message"
			  :placeholder="placeholder"
			></textarea>
		  </v-flex>
		  <v-flex shrink style="padding-left:10px" v-if="internalEnabled">
			<v-btn icon class="ma-0" @click="sendInternal($event)" style="margin-left:10px;">
			  <fluro-icon :icon="sending ?  'spinner-thirds' : `paper-plane`" :spin="sending" />
			</v-btn>
		  </v-flex>
		  <v-flex shrink style="padding-left:10px">
			<v-btn icon class="ma-0" @click="sendMessage($event)" style="margin-left:10px;">
			  <fluro-icon :icon="sending ?  'spinner-thirds' : `paper-plane`" :spin="sending" />
			</v-btn>
		  </v-flex>
		</v-layout>
		<slot name="footer" />
	  </flex-column-footer>
	</template>
  </flex-column>
</template>
</flex-column>
</template>
</flex-column>
</template>
<script>
import _ from "lodash";

export default {
  props: {
	filter: {
	  type: Function,
	},
	options: {
	  type: Object,
	  default() {
		return {};
	  },
	},
	value: {
	  type: Object,
	  default() {
		return {};
	  },
	},
	nickName: {
	  type: String,
	  default() {
		var user = this.user;
		var nickName = "";
		if (user && user.firstName) {
		  return user.firstName;
		}
	  },
	},
	conversation: {
	  type: [String, Object],
	  // default () {
	  //     return '5e97a80ecd657984f8a37a62';
	  // }
	},
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
	  messageFilter: this.filter,
	  thread: {},
	  socketChannel: null,
	  mode: "message",
	  joining: false,
	  sending: false,
	  empty: true,
	  feed: [],
	  chatCache: 0,
	  cacheBuster: null,
	  proposed: {},
	  timer: null,
	  loadingConversation: false,
	  conversationJoined: false,
	};
  },
  watch: {
	filter(f) {
	  this.messageFilter = f;
	  this.mapConversation(this.thread);
	},

	chatCache: "reloadConversation",
	conversationCheckString: "init",
  },
  computed: {
	placeholder() {
	  return this.mode === "internal" ? `Type your internal note and press enter...` : `Type your message and press enter...`;
	},
	internalEnabled() {
	  return this.options.internalEnabled;
	},
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
	},
  },
  methods: {
	toggleApproval(message) {
	  this.toggleAttribute(message, "approved");
	},
	toggleAttribute(message, attribute) {
	  if (message[attribute]) {
		this.removeAttribute(message, attribute);
	  } else {
		this.addAttribute(message, attribute);
	  }
	},
	removeAttribute(message, attribute) {
	  var self = this;

	  var change = {};
	  change[attribute] = false;
	  self.$fluro.api
		.put(`/chat/${this.conversationID}/${message._id}`, change)
		.then(function () {
		  self.$set(message, attribute, false);
		});
	},
	addAttribute(message, attribute) {
	  var self = this;
	  var change = {};
	  change[attribute] = true;
	  self.$fluro.api
		.put(`/chat/${this.conversationID}/${message._id}`, change)
		.then(function () {
		  self.$set(message, attribute, true);
		});
	},
	highlightMessage(message) {
	  console.log("Highlight MESSAGE", message);

	  var self = this;
	  self.$fluro.api
		.put(`/chat/${this.conversationID}/${message._id}`, {
		  highlight: true,
		})
		.then(function () {
		  self.$set(message, "highlight", true);
		});
	},
	deleteMessage(message) {
	  // console.log('DELETE MESSAGE', message);

	  var self = this;
	  self.$fluro.api
		.put(`/chat/${this.conversationID}/${message._id}`, {
		  deleted: true,
		})
		.then(function () {
		  self.$set(message, "deleted", true);
		});
	},
	mount() {
	  console.log("chatbox mounted");
	  var self = this;
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
	reloadConversation: _.debounce(function (forceScroll) {
	  var self = this;

	  if (!self.conversationID) {
		return;
	  }

	  if (self.loadingConversation) {
		return;
	  }

	  self.loadingConversation = true;

	  //////////////////////////////////////////////

	  var url = `/chat/${self.conversationID}/feed?=${self.chatCache}`;

	  if (self.options.moderator) {
		url = `/chat/${self.conversationID}/feed?m=true&cb=${self.chatCache}`;
	  }
	  var promise = self.$fluro.api.get(url, {
		cache: false,
	  });

	  promise
		.then(function (res) {
		  self.loadingConversation = false;
		  self.thread = res.data;
		  if (!self.thread || !self.thread.users) {
			return;
		  }

		  self.mapConversation(self.thread);

		  if (forceScroll) {
			self.$nextTick(function () {
			  console.log("Force scroll to bottom");
			  self.scrollToBottom(true);
			});
		  }
		})
		.catch(function (err) {
		  self.loadingConversation = false;
		  console.log("Error", err);
		});

	  return promise;
	}, 400),

	socketUpdate(event) {
	  console.log("socket message received", event);
	  this.reloadConversation();
	},
	poll() {
	  console.log("poll");
	  this.reloadConversation();
	},

	subscribe() {
	  var self = this;

	  ////////////////////////////

	  self.reloadConversation(true);

	  ////////////////////////////

	  var POLL_FREQUENCY = 3000;

	  ////////////////////////////

	  var userID;

	  var currentUser = self.$fluro.auth.getCurrentUser();
	  if (currentUser) {
		userID = currentUser._hid;
		console.log("We tune in as the current user", userID);
	  } else {
		if (self.application) {
		  userID = self.$fluro.utils.getStringID(self.application);
		  console.log("We tune in as the current application", userID);
		} else {
			console.log('No application specified')
		}
	  }

	  if (!userID) {
		console.log("User is unknown");
		return;
	  }

	  ////////////////////////////

	  if (self.$socket) {
		console.log("socket channel");
		self.socketChannel = self.$socket.channel(userID, self.conversationID);
		self.socketChannel.on("message.create", self.socketUpdate);
		self.socketChannel.on("message.update", self.socketUpdate);
		POLL_FREQUENCY = 20000;

		// console.log('subscribe > $socket', self)
		// 5e96df4bcd657984f80d1649
		// self.$socket.client.emit("subscribe", {
		//     room: self.conversationID,
		// });

		// // console.log('SOCKET SUBSCRIBE', self.$socket, self.conversationID)

		// // self.$socket.$subscribe(self.conversationID, self.socketUpdate);
		// self.$socket.$subscribe('message.update', self.socketUpdate);
		// self.$socket.$subscribe('message.create', self.socketUpdate);
	  } else {
		console.log("No $socket");
	  }

	  ////////////////////////////

	  if (self.timer) {
		return;
	  }

	  self.timer = setInterval(self.poll, POLL_FREQUENCY);
	},
	unsubscribe() {
	  var self = this;

	  if (self.socketChannel) {
		self.socketChannel.disconnect();
	  }

	  // if (self.$socket) {
	  //     self.$socket.$unsubscribe('message.update');
	  //     self.$socket.$unsubscribe('message.create');
	  // }

	  if (self.timer) {
		clearInterval(self.timer);
		self.timer = null;
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
		if (availableScroll - currentScroll > 50) {
		  return;
		}
	  }

	  //////////////////////////////////////

	  if (!self.feed || !self.feed.length) {
		return;
	  }

	  //////////////////////////////////////

	  self.$nextTick(function () {
		if (!element) {
		  return;
		}

		if (self.empty || force === true) {
		  self.empty = false;
		  element.scrollTop = element.scrollHeight;
		  return;
		}

		//Smooth animation
		element.scrollTo({
		  top: element.scrollHeight,
		  left: 0,
		  behavior: "smooth",
		});
	  });
	},
	mapConversation(thread) {
	  var self = this;
	  //Get the user lookup table
	  var lookup = thread.users;
	  var selfID = thread.authorID;

	  var messages = thread.messages;

	  if (self.messageFilter) {
		messages = self.messageFilter(messages);
	  }

	  var array = _.chain(messages)
		.reduce(function (set, message) {
		  var context = message.internal ? "internal" : "default";
		  var authorID = message.authorID;

		  //Get the last item in the set
		  var previousParagraph = _.last(set);

		  if (previousParagraph) {
			if (previousParagraph.authorID == authorID) {
			  if (previousParagraph.context == context) {
				previousParagraph.messages.push(message);
				return set;
			  }
			}
		  }

		  // console.log('SELF ID', selfID, authorID)
		  ///////////////////////////////////

		  //Create a new paragraph
		  var paragraph = {
			_id: message._id, //use the first message
			authorID,
			context,
			date: message.created,
			author: lookup[authorID],
			messages: [message],
			self: selfID == authorID,
		  };

		  //Insert the paragraph
		  set.push(paragraph);

		  return set;
		}, [])
		.value();

	  ///////////////////

	  //console.log('Feed updated', array[array.length - 1]);
	  self.feed = array;
	  self.$emit("thread", thread);
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
		console.log("Already joined");
		return;
	  }

	  //We're already joined the conversation
	  if (!self.conversationID) {
		console.log("No conversation id specified");
		return;
	  }

	  if (!self.nickName) {
		console.log("No nickname");
		return;
	  }

	  self.joining = true;
	  console.log('joining')

	  ///////////////////////////////////////

	  return self.$fluro.api
		.post(`${self.conversationUrl}/join`, {
		  nickName: self.nickName,
		})
		.then(function (res) {
		console.log('Joined the conversation!', res);
		  self.conversationJoined = true;
		  self.subscribe();
		  self.joining = false;
		})
		.catch(function (err) {
		  self.joining = false;
		});
	},
	updateTextAreaSize($event) {
	  var target = this.$refs.textarea;
	  if (!target) {
		return;
	  }

	  if (target.value && target.value.length) {
		target.style.minHeight = 0;
		target.style.minHeight = Math.min(150, target.scrollHeight) + "px";
	  } else {
		target.style.minHeight = 0;
	  }
	},
	sendInternal() {
	  var self = this;
	  self.sending = true;
	  var message = self.proposed.message;

	  self.proposed.message = "";
	  self.updateTextAreaSize();

	  //Mark as internal
	  message.internal = true;

	  self.$fluro.api
		.post(`${self.conversationUrl}`, {
		  message,
		})
		.then(function (res) {
		  // console.log('Posted!', res.data);
		  self.chatCache++;
		  self.scrollToBottom();
		  self.proposed.message = "";
		  self.updateTextAreaSize();
		  self.sending = false;
		})
		.catch(function (err) {
		  self.sending = false;
		});
	},
	sendMessage($event) {
	  var self = this;

	  if ($event) {
		if ($event.shiftKey) {
		  return;
		}

		$event.preventDefault();
		$event.stopPropagation();
	  }

	  self.sending = true;

	  var message = self.proposed.message;

	self.proposed.message = "";
	  self.updateTextAreaSize();

	  self.$fluro.api
		.post(`${self.conversationUrl}`, {
		  internal: self.mode == "internal",
		  message,
		})
		.then(function (res) {
		  //console.log('Posted!', res.data);
		  self.chatCache++;
		  self.scrollToBottom();
		  self.proposed.message = "";
		  self.updateTextAreaSize();
		  self.sending = false;
		})
		.catch(function (err) {
		  self.sending = false;
		});
	},
  },
};
</script>
<style scoped lang="scss">
.chatbox {
  position: relative;

  .notconnected {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	top: 0;
	backdrop-filter: blur(4px);
	z-index: 6;
  }
}

.message-entry {
  .buttons {
	display: flex;
	white-space: nowrap;
	overflow: hidden;
  }

  .message-link {
	opacity: 0.2;
	font-size: 10px;
	display: block;
	flex: 1;
	text-align: center;
	margin: 0 2px;
	color: inherit;
  }

  &:hover .message-link {
	opacity: 0.5;
  }

  .message-link:hover,
  .message-link.active {
	opacity: 1 !important;
  }

  &.deleted {
	opacity: 0.5;
	text-decoration: line-through;
	font-size: 10px;
	font-style: italic;
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

  &.internal {
	background: #fbe593;
	color: #7d5415;
  }

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
	&.default {
	  background: rgba(#000, 0.02);
	}
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

  @media (max-width: 600px) {
	.messages {
	  padding-right: 10px;
	}
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
  width: 100%;
}

.chatbox-footer {
  border-top: 1px solid rgba(#000, 0.1);
  padding: 10px;

  .mode-links {
	display: block;

	a {
	  display: inline-block;
	  opacity: 0.5;
	  padding: 5px;
	  color: inherit;

	  &.active {
		opacity: 1;
		font-weight: bold;
	  }
	}
  }

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

  &.internal {
	textarea {
	  background: #fff5c0;
	  color: #674300;
	}
  }
}
</style>
