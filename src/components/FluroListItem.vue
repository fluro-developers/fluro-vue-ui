<template>
	<div class="fluro-list-item">
		<!-- <div class="realm-bar" :style="realmStyle" /> -->
		<fluro-realm-bar :realm="item.realms" />
		<!-- <div class="handle" v-if="draggable">
            <v-btn icon flat v-on="on">
                <fluro-icon icon="arrows" />
            </v-btn>
        </div> -->
		<!-- :style="{color:foregroundColor, backgroundColor:backgroundColor}" -->
		<div class="item-icon" :class="item._type">
			<template v-if="item._type == 'persona'">
				<fluro-avatar :id="item._id" type="persona" />
			</template>
			<template v-else-if="item._type == 'contact'">
				<fluro-avatar :id="item._id" type="contact" />
			</template>
			<template v-else-if="item._type == 'image'">
				<fluro-image :item="item" :spinner="true" :width="40" :height="40" />
			</template>
			<template v-else>
				<fluro-icon :type="item._type"></fluro-icon>
			</template>
		</div>
		<component :is="tagType" :to="to" :target="target" :href="href" class="item-text">
			<!-- <router-link :to="to" class="item-text"> -->
			<div>
				<div class="item-title">{{title}}</div>
				<div class="item-subtitle">{{subtitle}}</div>
			</div>
			<!--  <pre>{{subtitle}}</pre>
            <pre>{{item}}</pre> -->
			<!-- </router-link> -->
		</component>
		<!-- <pre>{{actionsEnabled}} {{actions}}</pre> -->
		<slot name="actions" :item="item">
			<div class="item-actions" :class="{active:actionsOpen}" v-if="actionsEnabled">
				<v-menu :left="true" v-model="actionsOpen" :fixed="true" transition="slide-y-transition" offset-y>
					<template v-slot:activator="{ on }">
						<v-btn icon flat v-on="on">
							<fluro-icon v-if="actionsOpen" icon="times" />
							<fluro-icon v-else icon="ellipsis-v" />
						</v-btn>
					</template>
					<v-list dense>
						<v-list-tile @click="action.click" v-for="action in availableActions">
							<v-list-tile-content>{{action.title}}</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</slot>
	</div>
</template>
<script>

import _ from 'lodash';


import FluroRealmBar from './ui/FluroRealmBar.vue';

export default {
	components: {
		FluroRealmBar,
	},
	props: {
		'draggable': {
			default: false,
			type: Boolean,
		},
		'to': {
			type: Object
		},
		'href': {
			type: String
		},
		'target': {
			type: String
		},
		'item': [String, Object],
		'model': {
			type: String,
			default: 'node',
		},
		'actions': {
			type: [Array, Boolean],
			default: function() {
				return [];
			},
		},
		'defaultActions': {
			type: Boolean,
		}
	},
	data() {
		return {
			actionsOpen: false,
			availableActions: this.actions,
		}
	},
	created() {

		var self = this;

		//Get any actions pushed in as props
		var actions = self.actions || [];

		/////////////////////////////////////

		//Get the item we are looking at
		var item = self.item;

		/////////////////////////////////////

		//Check if we can edit this thing
		var canEdit = self.$fluro.access.canEditItem(item);
		var canView = self.$fluro.access.canViewItem(item);
		var canDelete = self.$fluro.access.canDeleteItem(item);

		/////////////////////////////////////

		if (self.defaultActions && self.actions !== false) {


			//If we can edit this thing
			if (canEdit) {
				actions.push({
					title: 'Edit',
					click: function() {
						//Fire
						if (self.$fluro.global.edit) {
							self.$fluro.global.edit(item);
						}
					}
				})
			}

			/////////////////////////////////////

			if (canView) {
				actions.push({
					title: 'View',
					click: function() {
						//Fire
						if (self.$fluro.global.view) {
							self.$fluro.global.view(item);
						}
					}
				})


				///////////////////////////////////////



				switch (item._type) {
					case 'image':

						var url = self.$fluro.asset.getUrl(item);
						actions.push({
							title: 'View Image',
							click: function() {
								if (process.browser) {
									window.open(url)
								}

							}
						})
						break;
					case 'video':
						var url = self.$fluro.asset.imageUrl(item);
						actions.push({
							title: 'Watch Video',
							click: function() {
								if (process.browser) {
									window.open(url)
								}
							}
						})
						break;
					case 'audio':
						var url = self.$fluro.asset.getUrl(item);
						actions.push({
							title: 'Listen',
							click: function() {
								if (process.browser) {
									window.open(url)
								}
							}
						})
						break;
				}

				if (item.assetType == 'upload') {
					var url = self.$fluro.asset.downloadUrl(item);
					actions.push({
						title: 'Download',
						click: function() {
							if (process.browser) {
							window.open(url)
									}
						}
					})
				}
			}

			/////////////////////////////////////

			if (canDelete) {
				actions.push({
					title: 'Delete',
					click: function() {
						//Fire
						if (self.$fluro.global.delete) {
							self.$fluro.global.delete(item);
						}
					}
				})
			}


			/////////////////////////////////////

			self.availableActions = actions;
		}

	},
	computed: {
		primaryRealm() {
			return _.chain(this.item)
				.get('realms')
				.filter(function(realm) {
					return realm.bgColor;
				})
				.last()
				.value();
		},
		foregroundColor() {
			return this.primaryRealm ? this.primaryRealm.color : null;
		},
		backgroundColor() {
			return this.primaryRealm ? this.primaryRealm.bgColor : null;
		},
		actionsEnabled() {
			if (this.actions === false) {
				return false;
			}

			return this.availableActions.length;
		},
		tagType() {
			if (this.to) {
				return 'router-link'
			}

			if (this.href) {
				console.log('HREF', this.href);
				return 'a';
			}

			return 'div'
		},

		realmStyle() {

			var realm = _.chain(this.item)
				.get('realms')
				.compact()
				.filter(function(realm) {
					return realm.bgColor;
				})
				.last()
				.value();

			if (realm) {
				return {
					backgroundColor: realm.bgColor,
				}
			}


		},
		icon() {
			return this.$fluro.types.icon(this.type);
		},
		type() {
			return _.get(this, 'item._type');
		},
		definition() {
			return _.get(this, 'item.definition') || this.type;
		},
		title() {
			return _.get(this, 'item.title');
		},
		firstLine() {
			return _.get(this, 'item.firstLine');
		},
		subtitle() {

			var self = this;
			var item = this.item;
			var pieces = [];

			////////////////////////////////

			switch (item._type) {
				case 'contact':
					return '';
					break;
				case 'event':
					pieces.push(self.$fluro.date.readableEventDate(item));
					if (item.rooms) {
						pieces.push(item.rooms.join(', '));
					}
					break;
				default:
					pieces.push(this.firstLine);
					break;
			}

			// console.log('PIECES', pieces, this);
			////////////////////////////////

			return _.compact(pieces).join('. ');

		}
	}
}

