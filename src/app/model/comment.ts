import { User } from "./user";

export class Comment{
    id?: number;
    commentText: string;
    user: User;
    dateAndTime?: string;

    constructor(){
        this.id = 0;
        this.commentText = "";
        this.user = new User();
        this.dateAndTime = "";
    }
}
