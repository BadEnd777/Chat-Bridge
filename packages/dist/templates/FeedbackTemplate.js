"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPrivacy = exports.FollowUp = exports.Question = exports.ScoreType = exports.FeedbackScreen = exports.FeedbackTemplate = void 0;
var FeedbackTemplate = /** @class */ (function () {
    function FeedbackTemplate(title, subtitle, buttonTitle) {
        this.feedbackScreens = [];
        this.title = title;
        this.subtitle = subtitle;
        this.buttonTitle = buttonTitle;
    }
    FeedbackTemplate.prototype.addFeedbackScreen = function (feedbackScreen) {
        this.feedbackScreens.push(feedbackScreen);
        return this;
    };
    FeedbackTemplate.prototype.setBusinessPrivacy = function (businessPrivacy) {
        this.businessPrivacy = businessPrivacy;
        return this;
    };
    FeedbackTemplate.prototype.setExpiresInDays = function (expiresInDays) {
        this.expiresInDays = expiresInDays;
        return this;
    };
    FeedbackTemplate.prototype.toJSON = function () {
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'customer_feedback',
                    title: this.title,
                    subtitle: this.subtitle,
                    button_title: this.buttonTitle,
                    feedback_screens: this.feedbackScreens,
                    business_privacy: this.businessPrivacy,
                    expires_in_days: this.expiresInDays
                }
            }
        };
    };
    return FeedbackTemplate;
}());
exports.FeedbackTemplate = FeedbackTemplate;
var FeedbackScreen = /** @class */ (function () {
    function FeedbackScreen() {
        this.questions = [];
    }
    FeedbackScreen.prototype.addQuestion = function (question) {
        this.questions.push(question);
        return this;
    };
    FeedbackScreen.prototype.toJSON = function () {
        return {
            questions: this.questions
        };
    };
    return FeedbackScreen;
}());
exports.FeedbackScreen = FeedbackScreen;
var ScoreType;
(function (ScoreType) {
    ScoreType["CSAT"] = "csat";
    ScoreType["NPS"] = "nps";
    ScoreType["CES"] = "ces";
})(ScoreType || (exports.ScoreType = ScoreType = {}));
var Question = /** @class */ (function () {
    function Question(id, type) {
        this.id = id;
        this.type = type;
    }
    Question.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    Question.prototype.setScoreLabel = function (scoreLabel) {
        this.scoreLabel = scoreLabel;
        return this;
    };
    Question.prototype.setScoreOption = function (scoreOption) {
        this.scoreOption = scoreOption;
        return this;
    };
    Question.prototype.setFollowUp = function (followUp) {
        this.followUp = followUp;
        return this;
    };
    Question.prototype.toJSON = function () {
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            score_label: this.scoreLabel,
            score_option: this.scoreOption,
            follow_up: this.followUp
        };
    };
    return Question;
}());
exports.Question = Question;
var FollowUp = /** @class */ (function () {
    function FollowUp(type) {
        this.type = type;
    }
    FollowUp.prototype.setPlaceholder = function (placeholder) {
        this.placeholder = placeholder;
        return this;
    };
    FollowUp.prototype.toJSON = function () {
        return {
            type: this.type,
            placeholder: this.placeholder
        };
    };
    return FollowUp;
}());
exports.FollowUp = FollowUp;
var BusinessPrivacy = /** @class */ (function () {
    function BusinessPrivacy(url) {
        this.url = url;
    }
    BusinessPrivacy.prototype.toJSON = function () {
        return {
            url: this.url
        };
    };
    return BusinessPrivacy;
}());
exports.BusinessPrivacy = BusinessPrivacy;
