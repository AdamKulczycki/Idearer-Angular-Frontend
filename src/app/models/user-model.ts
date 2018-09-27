export class User {

    public email: string;
    public id: number;
    public password: string;
    public username: string;

    constructor (userJSON) {
        this.email = userJSON.email;
        this.id = userJSON.id;
        this.password = userJSON.password;
        this.username = userJSON.username;
    }
}
