import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { ArticleService } from './article.service';
import { BBCodeService } from './../../global/index';
import { Article } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'article-view-component',
  templateUrl: './article-view.component.html',
  providers: [ArticleService, BBCodeService]
})

export class ArticleViewComponent {
  currentArticle: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private service: ArticleService,
    private bbcode: BBCodeService,
  ) {
    this.store.changes.pluck('currentArticle').subscribe((currentArticle: Article) => this.currentArticle = currentArticle);

    this.route.params.subscribe((params: Params) => {
      this.store.setKeyValue('currentArticle', {});
      this.service.getArticle(params['id']);
    });
  }

  parseBBcode(article: Article): string {
    return article.parsed || (article.parsed = this.bbcode.parse(article.body))
  }
}
