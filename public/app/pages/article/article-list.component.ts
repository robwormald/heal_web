import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { ArticleList } from './../../objects/index';
import { ArticleService } from './article.service';

@Component({
  moduleId: module.id,
  selector: 'article-list-component',
  templateUrl: './article-list.component.html',
  providers: [ArticleService]
})

export class ArticleListComponent {
  articleList: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private service: ArticleService,
  ) {
    this.store.changes.pluck('articleList').subscribe((articleList: ArticleList) => this.articleList = articleList);

    this.route.params.subscribe((params: Params) => {
      this.store.setKeyValue('articleList', {});
      this.service.getArticles(params['page']);
    });
  }
}
