export class User {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;   

    constructor(){
        this.id = 0;
        this.email = "";
        this.firstName = "";
        this.lastName = "";
    }
}
