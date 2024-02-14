const { CouponTemplate } = require('chat-bridge');
const { FeedbackTemplate, FeedbackScreen, FeedbackQuestion, FollowUp, FeedbackQuestionType } = require('chat-bridge');
const { GenericTemplate, GenericElement, UrlButton, PostbackButton, CallButton } = require('chat-bridge');
const { QuickReplies, QuickReply } = require('chat-bridge');
const { ReceiptTemplate, ReceiptElement, Address, Summary, Adjustment } = require('chat-bridge');

module.exports = {
    name: 'templates',

    run: async (client, message) => {
        const sender = message.sender.id;

        // http://chat-bridge.pages.dev/api-reference/templates/coupon
        const couponTemplate = new CouponTemplate('Coupon Template Title', 'COUPONCODE', 'https://example.com/coupon')
            .setSubtitle('Coupon Template Subtitle')
            .setCouponCode('NEWCOUPONCODE')
            .setCouponUrl('https://example.com/new-coupon')
            .setCouponUrlButtonTitle('New Coupon URL Button Title')
            .setCouponPreMessage('New Coupon Pre-Message')
            .setImageUrl('https://example.com/coupon-image.jpg')
            .setPayload('NEWPAYLOAD');

        await client.send(sender, couponTemplate);

        // http://chat-bridge.pages.dev/api-reference/templates/feedback
        const feedbackTemplate = new FeedbackTemplate(
            'Rate your experience with Original Coast Clothing.',
            'Let Original Coast Clothing know how they are doing by answering two questions',
            'Rate Experience'
        )
            .addFeedbackScreens([
                new FeedbackScreen().addQuestions([
                    new FeedbackQuestion('hauydmns8', FeedbackQuestionType.CSAT)
                        .setTitle('How would you rate your experience with Original Coast Clothing?')
                        .setScoreLabel('neg_pos')
                        .setScoreOption('five_stars')
                        .setFollowUp(new FollowUp('free_form').setPlaceholder('Give additional feedback'))
                ])
            ])
            .setBusinessPrivacy('https://www.example.com')
            .setExpiresInDays(3);

        await client.send(sender, feedbackTemplate);

        // http://chat-bridge.pages.dev/api-reference/templates/generic
        const genericTemplate = new GenericTemplate().addElement(
            new GenericElement('Title', 'Subtitle', 'https://example.com/image.jpg').addButtons([
                new UrlButton('Button', 'https://example.com'),
                new PostbackButton('Button', 'POSTBACK_PAYLOAD'),
                new CallButton('Button', '+1234567890')
            ])
        );

        await client.send(sender, genericTemplate);

        // http://chat-bridge.pages.dev/api-reference/templates/media
        // TODO: MediaTemplate

        // http://chat-bridge.pages.dev/api-reference/templates/product
        // TODO: ProductTemplate

        // http://chat-bridge.pages.dev/api-reference/templates/quick-replies
        const quickReplies = new QuickReplies('Choose an color').addQuickReply([
            new QuickReply('Red')
                .setPayload('red')
                .setImageUrl('https://ui-avatars.com/api/?name=Red&background=FF0000&color=FFFFFF'),
            new QuickReply('Green')
                .setPayload('green')
                .setImageUrl('https://ui-avatars.com/api/?name=Green&background=00FF00&color=FFFFFF')
        ]);

        await client.send(sender, quickReplies);

        // http://chat-bridge.pages.dev/api-reference/templates/receipt
        const receiptTemplate = new ReceiptTemplate(
            'Stephane Crozatier',
            '12345678902',
            'USD',
            'Visa 2345',
            '123123123'
        )
            .addElement(
                new ReceiptElement(
                    'Classic White T-Shirt',
                    '100% Soft and Luxurious Cotton',
                    2,
                    50,
                    'USD',
                    'https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png'
                )
            )
            .addElement(
                new ReceiptElement(
                    'Classic Gray T-Shirt',
                    '100% Soft and Luxurious Cotton',
                    1,
                    25,
                    'USD',
                    'https://peterssendreceiveapp.ngrok.io/img/gray-t-shirt.png'
                )
            )
            .setAddress(new Address('1 Hacker Way', 'Menlo Park', '94025', 'CA', 'US'))
            .setSummary(new Summary(75, 4.95, 6.19, 56.14))
            .addAdjustments([new Adjustment('New Customer Discount', 20), new Adjustment('$10 Off Coupon', 10)]);

        await client.send(sender, receiptTemplate);
    }
};
