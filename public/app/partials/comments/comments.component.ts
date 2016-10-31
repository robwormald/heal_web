import { Component, Input, OnInit } from '@angular/core';

import { AppStore } from './../../app.store';
import { Comment, User } from './../../objects/index';
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
  currentComments: Comment[] = [];
  currentUser: User;
  inputDisabled: boolean;

  constructor(
    private store: AppStore,
    private service: CommentsPartialService,
    private bbcode: BBCodeService,
  ) {}

  ngOnInit(): void {
    this.store.changes.pluck('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
    this.service.getComments(this.id, this.type).subscribe((res) => {
      this.comments = res.comments;
    });
  }

  parseBBcode(comment: Comment): string {
    return comment.parsed || (comment.parsed = this.bbcode.parse(comment.body))
  }

  changePage(items: Comment[]): void {
    this.currentComments = items;
  }

  destroyComment(id: number): void {
    this.service.destroyComment(id).subscribe((res) => this.comments = res.comments);
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
