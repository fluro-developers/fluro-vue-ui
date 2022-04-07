import { Node } from 'tiptap';

export default class Token extends Node {
	get name() {
		return 'token';
	}

	get schema() {
		return {
			attrs: {},
			inline: true,
			selectable: false,
			content: 'inline*',
			draggable: false,
			isText: true,
			toDOM: (node) => node.attrs,
		};
	}

	commands({ type, schema }) {
		return (attrs) => (state, dispatch) => {
			const { $from } = state.selection;
			const { pos } = $from.pos;
			dispatch(state.tr.insertText(`{{${attrs}}}`, pos));
		};
	}

	// keys({ type }) {
	//   console.log("KEYS CALLED", "This", this, "Type", type)
	//   return this.options.tokens.reduce((items, key) => ({
	//     ...items,
	//   }), {})
	// }
}
