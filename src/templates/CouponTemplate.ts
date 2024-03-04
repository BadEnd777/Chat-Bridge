/**
 * Represents a coupon template.
 */
export class CouponTemplate {
    private title: string;
    private subtitle?: string;
    private couponCode: string;
    private couponUrl: string;
    private couponUrlButtonTitle?: string;
    private couponPreMessage?: string;
    private imageUrl?: string;
    private payload?: string;

    /**
     * Creates a new instance of the CouponTemplate class.
     * @param title - The title of the coupon template.
     * @param couponCode - The coupon code.
     * @param couponUrl - The URL associated with the coupon.
     */
    constructor(title: string, couponCode: string, couponUrl: string) {
        this.title = title;
        this.couponCode = couponCode;
        this.couponUrl = couponUrl;
    }

    /**
     * Sets the title of the coupon template.
     * @param title - The title of the coupon template.
     * @returns The updated CouponTemplate instance.
     */
    public setTitle(title: string): CouponTemplate {
        this.title = title;
        return this;
    }

    /**
     * Sets the subtitle of the coupon template.
     * @param subtitle - The subtitle of the coupon template.
     * @returns The updated CouponTemplate instance.
     */
    public setSubtitle(subtitle: string): CouponTemplate {
        this.subtitle = subtitle;
        return this;
    }

    /**
     * Sets the coupon code.
     * @param couponCode - The coupon code.
     * @returns The updated CouponTemplate instance.
     */
    public setCouponCode(couponCode: string): CouponTemplate {
        this.couponCode = couponCode;
        return this;
    }

    /**
     * Sets the URL associated with the coupon.
     * @param couponUrl - The URL associated with the coupon.
     * @returns The updated CouponTemplate instance.
     */
    public setCouponUrl(couponUrl: string): CouponTemplate {
        this.couponUrl = couponUrl;
        return this;
    }

    /**
     * Sets the button title for the coupon URL.
     * @param couponUrlButtonTitle - The button title for the coupon URL.
     * @returns The updated CouponTemplate instance.
     */
    public setCouponUrlButtonTitle(couponUrlButtonTitle: string): CouponTemplate {
        this.couponUrlButtonTitle = couponUrlButtonTitle;
        return this;
    }

    /**
     * Sets the pre-message for the coupon.
     * @param couponPreMessage - The pre-message for the coupon.
     * @returns The updated CouponTemplate instance.
     */
    public setCouponPreMessage(couponPreMessage: string): CouponTemplate {
        this.couponPreMessage = couponPreMessage;
        return this;
    }

    /**
     * Sets the image URL for the coupon.
     * @param imageUrl - The image URL for the coupon.
     * @returns The updated CouponTemplate instance.
     */
    public setImageUrl(imageUrl: string): CouponTemplate {
        this.imageUrl = imageUrl;
        return this;
    }

    /**
     * Sets the payload for the coupon.
     * @param payload - The payload for the coupon.
     * @returns The updated CouponTemplate instance.
     */
    public setPayload(payload: string): CouponTemplate {
        this.payload = payload;
        return this;
    }

    /**
     * Converts the CouponTemplate instance to JSON format.
     * @returns The JSON representation of the CouponTemplate instance.
     */
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
