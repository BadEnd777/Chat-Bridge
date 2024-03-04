/**
 * Enum representing the types of feedback questions.
 */
export enum FeedbackQuestionType {
    CSAT = 'csat',
    NPS = 'nps',
    CES = 'ces'
}

/**
 * Represents a feedback template for a chat application.
 */
export class FeedbackTemplate {
    private title: string;
    private subtitle: string;
    private buttonTitle: string;
    private feedbackScreens: Array<FeedbackScreen> = [];
    private businessPrivacy: string;
    private expiresInDays?: number;

    /**
     * Creates a new instance of FeedbackTemplate.
     * @param title - The title of the feedback template.
     * @param subtitle - The subtitle of the feedback template.
     * @param buttonTitle - The title of the button in the feedback template.
     */
    constructor(title: string, subtitle: string, buttonTitle: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.buttonTitle = buttonTitle;
        this.businessPrivacy = '';
    }

    /**
     * Adds feedback screens to the feedback template.
     * @param feedbackScreens - An array of feedback screens to be added.
     * @returns The updated FeedbackTemplate instance.
     */
    public addFeedbackScreens(feedbackScreens: Array<FeedbackScreen>): FeedbackTemplate {
        this.feedbackScreens = this.feedbackScreens.concat(feedbackScreens);
        return this;
    }

    /**
     * Sets the business privacy URL for the feedback template.
     * @param url - The URL of the business privacy policy.
     * @returns The updated FeedbackTemplate instance.
     */
    public setBusinessPrivacy(url: string): FeedbackTemplate {
        this.businessPrivacy = url;
        return this;
    }

    /**
     * Sets the expiration period in days for the feedback template.
     * @param expiresInDays - The number of days until the feedback template expires.
     * @returns The updated FeedbackTemplate instance.
     */
    public setExpiresInDays(expiresInDays: number): FeedbackTemplate {
        this.expiresInDays = expiresInDays;
        return this;
    }

    /**
     * Converts the FeedbackTemplate instance to a JSON object.
     * @returns The JSON representation of the FeedbackTemplate instance.
     */
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

/**
 * Represents a feedback screen that contains a list of feedback questions.
 */
export class FeedbackScreen {
    private questions: Array<FeedbackQuestion> = [];

    /**
     * Adds an array of feedback questions to the feedback screen.
     * @param questions - The array of feedback questions to add.
     * @returns The updated feedback screen.
     */
    public addQuestions(questions: Array<FeedbackQuestion>): FeedbackScreen {
        this.questions = this.questions.concat(questions);
        return this;
    }

    /**
     * Converts the feedback screen object to JSON format.
     * @returns The JSON representation of the feedback screen.
     */
    toJSON() {
        return {
            questions: this.questions
        };
    }
}

/**
 * Represents a feedback question.
 */
export class FeedbackQuestion {
    private id: string;
    private type: FeedbackQuestionType;
    private title?: string;
    private scoreLabel?: string;
    private scoreOption?: string;
    private followUp?: FollowUp;

    /**
     * Creates a new instance of FeedbackQuestion.
     * @param id - The ID of the question.
     * @param type - The type of the question.
     */
    constructor(id: string, type: FeedbackQuestionType) {
        this.id = id;
        this.type = type;
    }

    /**
     * Sets the title of the question.
     * @param title - The title of the question.
     * @returns The updated FeedbackQuestion instance.
     */
    public setTitle(title: string): FeedbackQuestion {
        this.title = title;
        return this;
    }

    /**
     * Sets the score label of the question.
     * @param scoreLabel - The score label of the question.
     * @returns The updated FeedbackQuestion instance.
     */
    public setScoreLabel(scoreLabel: string): FeedbackQuestion {
        this.scoreLabel = scoreLabel;
        return this;
    }

    /**
     * Sets the score option of the question.
     * @param scoreOption - The score option of the question.
     * @returns The updated FeedbackQuestion instance.
     */
    public setScoreOption(scoreOption: string): FeedbackQuestion {
        this.scoreOption = scoreOption;
        return this;
    }

    /**
     * Sets the follow-up of the question.
     * @param followUp - The follow-up of the question.
     * @returns The updated FeedbackQuestion instance.
     */
    public setFollowUp(followUp: FollowUp): FeedbackQuestion {
        this.followUp = followUp;
        return this;
    }

    /**
     * Converts the FeedbackQuestion instance to JSON format.
     * @returns The JSON representation of the FeedbackQuestion instance.
     */
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

/**
 * Represents a follow-up question in a feedback template.
 */
export class FollowUp {
    private type: string;
    private placeholder?: string;

    /**
     * Creates a new instance of the FollowUp class.
     * @param type The type of the follow-up question.
     */
    constructor(type: string) {
        this.type = type;
    }

    /**
     * Sets the placeholder text for the follow-up question.
     * @param placeholder The placeholder text.
     * @returns The updated FollowUp instance.
     */
    public setPlaceholder(placeholder: string): FollowUp {
        this.placeholder = placeholder;
        return this;
    }

    /**
     * Converts the FollowUp instance to a JSON object.
     * @returns The JSON representation of the FollowUp instance.
     */
    toJSON() {
        return {
            type: this.type,
            placeholder: this.placeholder
        };
    }
}
