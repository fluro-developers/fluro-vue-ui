<template>
	<flex-column class="confirm-shim-modal">
		<flex-column-header class="border-bottom">
			<v-container>
				<constrain class="confirm-shim-modal__constrain">
					<h3>Replace Fluro data with SAP People data?</h3>
					<!-- prettier-ignore -->
					<p class="confirm-shim-modal__description">This is a destructive, potentially dangerous (one-way) change, and can't be undone.

            When you replace Fluro Contact data with Subpslash App Platform (SAP) People data, People data will begin
						syncing between Fluro and SAP.

            - All contacts in Fluro will begin to appear in Subsplash People
						- All people in Subsplash People will begin to appear in Fluro
            - Changing People data in Subsplash People will update Contact data in Fluro
            - Changing Contact data in Fluro will update People data in Subsplash People

            Are you sure you want to replace this data, and begin syncing data from SAP People?</p>
				</constrain>
			</v-container>
		</flex-column-header>
		<flex-column-footer class="border-top">
			<v-container class="confirm-shim-modal__footer pa-2">
				<constrain>
					<v-layout>
						<v-flex>
							<template>
								<v-btn @click="dismiss()"> No, cancel </v-btn>
							</template>
						</v-flex>
						<v-spacer />
						<v-flex>
							<template>
								<v-btn :color="'error'" @click="close()"> Yes, replace and sync data </v-btn>
							</template>
						</v-flex>
					</v-layout>
				</constrain>
			</v-container>
		</flex-column-footer>
	</flex-column>
</template>

<script>
import Layout from '../../../../mixins/Layout';
import ModalMixin from '../../../../mixins/ModalMixin';

export default {
	mixins: [ModalMixin, Layout],
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.confirm-shim-modal {
	text-align: left;

	&__description {
		margin: 0;
		white-space: pre-line;
	}

	&__footer {
		display: flex;
		justify-content: flex-end;

		.constrain {
			margin: 0;
		}
	}

	@media (min-width: 768px) {
		width: 100%;
		min-width: 500px;
	}
}
</style>
