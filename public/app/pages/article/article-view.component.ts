import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { ArticleService } from './article.service';
import { BBCodeService } from './../../global/index';
import { AppState, Article } from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'article-view-component',
  templateUrl: './article-view.component.html',
  providers: [ArticleService, BBCodeService]
})

export class ArticleViewComponent {
  currentArticle: Article;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: ArticleService,
    private bbcode: BBCodeService,
  ) {
    this.store.select('currentArticle').subscribe((currentArticle: Article) => this.currentArticle = currentArticle);

    this.route.params.subscribe((params: Params) => {
      this.service.getArticle(params['id']);
    });
  }

  parseBBcode(article: Article): string {
    return article.parsed || (article.parsed = this.bbcode.parse(article.body))
  }
}
