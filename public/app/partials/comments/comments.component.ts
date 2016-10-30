import { Component, Input, OnInit } from '@angular/core';

import { Comment } from './../../objects/index';
import { BBCodeService } from './../../global/index';
import { CommentsPartialService } from './comments.service';

@Component({
  moduleId: module.id,
  selector: 'comments-partial',
  templateUrl: './comments.component.html',
  providers: [BBCodeService, CommentsPartialService]
})

export class CommentsPartialComponent implements OnInit {
  @Input('id') id;
  @Input('type') type;

  comment: string;
  comments: Comment[] = [];
  inputDisabled: boolean;

  constructor(
    private service: CommentsPartialService,
    private bbcode: BBCodeService,
  ) {}

  ngOnInit(): void {
    this.service.getComments(this.id, this.type).subscribe((res) => {
      this.comments = res.comments;
    });
  }

  parseBBcode(comment: Comment): string {
    return comment.parsed || (comment.parsed = this.bbcode.parse(comment.body))
  }

  onComment(): void {
    if(!this.inputDisabled && this.comment && this.comment.length) {
      this.inputDisabled = true;

      this.service.createComment(this.id, this.type, this.comment).subscribe((res) => {
        this.comment = '';
        this.comments = res.comments;
        this.inputDisabled = false;
      });
    }
  }
}
