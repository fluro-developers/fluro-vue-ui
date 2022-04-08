<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab heading="Plan">
				<div class="plan-table-wrapper">
					<div class="plan-table" ref="container">
						<table id="main-table" class="main-table">
							<thead>
								<tr>
									<th class="shrink center">
										<fluro-icon icon="clock" />
									</th>
									<th class="detail">Detail</th>
									<th v-for="(column, key) in columns" :key="key">
										{{ column.title }}
									</th>
								</tr>
							</thead>
							<tbody>
								<!-- <draggable tag="tbody" handle=".handle" v-model="model.schedules" v-bind="dragOptions" @start="drag = true" @end="drag = false" @sort="calculateDurations()"> -->
								<!-- :teams="model.teams" -->
								<plan-row
									v-model="item.schedules[index]"
									:index="index"
									:plan="item"
									v-for="(row, index) in item.schedules"
									:key="row.guid"
								/>
								<!-- </draggable> -->
							</tbody>
							<!--  <tfoot>
                                <tr>
                                    <th colspan="2"></th>
                                    <td>
                                        <v-btn v-tippy content="Add Row" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('row')">
                                            <fluro-icon icon="plus" />
                                        </v-btn>
                                        <v-btn v-tippy content="Add Songs" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('song')">
                                            <fluro-icon icon="music" />
                                        </v-btn>
                                        <v-btn v-tippy content="Add Section" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('breaker')">
                                            <fluro-icon icon="megaphone" />
                                        </v-btn>
                                        <v-btn v-tippy content="Add Start Time" style="border: 1px solid #ddd; background: #fff;" class="ma-2" @click="add('start')" v-if="startRowIndex == -1">
                                            <fluro-icon icon="clock" />
                                        </v-btn>
                                    </td>
                                    <td v-for="column in columns"></td>
                                    <th></th>
                                </tr>
                            </tfoot> -->
						</table>
					</div>
				</div>
			</tab>
			<tab :heading="`${definition.title} details`" v-if="definition">
				<slot>
					<flex-column-body style="background: #fafafa">
						<v-container>
							<constrain sm>
								<h3 margin>{{ definition.title }}</h3>
								<fluro-content-render :fields="definedFields" v-model="item.data" />
							</constrain>
						</v-container>
					</flex-column-body>
				</slot>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////
import _ from 'lodash';

import PlanRow from '../components/PlanRowView.vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';

//////////////////////////////////////////////////////

/////////////////////////////////

export default {
	props: {
		config: {
			type: Object,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
	},
	components: {
		PlanRow,
	},
	mixins: [FluroContentViewMixin],
	created() {
		var self = this;
		_.each(self.item.schedules, function (row) {
			self.$set(row, 'guid', self.$fluro.utils.guid());
		});

		self.calculateDurations();
	},
	methods: {
		calculateDurations() {
			var self = this;
			var startIndex = self.startRowIndex;

			if (startIndex == -1) {
				startIndex = 0;
			}

			//////////////////////////////////////////////////

			var eventStartDate = _.get(self.item, 'event.startDate');
			var planStartDate = _.get(self.item, 'startDate');
			// var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date();
			var startDate =
				(eventStartDate ? new Date(eventStartDate) : false) ||
				(planStartDate ? new Date(planStartDate) : false) ||
				new Date();

			//////////////////////////////////////////////////

			function newTime(elapsed) {
				var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));
				if (elapsed < 0) {
					clonedDate.setTime(startDate.getTime() - -1 * elapsed);
				} else {
					clonedDate.setTime(startDate.getTime() + elapsed);
				}

				return self.$fluro.date.formatDate(clonedDate, 'h:mma');
			}

			var rows = self.item.schedules;
			var before = rows.slice(0, startIndex).reverse();
			var after = rows.slice(startIndex);

			///////////////////////////////////////

			_.reduce(
				before,
				function (elapsed, row, index) {
					if (row.duration) {
						elapsed += parseInt(row.duration) * 1000;
					}
					self.$set(row, 'time', newTime(-elapsed));
					self.$set(row, 'elapsedTime', -elapsed);
					return elapsed;
				},
				0
			);

			_.reduce(
				after,
				function (elapsed, row, index) {
					self.$set(row, 'time', newTime(elapsed));
					if (row.duration) {
						elapsed += parseInt(row.duration) * 1000;
					}
					self.$set(row, 'elapsedTime', elapsed);
					return elapsed;
				},
				0
			);
		},
	},
	computed: {
		times() {
			return _.map(this.model.schedules, 'duration').join('-');
		},
		startRow() {
			return this.model.schedules[this.startRowIndex];
		},
		startRowIndex() {
			var self = this;
			var index = _.findIndex(self.item.schedules, { type: 'start' });
			return index;
		},

		teams() {
			var self = this;
			return self.item.teams;
		},
		columns() {
			var self = this;
			return _.chain(self.teams)
				.compact()
				.map(function (team) {
					return {
						title: team,
						key: team,
					};
				})
				.value();
		},
	},
	data() {
		// var array = [];
		// _.times(200, function() {
		//     array.push({
		//         id: array.length
		//     });
		// });

		return {
			actionsOpen: false,
			drag: false,
			dragOptions: {},
			// array
		};
	},
};
</script>
<style lang="scss">
.plan-table-wrapper {
	position: relative;
	flex: 1;
	display: flex;
	overflow: hidden;

	.cog-btn {
		// width: 36px;
		// height: 36px;
		// text-align: center;
		// position: absolute;
		// top: 0;
		// right: 0;
		// z-index: 3;

		position: absolute;
		top: 0px;
		right: 0px;
		width: 38px;
		z-index: 3;
		text-align: center;
	}
}

