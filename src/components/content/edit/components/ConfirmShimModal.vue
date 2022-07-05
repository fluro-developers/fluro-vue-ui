<template>
	<flex-column class="confirm-shim-modal">
		<flex-column-header class="border-bottom">
			<v-container>
				<constrain class="confirm-shim-modal__constrain">
					<h3>Replace Fluro data with SAP People data?</h3>
					<!-- prettier-ignore -->
					<div class="confirm-shim-modal__description">
						<p>When you replace Fluro Contact data with Subsplash People data, People profiles will be unified in both systems going forward.</p>
						<strong>After Fluro data is replaced:</strong>
						<ul class="mb-3">
							<li>All people profiles in Subsplash People will also appear in Fluro.</li>
							<li>Adding or editing People data in Subsplash People will also add or edit the corresponding Contact data in Fluro.</li>
							<li>Adding or editing Contact data in Fluro will also add or edit the corresponding People data in Subsplash People.</li>
							<li>Editing the profile from the end-user's account will update the profile in both systems.</li>
						</ul>
            <strong>Are you sure you want to permanently replace this client's Fluro Contacts data with their Subsplash People data and unify the data sets going forward?</strong>
					</div>
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
								<v-btn :color="'error'" @click="close()"> Yes, replace and unify data </v-btn>
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
	max-width: 620px;
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
