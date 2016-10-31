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

  comments: Comment[] = [];
  currentComments: Comment[] = [];
  currentUser: User;

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

  create(event: any): void {
    this.service.create(this.id, this.type, event.value).subscribe((res) => {
      this.comments = res.comments;
      event.callback();
    });
  }

  destroy(comment: Comment): void {
    this.service.destroy(comment.id).subscribe((res) => this.comments = res.comments);
  }

  edit(comment: Comment): void {
    this.comments.map((c) => c.editing = false);
    comment.editing = !comment.editing;
  }

  update(comment: Comment, event: any): void {
    if(comment.body == event.value) {
      comment.editing = false;
    }
    else {
      this.service.update(comment.id, event.value).subscribe((res) => this.comments = res.comments);
    }
  }
}
