"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptElement = void 0;
var ReceiptElement = /** @class */ (function () {
    function ReceiptElement(title, subtitle, quantity, price, currency, imageUrl) {
        this.title = title;
        this.subtitle = subtitle;
        this.quantity = quantity;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
    }
    ReceiptElement.prototype.toJSON = function () {
        return {
            title: this.title,
            subtitle: this.subtitle,
            quantity: this.quantity,
            price: this.price,
            currency: this.currency,
            image_url: this.imageUrl
        };
    };
    return ReceiptElement;
}());
exports.ReceiptElement = ReceiptElement;
