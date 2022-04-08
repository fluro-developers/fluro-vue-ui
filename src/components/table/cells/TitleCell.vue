<template>
	<div class="title-cell">
		<div class="grow">
			<strong>{{ row.title }}</strong>
			<div class="summary" v-if="firstLine">{{ firstLine }}</div>
			<!-- <pre>{{firstLine}}</pre> -->
		</div>
		<div class="shrink" v-if="status">
			<fluro-status-label v-if="row.status && row.status != 'active'" :value="row.status" />
		</div>
	</div>
</template>
<script>
export default {
	props: {
		row: {
			type: Object,
		},
		column: {
			type: Object,
		},
		data: {
			// type: Object,
		},
		status: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	computed: {
		firstLine() {
			var self = this;
			var row = this.row;

			if (row.deployment) {
				return row.deployment;
			}

			var event = row.event;
			if (!event) {
				if (row.roster) {
					event = row.roster.event;
				}
			}

			if (event) {
				if (event.startDate) {
					return `${self.$fluro.date.formatDate(event.startDate, 'ddd D MMM YYYY - h:mma')} - ${event.title}`;
				}

				if (event.title) {
					return `${event.title}`;
				}
			}

			if (row._type == 'post') {
				var postLine = [];

				// if(row.author) {
				//     postLine.push(_.get(row, 'author.name')|| _.get(row, 'author.title'));
				// } else {
				//     postLine.push(_.get(row, 'managedAuthor.title'));
				// }

				// if(postLine.length) {
				//     postLine.unshift('Posted by');
				// }

				// postLine.push('Connected to');

				if (row.parent.startDate) {
					postLine.push(
						`${self.$fluro.date.formatDate(row.parent.startDate, 'ddd D MMM YYYY - h:mma')} - ${
							row.parent.title
						}`
					);
				} else if (row.parent.title) {
					postLine.push(`'${row.parent.title}'`);
				}

				return _.compact(postLine).join(' ');
			}

			if (row.firstLine) {
				return row.firstLine;
			}

			if (row.subject) {
				return row.subject;
			}

			if (row.description) {
				return row.description;
			}

			if (row._type == 'interaction') {
				var contactNames = _.chain(row.contacts)
					.map(function (contact) {
						return contact.title;
					})
					.compact()
					.value()
					.join(', ');

				return `${row.primaryEmail || ''} ${contactNames}`;
			}
		},
	},
};
</script>
<style lang="scss">
.title-cell {
	display: flex;
	align-items: center;

	.grow {
		flex: 1;
	}

	.status-label {
		flex: none;
	}

	.summary {
		font-size: 0.9em;
		opacity: 0.5;
		max-width: 500px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>
