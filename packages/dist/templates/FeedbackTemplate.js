"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUp = exports.FeedbackQuestion = exports.FeedbackScreen = exports.FeedbackTemplate = exports.FeedbackQuestionType = void 0;
var FeedbackQuestionType;
(function (FeedbackQuestionType) {
    FeedbackQuestionType["CSAT"] = "csat";
    FeedbackQuestionType["NPS"] = "nps";
    FeedbackQuestionType["CES"] = "ces";
})(FeedbackQuestionType || (exports.FeedbackQuestionType = FeedbackQuestionType = {}));
var FeedbackTemplate = /** @class */ (function () {
    function FeedbackTemplate(title, subtitle, buttonTitle) {
        this.feedbackScreens = [];
        this.title = title;
        this.subtitle = subtitle;
        this.buttonTitle = buttonTitle;
        this.businessPrivacy = '';
    }
    FeedbackTemplate.prototype.addFeedbackScreens = function (feedbackScreens) {
        this.feedbackScreens = this.feedbackScreens.concat(feedbackScreens);
        return this;
    };
    FeedbackTemplate.prototype.setBusinessPrivacy = function (url) {
        this.businessPrivacy = url;
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
                    business_privacy: {
                        url: this.businessPrivacy
                    },
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
    FeedbackScreen.prototype.addQuestions = function (questions) {
        this.questions = this.questions.concat(questions);
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
var FeedbackQuestion = /** @class */ (function () {
    function FeedbackQuestion(id, type) {
        this.id = id;
        this.type = type;
    }
    FeedbackQuestion.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    FeedbackQuestion.prototype.setScoreLabel = function (scoreLabel) {
        this.scoreLabel = scoreLabel;
        return this;
    };
    FeedbackQuestion.prototype.setScoreOption = function (scoreOption) {
        this.scoreOption = scoreOption;
        return this;
    };
    FeedbackQuestion.prototype.setFollowUp = function (followUp) {
        this.followUp = followUp;
        return this;
    };
    FeedbackQuestion.prototype.toJSON = function () {
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            score_label: this.scoreLabel,
            score_option: this.scoreOption,
            follow_up: this.followUp
        };
    };
    return FeedbackQuestion;
}());
exports.FeedbackQuestion = FeedbackQuestion;
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
