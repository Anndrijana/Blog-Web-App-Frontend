import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private postService : PostService, private router: Router) {
    this.posts = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll(){
    this.postService.findAllApproved().subscribe(
      s => { this.posts = s; }
    );
  }

  viewDetails(id: number){
    this.router.navigate(['post/', id]);
  }
}
