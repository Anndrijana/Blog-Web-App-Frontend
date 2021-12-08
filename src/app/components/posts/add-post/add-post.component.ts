import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../../model/post';
import { PostService } from '../../../services/post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService, private router: Router) { 
    this.post = new Post();
  }

  ngOnInit() {
  }
  
  save(){
    this.postService.addPost(this.post).subscribe(
      s => {
        this.post = s;
        this.router.navigate(['posts']);
      },
      err=> alert("Something went wrong...")
    );    
  }

  goBackPost(){
    this.router.navigate(['posts']);
  }


}