.plan-table {
	flex: 1;
	position: relative;
	width: 100%;
	z-index: 1;
	margin: auto;
	overflow: auto;
	background: #f0f2f5;
	height: 100%;

	$cell-padding: 4px 8px;

	p {
		margin-bottom: 5px !important;
	}

	mention {
		font-size: 0.8em;
		font-weight: 500;
		background: rgba(#000, 0.1);
		border-radius: 100px;
		padding: 2px 4px;
		display: inline-block;
		margin: 0 4px;
	}

	.cell {
		padding: $cell-padding;
		word-wrap: break-word;
		white-space: pre-wrap;
	}

	.placeholder {
		padding-bottom: 2px;
		padding-top: 2px;
		opacity: 0;
		font-size: 0.8em;
		font-style: italic;
	}

	.row-song-key {
		min-width: 30px;
		display: block;
		text-align-last: center;
		appearance: none;
		border: none;
		outline: none;
		font-weight: 500;
	}

	.row-song-key,
	.row-title {
		font-size: 1.1em;

		.cell {
			padding-bottom: 0;
		}
	}

	.row-detail {
		.cell {
			padding-top: 0;
		}
	}

	table {
		width: 100%;
		min-width: 600px;
		margin: auto;
		border-collapse: separate;
		border-spacing: 0;

		th,
		td {
			text-align: left;
			padding: 5px;
			// border-bottom: 1px solid #000;
			border-bottom: 1px solid #e8edf1;
			border-right: 1px solid #e8edf1;
			height: inherit;
			white-space: nowrap;
		}

		/////////////////////////////////////

		tr {
			height: 1px;
			background: #fff;

			.dragger {
				opacity: 0;
			}

			&:hover {
				.placeholder {
					opacity: 0.5;
				}

				.dragger {
					opacity: 0.5;
				}
			}

			th:first-child,
			th:last-child {
				background: #fff;
			}

			&:nth-child(odd) {
				th:first-child,
				th:last-child {
					background: #fcfcfc;
				}

				background: #fcfcfc;
			}

			&.song {
				background: #fffbdd;
				color: #6b5f31;

				th,
				td {
					// border-top: 1px solid #e8edf1;
					// border-bottom: 1px solid #e8edf1;
				}

				th:first-child,
				th:last-child {
					background: #fffbdd;
				}
			}

			&.breaker {
				background: #f0f2f5;

				th,
				td {
					border-right: none;
					border-top: 1px solid #e8edf1;
					border-bottom: 1px solid #e8edf1;

					.cell {
						padding: 15px;
					}

					&.row-title {
						.cell {
							padding-top: inherit;
						}
					}
				}

				th:first-child,
				th:last-child {
					background: #f0f2f5;
				}

				.row-title-text {
					opacity: 0.7;
					text-transform: uppercase;
					font-weight: 600;
					letter-spacing: 0.05em;
					font-size: 0.8em;
				}
			}

			&.start {
				background: #93d3c8;

				th,
				td {
					border-right: none;
					border-top: 1px solid #e8edf1;
					border-bottom: 1px solid #e8edf1;

					.cell {
						padding: 5px;
					}

					&.row-title {
						.cell {
							padding-top: inherit;
						}
					}
				}

				th:first-child,
				th:last-child {
					background: #93d3c8;
				}

				.row-title-text {
					opacity: 0.7;
					text-transform: uppercase;
					font-weight: 600;
					letter-spacing: 0.05em;
					font-size: 0.8em;
				}
			}
		}

		td {
			vertical-align: top;
			padding: 0;
			position: relative;

			&.duration-cell {
				text-align: center;
			}

			&:hover {
				background: rgba($primary, 0.05);
			}

			p:last-child,
			.fluro-editor {
				margin-bottom: 0 !important;
			}

			.fluro-inline-edit {
				min-height: 100%;
				min-width: 100%;
				display: block;
				width: 100%;
				position: relative;
				float: left;
				// position: absolute;
			}

			// &.duration {
			//     text-align: center;

			//     input {
			//         width: 70px;
			//         font-size: 0.9em;
			//         padding: 0 5px;
			//         text-align: center;
			//         line-height: 30px;
			//     }

			//     // min-height: 50px;
			// }

			.fluro-inline-edit {
				width: 100%;
				height: 100%;
				// position: absolute;
				// left:0;
				// bottom:0;
				// right:0;
				// top:0;
				// overflow: hidden;
				// border:10px solid #ff0066;
				display: block;

				.inline-edit-default {
					height: auto !important;
					width: auto !important;
				}

				// .inline-hide {
				//     height: 0 !important;
				//     width: 0 !important;
				//     overflow: hidden !important;
				//     display: block !important;
				//     // visibility: hidden;
				// }

				.inline-edit-input {
					background: #fff;
					position: absolute;
					left: 0;
					top: 0;
					right: 0;

					&.inline-show {
						border-radius: 3px;
						border: 3px solid $primary;
						box-shadow: 0 4px 10px rgba(#000, 0.3);
						z-index: 3;
						//width:0 !important;
					}
				}

				input,
				select {
					margin: 0;
					max-width: 100%;
					width: 100%;
					display: block;
					padding: $cell-padding;
					line-height: 1;
				}
			}

			// &.duration-cell {
			//     position: relative;

			//     left: 0;
			//     right: 0;
			//     bottom: 0;
			//     top: 0;
			//     width: 100%;
			//     height: 100%;

			//

			//     // position: absolute;
			// }

			// }
		}

		thead th {
			background: #fff;
			font-size: 0.8em;
			// color: #fff;
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			z-index: 3;

			&.center {
				text-align: center;
			}

			&.shrink {
				width: 1px;
			}

			&.detail {
				// width: 40%;
				max-width: 300px;
			}

			border-bottom: 3px solid rgba(#000, 0.1);
		}

		/* safari and ios need the tfoot itself to be position:sticky also */
		tfoot {
			th,
			td {
				position: -webkit-sticky;
				position: sticky;
				bottom: 0;
				z-index: 4;
				background: #f0f2f5 !important;
				border: none !important;
				border-top: 1px solid rgba(#000, 0.1) !important;
			}
		}

		/* testing links*/
		th:first-child,
		th:last-child {
			position: -webkit-sticky;
			position: sticky;
			z-index: 2;

			vertical-align: center !important;
			text-align: center;

			&:first-child {
				left: 0;
				width: 1px;
				border-right: 1px solid #e8edf1;
			}

			&:last-child {
				right: 0;
				width: 1px;
				border-left: 1px solid #e8edf1;
			}
		}

		thead,
		tfoot {
			th:first-child,
			th:last-child {
				z-index: 5;
			}
		}

		/////////////////////////////////

		tr.sortable-ghost {
			opacity: 0.3;
			// background:darken(#e8edf1, 30%) !important;

			th,
			td {
				border-color: greyscale(darken(#e8edf1, 30%), 1%) !important;
				background: greyscale(darken(#e8edf1, 30%), 1%) !important;
			}
		}

		td .fluro-editor-textarea {
			min-height: 0;

			& > div {
				// font-size: 11px;
				border-radius: 0 !important;
				padding: $cell-padding !important;
				border: none !important;
			}
		}
	}
}
</style>
