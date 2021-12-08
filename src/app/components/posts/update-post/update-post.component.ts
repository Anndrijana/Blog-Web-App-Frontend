import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../../model/post';
import { PostService } from '../../../services/post.service';


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  post: Post;
  email: string;

  sub: any;
  isDataAvailable: boolean;
  id: number;

  constructor(private postService: PostService, 
              private route: ActivatedRoute,
              private router: Router) { 
    this.post = new Post();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.isDataAvailable = false;
      if(params['id'] != null){
        this.id = +params['id']; 
        
        if(this.id != null ){
          this.postService.findOne(this.id).subscribe(
            e => { this.post = e; });
        }
     }
   });
  }

  saveAfterChangePost(){
    this.postService.updatePost(this.post.id, this.post).subscribe(
      s => {
        this.post = s;
        this.router.navigate(['posts']);
      },
      err=> alert("Something went wrong...")
    );    
  }

  goBackPost(){
    this.router.navigate(['post/', this.post.id]);
  }
}
