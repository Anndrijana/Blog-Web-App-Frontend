import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../model/post';

@Component({
  selector: 'app-posts-all',
  templateUrl: './posts-all.component.html',
  styleUrls: ['./posts-all.component.css']
})
export class PostsAllComponent implements OnInit {

  posts: Post[];

  constructor(private postService : PostService, private router: Router) {
    this.posts = [];
    this.getAll();
  }

  ngOnInit() {
  }

  getAll(){
    this.postService.findAll().subscribe(
      s => { this.posts = s; }
    );
  }

  viewDetails(id: number){
    this.router.navigate(['post/', id]);
  }

  aprove(id: number){
    this.postService.approvePost(id).subscribe(
      p => { this.getAll() }
    );
  }
}
