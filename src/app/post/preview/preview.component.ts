import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() post?: Post;

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {}
  
  public go(): void {
    this.postService.getPost("5c8a1d5b0190b242460d1113").subscribe(
      res => {
        console.log(res);
      }
    )
    // this.router.navigateByUrl(`/post/${this.post?.id}`)
  }
}
