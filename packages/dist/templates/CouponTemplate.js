"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponTemplate = void 0;
var CouponTemplate = /** @class */ (function () {
    function CouponTemplate(title, couponCode, couponUrl) {
        this.title = title;
        this.couponCode = couponCode;
        this.couponUrl = couponUrl;
    }
    CouponTemplate.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    CouponTemplate.prototype.setSubtitle = function (subtitle) {
        this.subtitle = subtitle;
        return this;
    };
    CouponTemplate.prototype.setCouponCode = function (couponCode) {
        this.couponCode = couponCode;
        return this;
    };
    CouponTemplate.prototype.setCouponUrl = function (couponUrl) {
        this.couponUrl = couponUrl;
        return this;
    };
    CouponTemplate.prototype.setCouponUrlButtonTitle = function (couponUrlButtonTitle) {
        this.couponUrlButtonTitle = couponUrlButtonTitle;
        return this;
    };
    CouponTemplate.prototype.setCouponPreMessage = function (couponPreMessage) {
        this.couponPreMessage = couponPreMessage;
        return this;
    };
    CouponTemplate.prototype.setImageUrl = function (imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    };
    CouponTemplate.prototype.setPayload = function (payload) {
        this.payload = payload;
        return this;
    };
    CouponTemplate.prototype.toJSON = function () {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'coupon',
                    title: this.title,
                    subtitle: this.subtitle,
                    coupon_code: this.couponCode,
                    coupon_url: this.couponUrl,
                    coupon_url_button_title: this.couponUrlButtonTitle,
                    coupon_pre_message: this.couponPreMessage,
                    image_url: this.imageUrl,
                    payload: this.payload
                }
            }
        };
    };
    return CouponTemplate;
}());
exports.CouponTemplate = CouponTemplate;
