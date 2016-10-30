import { Component, Input,OnInit } from '@angular/core';

import { BBCodeService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'comments-partial',
  templateUrl: './comments.component.html',
  providers: [BBCodeService]
})

export class CommentsPartialComponent implements OnInit {
  comment: string;
  // make object
  comments: any[] = [];
  inputDisabled: boolean;

  constructor(
    private bbcode: BBCodeService
  ) {}

  ngOnInit(): void {
    // this.service.getComments().subscribe((res) => {
    //   this.comments = res.comments;
    // });
  }

  // object
  parseBBcode(comment): string {
    return comment.parsed || (comment.parsed = this.bbcode.parse(comment.body))
  }

  onComment(): void {
    if(!this.inputDisabled && this.comment && this.comment.length) {
      this.inputDisabled = true;
      console.error("comment");
    }
  }
}
