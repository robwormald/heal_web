import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState, Comment, User } from './../../store/constants';
import { BBCodeService } from './../../global/index';
import { CommentsPartialService } from './comments.service';
import { RatePartialService } from './../rate/rate.service';

@Component({
  moduleId: module.id,
  selector: 'comments-partial',
  templateUrl: './comments.component.html',
  providers: [BBCodeService, CommentsPartialService, RatePartialService]
})

export class CommentsPartialComponent implements OnInit {
  @Input('id') id;
  @Input('type') type;

  commentList: Observable<Comment[]>;
  currentComment: Observable<Comment[]>;
  currentUser: User;

  constructor(
    private store: Store<AppState>,
    private service: CommentsPartialService,
    private rateService: RatePartialService,
    private bbcode: BBCodeService,
  ) {}

  ngOnInit(): void {
    this.store.select('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
    this.commentList = this.store.select('commentList');
    this.currentComment = this.store.select('currentComment');

    this.service.getComments(this.id, this.type);
  }

  parseBBcode(comment: Comment): string {
    return comment.parsed || (comment.parsed = this.bbcode.parse(comment.body))
  }

  changePage(items: Comment[]): void {
    let ids = items.map((comment) => comment.id);
    this.rateService.getMultipleRatings(ids, 'comment')
      .subscribe((res) => this.service.current(items, res));
  }

  create(event: any): void {
    this.service.create(this.id, this.type, event);
  }

  destroy(comment: Comment): void {
    this.service.destroy(comment.id);
  }

  edit(comment: Comment): void {
    this.service.edit(comment, !comment.editing);
  }

  update(comment: Comment, event: any): void {
    if(comment.body === event.value) {
      this.service.edit(comment, false);
    }
    else {
      this.service.update(comment.id, event.value);
    }
  }
}
