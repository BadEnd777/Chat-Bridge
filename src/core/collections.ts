import { Identifiable } from '@/interfaces';

/**
 * Collections class.
 * @export
 * @class Collections
 * @template T
 */
export class Collections<T extends Identifiable> {
    private items: { [key: string]: T } = {};

    /**
     * Add an item to the Collections.
     * @param {T} item
     */
    public add(item: T) {
        const key = this.getKey(item);
        this.items[key] = item;
    }

    /**
     * Get an item from the Collections.
     * @param {string} key
     * @returns {T}
     */
    public get(key: string): T {
        return this.items[key];
    }

    /**
     * Get all items from the Collections.
     * @returns {T[]}
     */
    public getAll(): T[] {
        return Object.values(this.items);
    }

    /**
     * Remove an item from the Collections.
     * @param {string} key
     */
    public remove(key: string) {
        delete this.items[key];
    }

    /**
     * Remove all items from the Collections.
     */
    public removeAll() {
        this.items = {};
    }

    /**
     * Get the key of an item.
     * @private
     * @param {T} item
     * @returns {string}
     */
    private getKey(item: T): string {
        return item.id;
    }
}
