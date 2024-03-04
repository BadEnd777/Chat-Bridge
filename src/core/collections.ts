/**
 * Represents a collection of items.
 */
export class Collections {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private items: any[];

    constructor() {
        this.items = [];
    }

    /**
     * Adds an item to the collection.
     * @param item - The item to add.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add(item: any) {
        this.items.push(item);
    }

    /**
     * Retrieves an item from the collection by name.
     * @param name - The name of the item to retrieve.
     * @returns The item with the specified name, or undefined if not found.
     */
    get(name: string) {
        return this.items.find((item) => item.name === name);
    }
}
