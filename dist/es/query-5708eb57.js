
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { t as FluroTable, R as RealmDotCell, x as TitleCell, D as DefinitionCell, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-552988d9.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'moment';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-588af632.js';

//

var script = {
  props: {
    config: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    FluroTable,
    RealmDotCell,
    TitleCell,
    DefinitionCell
  },
  mixins: [FluroContentViewMixin],
  methods: {},
  asyncComputed: {
    results: {
      default: [],

      get() {
        var self = this;
        self.loading = true;
        return new Promise(function (resolve, reject) {
          self.$fluro.content.query(self.item, {}).then(function (result) {
            resolve(result);
            self.loading = false;
          }).catch(reject);
        });
      }

    }
  },
  computed: {
    data() {
      return this.item.data || {};
    },

    fields() {
      // var array = [];
      // array.push({
      //     title: 'Linked Contacts',
      //     key: 'contacts',
      //     type: 'reference',
      //     minimum: 0,
      //     maximum: 0,
      // })
      return array;
    },

    definedFields() {
      return this.config.definition ? this.config.definition.fields || [] : [];
    },

    columns() {
      if (!this.item.columns.length) {
        return [{
          title: '',
          shrink: true,
          align: "center",
          key: 'realms',
          renderer: RealmDotCell
        }, {
          title: 'Title',
          key: 'title',
          renderer: TitleCell,
          additionalFields: ['firstLine']
        }, {
          title: "Type",
          renderer: DefinitionCell,
          shrink: true
        }, {
          title: "Created",
          key: 'created',
          type: 'date',
          shrink: true
        }, {
          title: "Updated",
          key: 'updated',
          type: 'date',
          shrink: true
        }];
      }

      return this.item.columns;
    }

  },

  data() {
    return {
      loading: true
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    [
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : [
            _c(
              "tabset",
              { attrs: { justified: true, vertical: true } },
              [
                _c(
                  "tab",
                  { attrs: { heading: "Results" } },
                  [
                    _c("fluro-table", {
                      attrs: {
                        showFooter: true,
                        trackingKey: "_id",
                        pageSize: 100,
                        items: _vm.results,
                        columns: _vm.columns
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.definedFields.length
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.definition.title + " Details" } },
                      [
                        _c(
                          "flex-column-body",
                          { staticStyle: { background: "#fafafa" } },
                          [
                            _c(
                              "v-container",
                              { attrs: { fluid: "" } },
                              [
                                _c(
                                  "constrain",
                                  { attrs: { sm: "" } },
                                  [
                                    _c("h3", { attrs: { margin: "" } }, [
                                      _vm._v(
                                        _vm._s(_vm.definition.title) +
                                          " Details"
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-content-render", {
                                      attrs: { fields: _vm.definedFields },
                                      model: {
                                        value: _vm.item.data,
                                        callback: function($$v) {
                                          _vm.$set(_vm.item, "data", $$v);
                                        },
                                        expression: "item.data"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            )
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-476d8636_0", { source: "/**/\n.border-top[data-v-476d8636] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-476d8636] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-476d8636] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-476d8636] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=query.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/query.vue","query.vue"],"names":[],"mappings":"AAoIA,GAAA;AAYA;EACA,yCAAA;AC9IA;ADiJA;EACA,2CAAA;AC9IA;ADiJA;EACA,4CAAA;AC9IA;ADiJA;EACA,0CAAA;AC9IA;;ADsJA,GAAA;;AClJA,oCAAoC","file":"query.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n        \t\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <tab heading=\"Results\">\n                    <fluro-table :showFooter=\"true\" trackingKey=\"_id\" :pageSize=\"100\" :items=\"results\" :columns=\"columns\" />\n                   \n                </tab>\n                <tab :heading=\"`${definition.title} Details`\" v-if=\"definedFields.length\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <h3 margin>{{definition.title}} Details</h3>\n                                <fluro-content-render :fields=\"definedFields\" v-model=\"item.data\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport FluroTable from 'src/components/table/FluroTable.vue';\nimport RealmDotCell from 'src/components/table/cells/RealmDotCell.vue';\nimport TitleCell from 'src/components/table/cells/TitleCell.vue';\nimport DefinitionCell from 'src/components/table/cells/DefinitionCell.vue';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n        FluroTable,\n        RealmDotCell,\n        TitleCell,\n        DefinitionCell,\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {},\n    asyncComputed: {\n        results: {\n            default: [],\n            get() {\n                var self = this;\n                self.loading = true\n                return new Promise(function(resolve, reject) {\n                    self.$fluro.content.query(self.item, {}).then(function(result) {\n                        resolve(result)\n                        self.loading = false\n                    }).catch(reject)\n                })\n            }\n        }\n\n    },\n    computed: {\n        data() {\n            return this.item.data || {}\n        },\n        fields() {\n\n            // var array = [];\n\n            // array.push({\n            //     title: 'Linked Contacts',\n            //     key: 'contacts',\n            //     type: 'reference',\n            //     minimum: 0,\n            //     maximum: 0,\n            // })\n\n            return array;\n        },\n        definedFields() {\n            return this.config.definition ? this.config.definition.fields || [] : []\n        },\n        columns() {\n            if (!this.item.columns.length) {\n                return [\n                    { title: '', shrink: true, align: \"center\", key: 'realms', renderer: RealmDotCell },\n                    { title: 'Title', key: 'title', renderer: TitleCell, additionalFields: ['firstLine'] }, {\n                        title: \"Type\",\n\n                        renderer: DefinitionCell,\n                        shrink: true,\n                    },\n                    {\n                        title: \"Created\",\n                        key: 'created',\n                        type: 'date',\n                        shrink: true,\n                    },\n                    {\n                        title: \"Updated\",\n                        key: 'updated',\n                        type: 'date',\n                        shrink: true,\n\n                    }\n                ]\n            }\n            return this.item.columns\n        }\n    },\n    data() {\n        return {\n            loading: true\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=query.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-476d8636";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__;
//# sourceMappingURL=query-5708eb57.js.map
