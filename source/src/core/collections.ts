/**
 * Collections class
 * @class
 * @classdesc A class to manage collections
 * @property {Array} items - An array to store items
 * @method add - A method to add an item to the collection
 * @method get - A method to get an item from the collection
 * @example
 * const collections = new Collections();
 *
 * collections.add({ name: 'item1', value: 1 });
 * collections.add({ name: 'item2', value: 2 });
 * collections.get('item1'); // { name: 'item1', value: 1 }
 * collections.get('item2'); // { name: 'item2', value: 2 }
 * */
export class Collections {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private items: any[];

    constructor() {
        this.items = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add(item: any) {
        this.items.push(item);
    }

    get(name: string) {
        return this.items.find((item) => item.name === name);
    }
}
