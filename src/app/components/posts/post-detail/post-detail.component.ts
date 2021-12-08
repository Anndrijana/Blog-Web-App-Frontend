import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';
import { Post } from '../../../model/post';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  email: string;
  role: string;

  sub: any;
  isDataAvailable: boolean;
  id: number;

  selectedComment: string = "";

  listOfReadOnlyField: boolean[] = [];

  flag: boolean = false;
  readonlyRating: boolean = false;

  constructor(private postService : PostService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private commentService : CommentService, 
    private userService : UserService) 
  { 
     this.post = new Post();
     var token = localStorage.getItem('token');
     if (token != null){
        this.email = this.userService.getEmail(token);
        this.role = this.userService.getRole(token);
     }else{
       this.email = null;
     }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.isDataAvailable = false;
      if(params['id'] != null){
        this.id = +params['id']; 
        this.findOne();
      }
    });
  }

  findOne(){
    this.postService.findOne(this.id).subscribe(
      e => {
        this.post = e;

        this.listOfReadOnlyField = [];
          for (let entry of this.post.comments) {
            this.listOfReadOnlyField.push(true);  
          }
    });
  }

  updatePost(post: Post){
    if(this.email === post.user.email){
      this.router.navigate([`post/${post.id}/edit`]);
    }
  }

  deletePost(post: Post){
    if(this.email === post.user.email){
      this.postService.deletePost(post.id).subscribe(
        s =>  this.router.navigate(['posts']),
        err=> alert("Something went wrong..."));  
      } 
   }

  addCommentClick(){
    if (this.selectedComment != '') {
        var newComment = new Comment();
        newComment.commentText = this.selectedComment;

        this.commentService.addComment(newComment, this.post.id ).subscribe(
          s => { this.findOne() },
          err=> alert("Something went wrong...")
        );    
        this.selectedComment = "";
    }
  }

  updateComment(index: number, tempComment: Comment){
      if(this.email === tempComment.user.email){
        this.listOfReadOnlyField[index] = false;
      }
    }

  saveChangesAfterUpdate(id: number, commentText: string){
    var updateComment = new Comment();
    updateComment.commentText = commentText;
    
    this.commentService.updateComment(id, updateComment).subscribe(
          s => { this.findOne() },
          err=> alert("Something went wrong...")
    );    
  }

  deleteComment(comment: Comment){
    var txt;
    var r = confirm("Da li ste sigurni da želite da obrišete sto?");
    if (r == true) {
      txt = "You pressed OK!";
    this.commentService.deleteComment(comment.id, this.post.id).subscribe(
      s => {
        this.findOne();
      }, 
      err => {
        alert('error');
      }
    )
  } else {
    txt = "You pressed Cancel!"
  }
  }

  ratePost(){
    if(!this.flag && this.email != this.post.user.email)
    {
      this.readonlyRating = true;
      
      this.postService.ratePost(this.post).subscribe(
        s => { this.findOne() },
        err => alert("Something went wrong...")
      );
      this.flag = true;
    }
  }

  goBackPost(){
    this.router.navigate(['posts']);
  }

}
