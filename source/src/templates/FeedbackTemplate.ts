export enum FeedbackQuestionType {
    CSAT = 'csat',
    NPS = 'nps',
    CES = 'ces'
}

export class FeedbackTemplate {
    private title: string;
    private subtitle: string;
    private buttonTitle: string;
    private feedbackScreens: Array<FeedbackScreen> = [];
    private businessPrivacy: string;
    private expiresInDays?: number;

    constructor(title: string, subtitle: string, buttonTitle: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.buttonTitle = buttonTitle;
        this.businessPrivacy = '';
    }

    public addFeedbackScreens(feedbackScreens: Array<FeedbackScreen>): FeedbackTemplate {
        this.feedbackScreens = this.feedbackScreens.concat(feedbackScreens);
        return this;
    }

    public setBusinessPrivacy(url: string): FeedbackTemplate {
        this.businessPrivacy = url;
        return this;
    }

    public setExpiresInDays(expiresInDays: number): FeedbackTemplate {
        this.expiresInDays = expiresInDays;
        return this;
    }

    toJSON() {
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
    }
}

export class FeedbackScreen {
    private questions: Array<FeedbackQuestion> = [];

    public addQuestions(questions: Array<FeedbackQuestion>): FeedbackScreen {
        this.questions = this.questions.concat(questions);
        return this;
    }

    toJSON() {
        return {
            questions: this.questions
        };
    }
}

export class FeedbackQuestion {
    private id: string;
    private type: FeedbackQuestionType;
    private title?: string;
    private scoreLabel?: string;
    private scoreOption?: string;
    private followUp?: FollowUp;

    constructor(id: string, type: FeedbackQuestionType) {
        this.id = id;
        this.type = type;
    }

    public setTitle(title: string): FeedbackQuestion {
        this.title = title;
        return this;
    }

    public setScoreLabel(scoreLabel: string): FeedbackQuestion {
        this.scoreLabel = scoreLabel;
        return this;
    }

    public setScoreOption(scoreOption: string): FeedbackQuestion {
        this.scoreOption = scoreOption;
        return this;
    }

    public setFollowUp(followUp: FollowUp): FeedbackQuestion {
        this.followUp = followUp;
        return this;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            title: this.title,
            score_label: this.scoreLabel,
            score_option: this.scoreOption,
            follow_up: this.followUp
        };
    }
}

export class FollowUp {
    private type: string;
    private placeholder?: string;

    constructor(type: string) {
        this.type = type;
    }

    public setPlaceholder(placeholder: string): FollowUp {
        this.placeholder = placeholder;
        return this;
    }

    toJSON() {
        return {
            type: this.type,
            placeholder: this.placeholder
        };
    }
}
