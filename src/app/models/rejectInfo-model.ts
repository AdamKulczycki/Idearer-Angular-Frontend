export class RejectInfo {

    id: number;
    date: Date;
    description: string;

    constructor(json) {
        this.id = json.id;
        this.date = json.date;
        this.description = json.description;
    }
}
