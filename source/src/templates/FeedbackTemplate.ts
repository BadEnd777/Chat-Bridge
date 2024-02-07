export class FeedbackTemplate {
    private title: string;
    private subtitle: string;
    private buttonTitle: string;
    private feedbackScreens: Array<FeedbackScreen> = [];
    private businessPrivacy?: BusinessPrivacy;
    private expiresInDays?: number;

    constructor(title: string, subtitle: string, buttonTitle: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.buttonTitle = buttonTitle;
    }

    public addFeedbackScreen(feedbackScreen: FeedbackScreen): FeedbackTemplate {
        this.feedbackScreens.push(feedbackScreen);
        return this;
    }

    public setBusinessPrivacy(businessPrivacy: BusinessPrivacy): FeedbackTemplate {
        this.businessPrivacy = businessPrivacy;
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
                    business_privacy: this.businessPrivacy,
                    expires_in_days: this.expiresInDays
                }
            }
        };
    }
}

export class FeedbackScreen {
    private questions: Array<Question> = [];

    public addQuestion(question: Question): FeedbackScreen {
        this.questions.push(question);
        return this;
    }

    toJSON() {
        return {
            questions: this.questions
        };
    }
}

export enum ScoreType {
    CSAT = 'csat',
    NPS = 'nps',
    CES = 'ces'
}

export class Question {
    private id: string;
    private type: ScoreType;
    private title?: string;
    private scoreLabel?: string;
    private scoreOption?: string;
    private followUp?: FollowUp;

    constructor(id: string, type: ScoreType) {
        this.id = id;
        this.type = type;
    }

    public setTitle(title: string): Question {
        this.title = title;
        return this;
    }

    public setScoreLabel(scoreLabel: string): Question {
        this.scoreLabel = scoreLabel;
        return this;
    }

    public setScoreOption(scoreOption: string): Question {
        this.scoreOption = scoreOption;
        return this;
    }

    public setFollowUp(followUp: FollowUp): Question {
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

export class BusinessPrivacy {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    toJSON() {
        return {
            url: this.url
        };
    }
}
