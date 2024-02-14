import { ReceiptElement } from '../elements/ReceiptElement';

export class ReceiptTemplate {
    private recipientName: string;
    private orderNumber: string;
    private currency: string;
    private paymentMethod: string;
    private timestamp: string;
    private elements: Array<ReceiptElement> = [];
    private address?: Address;
    private summary?: Summary;
    private adjustments: Array<Adjustment> = [];

    constructor(
        recipientName: string,
        orderNumber: string,
        currency: string,
        paymentMethod: string,
        timestamp: string
    ) {
        this.recipientName = recipientName;
        this.orderNumber = orderNumber;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.timestamp = timestamp;
    }

    public addElement(element: ReceiptElement): ReceiptTemplate {
        this.elements.push(element);
        return this;
    }

    public setAddress(address: Address): ReceiptTemplate {
        this.address = address;
        return this;
    }

    public setSummary(summary: Summary): ReceiptTemplate {
        this.summary = summary;
        return this;
    }

    public addAdjustments(adjustments: Array<Adjustment>): ReceiptTemplate {
        this.adjustments = this.adjustments.concat(adjustments);
        return this;
    }

    toJSON() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'receipt',
                    recipient_name: this.recipientName,
                    order_number: this.orderNumber,
                    currency: this.currency,
                    payment_method: this.paymentMethod,
                    timestamp: this.timestamp,
                    elements: this.elements,
                    address: this.address,
                    summary: this.summary,
                    adjustments: this.adjustments
                }
            }
        };
    }
}

export class Address {
    private street1: string;
    private street2?: string;
    private city: string;
    private postalCode: string;
    private state: string;
    private country: string;

    constructor(street1: string, city: string, postalCode: string, state: string, country: string) {
        this.street1 = street1;
        this.city = city;
        this.postalCode = postalCode;
        this.state = state;
        this.country = country;
    }

    public setStreet2(street2: string): Address {
        this.street2 = street2;
        return this;
    }

    toJSON() {
        return {
            street_1: this.street1,
            street_2: this.street2,
            city: this.city,
            postal_code: this.postalCode,
            state: this.state,
            country: this.country
        };
    }
}

export class Summary {
    private subtotal: number;
    private shippingCost: number;
    private totalTax: number;
    private totalCost: number;

    constructor(subtotal: number, shippingCost: number, totalTax: number, totalCost: number) {
        this.subtotal = subtotal;
        this.shippingCost = shippingCost;
        this.totalTax = totalTax;
        this.totalCost = totalCost;
    }

    toJSON() {
        return {
            subtotal: this.subtotal,
            shipping_cost: this.shippingCost,
            total_tax: this.totalTax,
            total_cost: this.totalCost
        };
    }
}

export class Adjustment {
    private name: string;
    private amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    toJSON() {
        return {
            name: this.name,
            amount: this.amount
        };
    }
}
