import { ReceiptElement } from '../elements/ReceiptElement';

/**
 * Represents a receipt template.
 */
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

    /**
     * Creates a new instance of the ReceiptTemplate class.
     * @param recipientName - The name of the recipient.
     * @param orderNumber - The order number.
     * @param currency - The currency.
     * @param paymentMethod - The payment method.
     * @param timestamp - The timestamp.
     */
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

    /**
     * Adds an element to the receipt template.
     * @param element - The element to add.
     * @returns The updated ReceiptTemplate instance.
     */
    public addElement(element: ReceiptElement): ReceiptTemplate {
        this.elements.push(element);
        return this;
    }

    /**
     * Sets the address for the receipt template.
     * @param address - The address to set.
     * @returns The updated ReceiptTemplate instance.
     */
    public setAddress(address: Address): ReceiptTemplate {
        this.address = address;
        return this;
    }

    /**
     * Sets the summary for the receipt template.
     * @param summary - The summary to set.
     * @returns The updated ReceiptTemplate instance.
     */
    public setSummary(summary: Summary): ReceiptTemplate {
        this.summary = summary;
        return this;
    }

    /**
     * Adds adjustments to the receipt template.
     * @param adjustments - The adjustments to add.
     * @returns The updated ReceiptTemplate instance.
     */
    public addAdjustments(adjustments: Array<Adjustment>): ReceiptTemplate {
        this.adjustments = this.adjustments.concat(adjustments);
        return this;
    }

    /**
     * Converts the ReceiptTemplate instance to JSON format.
     * @returns The JSON representation of the ReceiptTemplate instance.
     */
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

/**
 * Represents an address.
 */
export class Address {
    private street1: string;
    private street2?: string;
    private city: string;
    private postalCode: string;
    private state: string;
    private country: string;

    /**
     * Creates a new instance of the Address class.
     * @param street1 - The first line of the street address.
     * @param city - The city name.
     * @param postalCode - The postal code.
     * @param state - The state or province.
     * @param country - The country.
     */
    constructor(street1: string, city: string, postalCode: string, state: string, country: string) {
        this.street1 = street1;
        this.city = city;
        this.postalCode = postalCode;
        this.state = state;
        this.country = country;
    }

    /**
     * Sets the second line of the street address.
     * @param street2 - The second line of the street address.
     * @returns The updated Address object.
     */
    public setStreet2(street2: string): Address {
        this.street2 = street2;
        return this;
    }

    /**
     * Converts the Address object to a JSON representation.
     * @returns The JSON representation of the Address object.
     */
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

/**
 * Represents a summary of a receipt.
 */
export class Summary {
    private subtotal: number;
    private shippingCost: number;
    private totalTax: number;
    private totalCost: number;

    /**
     * Creates a new Summary instance.
     * @param subtotal - The subtotal amount.
     * @param shippingCost - The shipping cost amount.
     * @param totalTax - The total tax amount.
     * @param totalCost - The total cost amount.
     */
    constructor(subtotal: number, shippingCost: number, totalTax: number, totalCost: number) {
        this.subtotal = subtotal;
        this.shippingCost = shippingCost;
        this.totalTax = totalTax;
        this.totalCost = totalCost;
    }

    /**
     * Converts the Summary object to a JSON representation.
     * @returns The JSON representation of the Summary object.
     */
    toJSON() {
        return {
            subtotal: this.subtotal,
            shipping_cost: this.shippingCost,
            total_tax: this.totalTax,
            total_cost: this.totalCost
        };
    }
}

/**
 * Represents an adjustment in a receipt.
 */
export class Adjustment {
    private name: string;
    private amount: number;

    /**
     * Creates a new instance of the Adjustment class.
     * @param name - The name of the adjustment.
     * @param amount - The amount of the adjustment.
     */
    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    /**
     * Converts the Adjustment object to a JSON representation.
     * @returns The JSON representation of the Adjustment object.
     */
    toJSON() {
        return {
            name: this.name,
            amount: this.amount
        };
    }
}