</script>
<style scoped lang="scss">
.fluro-list-item {

	// 1px solid rgba(0, 0, 0, 0.1)
	$border-color: rgba(0, 0, 0, 0.1); //rgba(#000, 0.05);
	display: flex;
	// border-bottom: 1px solid $border-color;
	// border-top: none;
	overflow: hidden;
	position: relative;
	background: #fff;





	user-select: none;
	/* supported by Chrome and Opera */
	-webkit-user-select: none;
	/* Safari */
	-khtml-user-select: none;
	/* Konqueror HTML */
	-moz-user-select: none;
	/* Firefox */
	-ms-user-select: none;
	/* Internet Explorer/Edge */




	.item-actions {
		opacity: 0;

		&.active {
			opacity: 1;
		}
	}

	&:hover {
		.item-actions {
			opacity: 1;
		}
	}

	@media(max-width: 768px) {
		.item-actions {
			opacity: 1;
		}
	}

	&:first-of-type {
		// border-top: 1px solid $border-color;
	}

	&:last-of-type {
		border-bottom: none;
	}


	&.bordered,
	&[bordered] {
		border-top: 1px solid $border-color;
		// border-bottom: 1px solid $border-color;
		border-left: 1px solid $border-color;
		border-right: 1px solid $border-color;

		&:first-of-type {
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}

		&:last-of-type {
			border-bottom-left-radius: 3px;
			border-bottom-right-radius: 3px;
			border-bottom: 1px solid $border-color;

		}
	}

	.realm-bar {
		width: 5px;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		// opacity: 0;
	}

	.handle {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 5px;
		text-align: center;
		line-height: 50px;
		opacity: 0.3;

		&:hover {
			opacity: 1;
		}

	}


	.item-icon {
		flex: none;
		text-align: center;
		padding: 5px;
		width: 50px;
		// line-height: 40px;
		// height: 33px;
		display: flex;
		justify-content: center;
		align-items: center;

		&.image {
			padding: 0 10px;
			// background: rgba(#000, 0.03);
		}
	}

	.item-text {
		flex: 1;
		align-items: center;
		// justify-content: center;
		padding: 8px 15px;
		color: inherit;
		display: flex;
		text-decoration: none;

		.item-title {
			// font-weight: bold;
		}

		.item-subtitle {
			font-size: 0.8em;
			opacity: 0.5;
		}
	}

	.item-actions {
		flex: none;
		padding: 5px;
		display: flex;
		align-items: center;

		.v-btn {
			margin: 0;
		}
	}


}

</style>
