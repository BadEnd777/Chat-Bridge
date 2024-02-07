export class ProductElement {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    toJSON() {
        return {
            id: this.id
        };
    }
}
