"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adjustment = exports.Summary = exports.Address = exports.ReceiptTemplate = void 0;
var ReceiptTemplate = /** @class */ (function () {
    function ReceiptTemplate(recipientName, orderNumber, currency, paymentMethod, timestamp) {
        this.elements = [];
        this.adjustments = [];
        this.recipientName = recipientName;
        this.orderNumber = orderNumber;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.timestamp = timestamp;
    }
    ReceiptTemplate.prototype.addElement = function (element) {
        this.elements.push(element);
        return this;
    };
    ReceiptTemplate.prototype.setAddress = function (address) {
        this.address = address;
        return this;
    };
    ReceiptTemplate.prototype.setSummary = function (summary) {
        this.summary = summary;
        return this;
    };
    ReceiptTemplate.prototype.addAdjustments = function (adjustments) {
        this.adjustments = this.adjustments.concat(adjustments);
        return this;
    };
    ReceiptTemplate.prototype.toJSON = function () {
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
    };
    return ReceiptTemplate;
}());
exports.ReceiptTemplate = ReceiptTemplate;
var Address = /** @class */ (function () {
    function Address(street1, city, postalCode, state, country) {
        this.street1 = street1;
        this.city = city;
        this.postalCode = postalCode;
        this.state = state;
        this.country = country;
    }
    Address.prototype.setStreet2 = function (street2) {
        this.street2 = street2;
        return this;
    };
    Address.prototype.toJSON = function () {
        return {
            street_1: this.street1,
            street_2: this.street2,
            city: this.city,
            postal_code: this.postalCode,
            state: this.state,
            country: this.country
        };
    };
    return Address;
}());
exports.Address = Address;
var Summary = /** @class */ (function () {
    function Summary(subtotal, shippingCost, totalTax, totalCost) {
        this.subtotal = subtotal;
        this.shippingCost = shippingCost;
        this.totalTax = totalTax;
        this.totalCost = totalCost;
    }
    Summary.prototype.toJSON = function () {
        return {
            subtotal: this.subtotal,
            shipping_cost: this.shippingCost,
            total_tax: this.totalTax,
            total_cost: this.totalCost
        };
    };
    return Summary;
}());
exports.Summary = Summary;
var Adjustment = /** @class */ (function () {
    function Adjustment(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    Adjustment.prototype.toJSON = function () {
        return {
            name: this.name,
            amount: this.amount
        };
    };
    return Adjustment;
}());
exports.Adjustment = Adjustment;
