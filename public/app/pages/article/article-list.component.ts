import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState, ArticleList } from './../../store/constants';
import { ArticleService } from './article.service';

@Component({
  moduleId: module.id,
  selector: 'article-list-component',
  templateUrl: './article-list.component.html',
  providers: [ArticleService]
})

export class ArticleListComponent {
  articleList: Observable<ArticleList>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: ArticleService,
  ) {
    this.articleList = this.store.select('articleList');

    this.route.params.subscribe((params: Params) => {
      this.service.getArticles(params['page']);
    });
  }
}
