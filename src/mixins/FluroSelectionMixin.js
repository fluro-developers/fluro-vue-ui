export default {
    data() {
        return {
            selectionMinimum: 0,
            selectionMaximum: 0,
            selection: [],
        }
    },
    methods: {
        select(item) {
            var self = this;
            if (!self.isSelected(item)) {

                var currentSize = self.selection.length;
                var maxLimit = self.selectionMaximum;

                //If there is no limit or we are under the limit
                if (!maxLimit || (currentSize < maxLimit)) {
                    //Add to our selection
                    return self.$set(self.selection, self.selection.length, item);
                }

                //Replace the last item in our selection with the new item
                //console.log('Select', self.selection.length, item);
                return self.$set(self.selection, self.selection.length - 1, item);


            }
        },
        setSelection(array) {

            var self = this;

            if (self.selectionMaximum) {
                array = array.slice(self.selectionMaximum);
                console.log('sliced to', array.length, self.selectionMaximum)
            }

            self.selection = array;




            // self.selection.length = 0;
            // _.each(array, function(item) {
            //     self.$set(self.selection, self.selection.length, item);
            // })
        },
        deselect(item) {
            var self = this;

            if (!item) {
                return;
            }

            //Get the item ID


            var itemID = self.$fluro.utils.getStringID(item);

            //Find the index of the matching item
            var index = _.findIndex(self.selection, function(selectedItem) {
                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
                return itemID == selectedItemID;
            })

            self.selection.splice(index, 1);
        },
        toggle(item) {

            var self = this;
            if (self.isSelected(item)) {
                self.deselect(item);
            } else {
                self.select(item);
            }

            // console.log('TOGGLE', self.selection);
        },
        deselectAll() {
            this.selection = [];
            // this.selection.length =0;
        },
        isSelected(item) {
            var self = this;
            var itemID = self.$fluro.utils.getStringID(item);

            //Check if the ID is already selected
            var match = _.some(self.selection, function(selectedItem) {
                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
                return itemID == selectedItemID;
            })

            return match;
        },

    }
}