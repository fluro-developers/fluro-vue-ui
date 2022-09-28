<template>
	<flex-column class="tabset" :class="{ justified, vertical }">
		<flex-column-header class="tabset-header" v-if="enabledTabs.length > 1 || persist">
			<slot name="menuprefix"></slot>
			<div class="tabset-menu" ref="outer">
				<div class="tabset-menu-inner" ref="inner">
					<!-- <template > -->
					<!-- <div v-if="tab.$slots.title" :class="{active:index == activeTabIndex, muted:tab.muted}" @click="selectTab(index)">
                            Test {{tab.$slots.title}} <slot name="title"/>
                        </div> -->
					<!-- v-else  -->
					<a
						v-for="tab in enabledTabs"
						:key="tab.key"
						flat
						v-tippy
						:content="tab.tooltip"
						:class="{ active: tab.key == activeTabIndex, muted: tab.muted }"
						@click="selectTab(tab.key)"
					>
						{{ tab.heading }}
						<template v-if="tab.icon">
							<fluro-icon
								v-if="tab.icon.icon"
								:icon="tab.icon.icon"
								:library="tab.icon.library"
								:style="{ color: tab.icon.color }"
							/>
							<fluro-icon
								v-if="tab.icon.type"
								:type="tab.icon.type"
								:library="tab.icon.library"
								:style="{ color: tab.icon.color }"
							/>
						</template>
					</a>
					<!-- </template> -->
				</div>
			</div>
			<slot name="menusuffix"></slot>
		</flex-column-header>
		<flex-column class="tabset-content">
			<slot />
		</flex-column>
	</flex-column>
</template>
<script>
import _ from 'lodash';

export default {
	props: {
		value: {
			type: [Number, String],
		},
		options: {
			type: Object,
		},
		justified: {
			type: Boolean,
		},
		persist: {
			type: Boolean,
		},
		vertical: {
			type: Boolean,
		},
	},
	provide() {
		return {
			removeTab: this.removeTab,
			addTab: this.addTab,
			tabs: this.tabs,
			activeTabIndex: this.activeTabIndex,
			getActiveTabIndex: this.getActiveTabIndex,
			tabset: this,
		};
	},
	data() {
		return {
			tabs: [],
			activeTabIndex: this.value || null,
		};
	},
	watch: {
		value: 'selectTab',
		activeTabIndex(val) {
			this.$emit('input', val);
		},
	},
	computed: {
		enabledTabs() {
			var self = this;
			return _.filter(self.tabs, { enabled: true });
		},
	},
	methods: {
		getActiveTabIndex() {
			return this.activeTabIndex;
		},
		removeTab(tab) {
			var self = this;
			var index = self.tabs.indexOf(tab);
			if (index == -1) {
				return;
			}

			self.tabs.splice(index, 1);
		},
		addTab(tab) {
			var self = this;
			//Add another tab to the tabcount
			if (_.includes(self.tabs, tab)) {
				return;
			}

			var existingTabs = self.tabs.length;

			self.tabs.push(tab);

			//Select the first tab by default unless otherwise specified

			if (!existingTabs && !self.activeTabIndex) {
				self.activeTabIndex = tab.key;
				tab.active = true;
			}
		},
		selectTab(index) {
			var self = this;

			self.activeTabIndex = index;

			var menuElement = self.$refs.outer;
			var containerElement = self.$refs.inner;

			if (containerElement) {
				var childElement = containerElement.children[self.activeTabIndex];

				if (childElement) {
					var parentPos = containerElement.getBoundingClientRect();
					var childPos = childElement.getBoundingClientRect();
					var relativePos = {};

					(relativePos.top = childPos.top - parentPos.top),
						(relativePos.right = childPos.right - parentPos.right),
						(relativePos.bottom = childPos.bottom - parentPos.bottom),
						(relativePos.left = childPos.left - parentPos.left);

					////////////////////////////////////////////////

					var menuWidth = menuElement.offsetWidth;
					var childWidth = childElement.offsetWidth;
					var target = relativePos.left - (menuWidth / 2 - childWidth / 2); //relativePos.left;

					menuElement.scrollTo({
						// top: 100,
						left: target,
						behavior: 'smooth',
					});
				}
			}

			//Disable all the other tabs
			_.each(self.tabs, function (tab) {
				tab.active = tab.key == self.activeTabIndex;
			});
		},
	},
	//     act() {
	//         var self = this;

	//         //Run a batch
	//         var promise = self.$batch.run({
	//             operation: 'add tag',
	//             ids: self.ids,
	//             tags: self.$fluro.utils.arrayIDs(self.selectedTags),
	//         });

	//         //Close the modal with the promise
	//         return self.close(promise)

	//     },

	// }
};
</script>
<style lang="scss">
.tabset {
	flex: 1;
	padding: 0 24px;

	.tabset-menu {
		flex: none;
		overflow: hidden;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		@extend .no-select !optional;
		// display: flex;
		-webkit-overflow-scrolling: touch;

		a {
			display: inline-block;
			color: inherit;
			opacity: 0.6;
			// display: block;
			padding: 15px 35px;
			font-size: 0.8em;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			font-weight: 500;
			flex: 1;
			text-align: center;

			border-top: 3px solid transparent;
			border-left: 1px solid transparent;
			border-right: 1px solid transparent;
			border-bottom: 1px solid rgba(#000, 0.05);
			position: relative;
			transition: opacity 0.2s, background 0.2s;

			&.muted {
				opacity: 0.4;
				background: #ccc;
			}

			&:focus {
				outline: none !important;
			}

			&.active {
				opacity: 1;
				//background: #fff;
				border-left: 1px solid rgba(#000, 0.05);
				border-right: 1px solid rgba(#000, 0.05);
				border-bottom: 2px solid #222222;
				border-top: 1px solid transparent;
			}
		}
	}

	.tabset-content {
		flex: 1;
		background: #fff !important;
		position: relative;
		// border: 1px solid rgba(#000, 0.05);
	}

	.tabset-header {
		background: #fff !important;
	}

	&.justified {
		.tabset-menu a {
			padding: 15px 17px;
		}

		.tabset-menu-inner {
			display: flex;
		}
	}

	&.vertical {
		@media (min-width: 768px) {
			display: flex;
			flex-direction: row;
			background-color: #f7f8fa;

			& > .tabset-header {
				min-width: 200px;
				max-width: 260px;
				width: 25%;
				display: flex;
				flex-direction: column;
				background-color: #f7f8fa;

				.tabset-menu {
					background: none;
					flex: 1;
					white-space: normal;
					overflow-x: hidden;
					overflow-y: auto;

					.tabset-menu-inner {
						display: block;

						a {
							background: none;
							border: none;
							display: block;
							border-left: 3px solid transprent;
							text-align: left;
							text-transform: none;
							letter-spacing: 0;
							font-size: 1.1em;
							padding: 10px 5px 10px 15px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							flex: none;
							opacity: 0.6;

							// &.muted {
							//     opacity: 0.6;
							//     background: #ccc;
							// }

							// &:focus {
							//     outline: none !important;
							// }

							// &.active {
							//     opacity: 1;
							//     //background: #fff;
							//     border-left: 1px solid rgba(#000, 0.05);
							//     border-right: 1px solid rgba(#000, 0.05);
							//     border-top: 3px solid $primary;
							//     border-bottom: 1px solid transparent;
							// }

							&.muted {
								opacity: 0.4;
								background: #ddd;
							}

							&.active {
								background: transparent;
								border-left: 2px solid #222222;
								font-weight: 600;
								opacity: 1;
							}
						}
					}
				}
			}
		}
	}
}
</style>
