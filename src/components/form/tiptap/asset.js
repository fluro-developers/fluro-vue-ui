import { Node, Plugin } from 'tiptap';

export default class Image extends Node {
	get name() {
		return 'asset';
	}

	get schema() {
		return {
			inline: true,
			attrs: {
				item: {},
			},
			group: 'inline',
			draggable: true,
			parseDOM: [
				{
					tag: 'a[asset]',
					getAttrs: (dom) => ({
						item: dom.getAttribute('item'),
					}),
				},
			],
			toDOM: (node) => ['a', node.attrs],
		};
	}

	commands({ type }) {
		return (attrs) => (state, dispatch) => {
			const { selection } = state;
			const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
			const node = type.create(attrs);
			const transaction = state.tr.insert(position, node);
			dispatch(transaction);
		};
	}

	get view() {
		return {
			props: ['node', 'updateAttrs', 'view'],
			computed: {
				text() {
					return 'Link text';
				},
				url: {
					get() {
						//return `https://api.fluro.io/get/${this.node.attrs.item}`
						return this.$fluro.asset.downloadUrl(this.node.attrs.item);
					},
					set(url) {
						this.updateAttrs({
							url,
						});
					},
				},
			},
			template: `<a :href="url">{{text}}</a>`,
		};
	}
}
