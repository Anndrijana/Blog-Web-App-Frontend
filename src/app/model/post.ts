import { User } from "./user";
import { Comment } from "./comment";

export class Post{
    id?: number;
    user: User;
    dateAndTime?: string;
    text?: string;
    comments?: Comment[];
    rating?: number;
    approved?: boolean;

    constructor(){
        this.id = 0;
        this.user =  new User();
        this.dateAndTime = "";
        this.text = "";
        this.comments = [];
        this.rating = 0;
        this.approved = false;
    }
}
