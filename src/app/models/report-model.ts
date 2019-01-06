export class Report {

    id: number;
    description: string;
    reportAuthor: {
        username: string;
        role: string;
        email: string;
        id: number;
    };

    constructor(json) {
        this.id = json.id;
        this.description = json.description;
        this.reportAuthor = json.reportAuthor;
    }
}
