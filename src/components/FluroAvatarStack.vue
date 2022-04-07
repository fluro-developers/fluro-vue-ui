<template>
	<div class="face-stack">
		<div class="face" v-tippy :content="contact.title" v-for="contact in contacts">
			<fluro-avatar sm :id="contact" type="contact" /> 
		</div>
		   
	</div>
</template>
<script>
import FluroAvatar from './FluroAvatar.vue';

export default {
	components: {
		FluroAvatar,
	},
	props: {
		contacts: {
			type: Array,
		},
	},
	computed: {
		contactIDs() {
			return this.$fluro.utils.arrayIDs(this.contacts);
		},
	},
};
</script>
<style lang="scss">
.face-stack {
	white-space: nowrap;

	min-width: 50px;

	.face {
		display: inline-block;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		overflow: hidden;

		&:first-child {
			margin-left: 0;
		}

		transition: margin 0.4s;
		background: #eee;
	}

	&[right] {
		text-align: right;
		float: right;

		.face {
			margin-left: -15px;
		}

		&:hover {
			.face {
				margin-left: -5px;
			}
		}
	}
}
</style>
