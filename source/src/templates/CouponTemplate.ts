export class CouponTemplate {
    private title: string;
    private subtitle?: string;
    private couponCode: string;
    private couponUrl: string;
    private couponUrlButtonTitle?: string;
    private couponPreMessage?: string;
    private imageUrl?: string;
    private payload?: string;

    constructor(title: string, couponCode: string, couponUrl: string) {
        this.title = title;
        this.couponCode = couponCode;
        this.couponUrl = couponUrl;
    }

    public setTitle(title: string): CouponTemplate {
        this.title = title;
        return this;
    }

    public setSubtitle(subtitle: string): CouponTemplate {
        this.subtitle = subtitle;
        return this;
    }

    public setCouponCode(couponCode: string): CouponTemplate {
        this.couponCode = couponCode;
        return this;
    }

    public setCouponUrl(couponUrl: string): CouponTemplate {
        this.couponUrl = couponUrl;
        return this;
    }

    public setCouponUrlButtonTitle(couponUrlButtonTitle: string): CouponTemplate {
        this.couponUrlButtonTitle = couponUrlButtonTitle;
        return this;
    }

    public setCouponPreMessage(couponPreMessage: string): CouponTemplate {
        this.couponPreMessage = couponPreMessage;
        return this;
    }

    public setImageUrl(imageUrl: string): CouponTemplate {
        this.imageUrl = imageUrl;
        return this;
    }

    public setPayload(payload: string): CouponTemplate {
        this.payload = payload;
        return this;
    }

    toJSON() {
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
    }
}
