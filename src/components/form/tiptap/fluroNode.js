import { Node } from 'tiptap';
import { toggleMark, toggleBlockType, toggleWrap, replaceText } from 'tiptap-commands';

var prosemirrorCommands = require('prosemirror-commands');
var tiptapUtils = require('tiptap-utils');

export default class FluroNode extends Node {
	get name() {
		return 'fluroNode';
	}

	get defaultOptions() {
		return {
			classes: [
				{
					id: 'lead',
					title: 'Lead Text',
					tag: 'span',
					className: 'lead',
				},
			],
		};
	}

	get schema() {
		return {
			attrs: {
				id: {},
				label: {},
				title: {},
				tag: {},
				className: {},
			},
			content: 'inline*',
			group: 'inline',
			defining: true,
			draggable: false,
			inline: true,
			// parseDOM: this.options.classes
			//     .map(cssClass => ({
			//         tag: cssClass.tag,
			//         attrs: cssClass
			//     })),
			// toDOM: node => node.attrs,
			toDOM: (node) => [
				'fluroNode',
				{
					class: this.options.mentionClass,
					'data-fluroNode-id': node.attrs.id,
				},
				// `${node.attrs.label}`,
				//`${node.attrs.label}`,
			],
			parseDOM: [
				{
					tag: 'fluroNode[data-fluroNode-id]',
					getAttrs: (dom) => {
						const id = dom.getAttribute('data-fluroNode-id');
						return { id };
					},
				},
			],
		};
	}

	// commands({ type, schema }) {
	//   return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
	// }

	commands({ type, schema }) {
		// return attrs => (state, dispatch) => {
		//   console.log("state", state)
		//   const { $from } = state.selection
		//   const { pos } = $from.pos
		//   dispatch(state.tr.insertText(`<${attrs.tag} class="attrs.className">${attrs}</>`, pos))
		// }
		//return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
		// return attrs => replaceText(null, schema.nodes[this.name], attrs)
		return (attrs) => (state, dispatch, view) => {
			attrs.class = attrs.className;
			//console.log(type, schema, attrs)
			var tag = attrs.tag;
			var title = attrs.title;
			var className = attrs.className;

			console.log(type, schema, attrs);
			toggleBlockType(type, schema.nodes.paragraph, attrs);
		};
	}
}

// keys({ type }) {
//   console.log("KEYS CALLED", "This", this, "Type", type)
//   return this.options.tokens.reduce((items, key) => ({
//     ...items,
//   }), {})
// }
