<template>
	<div>
		<list-group>
			<draggable :list="model" v-bind="dragOptions" ghost-class="ghost-dragging-class" @start="drag=true" @end="drag=false">
				<list-group-item v-for="(keycontact, index) in model">
					<v-layout align-center>
						<v-flex>
							<strong>{{keycontact.position}}</strong>
						</v-flex>
						<v-flex>
							<list-group style="margin-bottom:0px;">
								<list-group-item v-for="contact in keycontact.contacts">
									<fluro-realm-bar :item="contact.realm" />
									<fluro-avatar :id="contact._id" type="contact" :width="100" />
									<strong>
										{{contact.title}}
									</strong>
								</list-group-item>
							</list-group>
						</v-flex>
						<v-flex shrink>
							<v-btn @click="remove(index)">
								<fluro-icon icon="times" />
							</v-btn>
						</v-flex>
					</v-layout>
				</list-group-item>
			</draggable>
		</list-group>
		<fluro-panel>
			<fluro-panel-title>Add a Key Contact</fluro-panel-title>
			<fluro-panel-body>
				<form @submit.prevent.stop="add()">
					<v-layout>
						<v-flex>
							<fluro-content-form ref="form" v-model="proposed" :fields="fields" /> <!-- :options="options" -->
						</v-flex>
						<v-flex shrink>
							<v-btn type="submit" @click="add()">Add</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</fluro-panel-body>
		</fluro-panel>
		<!-- <pre>{{proposed}}</pre> -->
		<!-- <v-layout>
   <v-flex xs12 sm5>
	<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
   </v-flex>
   <v-flex xs12 sm5>
	<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
   </v-flex>
   <v-flex xs12 sm2>
	<v-btn>Add</v-btn>
   </v-flex>
  </v-layout> -->
	</div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
	props: {
		value: {
			type: Array,
		}
	},
	components: {

		draggable,

	},
	data() {
		return {
			model: this.value,
			proposed: {},
			dragOptions: {},
			drag: false,
		}
	},
	methods: {
		add() {
			var clone = JSON.parse(JSON.stringify(this.proposed));

			if (!clone.position || !clone.position.length) {
				return;
			}

			delete clone.row;



			this.model.push(clone);

			this.proposed = {};
		},
		remove(index) {
			this.model.splice(index, 1);
		}
	},
	computed: {
		fields() {


			var self = this;
			var array = [];

			///////////////////////////////////

			addField('row', {
				type: 'group',
				sameLine: true,
				fields: [{
						title: 'Position/Title',
						minimum: 1,
						maximum: 1,
						type: 'string',
						key: 'position',
					},
					{
						title: 'Description/Directions',
						minimum: 0,
						maximum: 0,
						type: 'reference',
						key: 'contacts',
						params: {
							restrictType: 'contact',
						},
					},
					// {
					//  title: 'Add',
					//  minimum: 0,
					//  maximum: 1,
					//  type: 'string',
					//  key:'description',
					//  // customComponent:MyVueComponent
					// }
				]
			});

			// addField('title', {
			//  title: 'Room Title',
			//  minimum: 1,
			//  maximum: 1,
			//  type: 'string',
			// });

			// addField('description', {
			//  title: 'Description',
			//  minimum: 0,
			//  maximum: 1,
			//  type: 'string',
			// });

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details)
			}

			return array;
		}
	}
}

</script>
<style lang="scss">
.ghost-dragging-class {
	opacity: 0.5;
	background: #c8ebfb;
}

</style>
