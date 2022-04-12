<template>
	<div class="timeline-entry timeline-post">
		<fluro-realm-bar :realm="item.realms" />
		<v-layout>
			<v-flex shrink>
				<v-container pa-2>
					<fluro-avatar md v-if="item.author" :id="item.author" type="user" />
					<fluro-avatar md v-else-if="item.managedAuthor" :id="item.managedAuthor" type="persona" />
					<div class="timeline-icon" v-else>
						<fluro-icon type="post" />
					</div>
				</v-container>
			</v-flex>
			<v-flex>
				<v-container pa-2 class="border-bottom">
					<v-layout>
						<v-flex>
							<strong>{{ title }}</strong>
							<div class="datestring">{{ datestring }}</div>
						</v-flex>
						<v-flex shrink>
							<v-btn class="ma-0" icon small @click.stop.prevent="$actions.open([item])">
								<fluro-icon icon="ellipsis-h" />
							</v-btn>
							<v-btn class="ma-0" icon small @click.stop.prevent="$fluro.global.edit(item, true)">
								<fluro-icon icon="pencil" />
							</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
				<v-container pa-2>
					<!-- <div>{{item.state}}</div> -->
					<!-- <div v-if="item.data.body">{{item.data.body}}</div> -->
					<div v-if="item.body">{{ item.body }}</div>
					<fluro-content-render :fields="definedFields" v-model="item.data" />
					<!-- <pre>{{item}}</pre> -->
					<!-- <div class="summary">{{summary}}</div> -->
				</v-container>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import FluroContentRender from '../../../../FluroContentRender.vue';
import FluroAvatar from '../../../../FluroAvatar.vue';
import FluroRealmBar from '../../../../ui/FluroRealmBar.vue';

export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	components: {
		FluroContentRender,
		FluroAvatar,
		FluroRealmBar,
	},
	computed: {
		definedFields() {
			if (!this.item || !this.item.fullDefinition) {
				return [];
			}
			return this.item.fullDefinition.fields;
		},
		author() {
			if (this.item.author && this.item.author.name) {
				return this.item.author.name;
			}

			if (this.item.managedAuthor && this.item.managedAuthor.title) {
				return this.item.managedAuthor.title;
			}

			return 'Someone';
		},
		definitionTitle() {
			return this.$fluro.types.readable(this.item.definition, false, 'post');
		},
		title() {
			if (!this.item.author && !this.managedAuthor && this.item.title) {
				return this.item.title;
			}

			if (this.item.family) {
				return `${this.author} posted a ${this.definitionTitle} linked to the family household`;
			}
			return `${this.author} posted a ${this.definitionTitle}`;
		},
		datestring() {
			return `${this.$filters.formatDate(this.item.created, 'h:mma')} - ${this.$filters.formatDate(
				this.item.created,
				'dddd D MMM YYYY'
			)} - ${this.$filters.timeago(this.item.created)} `;
		},
		//     summary() {

		//         switch (this.item.state) {
		//             case 'sent':
		//                 return `Sent to ${this.item.email} - ${this.$filters.formatDate(this.item.date, 'hh:mma')}`;
		//                 break;
		//             case 'click':
		//                 return `Clicked`;
		//                 break;
		//             case 'open':
		//                 return `Read / Opened`;
		//                 break;
		//             case 'error':
		//                 return `Error sending to ${this.item.email}`;
		//                 break;
		//             default:
		//                 break;

		//         }
		//     }
	},
};
</script>
<style lang="scss">
.datestring {
	font-size: 0.8em;
	opacity: 0.5;
}

.timeline-post {
	// & >>> {
	.fluro-content-render-field {
		font-size: 0.9em;
		width: 50%;
		float: left;
		// border: 10px solid #ff0066;
	}

	// }
}
</style>
