<template>
	<!-- <span @keyup.esc="blur" class="fluro-inline-edit" @[dbclick]="enableEdit" @dbclick.stop.prevent="enableEdit" @click.stop.prevent="enableEdit"> -->
	<!-- <span @keyup.esc="blur" class="fluro-inline-edit" > -->
	<span @keyup.esc="blur" class="fluro-inline-edit" @click.stop.prevent="enableEdit">
		<template v-if="enabled">
			<span class="inline-edit-input" :class="{ 'inline-hide': !props.editing, 'inline-show': props.editing }">
				<slot name="edit" :props="props" :blur="blur" :focus="focus"> </slot>
			</span>
			<span class="inline-edit-default" :class="{ 'inline-hide': props.editing, 'inline-show': props.editing }">
				<slot name="default" :props="props" :blur="blur" :focus="focus"> </slot>
			</span>
		</template>
		<template v-else>
			<slot name="default" :props="props" :blur="blur" :focus="focus"> </slot>
		</template>
	</span>
</template>
<script>
/////////////////////////////////////////////////////

export default {
	props: {
		autofocus: {
			type: Boolean,
		},
		enabled: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			props: {
				element: null,
				editing: false,
			},
			dblclick: {
				type: Boolean,
			},
		};
	},
	beforeDestroy() {
		var self = this;
		if (self.element) {
			self.element.removeEventListener('focus', self.focus);
			self.element.removeEventListener('blur', self.blur);
			self.element = null;
		}
	},
	mounted() {
		var self = this;
		self.mount();

		// console.log('INLINE EDIT!')
		if (self.autofocus) {
			self.enableEdit();
		}
	},

	methods: {
		doubleClickEnableEdit() {
			if (this.dblclick) {
				return this.enableEdit();
			} else {
				return;
			}
		},
		clickEnableEdit() {
			if (this.dblclick) {
				return;
			} else {
				return this.enableEdit();
			}
		},
		mount() {
			var self = this;
			self.element = self.$el.querySelector('input, textarea, select, [contenteditable]');
			if (self.element) {
				self.element.addEventListener('focus', self.focus);
				self.element.addEventListener('blur', self.blur);
			}
		},
		enableEdit() {
			var self = this;
			if (self.enabled) {
				if (!self.element) {
					self.mount();
				}

				if (self.element) {
					self.element.focus();
				}

				self.props.editing = true;
			}
		},
		focus(event) {
			var self = this;
			if (self.enabled) {
				this.props.editing = true;
				if (self.element && self.element.select) {
					self.element.select();
				}
			}
		},
		blur() {
			this.props.editing = false;
		},
	},
};
</script>
<style lang="scss">
.fluro-inline-edit {
	// position: relative;
	// background: rgba(#000, 0.1);
	// border-radius: 3px;

	.inline-hide {
		height: 0 !important;
		width: 0 !important;
		overflow: hidden !important;
		display: block !important;
		// visibility: hidden;
	}
}
</style>
