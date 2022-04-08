<template>
	<v-layout row wrap>
		<!-- class="slot-cell" :class="{selected:selected}" -->
		<!-- class="slot-cell-inner" -->
		<v-flex v-for="(assignment, index) in assignments" shrink>
			<draggable
				:sort="false"
				:group="{ name: 'assignments', pull: 'clone' }"
				@change="drop"
				:clone="cloneAssignment"
				v-model="assignments"
			>
				<roster-slot-assignment-cell
					class="assignment-chip"
					:key="assignment._id"
					v-model="assignments[index]"
				/>
			</draggable>
		</v-flex>
		<v-flex v-if="!assignments.length" grow>
			<draggable
				:sort="false"
				:group="{ name: 'assignments', pull: 'clone' }"
				@change="drop"
				:clone="cloneAssignment"
				v-model="assignments"
			>
			</draggable>
		</v-flex>
	</v-layout>
</template>
<script>
import RosterSlotPlaceholderCell from './RosterSlotPlaceholderCell.vue';
import RosterSlotAssignmentCell from './RosterSlotAssignmentCell.vue';
import MultiPlannerService from '../services/MultiPlannerService.js';
import draggable from 'vuedraggable';
import _ from 'lodash';

export default {
	components: {
		RosterSlotAssignmentCell,
		RosterSlotPlaceholderCell,
		draggable,
	},
	props: {
		definition: {
			type: Object,
			required: true,
		},
		roster: {
			type: Object,
			required: true,
		},
		position: {
			type: Object,
			required: true,
		},
		selected: {
			type: Boolean,
		},
	},
	created() {
		var self = this;

		/////////////////////////////////////////

		if (!self.roster.slots) {
			var slotCopy = _.map(JSON.parse(JSON.stringify(self.definition.slots)), function (slot) {
				slot.assignments = [];
				return slot;
			});

			console.log('CREATED SLOT', slotCopy);
			self.$set(self.roster, 'slots', slotCopy);
		}
	},
	computed: {
		slotMap() {
			var self = this;

			if (!self.roster) {
				return {};
			}

			return _.reduce(
				self.roster.slots,
				function (set, slot) {
					var stringName = String(slot.title).toLowerCase();
					set[stringName] = slot;

					return set;
				},
				{}
			);
		},
		slot() {
			var self = this;

			var positionLowerCase = String(self.position.title).toLowerCase();
			var match = self.slotMap[positionLowerCase];

			//////////////////////////////////////////////////////////////////

			if (match) {
				match.style = 'self';
			} else {
				//Find the default setup for this slot
				var defaultSlot = _.find(self.definition.slots, function (slot) {
					return String(slot.title).toLowerCase() == positionLowerCase;
				});

				var copy = JSON.parse(JSON.stringify(defaultSlot));
				copy.assignments = [];
				copy.style = 'default';

				return copy;
			}

			return match;
		},
		assignments: {
			get() {
				var self = this;
				return self.slot.assignments;
			},
			set(array) {
				this.slot.assignments = array;
			},
		},
		contactIDs() {
			var self = this;
			return _.reduce(
				self.assignments,
				function (set, assignment) {
					if (!assignment._id || assignment._id == 'placeholder') {
						return set;
					}

					var contactID = self.$fluro.utils.getStringID(assignment.contact);
					set[contactID] = true;

					return set;
				},
				{}
			);
		},
	},
	data() {
		return {
			chosen: false,
		};
	},
	methods: {
		alreadyRostered(contactID) {
			var self = this;
			var contactID = self.$fluro.utils.getStringID(contactID);
			return self.contactIDs[contactID];
		},
		remove(assignment) {
			var self = this;
			var index = _.indexOf(self.assignments, assignment);
			self.assignments.splice(index, 1);
		},
		drop($event) {
			if (!$event.added) {
				console.log('Nothing added');
				return;
			}

			var self = this;
			var rosterID = this.roster._id;
			var dropAssignment = $event.added.element;

			//////////////////////////////////////////

			//Check if this contact is already assigned to this slot
			var alreadyRostered = self.alreadyRostered(dropAssignment.contact);
			if (alreadyRostered) {
				//If it is just remove the placeholder
				console.log('Already rostered!');
				return self.remove(dropAssignment);
			}

			//////////////////////////////////////////

			var details = {
				title: this.slot.title,
				contact: dropAssignment.contact,
				contactName: dropAssignment.contactName,
				confirmationStatus: 'proposed',
				sending: true,
			};

			//////////////////////////////////////////

			MultiPlannerService.createAssignment(rosterID, self.assignments, details, true)
				.then(function (savedAssignment) {
					savedAssignment.sending = false;
					details.sending = false;
					_.assign(dropAssignment, savedAssignment);
					console.log('Assignment dropped', self.assignments, dropAssignment);
				})
				.catch(function (err) {
					console.log('ERROR', err);
					self.remove(dropAssignment);
				});
		},
		cloneAssignment(source) {
			var cloned = JSON.parse(JSON.stringify(source));
			cloned._id = 'placeholder';
			cloned.sending = true;
			return cloned;
		},
	},
};
</script>
<style lang="scss">
.assignment-chip {
	border: 1px solid #fefefe;
	height: 36px;
	line-height: 36px;
	margin: 12px;
	// max-width: 50px;
}
</style>
